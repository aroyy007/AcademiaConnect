# AcademiaConnect API Documentation

## Base URL
```
http://localhost:<PORT>/api
```

## Authentication

### Register User
- **URL**: `/auth/register`
- **Method**: `POST`
- **Description**: Registers a new user.
- **Request Body**:
  ```json
  {
    "email": "user@eastdelta.edu.bd",
    "name": "John Doe",
    "password": "password123",
    "department": "CSE",
    "semester": 3,
    "section": "A"
  }
  ```
- **Response**:
  - **Success**:
    - **Status**: `201 Created`
    - **Body**:
      ```json
      {
        "success": true,
        "token": "JWT_TOKEN",
        "data": {
          "email": "user@eastdelta.edu.bd",
          "name": "John Doe",
          "department": "CSE",
          "semester": 3,
          "section": "A"
        }
      }
      ```
  - **Error**:
    - **Status**: `400 Bad Request`
    - **Body**:
      ```json
      {
        "success": false,
        "message": "Email already used"
      }
      ```

### Login User
- **URL**: `/auth/login`
- **Method**: `POST`
- **Description**: Logs in an existing user.
- **Request Body**:
  ```json
  {
    "email": "user@eastdelta.edu.bd",
    "password": "password123"
  }
  ```
- **Response**:
  - **Success**:
    - **Status**: `200 OK`
    - **Body**:
      ```json
      {
        "success": true,
        "token": "JWT_TOKEN"
      }
      ```
  - **Error**:
    - **Status**: `401 Unauthorized`
    - **Body**:
      ```json
      {
        "success": false,
        "message": "Invalid credentials"
      }
      ```

## Posts

### Create Post
- **URL**: `/posts`
- **Method**: `POST`
- **Description**: Creates a new post.
- **Request Body**:
  ```json
  {
    "title": "Post Title",
    "content": "Post content",
    "images": ["http://example.com/image1.jpg", "http://example.com/image2.jpg"]
  }
  ```
- **Response**:
  - **Success**:
    - **Status**: `201 Created`
    - **Body**:
      ```json
      {
        "success": true,
        "data": {
          "id": "POST_ID",
          "title": "Post Title",
          "content": "Post content",
          "images": ["http://example.com/image1.jpg", "http://example.com/image2.jpg"]
        }
      }
      ```
  - **Error**:
    - **Status**: `400 Bad Request`
    - **Body**:
      ```json
      {
        "success": false,
        "message": "Validation error message"
      }
      ```

### Get All Posts
- **URL**: `/posts`
- **Method**: `GET`
- **Description**: Retrieves all posts.
- **Response**:
  - **Success**:
    - **Status**: `200 OK`
    - **Body**:
      ```json
      {
        "success": true,
        "data": [
          {
            "id": "POST_ID",
            "title": "Post Title",
            "content": "Post content",
            "images": ["http://example.com/image1.jpg", "http://example.com/image2.jpg"]
          }
        ]
      }
      ```

## Users

### Search User
- **URL**: `/users/search-user/:name`
- **Method**: `GET`
- **Description**: Searches for users by name.

### Get Pending Users
- **URL**: `/users/get-pending-users`
- **Method**: `GET`
- **Description**: Retrieves all pending users.

### Approve User
- **URL**: `/users/approve-user`
- **Method**: `POST`
- **Description**: Approves a pending user.

### Reject User
- **URL**: `/users/reject-user`
- **Method**: `POST`
- **Description**: Rejects a pending user.

## Error Handling
- **400 Bad Request**: Validation errors or missing required fields.
- **401 Unauthorized**: Invalid credentials or missing authentication token.
- **403 Forbidden**: Insufficient permissions to perform the action.
- **404 Not Found**: Resource not found.
- **500 Internal Server Error**: Server encountered an error.

## Security
- **JWT Authentication**: All protected routes require a valid JWT token.
- **Rate Limiting**: Limits the number of requests to prevent abuse.
- **Input Validation**: Ensures data integrity and security.

## Environment Variables
- **MONGO_URI**: MongoDB connection string.
- **PORT**: Port number for the backend server.
- **JWT_SECRET**: Secret key for signing JWT tokens.
- **CLIENT_URL**: URL of the frontend client.

## Installation and Setup
Refer to the [README.md](/README.md) file for detailed installation and setup instructions.

## Conclusion
This documentation provides an overview of the API endpoints available in the `AcademiaConnect` project. For more details, refer to the source code and comments within the project files.
