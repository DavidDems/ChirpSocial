const { body, validationResult } = require('express-validator');
const log = require('../config/logger');

exports.validateRegistration = [
  body('username')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 charectes long')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage(
      'User name can only contain letters, numbers, and underscores'
    ),

  body('email').isEmail().withMessage('Invalid email format'),

  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/[a-z]/)
    .withMessage('Password must contain at least one lowercase letter')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter')
    .matches(/\d/)
    .withMessage('Password must contain at least one number')
    .matches(/[@$!%*?&]/)
    .withMessage('Password must contain at least one special characters'),

  body('displayname').trim().notEmpty().withMessage('Display name is required'),

  body('dateOfBirth')
    .isISO8601()
    .withMessage('Invalid day format (YYYY-MM-DD)'),

  // Middleware to check validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      log.error(`Validation Error: ${JSON.stringify(errors.array())} `);
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

exports.validateLogin = [
  body('email').isEmail().withMessage('Invalid email format'),

  body('password').isEmpty().withMessage('Password is required'),

  // Middleware to chechk validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      log.error(`Validation Error: ${JSON.stringify(errors.array())} `);
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
