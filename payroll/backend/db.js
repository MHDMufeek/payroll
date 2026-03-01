// MongoDB connection via mongoose
const mongoose = require('mongoose');
const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/payroll';

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected ✅');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

module.exports = mongoose;
