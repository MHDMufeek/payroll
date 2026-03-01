const mongoose = require('mongoose');
const { Schema } = mongoose;

const departmentSchema = new Schema({
  name: { type: String, required: true },
  manager: String,
  employee_count: { type: Number, default: 0 },
  payroll_budget: { type: Number, default: 0 },
  status: { type: String, default: 'Active' }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, toJSON: { virtuals: true }, toObject: { virtuals: true } });

departmentSchema.virtual('id').get(function(){ return this._id.toString(); });

module.exports = mongoose.model('Department', departmentSchema);