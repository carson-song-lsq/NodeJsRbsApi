# Node.js API with JWT Authentication and Role-Based Access Control

This project implements a Node.js backend API with JWT token-based authentication, role-based access control, and CRUD operations for users, roles, claims, and test objects. It leverages Swagger UI for API documentation and supports admin-only access for managing users, roles, and claims. Additionally, regular users can manage test objects.

## Table of Contents
1. [Overview](#overview)
2. [Features](#features)
3. [Installation](#installation)
4. [Environment Variables](#environment-variables)
5. [API Endpoints](#api-endpoints)
6. [Swagger API Documentation](#swagger-api-documentation)
7. [Testing the API](#testing-the-api)
8. [License](#license)

## Overview

This Node.js API supports the following core functionality:
- **JWT-based Authentication**: Secure authentication using JSON Web Tokens.
- **Role-based Authorization**: Admins can perform CRUD operations on users, roles, and claims, while regular users can manage test objects.
- **CRUD Operations**: Endpoints to create, read, update, and delete users, roles, claims, and test objects.
- **Swagger Documentation**: Interactive API docs that allow testing and understanding of available endpoints.
- **Input Validation**: Ensures proper data format using utility functions for validation.
- **Error Handling**: Returns proper HTTP status codes for various errors (e.g., 400, 401, 403, 500).

## Features

- **Admin Access**: Only users with the `Admin` role can perform operations on users, roles, and claims.
- **User Access**: Regular users can interact with `TestObjects` but cannot modify roles or claims.
- **Swagger Documentation**: Interactive API docs that allow testing and understanding of available endpoints.
- **Input Validation**: Ensures proper data format using utility functions for validation.
- **Error Handling**: Returns proper HTTP status codes for various errors (e.g., 400, 401, 403, 500).

## Installation

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Steps to Install

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/node-jwt-auth-api.git
   cd node-jwt-auth-api
   ```

2. Install the dependencies:
    ```
    npm install
    ```
3. Set up environment variables in your .env file like local bash or zsh profile file:
    
    Generate Jwt secret key by running command:
    ```
    openssl rand -base64 32
    ```

    Copy the egenerated jwt secret key below:
    ```
    # Node.js environment variables
    export JWT_SECRET="<REPLACE_THIS_EXAMPLE_amtLuMek8iZxxHtO01iwB4W9/34O2HKmLim4qQVAzmw=>"
    export NODE_ENV="development"
    export PORT=3000
    ```

4. Start the server:
    ```
    npm run start
    ```
    The API will now be running on http://localhost:3000 by default, and ready to be called by clients and consumers.

5. Open Swagger API to test: http://localhost:3000/api-docs/#/


## User Scenarios Demo through SWAGGER API 

### User Login
1. Open swagger ui page from your browser: http://localhost:3000/api-docs/#/ 
2. Expand Authentication, POST /auth/login, click "Try it out"
3. Replace RequestBody with following JSON data:
    ```json
    {
    "username": "user2",
    "password": "password123"
    } 
4. Click "Execute" button
5. It should return 200 response body like this
    ```json
    {
        "message": "Login successful",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJ1c2VyMiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzMyODE1MzYzLCJleHAiOjE3MzI4MTg5NjN9.HuHbdtfVm4ZEffbF-P1lwfJOAd6pIUGvtynwP1mUNYM"
    }
6. Copy the value of "token" from the response body
7. Click "Authorize" button on top right corner of this swagger ui page
8. In the prompt window asking "BearerAuth" value, you can paste the token value to it, then click "Authorize" button to get authorized, then close the prompt window.
9. Then, you can access other APIs with this authorized JWT token, for example, TestObjects APIs at the bottom.
10. (Please keep in mind, User/Role/Claim APIs can only be accessed by admin roles. )

## TestObjects CRUD operations
With authorized bearertoken from user2 above, let's have some test calls on TestObjects.
### Get all TestObjects

1. Scroll to the bottom and expand TestObjects, GET /testobjects
2. Click "Try it Out" button
3. Click "Execute" button
4. The response body should be 200 sucess, response body should have all pre-defined data in the memory: 
    ```json
    [
        {
            "id": 1,
            "name": "TestObject 1",
            "description": "First test object"
        },
        {
            "id": 2,
            "name": "TestObject 2",
            "description": "Second test object"
        }
     ]

### Create a new TestObject
1. Scroll to the bottom and expand TestObjects, POST /testobjects
2. Click "Try it Out" button
3. Paste json data into the request body, then click "Execute" button
    ```json
    {
        "name": "test3",
        "description": "test3 desc"
    }
4. The response body should be 201 sucess, response body should have a new id: 3 if it's the first call after server reboot. (because all data saved in memory)
    ```json
    {
        "id": 3,
        "name": "test3",
        "description": "test3 desc"
    }
5. To verify, if you try Get All Testobjects again, it should return json like this: 
    ```json
    [
        {
            "id": 1,
            "name": "TestObject 1",
            "description": "First test object"
        },
        {
            "id": 2,
            "name": "TestObject 2",
            "description": "Second test object"
        },
        {
            "id": 3,
            "name": "test3",
            "description": "test3 desc"
        }
    ]

### Delete a TestObject
1. Scroll to the bottom and expand TestObjects, DELETE /testobjects/{id}
2. Click "Try it Out" button
3. set parameter Id with 3, then click "Execute" button
4. The response body could be 403 if you're using the user2 as regular user jwt token:
    ```json
    {
        "message": "You do not have permission to access this resource."
    }
5. You need to login with admin role then.  Follow <User Login> section with admin credentials and setup the admin jwttoken as the BearerAuth token by clicking top right "Authorize" button. (Logout and re-authorize in the prompt window)
    ```json
    {
    "username": "admin",
    "password": "admin123"
    } 
6. With the new admin jwt token, try the Delete button again.  it should have response 200
    ```json
    {
        "message": "TestObject with ID 3 has been deleted"
    }
7. To verify, if you try Get All Testobjects again, it should return json like this: 
    ```json
    [
        {
            "id": 1,
            "name": "TestObject 1",
            "description": "First test object"
        },
        {
            "id": 2,
            "name": "TestObject 2",
            "description": "Second test object"
        }
    ]

## To-dos
1. TestObject is an example, you can rename it with the real model name. or clone it for other models.
2. You can hook up Users, Roles, Claims, and TestObjects with your own Database (SQL, No-SQL, or Distributed Cache) 