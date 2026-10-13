const { body, validationResult } = require('express-validator');

const validateEnquiry = [
  // Honeypot check (hidden field for spam bot trapping)
  body('website_hp')
    .optional()
    .custom((value) => {
      if (value && value.trim().length > 0) {
        throw new Error('Bot submission detected.');
      }
      return true;
    }),

  // Full Name validation
  body('name')
    .trim()
    .notEmpty().withMessage('Full name is required.')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters.')
    .escape(),

  // Work Email validation
  body('email')
    .trim()
    .notEmpty().withMessage('Work email is required.')
    .isEmail().withMessage('Please provide a valid email address.')
    .normalizeEmail(),

  // Company Name (optional)
  body('company')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 120 }).withMessage('Company name cannot exceed 120 characters.')
    .escape(),

  // Phone Number (optional)
  body('phone')
    .optional({ checkFalsy: true })
    .trim()
    .matches(/^[+0-9\s\-()]{7,25}$/).withMessage('Please enter a valid phone number (e.g. +91 98765 43210).'),

  // Service of Interest validation
  body('service')
    .trim()
    .notEmpty().withMessage('Service selection is required.')
    .isIn([
      'Web Development',
      'E-commerce Solutions',
      'AI Automation & Agents',
      'SEO & Growth Marketing',
      'Google Ads & Performance',
      'Maintenance & Operations',
      'Other'
    ]).withMessage('Please select a valid service option.'),

  // Approximate Project Budget (optional)
  body('budget')
    .optional({ checkFalsy: true })
    .trim()
    .isIn([
      '₹1L - ₹3L',
      '₹3L - ₹7L',
      '₹7L - ₹15L',
      '₹15L+',
      'Flexible / To Discuss'
    ]).withMessage('Please select a valid budget tier.'),

  // Project Description validation
  body('message')
    .trim()
    .notEmpty().withMessage('Project description is required.')
    .isLength({ min: 10, max: 3000 }).withMessage('Project description must be between 10 and 3,000 characters.'),

  // Middleware to check validation results
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const firstError = errors.array()[0].msg;
      return res.status(400).json({
        success: false,
        message: firstError,
        errors: errors.array().map(e => ({ field: e.path, message: e.msg }))
      });
    }
    next();
  }
];

module.exports = {
  validateEnquiry
};
