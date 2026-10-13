require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('../src/models/Admin');
const connectDB = require('../src/config/db');

const seedAdmin = async () => {
  try {
    await connectDB();

    const email = (process.env.ADMIN_EMAIL || 'admin@ethixweb.in').toLowerCase().trim();
    const password = process.env.ADMIN_PASSWORD || 'EthixwebIndia@2026';
    const name = process.env.ADMIN_NAME || 'Ethixweb India Lead Admin';

    console.log(`[Seed] Checking admin account for: ${email}`);

    let admin = await Admin.findOne({ email });

    if (admin) {
      console.log(`[Seed] Admin user ${email} already exists. Updating credentials...`);
      admin.password = password; // pre-save hook will hash it
      admin.name = name;
      await admin.save();
      console.log(`[Seed] Successfully updated admin account: ${email}`);
    } else {
      admin = new Admin({
        name,
        email,
        password,
        role: 'superadmin'
      });
      await admin.save();
      console.log(`[Seed] Successfully created new superadmin account: ${email}`);
    }

    console.log('----------------------------------------------------');
    console.log(' Admin Login Details:');
    console.log(` Email:    ${email}`);
    console.log(` Password: ${password}`);
    console.log('----------------------------------------------------');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error] Failed to seed admin account:', error.message);
    process.exit(1);
  }
};

seedAdmin();
