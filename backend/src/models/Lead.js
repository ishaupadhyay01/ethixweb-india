const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
  },
  author: {
    type: String,
    default: 'Admin'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      trim: true,
      lowercase: true,
      index: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    company: {
      type: String,
      trim: true,
      maxlength: [120, 'Company name cannot exceed 120 characters'],
      default: ''
    },
    phone: {
      type: String,
      trim: true,
      maxlength: [30, 'Phone number cannot exceed 30 characters'],
      default: ''
    },
    service: {
      type: String,
      required: [true, 'Service selection is required'],
      enum: {
        values: [
          'Web Development',
          'E-commerce Solutions',
          'AI Automation & Agents',
          'SEO & Growth Marketing',
          'Google Ads & Performance',
          'Maintenance & Operations',
          'Other'
        ],
        message: 'Invalid service category selected'
      }
    },
    budget: {
      type: String,
      enum: {
        values: [
          '₹1L - ₹3L',
          '₹3L - ₹7L',
          '₹7L - ₹15L',
          '₹15L+',
          'Flexible / To Discuss',
          ''
        ],
        message: 'Invalid budget option selected'
      },
      default: ''
    },
    message: {
      type: String,
      required: [true, 'Project description is required'],
      trim: true,
      minlength: [10, 'Project description must be at least 10 characters'],
      maxlength: [3000, 'Project description cannot exceed 3000 characters']
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'qualified', 'closed'],
      default: 'new',
      index: true
    },
    notes: [noteSchema],
    ipAddress: {
      type: String,
      default: ''
    },
    userAgent: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

// Composite index for fast search & filtering in the admin portal
leadSchema.index({ status: 1, createdAt: -1 });
leadSchema.index({ email: 1, createdAt: -1 });
leadSchema.index({ name: 'text', company: 'text', message: 'text' });

module.exports = mongoose.model('Lead', leadSchema);
