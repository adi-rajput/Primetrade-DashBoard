# PrimeTrade Dashboard API Documentation

## Base URL
`http://localhost:5000/api`

## Authentication

### Register User
- **URL**: `/auth/register`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response**: `201 Created`
  ```json
  {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "token": "..."
  }
  ```

### Login User
- **URL**: `/auth/login`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response**: `200 OK` (Same object as Register)

### Get Current User
- **URL**: `/auth/me`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `200 OK` - User object

---

## Tasks (Dashboard Entity)

### Get All Tasks
- **URL**: `/tasks`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `200 OK` - Array of tasks

### Create Task
- **URL**: `/tasks`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "title": "Analyze Bitcoin Trends",
    "description": "Review the last 24h volume and price action."
  }
  ```
- **Response**: `200 OK` - Created task object

### Update Task
- **URL**: `/tasks/:id`
- **Method**: `PUT`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "status": "completed"
  }
  ```
- **Response**: `200 OK` - Updated task object

### Delete Task
- **URL**: `/tasks/:id`
- **Method**: `DELETE`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `200 OK`
  ```json
  {
    "id": "..."
  }
  ```

## Setup Instructions

1. **Backend**:
   - Navigate to `backend` folder.
   - Run `npm install`.
   - Ensure MongoDB is running locally or update `MONGO_URI` in `.env`.
   - Run `npm run dev`.

2. **Frontend**:
   - Navigate to `frontend` folder.
   - Run `npm install`.
   - Run `npm run dev`.
   - Open `http://localhost:3000`.
