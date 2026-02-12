const Joi = require('joi');

const schemas = {
  register: Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  }),

  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }),

  task: Joi.object({
    title: Joi.string().min(1).max(200).required(),
    description: Joi.string().max(1000).allow(''),
    done: Joi.boolean()
  }),

  note: Joi.object({
    title: Joi.string().min(1).max(200).required(),
    content: Joi.string().max(5000).allow('')
  }),

  sleep: Joi.object({
    woke_up: Joi.date().required(),
    slept: Joi.date().required()
  }),

  nutrition: Joi.object({
    calories: Joi.number().min(0).max(10000).required(),
    water: Joi.number().min(0).max(20).required(),
    healthy: Joi.string().valid('yes', 'no').required()
  }),

  activity: Joi.object({
    description: Joi.string().min(1).max(500).required()
  })
};

const validate = (schemaName) => {
  return (req, res, next) => {
    const schema = schemas[schemaName];
    if (!schema) {
      return next();
    }

    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path[0],
        message: detail.message
      }));
      return res.status(400).json({ 
        message: errors[0].message,
        errors: errors
      });
    }
    next();
  };
};

module.exports = validate;
