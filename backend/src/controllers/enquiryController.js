const Lead = require('../models/Lead');

// POST /api/enquiries - Public enquiry submission
const createEnquiry = async (req, res, next) => {
  try {
    const { name, email, company, phone, service, budget, message } = req.body;

    const ipAddress = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '';
    const userAgent = req.headers['user-agent'] || '';

    const newLead = new Lead({
      name,
      email,
      company: company || '',
      phone: phone || '',
      service,
      budget: budget || '',
      message,
      ipAddress: typeof ipAddress === 'string' ? ipAddress.split(',')[0].trim() : '',
      userAgent
    });

    const savedLead = await newLead.save();

    return res.status(201).json({
      success: true,
      message: 'Thank you for reaching out. We have received your project details and our senior engineering team will get back to you within 24 hours.',
      data: {
        id: savedLead._id,
        name: savedLead.name,
        email: savedLead.email,
        service: savedLead.service,
        createdAt: savedLead.createdAt
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createEnquiry
};
