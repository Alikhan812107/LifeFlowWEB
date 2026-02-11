const Task = require('../models/Task');
const path = require('path');

class TaskController {
  constructor(taskService) {
    this.taskService = taskService;
  }

  create = async (req, res) => {
    try {
      const task = new Task(req.body);
      const result = await this.taskService.create(task);
      res.json(result);
    } catch (err) {
      res.status(500).send(err.message);
    }
  };

  getAll = async (req, res) => {
    try {
      const tasks = await this.taskService.getAll();
      res.json(tasks);
    } catch (err) {
      res.status(500).send(err.message);
    }
  };

  getById = async (req, res) => {
    try {
      const task = await this.taskService.getById(req.query.id);
      if (!task) {
        return res.status(404).send('not found');
      }
      res.json(task);
    } catch (err) {
      res.status(500).send(err.message);
    }
  };

  update = async (req, res) => {
    try {
      const task = new Task(req.body);
      const result = await this.taskService.update(req.query.id, task);
      res.json(result);
    } catch (err) {
      res.status(500).send(err.message);
    }
  };

  delete = async (req, res) => {
    try {
      await this.taskService.delete(req.query.id);
      res.status(204).send();
    } catch (err) {
      res.status(500).send(err.message);
    }
  };

  viewHTML = async (req, res) => {
    try {
      const tasks = await this.taskService.getAll();
      const folders = {};
      
      tasks.forEach(task => {
        const folder = task.folder || 'General';
        if (!folders[folder]) {
          folders[folder] = [];
        }
        folders[folder].push(task);
      });

      res.render('development', { tasks, folders });
    } catch (err) {
      res.status(500).send(err.message);
    }
  };

  createFromHTML = async (req, res) => {
    try {
      const task = new Task({
        title: req.body.title,
        body: req.body.body,
        folder: req.body.folder || 'General',
        done: false,
        user_id: 'user1'
      });
      await this.taskService.create(task);
      res.redirect('/');
    } catch (err) {
      res.status(500).send(err.message);
    }
  };

  updateFromHTML = async (req, res) => {
    try {
      const task = new Task({
        title: req.body.title,
        body: req.body.body,
        folder: req.body.folder || 'General',
        done: req.body.done === 'on',
        user_id: 'user1'
      });
      await this.taskService.update(req.body.id, task);
      res.redirect('/');
    } catch (err) {
      res.status(500).send(err.message);
    }
  };

  toggleTask = async (req, res) => {
    try {
      const task = await this.taskService.getById(req.query.id);
      if (!task) {
        return res.status(404).send('not found');
      }
      task.done = !task.done;
      await this.taskService.update(req.query.id, task);
      res.redirect('/');
    } catch (err) {
      res.status(500).send(err.message);
    }
  };

  deleteFromHTML = async (req, res) => {
    try {
      await this.taskService.delete(req.query.id);
      res.redirect('/');
    } catch (err) {
      res.status(500).send(err.message);
    }
  };
}

module.exports = TaskController;
