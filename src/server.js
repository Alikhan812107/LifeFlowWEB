require('dotenv').config();
const express = require('express');
const path = require('path');
const { connectDB, getDB } = require('./config/database');

const TaskRepository = require('./repositories/TaskRepository');
const NoteRepository = require('./repositories/NoteRepository');
const SleepRepository = require('./repositories/SleepRepository');
const NutritionRepository = require('./repositories/NutritionRepository');
const ActivityRepository = require('./repositories/ActivityRepository');
const UserRepository = require('./repositories/UserRepository');

const TaskService = require('./services/TaskService');
const NoteService = require('./services/NoteService');
const SleepService = require('./services/SleepService');
const NutritionService = require('./services/NutritionService');
const ActivityService = require('./services/ActivityService');
const UserService = require('./services/UserService');

const TaskController = require('./controllers/taskController');
const NoteController = require('./controllers/noteController');
const HealthController = require('./controllers/healthController');
const UserController = require('./controllers/userController');

const setupRoutes = require('./routes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../templates'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../templates')));

async function start() {
  try {
    await connectDB();
    const db = getDB();

    const taskRepo = new TaskRepository(db.collection('tasks'));
    const taskService = new TaskService(taskRepo);
    const taskController = new TaskController(taskService);

    const noteRepo = new NoteRepository(db.collection('notes'));
    const noteService = new NoteService(noteRepo);
    const noteController = new NoteController(noteService);

    const sleepRepo = new SleepRepository(db.collection('sleep'));
    const sleepService = new SleepService(sleepRepo);

    const nutritionRepo = new NutritionRepository(db.collection('nutrition'));
    const nutritionService = new NutritionService(nutritionRepo);

    const activityRepo = new ActivityRepository(db.collection('activity'));
    const activityService = new ActivityService(activityRepo);

    const healthController = new HealthController(sleepService, nutritionService, activityService);

    const userRepo = new UserRepository(db.collection('users'));
    const userService = new UserService(userRepo);
    const userController = new UserController(taskService, noteService, userService);

    setupRoutes(app, taskController, noteController, healthController, userController);

    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`server starting on :${PORT}`);
    });
  } catch (err) {
    console.error('failed to start:', err);
    process.exit(1);
  }
}

start();
