# LifeFlow - Personal Productivity & Health Tracker

Full-stack web application for managing tasks, notes, and health tracking with authentication, role-based access control, and email notifications.

## Features

### Core Features
- ✅ Task management with folders and status tracking
- ✅ Note-taking system
- ✅ Health tracking (sleep, nutrition, activities)
- ✅ User profiles with avatar upload
- ✅ Interactive charts using Chart.js

### Advanced Features
- 🔐 JWT Authentication with httpOnly cookies
- 👥 Role-Based Access Control (RBAC)
- 📧 Email notifications via Mailtrap
- ✔️ Input validation with Joi
- 🛡️ Global error handling
- 🔒 Secure password hashing with bcrypt

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Create `.env` file:
```env
MONGO_URI=mongodb+srv://your-connection-string
JWT_SECRET=your-secret-key-here
MAILTRAP_TOKEN=your-mailtrap-token
MAILTRAP_SENDER_EMAIL=hello@demomailtrap.com
MAILTRAP_SENDER_NAME=LifeFlow
```

### 3. Start Server
```bash
npm start
# or for development with auto-reload
npm run dev
```

### 4. Access Application
Open http://localhost:8080

### 5. Register First User
1. Go to http://localhost:8080/register.html
2. Create account (will receive welcome email in Mailtrap)
3. Login at http://localhost:8080/login.html

### 6. Make User Admin (Optional)
Open MongoDB and run:
```javascript
db.users.updateOne(
  { email: "your-email@gmail.com" },
  { $set: { role: "admin" } }
)
```

## User Roles

| Role | Permissions |
|------|-------------|
| **user** | Manage own tasks, notes, health data |
| **premium** | Same as user (can be extended) |
| **moderator** | Same as user (can be extended) |
| **admin** | Delete any tasks/notes, manage user roles |

## API Endpoints

### Authentication
```
POST /api/auth/register    - Register new user
POST /api/auth/login       - Login (returns JWT token)
POST /api/auth/logout      - Logout (clears cookie)
```

### Tasks
```
GET  /                          - Task management page
POST /development/html          - Create task
POST /development/update        - Update task
GET  /development/toggle?id=... - Toggle task status
GET  /development/delete?id=... - Delete task
```

### Notes
```
GET  /notes              - Notes page
POST /notes/html         - Create note
POST /notes/update       - Update note
GET  /notes/delete?id=... - Delete note
```

### Health
```
GET  /health                    - Health tracking page
GET  /api/health/sleep          - Get sleep data
GET  /api/health/nutrition      - Get nutrition data
GET  /api/health/activity       - Get activity data
POST /health/sleep              - Add sleep record
POST /health/nutrition          - Add nutrition record
POST /health/activity           - Add activity record
```

### Profile
```
GET  /profile           - User profile page
POST /profile/avatar    - Upload avatar (max 10MB)
```

### Admin (Requires admin role)
```
GET    /api/admin/users         - List all users
PUT    /api/admin/users/role    - Update user role
DELETE /api/admin/tasks?id=...  - Delete any task
DELETE /api/admin/notes?id=...  - Delete any note
```

## Architecture

3-layer architecture with middleware:

```
Request → Middleware → Controller → Service → Repository → MongoDB
          (auth, validation, RBAC)
```

### Layers
- **Middleware**: Authentication, validation, RBAC, error handling
- **Controller**: HTTP request/response handling
- **Service**: Business logic
- **Repository**: Database operations
- **Models**: Data structures

## Project Structure

```
.
├── src/
│   ├── server.js                    # Entry point
│   ├── config/
│   │   └── database.js              # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js        # Authentication
│   │   ├── adminController.js       # Admin operations
│   │   ├── taskController.js        # Task management
│   │   ├── noteController.js        # Note management
│   │   ├── healthController.js      # Health tracking
│   │   └── userController.js        # User profile
│   ├── services/
│   │   ├── emailService.js          # Email notifications
│   │   └── ...Service.js            # Business logic
│   ├── repositories/                # Database operations
│   ├── models/                      # Data structures
│   ├── middleware/
│   │   ├── authMiddleware.js        # JWT verification
│   │   ├── rbacMiddleware.js        # Role checking
│   │   ├── validationMiddleware.js  # Joi validation
│   │   └── errorHandler.js          # Global error handler
│   └── routes/
│       └── index.js                 # Route registration
├── templates/                       # EJS/HTML templates
│   ├── login.html
│   ├── register.html
│   ├── development.ejs              # Tasks page
│   ├── notes.ejs                    # Notes page
│   ├── health.html                  # Health page
│   └── profile.ejs                  # Profile page
├── .env                             # Environment variables
├── package.json
└── README.md
```

## MongoDB Collections

| Collection | Description |
|------------|-------------|
| `users` | User accounts (username, email, password, role, avatar) |
| `tasks` | User tasks with folders and status |
| `notes` | Simple notes with title and content |
| `sleep` | Sleep tracking records |
| `nutrition` | Nutrition tracking records |
| `activity` | Activity logs |

## Security Features

- ✅ Password hashing with bcryptjs
- ✅ JWT tokens stored in httpOnly cookies
- ✅ Input validation with Joi
- ✅ Role-based access control
- ✅ User data isolation (users only see their own data)
- ✅ Admin-only endpoints protected
- ✅ Proper error handling with status codes

## Email Notifications

Emails are sent via Mailtrap for:
- Welcome email on registration
- Password reset (if implemented)
- Task notifications (if implemented)

Check emails at: https://mailtrap.io/inboxes

## Testing RBAC

### 1. Create Regular User
```bash
POST /api/auth/register
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "123456"
}
```

### 2. Create Admin User
```bash
# Register user
POST /api/auth/register
{
  "username": "admin",
  "email": "admin@example.com",
  "password": "123456"
}

# Then in MongoDB:
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

### 3. Test Admin Endpoints
```bash
# Login as admin
POST /api/auth/login
{
  "email": "admin@example.com",
  "password": "123456"
}

# Use token to access admin endpoints
GET /api/admin/users
Headers: Authorization: Bearer <token>
```

## Validation Rules

### Registration
- username: 3-30 characters
- email: valid email format
- password: minimum 6 characters

### Tasks
- title: 1-200 characters (required)
- body: max 1000 characters
- folder: max 100 characters

### Notes
- title: 1-200 characters (required)
- content: max 5000 characters

### Health
- sleep: woke_up and slept dates required
- nutrition: calories (0-10000), water (0-20L)
- activity: description 1-500 characters

## Error Codes

| Code | Description |
|------|-------------|
| 400 | Bad Request (validation error) |
| 401 | Unauthorized (invalid/missing token) |
| 403 | Forbidden (insufficient permissions) |
| 404 | Not Found (resource doesn't exist) |
| 500 | Internal Server Error |

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (official driver)
- **Authentication**: JWT, bcryptjs
- **Validation**: Joi
- **Email**: Mailtrap (via mailtrap package)
- **Templates**: EJS, HTML
- **Charts**: Chart.js
- **Styling**: Pure CSS

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start
```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| MONGO_URI | MongoDB connection string | mongodb+srv://... |
| JWT_SECRET | Secret key for JWT | your-secret-key |
| MAILTRAP_TOKEN | Mailtrap API token | abc123... |
| MAILTRAP_SENDER_EMAIL | Sender email | hello@demomailtrap.com |
| MAILTRAP_SENDER_NAME | Sender name | LifeFlow |
| PORT | Server port (optional) | 8080 |

## License

MIT
