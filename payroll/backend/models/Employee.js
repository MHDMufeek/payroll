const mongoose = require('mongoose');
const { Schema } = mongoose;

const employeeSchema = new Schema({
  employee_id: { type: String, unique: true, sparse: true },
  first_name: String,
  last_name: String,
  name: String,
  email: String,
  mobile: String,
  department: String,
  position: String,
  hire_date: Date,
  date_of_birth: Date,
  gender: String,
  nic_number: String,
  basic_salary: Number,
  allowances: Number,
  gross_salary: Number,
  status: { type: String, default: 'active' },
  epf_number: String,
  etf_number: String,
  bank_details: Schema.Types.Mixed,
  personal_info: Schema.Types.Mixed,
  qualifications: Schema.Types.Mixed,
  job_details: Schema.Types.Mixed,
  epf_etf: Schema.Types.Mixed,
  documents: Schema.Types.Mixed,
  skills: Schema.Types.Mixed
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, toJSON: { virtuals: true }, toObject: { virtuals: true } });

// expose id virtual to mimic SQL
employeeSchema.virtual('id').get(function() { return this._id.toString(); });

module.exports = mongoose.model('Employee', employeeSchema);