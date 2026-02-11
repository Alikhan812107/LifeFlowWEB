const Sleep = require('../models/Sleep');
const Nutrition = require('../models/Nutrition');
const Activity = require('../models/Activity');

class HealthController {
  constructor(sleepService, nutritionService, activityService) {
    this.sleepService = sleepService;
    this.nutritionService = nutritionService;
    this.activityService = activityService;
  }

  viewHTML = async (req, res) => {
    try {
      res.sendFile('health.html', { root: './templates' });
    } catch (err) {
      console.error('Health page error:', err);
      res.status(500).send(err.message);
    }
  };

  getSleepData = async (req, res) => {
    try {
      const sleeps = await this.sleepService.getAll();
      res.json(sleeps || []);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  getNutritionData = async (req, res) => {
    try {
      const nutritions = await this.nutritionService.getAll();
      res.json(nutritions || []);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  getActivityData = async (req, res) => {
    try {
      const activities = await this.activityService.getAll();
      res.json(activities || []);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  createSleep = async (req, res) => {
    try {
      const sleep = new Sleep({
        woke_up: new Date(req.body.woke_up),
        slept: new Date(req.body.slept),
        user_id: 'user1',
        timestamp: new Date()
      });
      await this.sleepService.create(sleep);
      res.redirect('/health');
    } catch (err) {
      res.status(500).send(err.message);
    }
  };

  createNutrition = async (req, res) => {
    try {
      const nutrition = new Nutrition({
        calories: parseInt(req.body.calories),
        water: parseFloat(req.body.water),
        healthy: req.body.healthy === 'yes',
        user_id: 'user1',
        timestamp: new Date()
      });
      await this.nutritionService.create(nutrition);
      res.redirect('/health');
    } catch (err) {
      res.status(500).send(err.message);
    }
  };

  createActivity = async (req, res) => {
    try {
      const activity = new Activity({
        description: req.body.description,
        user_id: 'user1',
        timestamp: new Date()
      });
      await this.activityService.create(activity);
      res.redirect('/health');
    } catch (err) {
      res.status(500).send(err.message);
    }
  };
}

module.exports = HealthController;
