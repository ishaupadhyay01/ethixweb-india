const express = require('express');
const router = express.Router();
const { createEnquiry } = require('../controllers/enquiryController');
const { validateEnquiry } = require('../validators/enquiryValidator');
const { enquiryLimiter } = require('../middleware/rateLimiter');

// Public route to submit an enquiry
router.post('/', enquiryLimiter, validateEnquiry, createEnquiry);

module.exports = router;
