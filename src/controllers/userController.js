const User = require('../models/userModel')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
const {promisify} = require('util')
const jwt = require('jsonwebtoken')
const { relative } = require('path')

const filterObj = (obj,...allowedFields) =>{
    const newObj = {}
    Object.keys(obj).forEach(el => {
        if(allowedFields.includes(el)){
            newObj[el] = obj[el]
        }
    })
    return newObj

}

exports.getMe = catchAsync(async (req,res,next)=>{
    req.user.isActive = undefined
    res.status(200).json({
        status:"success",
        data: {
            user:req.user
        }
   })
})


exports.updateMe = catchAsync(async (req,res,next) => {
    if(req.body.password || req.body.email){
        return next(new AppError(`This route isn't for update password or email. Please use /auth/update-password. or /auth/update-email`,400))
    }

    const filteredBody = filterObj(req.body,'name','username','gender','phoneNumber','addressLocation')
    
 
    const updatedUser = await User.findByIdAndUpdate(req.user.id,filteredBody,{
        new:true,
        runValidators:true
    })


    res.status(200).json({
        status: "success",
        data: {
            user: updatedUser
        }
    })


})

exports.addRelativeUser = catchAsync(async (req,res,next)=>{
    const user = await User.findById(req.user.id).select('+relatives')
  for(let i = 0;i<req.body.relatives.length;i++){
    const relative = await User.findOne({username:req.body.relatives[i]}).select('+relatives')
    console.log(relative)
    if(!user.relatives.includes(relative._id)){
    user.relatives.push(relative)
    relative.relatives.push(user)
    await relative.save()
    }
    }
    await user.save()
    res.status(200).json({
        status: "success",
        data: {
            user
        }
    })
})

exports.getRelatives = catchAsync(async (req,res,next)=>{
        const user = await User.findById(req.user.id).populate({
            path: 'relatives',
            select: 'name username phoneNumber email'
        })

     const relatives =  user.relatives
     res.status(200).json({
        status: "success",
        data: {
            relatives
        }
    })
    
})


exports.deleteMe = catchAsync(async (req,res,next)=>{
    await User.findByIdAndUpdate(req.user.id,{isActive: false})

    res.status(204).json({
        status: "success"
    })
})

exports.checkUsername = catchAsync(async (req,res,next) => {
    const user = await User.findOne({username: req.params.username})
    if(!user){
        return next(new AppError("No user with this username",404))
        
    }
    res.status(200).json({
        status: "success",
        message: "user found"
    })
})

exports.assignSocketIdToUser = async (token,socket,socketStatus)=> {
    try{
    if(!token){
       // io.to(socket.id).emit('error',`You are not logged in!`)
       socket.emit('error',`You are not logged in!`)
        return socket.disconnect()
        
    }

    const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET)
    const currentUser = await User.findById(decoded.id).select('+socketId')
    if(currentUser.socketId){
        socket.emit('error',`You have a socket. Please use this socket and not open another one!`)
        return socket.disconnect()
    }
    currentUser.socketId = socket.id
    currentUser.socketStatus = socketStatus
    await currentUser.save()

   // const currentUser = await User.findByIdAndUpdate(decoded.id,{socketId:socket.id,socketStatus})
}catch(e){
    console.log(e)
    socket.emit('error',`Something went wrong`)
    return socket.disconnect()
}

}

exports.changeSocketStatus = async (socketId,socketStatus) => {
   const user = await User.findOneAndUpdate({socketId},{socketStatus},{new:true})
}

exports.removeSocketId = async (socketId) => {
    const user = await User.findOneAndUpdate({socketId},{$unset : {socketId:"",socketStatus:""}},{new:true})
}