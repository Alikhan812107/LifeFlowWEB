# LifeFlow - Personal Productivity & Health Tracker

Simple web app for managing tasks, notes, and health tracking built with Express.js and MongoDB.

## Features

- Create and organize tasks with folders
- Mark tasks as complete/incomplete
- Create simple notes (title + description)
- Track sleep patterns (bedtime and wake time)
- Track nutrition (calories, water intake, healthy eating)
- Log daily activities
- View user profile with statistics
- Upload custom avatar image
- Full CRUD operations for all entities
- Interactive charts using Chart.js

## Quick Start

1. Install dependencies: `npm install`
2. Start MongoDB
3. Copy `.env.example` to `.env` and set your `MONGO_URI`
4. Run: `npm start` or `npm run dev` for development
5. Open: http://localhost:8080

## Pages

- **Development** (`/`) - Task management with folders and inline editing
- **Notes** (`/notes`) - Simple note-taking without status tracking
- **Health** (`/health`) - Track sleep, nutrition, and activities with charts
- **Profile** (`/profile`) - User info, statistics, and avatar upload

## Architecture

3-layer architecture pattern:

```
Controller -> Service -> Repository -> MongoDB
```

- **Controller**: HTTP request handling, form parsing, template rendering
- **Service**: Business logic layer (currently thin, delegates to repository)
- **Repository**: Database operations using MongoDB driver
- **Models**: Data structures

## API Endpoints

### Tasks
- `GET /` - Main page with tasks
- `POST /development/html` - Create task
- `POST /development/update` - Update task
- `GET /development/toggle?id=<id>` - Toggle task status
- `GET /development/delete?id=<id>` - Delete task

### Notes
- `GET /notes` - Notes page
- `POST /notes/html` - Create note
- `POST /notes/update` - Update note
- `GET /notes/delete?id=<id>` - Delete note

### Health
- `GET /health` - Health tracking page
- `POST /health/sleep` - Add sleep record
- `POST /health/nutrition` - Add nutrition record
- `POST /health/activity` - Add activity record

### Profile
- `GET /profile` - User profile page
- `POST /profile/avatar` - Upload avatar image (max 10MB)

## MongoDB Collections

- `tasks` - User tasks with folder organization
- `notes` - Simple notes
- `sleep` - Sleep tracking records
- `nutrition` - Nutrition tracking records
- `activity` - Activity logs
- `users` - User profiles with avatar (stored as base64)

## Tech Stack

- Node.js
- Express.js
- MongoDB (with official Node.js driver)
- EJS templates
- Chart.js for data visualization
- Pure CSS (no frameworks)

## Project Structure

```
.
├── src/
│   ├── server.js                # Entry point
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/             # HTTP controllers
│   ├── services/                # Business logic
│   ├── repositories/            # Database operations
│   ├── models/                  # Data structures
│   └── routes/                  # Route registration
└── templates/                   # EJS templates
```

## Environment Variables

```
MONGO_URI=mongodb://localhost:27017
PORT=8080
```
