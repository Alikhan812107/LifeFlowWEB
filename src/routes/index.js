const express = require('express');
const multer = require('multer');
const authMiddleware = require('../middleware/authMiddleware');
const validate = require('../middleware/validationMiddleware');
const checkRole = require('../middleware/rbacMiddleware');

const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }
});

function setupRoutes(
  app,
  taskController,
  noteController,
  healthController,
  userController,
  authController,
  adminController
) {
  app.post('/api/auth/register', validate('register'), authController.register);
  app.post('/api/auth/login', validate('login'), authController.login);
  app.post('/api/auth/logout', authController.logout);

  app.get('/api/users/profile', authMiddleware, userController.getProfile);
  app.put('/api/users/profile', authMiddleware, userController.updateProfile);

  app.post('/api/tasks', authMiddleware, validate('task'), taskController.create);
  app.get('/api/tasks', authMiddleware, taskController.getAll);
  app.get('/api/tasks/:id', authMiddleware, taskController.getById);
  app.put('/api/tasks/:id', authMiddleware, validate('task'), taskController.update);
  app.delete('/api/tasks/:id', authMiddleware, taskController.delete);

  app.post('/api/notes', authMiddleware, validate('note'), noteController.create);
  app.get('/api/notes', authMiddleware, noteController.getAll);
  app.get('/api/notes/:id', authMiddleware, noteController.getById);
  app.put('/api/notes/:id', authMiddleware, validate('note'), noteController.update);
  app.delete('/api/notes/:id', authMiddleware, noteController.delete);

  app.get('/api/admin/users', authMiddleware, checkRole('admin'), adminController.getAllUsers);
  app.put('/api/admin/users/role', authMiddleware, checkRole('admin'), adminController.updateUserRole);
  app.delete('/api/admin/tasks', authMiddleware, checkRole('admin'), adminController.deleteAnyTask);
  app.delete('/api/admin/notes', authMiddleware, checkRole('admin'), adminController.deleteAnyNote);

  app.get('/tasks', authMiddleware, taskController.getAll);
  app.post('/tasks', authMiddleware, validate('task'), taskController.create);
  app.get('/tasks/item', authMiddleware, taskController.getById);
  app.put('/tasks/item', authMiddleware, validate('task'), taskController.update);
  app.delete('/tasks/item', authMiddleware, taskController.delete);

  app.get('/', authMiddleware, taskController.viewHTML);
  app.post('/development/html', authMiddleware, validate('task'), taskController.createFromHTML);
  app.get('/development/toggle', authMiddleware, taskController.toggleTask);
  app.get('/development/delete', authMiddleware, taskController.deleteFromHTML);
  app.post('/development/update', authMiddleware, validate('task'), taskController.updateFromHTML);

  app.get('/notes', authMiddleware, noteController.viewHTML);
  app.post('/notes/html', authMiddleware, validate('note'), noteController.createFromHTML);
  app.post('/notes/update', authMiddleware, validate('note'), noteController.updateFromHTML);
  app.get('/notes/delete', authMiddleware, noteController.deleteFromHTML);

  app.get('/health', authMiddleware, healthController.viewHTML);
  app.get('/api/health/sleep', authMiddleware, healthController.getSleepData);
  app.get('/api/health/nutrition', authMiddleware, healthController.getNutritionData);
  app.get('/api/health/activity', authMiddleware, healthController.getActivityData);
  app.post('/health/sleep', authMiddleware, validate('sleep'), healthController.createSleep);
  app.post('/health/nutrition', authMiddleware, validate('nutrition'), healthController.createNutrition);
  app.post('/health/activity', authMiddleware, validate('activity'), healthController.createActivity);

  app.get('/profile', authMiddleware, userController.viewProfile);
  app.post('/profile/avatar', authMiddleware, upload.single('avatar'), userController.uploadAvatar);
}

module.exports = setupRoutes;
