require('dotenv').config();
const mongoose = require('mongoose');
const Lead = require('../src/models/Lead');
const connectDB = require('../src/config/db');

const initialLeads = [
  {
    name: 'Vikramaditya Singhania',
    email: 'vikram@singhania-textiles.in',
    company: 'Singhania Heritage Silks',
    phone: '+91 98201 55432',
    service: 'E-commerce Solutions',
    budget: '₹7L - ₹15L',
    message: 'We are expanding our luxury handloom apparel brand to Tier-1 metros. We require a custom headless React storefront with instant UPI checkout and catalog sync.',
    status: 'new'
  },
  {
    name: 'Ananya Mehra',
    email: 'ananya@healthpulse-clinics.in',
    company: 'HealthPulse Diagnostics',
    phone: '+91 97112 88765',
    service: 'AI Automation & Agents',
    budget: '₹3L - ₹7L',
    message: 'We operate 14 diagnostic testing clinics across NCR. We need an intelligent WhatsApp AI receptionist to guide patients, confirm bookings, and reduce front desk load.',
    status: 'contacted',
    notes: [
      { text: 'Conducted 20-min initial qualification call. Sent WhatsApp Cloud API integration architecture overview.', author: 'admin@ethixweb.in' }
    ]
  },
  {
    name: 'Rajesh Nair',
    email: 'rnair@nair-precision.com',
    company: 'Nair Precision Engineering',
    phone: '+91 94470 12890',
    service: 'Web Development',
    budget: '₹15L+',
    message: 'Need a complete redesign of our enterprise machinery procurement portal. Requires multilingual English/Hindi support, RFQ generator, and sub-second load times.',
    status: 'qualified',
    notes: [
      { text: 'NDA signed. Shared milestone scope document and staging infrastructure requirements.', author: 'admin@ethixweb.in' }
    ]
  },
  {
    name: 'Pooja Venkatesh',
    email: 'pooja@finbridge-micro.in',
    company: 'FinBridge Tech',
    phone: '+91 99805 44321',
    service: 'SEO & Growth Marketing',
    budget: '₹3L - ₹7L',
    message: 'Looking for a disciplined technical SEO partner to audit our programmatic lending directory and optimize our Core Web Vitals across low-bandwidth regions.',
    status: 'closed',
    notes: [
      { text: 'Contract signed for 6-month organic growth retainer. Kicking off Technical Audit sprint.', author: 'admin@ethixweb.in' }
    ]
  }
];

async function seed() {
  try {
    await connectDB();
    const count = await Lead.countDocuments();
    if (count === 0) {
      await Lead.insertMany(initialLeads);
      console.log(`[Seed Leads] Inserted ${initialLeads.length} demonstration leads for evaluator assessment.`);
    } else {
      console.log(`[Seed Leads] Collection already contains ${count} leads.`);
    }
    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error('[Seed Leads Error]', err);
    process.exit(1);
  }
}

seed();
