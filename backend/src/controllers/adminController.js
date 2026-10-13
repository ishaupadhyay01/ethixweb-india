const Lead = require('../models/Lead');
const mongoose = require('mongoose');

// GET /api/admin/leads - Server-side paginated, filtered, searched list
const getLeads = async (req, res, next) => {
  try {
    let page = parseInt(req.query.page, 10) || 1;
    let limit = parseInt(req.query.limit, 10) || 10;
    if (page < 1) page = 1;
    if (limit < 1 || limit > 100) limit = 10;

    const { status, service, q, sortBy, order } = req.query;

    const query = {};

    // Filter by status
    if (status && ['new', 'contacted', 'qualified', 'closed'].includes(status)) {
      query.status = status;
    }

    // Filter by service
    if (service && typeof service === 'string' && service.trim().length > 0) {
      query.service = service.trim();
    }

    // Search by text query (name, email, company)
    if (q && typeof q === 'string' && q.trim().length > 0) {
      const sanitizedQ = q.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      query.$or = [
        { name: { $regex: sanitizedQ, $options: 'i' } },
        { email: { $regex: sanitizedQ, $options: 'i' } },
        { company: { $regex: sanitizedQ, $options: 'i' } }
      ];
    }

    // Sorting
    const allowedSortFields = ['createdAt', 'updatedAt', 'name', 'status', 'service'];
    const sortField = allowedSortFields.includes(sortBy) ? sortBy : 'createdAt';
    const sortOrder = order === 'asc' ? 1 : -1;
    const sortOptions = { [sortField]: sortOrder };

    const skip = (page - 1) * limit;

    const [leads, total] = await Promise.all([
      Lead.find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(limit)
        .lean(),
      Lead.countDocuments(query)
    ]);

    const totalPages = Math.ceil(total / limit) || 1;

    return res.status(200).json({
      success: true,
      data: leads,
      pagination: {
        total,
        page,
        limit,
        totalPages
      }
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/admin/leads/:id - Single lead detail
const getLeadById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid lead ID format.'
      });
    }

    const lead = await Lead.findById(id);
    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead record not found.'
      });
    }

    return res.status(200).json({
      success: true,
      data: lead
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/admin/leads/:id - Update status & add optional admin notes
const updateLead = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, note } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid lead ID format.'
      });
    }

    const lead = await Lead.findById(id);
    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead record not found.'
      });
    }

    // Update status if provided
    if (status) {
      if (!['new', 'contacted', 'qualified', 'closed'].includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Permitted status values: new, contacted, qualified, closed.'
        });
      }
      lead.status = status;
    }

    // Append admin note if provided
    if (note && typeof note === 'string' && note.trim().length > 0) {
      lead.notes.push({
        text: note.trim(),
        author: req.admin?.email || 'Admin',
        createdAt: new Date()
      });
    }

    const updatedLead = await lead.save();

    return res.status(200).json({
      success: true,
      message: 'Lead details successfully updated.',
      data: updatedLead
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/admin/leads/:id - Remove lead record
const deleteLead = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid lead ID format.'
      });
    }

    const deletedLead = await Lead.findByIdAndDelete(id);
    if (!deletedLead) {
      return res.status(404).json({
        success: false,
        message: 'Lead record not found.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Lead record permanently deleted.'
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/admin/stats - Aggregated metrics
const getStats = async (req, res, next) => {
  try {
    const [total, newCount, contactedCount, qualifiedCount, closedCount, serviceCounts, recentLeads] = await Promise.all([
      Lead.countDocuments(),
      Lead.countDocuments({ status: 'new' }),
      Lead.countDocuments({ status: 'contacted' }),
      Lead.countDocuments({ status: 'qualified' }),
      Lead.countDocuments({ status: 'closed' }),
      Lead.aggregate([
        { $group: { _id: '$service', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]),
      Lead.find().sort({ createdAt: -1 }).limit(5).lean()
    ]);

    return res.status(200).json({
      success: true,
      data: {
        total,
        new: newCount,
        contacted: contactedCount,
        qualified: qualifiedCount,
        closed: closedCount,
        byService: serviceCounts.map(item => ({ service: item._id, count: item.count })),
        recent: recentLeads
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
  getStats
};
