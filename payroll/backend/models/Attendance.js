const mongoose = require('mongoose');
const { Schema } = mongoose;

const attendanceSchema = new Schema({
  employee_id: { type: String, required: true },
  employee_name: { type: String, required: true },
  date: { type: Date, required: true },
  check_in: String,
  check_out: String,
  working_hours: { type: Number, default: 0 },
  overtime: { type: Number, default: 0 },
  status: { type: String, default: 'present' },
  source: { type: String, default: 'biometric' },
  remarks: String,
  department: String,
  payroll_locked: { type: Boolean, default: false }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, toJSON: { virtuals: true }, toObject: { virtuals: true } });

attendanceSchema.virtual('id').get(function(){ return this._id.toString(); });

module.exports = mongoose.model('Attendance', attendanceSchema);