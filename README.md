# Mobser Backend Node.js Application

Welcome to Mobser Backend Node.js Application! This application serves as the backend for Mobser, providing various functionalities including authentication, chat, user management, notifications, device management, and user images.

## Environment
- **Environment:** dev:mobser

## Technologies Used
- **Database:** MongoDB
- **Cloud Messaging:** Firebase Cloud Messaging (FCM)
- **Containerization:** Docker
- **Cloud Storage:** AWS S3

## Deployment
This application is deployed on an EC2 instance.

## Postman API Documentation
Explore the API endpoints and interact with Mobser Backend Node.js Application using Postman: [Mobser Backend API Documentation](https://documenter.getpostman.com/view/22135432/2s9YJf1Mxq)

## Endpoints Overview

### Authentication
- **Forgot Password:** `/api/v1/auth/forgot-password` (POST)
- **Update Password:** `/api/v1/auth/update-password` (PATCH)
- **Update Email:** `/api/v1/auth/update-email` (PATCH)
- **Device Login:** `/api/v1/auth/device-login` (POST)
- **Logout:** `/api/v1/auth/logout` (GET)

### Chat
- No specific endpoint provided in the README.

### Users
- No specific endpoint provided in the README.

### Notification
- No specific endpoint provided in the README.

### Devices
- No specific endpoint provided in the README.

### User Images
- No specific endpoint provided in the README.

## Sample Requests and Responses

**Forgot Password**
```bash
curl --location 'ec2-51-20-135-182.eu-north-1.compute.amazonaws.com/api/v1/auth/forgot-password' \
--data-raw '{
    "email": "hazemhamdy389@gmail.com"
}'
```

**Update Password**
```bash
curl --location --request PATCH 'ec2-51-20-135-182.eu-north-1.compute.amazonaws.com/api/v1/auth/update-password' \
--data-raw '{
    "currentPassword": "Test@123",
    "newPassword": "Test@1234"
}'
```

**Update Email**
```bash
curl --location --request PATCH 'ec2-51-20-135-182.eu-north-1.compute.amazonaws.com/api/v1/auth/update-email' \
--data-raw '{
    "email": "hazem@emaple.com"
}'
```

**Device Login**
```bash
curl --location 'ec2-51-20-135-182.eu-north-1.compute.amazonaws.com/api/v1/auth/device-login' \
--data '{
    "serialNumber": "7"
}'
```

**Logout**
```bash
curl --location 'ec2-51-20-135-182.eu-north-1.compute.amazonaws.com/api/v1/auth/logout'
```

This README provides an overview of the Mobser Backend Node.js Application, its deployment environment, technologies used, and available API endpoints. For detailed documentation and usage examples, refer to the Postman API documentation linked above.
