
const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb://iamyogesh2104_db_user:BRl5U3Yh4Bei1i0W@cluster0.nsdntd4.mongodb.net/dailyuse?retryWrites=true&w=majority&appName=dailyuse';

async function test() {
  try {
    console.log('Connecting to:', MONGODB_URI);
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000
    });
    console.log('Connected successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Connection failed:', err.message);
    process.exit(1);
  }
}

test();
