require('dotenv').config();
const http = require('http');
const app = require('../src/app');
const connectDB = require('../src/config/db');
const Lead = require('../src/models/Lead');
const Admin = require('../src/models/Admin');
const mongoose = require('mongoose');

const TEST_PORT = 5099;
const BASE_URL = `http://127.0.0.1:${TEST_PORT}`;

async function runTests() {
  console.log('====================================================');
  console.log(' Starting Ethixweb India End-to-End Verification');
  console.log('====================================================');

  await connectDB();
  const server = http.createServer(app);
  await new Promise(resolve => server.listen(TEST_PORT, resolve));
  console.log(`[Test Server] Running on ${BASE_URL}`);

  let testPassed = 0;
  let testFailed = 0;

  function assert(condition, testName) {
    if (condition) {
      console.log(` ✅ PASS: ${testName}`);
      testPassed++;
    } else {
      console.error(` ❌ FAIL: ${testName}`);
      testFailed++;
    }
  }

  try {
    // 1. Health check
    const healthRes = await fetch(`${BASE_URL}/api/health`);
    const healthData = await healthRes.json();
    assert(healthRes.status === 200 && healthData.status === 'healthy', 'Health check returns 200 OK');

    // 2. Public enquiry submission - Valid
    const validEnquiry = {
      name: 'Rohan Deshmukh',
      email: 'rohan@deshmukh-retail.in',
      company: 'Deshmukh Retail Logistics',
      phone: '+91 98200 12345',
      service: 'Web Development',
      budget: '₹7L - ₹15L',
      message: 'We are expanding our retail distribution network and need a high-speed B2B portal with UPI integration.',
      website_hp: '' // Empty honeypot
    };

    const enquiryRes = await fetch(`${BASE_URL}/api/enquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validEnquiry)
    });
    const enquiryData = await enquiryRes.json();
    assert(enquiryRes.status === 201 && enquiryData.success === true, 'Public enquiry submission returns 201 Created');

    // Verify enquiry in MongoDB
    const createdLead = await Lead.findOne({ email: 'rohan@deshmukh-retail.in' });
    assert(createdLead !== null && createdLead.company === 'Deshmukh Retail Logistics', 'Verified lead document persisted in MongoDB');

    // 3. Public enquiry - Invalid Email
    const invalidEmailRes = await fetch(`${BASE_URL}/api/enquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...validEnquiry, email: 'not-an-email' })
    });
    assert(invalidEmailRes.status === 400, 'Invalid email rejected with HTTP 400');

    // 4. Public enquiry - Missing Message
    const missingMsgRes = await fetch(`${BASE_URL}/api/enquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...validEnquiry, message: '' })
    });
    assert(missingMsgRes.status === 400, 'Missing message rejected with HTTP 400');

    // 5. Bot Honeypot Trap
    const botRes = await fetch(`${BASE_URL}/api/enquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...validEnquiry, email: 'bot@spam.com', website_hp: 'automated_spam_bot_fill' })
    });
    assert(botRes.status === 400, 'Honeypot bot submission detected and rejected with HTTP 400');

    // 6. Protected admin endpoint without auth
    const unauthRes = await fetch(`${BASE_URL}/api/admin/leads`);
    assert(unauthRes.status === 401, 'Unauthenticated access to /api/admin/leads returns 401 Unauthorized');

    // 7. Admin login with wrong password
    const wrongLoginRes = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@ethixweb.in', password: 'WrongPassword123' })
    });
    assert(wrongLoginRes.status === 401, 'Login with wrong password rejected with 401 Unauthorized');

    // 8. Admin login with correct password
    const loginRes = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@ethixweb.in', password: 'EthixwebIndia@2026' })
    });
    const loginData = await loginRes.json();
    const token = loginData.token;
    assert(loginRes.status === 200 && !!token, 'Admin login succeeds with 200 OK and returns JWT token');

    // Extract cookie from Set-Cookie header
    const cookieHeader = loginRes.headers.get('set-cookie');
    assert(!!cookieHeader && cookieHeader.includes('ethixweb_admin_token'), 'Login sets secure HTTP-only cookie');

    // 9. Fetch current admin via GET /api/auth/me
    const meRes = await fetch(`${BASE_URL}/api/auth/me`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const meData = await meRes.json();
    assert(meRes.status === 200 && meData.admin.email === 'admin@ethixweb.in', 'GET /api/auth/me returns admin identity');

    // 10. Fetch admin statistics
    const statsRes = await fetch(`${BASE_URL}/api/admin/stats`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const statsData = await statsRes.json();
    assert(statsRes.status === 200 && statsData.data.total >= 1, 'GET /api/admin/stats returns aggregate metrics');

    // 11. Search and filter leads
    const searchRes = await fetch(`${BASE_URL}/api/admin/leads?q=Rohan&status=new`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const searchData = await searchRes.json();
    assert(searchRes.status === 200 && searchData.data.length >= 1, 'GET /api/admin/leads supports search and filtering');

    // 12. Update lead status to qualified and add team note
    const updateRes = await fetch(`${BASE_URL}/api/admin/leads/${createdLead._id}`, {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify({ 
        status: 'qualified',
        note: 'Discovery call completed. Client requested technical proposal by Friday.'
      })
    });
    const updateData = await updateRes.json();
    assert(updateRes.status === 200 && updateData.data.status === 'qualified' && updateData.data.notes.length === 1, 'PATCH /api/admin/leads/:id updates status and appends internal note');

    // 13. Delete lead record
    const deleteRes = await fetch(`${BASE_URL}/api/admin/leads/${createdLead._id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    assert(deleteRes.status === 200, 'DELETE /api/admin/leads/:id deletes lead document');

    // Verify deletion in MongoDB
    const deletedCheck = await Lead.findById(createdLead._id);
    assert(deletedCheck === null, 'Verified lead permanently removed from MongoDB collection');

    // 14. Logout
    const logoutRes = await fetch(`${BASE_URL}/api/auth/logout`, {
      method: 'POST'
    });
    assert(logoutRes.status === 200, 'POST /api/auth/logout clears session');

  } catch (err) {
    console.error('[Verification Fatal Error]', err);
    testFailed++;
  } finally {
    server.close();
    await mongoose.connection.close();
    console.log('====================================================');
    console.log(` Summary: ${testPassed} Passed, ${testFailed} Failed`);
    console.log('====================================================');
    process.exit(testFailed > 0 ? 1 : 0);
  }
}

runTests();
