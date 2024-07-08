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

#### POST /auth/signup
- **Description:** Signup for a new account.
- **Body:**
  - `phoneNumber`: User's phone number.
  - `password`: User's password.
  - `userType`: Type of user (e.g., 'user', 'relative').
- **Responses:** Various response codes and messages based on input validity and success.

#### POST /auth/login
- **Description:** Login to an existing account.
- **Body:**
  - `email`: User's email address.
  - `password`: User's password.
  - `fcmToken` (optional): Firebase Cloud Messaging token.
- **Responses:** Responses based on token validity and user status.

#### GET /auth/verify-email/{token}
- **Description:** Verify user's email (server-side).

#### POST /auth/forgot-password
- **Description:** Initiate password reset process.
- **Body:** `email`: User's email address.
- **Responses:** Responses based on email existence and success.

#### PATCH /auth/update-password
- **Description:** Update user's password.
- **Authorization:** Bearer Token required.
- **Body:**
  - `currentPassword`: User's current password.
  - `newPassword`: User's new password.
- **Responses:** Responses based on password update success or failure.

#### PATCH /auth/update-email
- **Description:** Update user's email.
- **Authorization:** Bearer Token required.
- **Body:** `newEmail`: User's new email address.
- **Responses:** Responses based on email update success or failure.

### Chat

#### GET /chats/get-messages/{userId}
- **Description:** Retrieve messages between current user and specified user.
- **Authorization:** Bearer Token required.
- **Query Params:** Pagination parameters (`page`, `limit`).

#### POST /chats/upload-image
- **Description:** Upload an image in chat.
- **Authorization:** Bearer Token required.

#### POST /chats/upload-audio
- **Description:** Upload an audio file in chat.
- **Authorization:** Bearer Token required.

#### POST /chats/send-message
- **Description:** Send a chat message.
- **Authorization:** Bearer Token required.
- **Body:**
  - `to`: Recipient user ID.
  - `message`: Content of the message.
  - `messageType`: Type of message (e.g., text, image, audio).

### Users

#### GET /users/me
- **Description:** Retrieve current user information (excluding relatives).
- **Authorization:** Bearer Token required.

#### PATCH /users/me
- **Description:** Update current user information.
- **Authorization:** Bearer Token required.
- **Body:** Fields to update, such as `name`, `phoneNumber`, `gender`, etc.

#### DELETE /users/me
- **Description:** Delete current user account.
- **Authorization:** Bearer Token required.

#### PATCH /users/add-relative
- **Description:** Add a relative to current user.
- **Authorization:** Bearer Token required.
- **Body:** `relatives`: Array of usernames.

#### GET /users/relatives
- **Description:** Retrieve relatives of current user.
- **Authorization:** Bearer Token required.

#### GET /users/check-user/{username}
- **Description:** Check if a username exists.
- **Authorization:** None required.

### Notifications

#### POST /notifications/request-tracking
- **Description:** Send a request tracking notification.
- **Authorization:** Bearer Token required.

#### POST /notifications/accept-tracking
- **Description:** Accept a tracking notification.
- **Authorization:** Bearer Token required.

### Personal Assistant

#### POST /assistant/send-prompt
- **Description:** Send a prompt to the personal assistant.
- **Authorization:** Bearer Token required.
- **Body:**
  - `message`: Content of the prompt.

### Face Recognition

#### POST /face-recognition/upload-images
- **Description:** Upload images for face recognition.
- **Authorization:** Bearer Token required.
- **Body:** Form-data with fields:
  - `files`: List of image files.
  - `name`: Name associated with the images.


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
