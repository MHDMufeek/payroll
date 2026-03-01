const mongoose = require('mongoose');
const { Schema } = mongoose;

const leaveSchema = new Schema({
  name: String,
  emp_id: String,
  email: String,
  from_date: Date,
  to_date: Date,
  reason: String,
  status: { type: String, enum: ['pending','approved','rejected'], default: 'pending' },
  processed_by: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  processed_at: Date,
  submitted_at: { type: Date, default: Date.now }
});

leaveSchema.set('toJSON',{ virtuals:true });
leaveSchema.set('toObject',{ virtuals:true });
leaveSchema.virtual('id').get(function(){ return this._id.toString(); });

module.exports = mongoose.model('Leave', leaveSchema);