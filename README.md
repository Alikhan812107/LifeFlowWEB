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
- 📧 Email notifications via AWS SES
- ✔️ Input validation with Joi
- 🛡️ Global error handling
- 🔒 Secure password hashing with bcrypt
- 🎯 RESTful API with proper HTTP methods

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
SMTP_HOST=email-smtp.eu-north-1.amazonaws.com
SMTP_PORT=587
SMTP_USER=your-aws-ses-smtp-user
SMTP_PASS=your-aws-ses-smtp-password
SENDER_EMAIL=noreply@yourdomain.com
SENDER_NAME=LifeFlow
PORT=8080
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
2. Create account (will receive welcome email)
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

## REST API Endpoints

### Authentication (Public)
```
POST /api/auth/register    - Register new user
POST /api/auth/login       - Login (returns JWT token)
POST /api/auth/logout      - Logout (clears cookie)
```

### User Management (Private)
```
GET  /api/users/profile    - Get logged-in user profile
PUT  /api/users/profile    - Update user profile (username, email)
```

### Tasks (Private)
```
POST   /api/tasks          - Create new task
GET    /api/tasks          - Get all user tasks
GET    /api/tasks/:id      - Get specific task by ID
PUT    /api/tasks/:id      - Update specific task
DELETE /api/tasks/:id      - Delete specific task
```

### Notes (Private)
```
POST   /api/notes          - Create new note
GET    /api/notes          - Get all user notes
GET    /api/notes/:id      - Get specific note by ID
PUT    /api/notes/:id      - Update specific note
DELETE /api/notes/:id      - Delete specific note
```

### Health Tracking (Private)
```
GET  /api/health/sleep          - Get sleep data
GET  /api/health/nutrition      - Get nutrition data
GET  /api/health/activity       - Get activity data
POST /health/sleep              - Add sleep record
POST /health/nutrition          - Add nutrition record
POST /health/activity           - Add activity record
```

### Admin (Admin Role Required)
```
GET    /api/admin/users         - List all users
PUT    /api/admin/users/role    - Update user role
DELETE /api/admin/tasks?id=...  - Delete any task
DELETE /api/admin/notes?id=...  - Delete any note
```

### Web Pages (Private)
```
GET  /                     - Task management page
GET  /notes                - Notes page
GET  /health               - Health tracking page
GET  /profile              - User profile page
POST /profile/avatar       - Upload avatar (max 10MB)
```

See [API_ENDPOINTS.md](API_ENDPOINTS.md) for detailed API documentation with examples.

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
│   │   ├── emailService.js          # Email notifications (AWS SES)
│   │   ├── TaskService.js           # Task business logic
│   │   ├── NoteService.js           # Note business logic
│   │   ├── UserService.js           # User business logic
│   │   └── ...Service.js            # Other services
│   ├── repositories/                # Database operations
│   │   ├── TaskRepository.js
│   │   ├── NoteRepository.js
│   │   ├── UserRepository.js
│   │   └── ...Repository.js
│   ├── models/                      # Data structures
│   │   ├── Task.js
│   │   ├── Note.js
│   │   ├── User.js
│   │   └── ...js
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
│   ├── profile.ejs                  # Profile page
│   └── style.css
├── .env                             # Environment variables
├── .gitignore
├── package.json
├── README.md
├── API_ENDPOINTS.md                 # Detailed API documentation
└── RBAC_GUIDE.md                    # RBAC usage guide
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

- ✅ Password hashing with bcryptjs (10 rounds)
- ✅ JWT tokens stored in httpOnly cookies
- ✅ Input validation with Joi schemas
- ✅ Role-based access control (RBAC)
- ✅ User data isolation (users only see their own data)
- ✅ Admin-only endpoints protected
- ✅ Proper error handling with status codes (400, 401, 403, 404, 500)
- ✅ SQL injection prevention (MongoDB parameterized queries)

## Email Notifications

Emails are sent via AWS SES (Simple Email Service) for:
- ✅ Welcome email on registration with onboarding instructions
- 📧 Password reset (ready to implement)
- 📧 Task notifications (ready to implement)

**Welcome Email includes:**
- Personalized greeting
- Platform introduction
- Next steps guide
- Professional HTML formatting

## Validation Rules

### Registration
- username: 3-30 characters (required)
- email: valid email format (required)
- password: minimum 6 characters (required)

### Tasks
- title: 1-200 characters (required)
- body: max 1000 characters (optional)
- folder: max 100 characters (optional)
- done: boolean or string ('on', 'off', 'true', 'false')

### Notes
- title: 1-200 characters (required)
- content: max 5000 characters (optional)

### Health
- sleep: woke_up and slept dates (required)
- nutrition: calories (0-10000), water (0-20L), healthy (yes/no)
- activity: description 1-500 characters (required)

## Error Codes

| Code | Description |
|------|-------------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 204 | No Content - Resource deleted successfully |
| 400 | Bad Request - Validation error |
| 401 | Unauthorized - Invalid/missing token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource doesn't exist |
| 500 | Internal Server Error |

## Testing the API

### Using cURL

**Register:**
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"john","email":"john@example.com","password":"123456"}'
```

**Login:**
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"123456"}'
```

**Get Profile:**
```bash
curl -X GET http://localhost:8080/api/users/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Create Task:**
```bash
curl -X POST http://localhost:8080/api/tasks \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"title":"My Task","body":"Description","folder":"Work","done":false}'
```

### Using Postman

1. Import the collection from `API_ENDPOINTS.md`
2. Set environment variable `token` after login
3. Use `{{token}}` in Authorization header

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (official driver)
- **Authentication**: JWT (jsonwebtoken), bcryptjs
- **Validation**: Joi
- **Email**: Nodemailer with AWS SES
- **Templates**: EJS, HTML
- **Charts**: Chart.js
- **Styling**: Pure CSS (no frameworks)
- **File Upload**: Multer (for avatars)

## Development

```bash
# Install dependencies
npm install

# Start development server (with auto-reload)
npm run dev

# Start production server
npm start
```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| MONGO_URI | MongoDB connection string | mongodb+srv://user:pass@cluster.mongodb.net/ |
| JWT_SECRET | Secret key for JWT signing | your-secret-key-123 |
| SMTP_HOST | SMTP server hostname | email-smtp.eu-north-1.amazonaws.com |
| SMTP_PORT | SMTP server port | 587 |
| SMTP_USER | SMTP username (AWS SES) | AKIAZILYC27T36AIXEZJ |
| SMTP_PASS | SMTP password (AWS SES) | your-smtp-password |
| SENDER_EMAIL | Email sender address | noreply@yourdomain.com |
| SENDER_NAME | Email sender name | LifeFlow |
| PORT | Server port (optional) | 8080 |

## AWS SES Setup

1. Create AWS account and verify your domain
2. Create SMTP credentials in AWS SES console
3. Add credentials to `.env` file
4. Verify sender email address in AWS SES
5. Request production access (if needed)

## Database Setup

1. Create MongoDB Atlas account (free tier available)
2. Create a new cluster
3. Create database user with read/write permissions
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get connection string and add to `.env`

## Deployment

### Heroku
```bash
heroku create your-app-name
heroku config:set MONGO_URI=your-mongo-uri
heroku config:set JWT_SECRET=your-secret
# ... set other env variables
git push heroku main
```

### Vercel
```bash
vercel
# Configure environment variables in Vercel dashboard
```

### Docker
```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD ["npm", "start"]
```

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License

MIT

## Support

For issues and questions:
- Check [API_ENDPOINTS.md](API_ENDPOINTS.md) for API documentation
- Check [RBAC_GUIDE.md](RBAC_GUIDE.md) for RBAC usage
- Open an issue on GitHub

## Roadmap

- [ ] Password reset functionality
- [ ] Email verification
- [ ] Two-factor authentication (2FA)
- [ ] Task reminders and notifications
- [ ] Export data to CSV/PDF
- [ ] Mobile responsive design improvements
- [ ] Dark mode
- [ ] Task sharing between users
- [ ] Calendar view for tasks
- [ ] Advanced analytics dashboard
