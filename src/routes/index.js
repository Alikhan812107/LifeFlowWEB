const express = require('express');
const multer = require('multer');

const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }
});

function setupRoutes(app, taskController, noteController, healthController, userController) {
  app.get('/tasks', taskController.getAll);
  app.post('/tasks', taskController.create);
  app.get('/tasks/item', taskController.getById);
  app.put('/tasks/item', taskController.update);
  app.delete('/tasks/item', taskController.delete);

  app.get('/', taskController.viewHTML);
  app.post('/development/html', taskController.createFromHTML);
  app.get('/development/toggle', taskController.toggleTask);
  app.get('/development/delete', taskController.deleteFromHTML);
  app.post('/development/update', taskController.updateFromHTML);

  app.get('/notes', noteController.viewHTML);
  app.post('/notes/html', noteController.createFromHTML);
  app.post('/notes/update', noteController.updateFromHTML);
  app.get('/notes/delete', noteController.deleteFromHTML);

  app.get('/health', healthController.viewHTML);
  app.get('/api/health/sleep', healthController.getSleepData);
  app.get('/api/health/nutrition', healthController.getNutritionData);
  app.get('/api/health/activity', healthController.getActivityData);
  app.post('/health/sleep', healthController.createSleep);
  app.post('/health/nutrition', healthController.createNutrition);
  app.post('/health/activity', healthController.createActivity);

  app.get('/profile', userController.viewProfile);
  app.post('/profile/avatar', upload.single('avatar'), userController.uploadAvatar);
}

module.exports = setupRoutes;
