const express = require('express');
const router = express.Router();
const {
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
  getStats
} = require('../controllers/adminController');
const { authenticateAdmin } = require('../middleware/authMiddleware');

// All admin routes require valid authentication
router.use(authenticateAdmin);

router.get('/stats', getStats);
router.get('/leads', getLeads);
router.get('/leads/:id', getLeadById);
router.patch('/leads/:id', updateLead);
router.delete('/leads/:id', deleteLead);

module.exports = router;
