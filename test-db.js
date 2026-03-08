
const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb://localhost:27017/architect-app';

async function test() {
  try {
    console.log('Connecting to:', MONGODB_URI);
    await mongoose.connect(MONGODB_URI);
    console.log('Connected successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Connection failed:', err.message);
    process.exit(1);
  }
}

test();
