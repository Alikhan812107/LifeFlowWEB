# API Endpoints Documentation

## 1. Authentication (Public Endpoints)

### Register
```
POST /api/auth/register
Content-Type: application/json

Body:
{
  "username": "john",
  "email": "john@example.com",
  "password": "123456"
}

Response: 201
{
  "message": "User registered successfully",
  "userId": "698d5e54cc071bbb6e849a2e"
}
```

### Login
```
POST /api/auth/login
Content-Type: application/json

Body:
{
  "email": "john@example.com",
  "password": "123456"
}

Response: 200
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Logout
```
POST /api/auth/logout

Response: 200
{
  "message": "Logged out successfully"
}
```

---

## 2. User Management (Private Endpoints)

### Get User Profile
```
GET /api/users/profile
Headers: Authorization: Bearer <token>

Response: 200
{
  "_id": "698d5e54cc071bbb6e849a2e",
  "username": "john",
  "email": "john@example.com",
  "role": "user"
}
```

### Update User Profile
```
PUT /api/users/profile
Headers: Authorization: Bearer <token>
Content-Type: application/json

Body:
{
  "username": "john_updated",
  "email": "john_new@example.com"
}

Response: 200
{
  "message": "Profile updated successfully"
}
```

---

## 3. Tasks Management (Private Endpoints)

### Create Task
```
POST /api/tasks
Headers: Authorization: Bearer <token>
Content-Type: application/json

Body:
{
  "title": "Complete project",
  "body": "Finish the web development project",
  "folder": "Work",
  "done": false
}

Response: 200
{
  "_id": "698d5e54cc071bbb6e849a2e",
  "title": "Complete project",
  "body": "Finish the web development project",
  "folder": "Work",
  "done": false,
  "user_id": "698d5e54cc071bbb6e849a2e"
}
```

### Get All Tasks
```
GET /api/tasks
Headers: Authorization: Bearer <token>

Response: 200
[
  {
    "_id": "698d5e54cc071bbb6e849a2e",
    "title": "Complete project",
    "body": "Finish the web development project",
    "folder": "Work",
    "done": false,
    "user_id": "698d5e54cc071bbb6e849a2e"
  }
]
```

### Get Task by ID
```
GET /api/tasks/:id
Headers: Authorization: Bearer <token>

Response: 200
{
  "_id": "698d5e54cc071bbb6e849a2e",
  "title": "Complete project",
  "body": "Finish the web development project",
  "folder": "Work",
  "done": false,
  "user_id": "698d5e54cc071bbb6e849a2e"
}

Response: 404
{
  "message": "Task not found"
}
```

### Update Task
```
PUT /api/tasks/:id
Headers: Authorization: Bearer <token>
Content-Type: application/json

Body:
{
  "title": "Complete project - Updated",
  "body": "Finish the web development project by Friday",
  "folder": "Work",
  "done": true
}

Response: 200
{
  "_id": "698d5e54cc071bbb6e849a2e",
  "title": "Complete project - Updated",
  "body": "Finish the web development project by Friday",
  "folder": "Work",
  "done": true,
  "user_id": "698d5e54cc071bbb6e849a2e"
}
```

### Delete Task
```
DELETE /api/tasks/:id
Headers: Authorization: Bearer <token>

Response: 204 No Content
```

---

## 4. Notes Management (Private Endpoints)

### Create Note
```
POST /api/notes
Headers: Authorization: Bearer <token>
Content-Type: application/json

Body:
{
  "title": "Meeting Notes",
  "description": "Discussed project timeline and deliverables"
}

Response: 200
{
  "_id": "698d5e54cc071bbb6e849a2e",
  "title": "Meeting Notes",
  "description": "Discussed project timeline and deliverables",
  "user_id": "698d5e54cc071bbb6e849a2e"
}
```

### Get All Notes
```
GET /api/notes
Headers: Authorization: Bearer <token>

Response: 200
[
  {
    "_id": "698d5e54cc071bbb6e849a2e",
    "title": "Meeting Notes",
    "description": "Discussed project timeline and deliverables",
    "user_id": "698d5e54cc071bbb6e849a2e"
  }
]
```

### Get Note by ID
```
GET /api/notes/:id
Headers: Authorization: Bearer <token>

Response: 200
{
  "_id": "698d5e54cc071bbb6e849a2e",
  "title": "Meeting Notes",
  "description": "Discussed project timeline and deliverables",
  "user_id": "698d5e54cc071bbb6e849a2e"
}

Response: 404
{
  "message": "Note not found"
}
```

### Update Note
```
PUT /api/notes/:id
Headers: Authorization: Bearer <token>
Content-Type: application/json

Body:
{
  "title": "Meeting Notes - Updated",
  "description": "Discussed project timeline, deliverables, and budget"
}

Response: 200
{
  "_id": "698d5e54cc071bbb6e849a2e",
  "title": "Meeting Notes - Updated",
  "description": "Discussed project timeline, deliverables, and budget",
  "user_id": "698d5e54cc071bbb6e849a2e"
}
```

### Delete Note
```
DELETE /api/notes/:id
Headers: Authorization: Bearer <token>

Response: 204 No Content
```

---

## 5. Health Tracking (Private Endpoints)

### Get Sleep Data
```
GET /api/health/sleep
Headers: Authorization: Bearer <token>

Response: 200
[
  {
    "_id": "698d5e54cc071bbb6e849a2e",
    "woke_up": "2024-01-15T08:00:00.000Z",
    "slept": "2024-01-14T23:00:00.000Z",
    "user_id": "698d5e54cc071bbb6e849a2e",
    "timestamp": "2024-01-15T08:00:00.000Z"
  }
]
```

### Get Nutrition Data
```
GET /api/health/nutrition
Headers: Authorization: Bearer <token>

Response: 200
[
  {
    "_id": "698d5e54cc071bbb6e849a2e",
    "calories": 2000,
    "water": 2.5,
    "healthy": true,
    "user_id": "698d5e54cc071bbb6e849a2e",
    "timestamp": "2024-01-15T12:00:00.000Z"
  }
]
```

### Get Activity Data
```
GET /api/health/activity
Headers: Authorization: Bearer <token>

Response: 200
[
  {
    "_id": "698d5e54cc071bbb6e849a2e",
    "description": "Morning run 5km",
    "user_id": "698d5e54cc071bbb6e849a2e",
    "timestamp": "2024-01-15T07:00:00.000Z"
  }
]
```

---

## 6. Admin Endpoints (Admin Role Required)

### Get All Users
```
GET /api/admin/users
Headers: Authorization: Bearer <admin-token>

Response: 200
[
  {
    "_id": "698d5e54cc071bbb6e849a2e",
    "username": "john",
    "email": "john@example.com",
    "role": "user",
    "hasAvatar": true,
    "avatarPreview": "/9j/4AAQSkZJRgABAQEASABIAAD/4gHYSUNDX1BST0ZJT..."
  }
]
```

### Update User Role
```
PUT /api/admin/users/role
Headers: Authorization: Bearer <admin-token>
Content-Type: application/json

Body:
{
  "userId": "698d5e54cc071bbb6e849a2e",
  "role": "premium"
}

Valid roles: "user", "premium", "moderator", "admin"

Response: 200
{
  "message": "Role updated successfully"
}
```

### Delete Any Task (Admin)
```
DELETE /api/admin/tasks?id=698d5e54cc071bbb6e849a2e
Headers: Authorization: Bearer <admin-token>

Response: 204 No Content
```

### Delete Any Note (Admin)
```
DELETE /api/admin/notes?id=698d5e54cc071bbb6e849a2e
Headers: Authorization: Bearer <admin-token>

Response: 204 No Content
```

---

## Error Responses

### 400 Bad Request (Validation Error)
```json
{
  "message": "\"email\" must be a valid email",
  "errors": [
    {
      "field": "email",
      "message": "\"email\" must be a valid email"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "status": "error",
  "statusCode": 401,
  "message": "Unauthorized - Invalid token"
}
```

### 403 Forbidden
```json
{
  "status": "error",
  "statusCode": 403,
  "message": "Access denied - Required roles: admin"
}
```

### 404 Not Found
```json
{
  "status": "error",
  "statusCode": 404,
  "message": "Route not found"
}
```

### 500 Internal Server Error
```json
{
  "status": "error",
  "statusCode": 500,
  "message": "Internal Server Error"
}
```

---

## Summary

✅ **Authentication (Public):**
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/logout

✅ **User Management (Private):**
- GET /api/users/profile
- PUT /api/users/profile

✅ **Tasks (Private):**
- POST /api/tasks
- GET /api/tasks
- GET /api/tasks/:id
- PUT /api/tasks/:id
- DELETE /api/tasks/:id

✅ **Notes (Private):**
- POST /api/notes
- GET /api/notes
- GET /api/notes/:id
- PUT /api/notes/:id
- DELETE /api/notes/:id

✅ **Health (Private):**
- GET /api/health/sleep
- GET /api/health/nutrition
- GET /api/health/activity

✅ **Admin (Admin Only):**
- GET /api/admin/users
- PUT /api/admin/users/role
- DELETE /api/admin/tasks
- DELETE /api/admin/notes
