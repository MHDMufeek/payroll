import React, { useState, useCallback } from 'react';
import TopNav from "../components/TopNav";
import { useTheme } from "../context/ThemeContext";

// Move AddEmployeeForm component outside to prevent re-renders
const AddEmployeeForm = React.memo(({ 
  isOpen, 
  onClose, 
  currentStep,
  formData,
  formErrors,
  availableDepartments,
  handleFormChange,
  handleFileChange, // New prop
  nextStep,
  prevStep,
  handleAddEmployee,
  handleCloseAddModal,
  isDark
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className={isDark ? "bg-gray-800 rounded-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto" : "bg-white rounded-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto"}>
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className={isDark ? "text-2xl font-bold text-white" : "text-2xl font-bold text-gray-900"}>Add New Employee</h2>
              <p className={isDark ? "text-gray-400 mt-1" : "text-gray-600 mt-1"}>Complete all sections to add a new employee</p>
            </div>
            <button
              onClick={onClose}
              className={isDark ? "text-gray-500 hover:text-gray-300" : "text-gray-400 hover:text-gray-600"}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {[1, 2, 3, 4, 5, 6].map((step) => ( // Changed from 5 to 6 steps
                <div
                  key={step}
                  className={`flex flex-col items-center ${step <= currentStep ? 'text-blue-600' : 'text-gray-400'}`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                    step === currentStep ? 'bg-blue-100 border-2 border-blue-600' :
                    step < currentStep ? 'bg-green-100 border-2 border-green-600' :
                    'bg-gray-100 border-2 border-gray-300'
                  }`}>
                    {step < currentStep ? (
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <span className="font-semibold">{step}</span>
                    )}
                  </div>
                  <span className="text-xs font-medium">
                    {step === 1 && 'Personal'}
                    {step === 2 && 'Qualifications'}
                    {step === 3 && 'Job Details'}
                    {step === 4 && 'EPF/ETF'}
                    {step === 5 && 'Bank Details'}
                    {step === 6 && 'Documents'} {/* New step */}
                  </span>
                </div>
              ))}
            </div>
            <div className="relative h-2 bg-gray-200 rounded-full">
              <div
                className="absolute top-0 left-0 h-full bg-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep - 1) * 20}%` }} // Changed to 20% increments for 6 steps
              />
            </div>
          </div>

          <form onSubmit={handleAddEmployee}>
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  Personal Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName || ''}
                        onChange={handleFormChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          formErrors.firstName ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {formErrors.firstName && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.firstName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName || ''}
                        onChange={handleFormChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          formErrors.lastName ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {formErrors.lastName && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.lastName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date of Birth *
                      </label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth || ''}
                        onChange={handleFormChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          formErrors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {formErrors.dateOfBirth && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.dateOfBirth}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Gender *
                      </label>
                      <select
                        name="gender"
                        value={formData.gender || ''}
                        onChange={handleFormChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          formErrors.gender ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                      {formErrors.gender && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.gender}</p>
                      )}
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email || ''}
                        onChange={handleFormChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          formErrors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="employee@company.com"
                      />
                      {formErrors.email && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile || ''}
                        onChange={handleFormChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          formErrors.mobile ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="+94 77 123 4567"
                      />
                      {formErrors.mobile && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.mobile}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        NIC Number *
                      </label>
                      <input
                        type="text"
                        name="nicNumber"
                        value={formData.nicNumber || ''}
                        onChange={handleFormChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          formErrors.nicNumber ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="e.g., 199012345678"
                      />
                      {formErrors.nicNumber && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.nicNumber}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Permanent Address *
                      </label>
                      <textarea
                        name="permanentAddress"
                        value={formData.permanentAddress || ''}
                        onChange={handleFormChange}
                        rows="2"
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          formErrors.permanentAddress ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {formErrors.permanentAddress && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.permanentAddress}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Qualification Details */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  Qualification Details
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Highest Qualification *
                      </label>
                      <select
                        name="highestQualification"
                        value={formData.highestQualification || ''}
                        onChange={handleFormChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          formErrors.highestQualification ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select Qualification</option>
                        <option value="PhD">PhD</option>
                        <option value="Master's Degree">Master's Degree</option>
                        <option value="Bachelor's Degree">Bachelor's Degree</option>
                        <option value="Diploma">Diploma</option>
                        <option value="Advanced Level">Advanced Level (A/L)</option>
                        <option value="Ordinary Level">Ordinary Level (O/L)</option>
                        <option value="Certificate">Certificate</option>
                      </select>
                      {formErrors.highestQualification && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.highestQualification}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        University/Institution
                      </label>
                      <input
                        type="text"
                        name="university"
                        value={formData.university || ''}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Year of Graduation
                      </label>
                      <input
                        type="number"
                        name="yearOfGraduation"
                        value={formData.yearOfGraduation || ''}
                        onChange={handleFormChange}
                        min="1950"
                        max="2024"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Degree/Field of Study
                      </label>
                      <input
                        type="text"
                        name="degree"
                        value={formData.degree || ''}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Professional Qualifications
                      </label>
                      <textarea
                        name="professionalQualifications"
                        value={formData.professionalQualifications || ''}
                        onChange={handleFormChange}
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="List professional certifications"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Technical Skills
                      </label>
                      <textarea
                        name="technicalSkills"
                        value={formData.technicalSkills || ''}
                        onChange={handleFormChange}
                        rows="2"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., React, Node.js, Python, AWS"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Job Details */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  Job Details
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Employee ID
                      </label>
                      <input
                        type="text"
                        name="employeeId"
                        value={formData.employeeId || ''}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Designation *
                      </label>
                      <input
                        type="text"
                        name="designation"
                        value={formData.designation || ''}
                        onChange={handleFormChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          formErrors.designation ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="e.g., Senior Software Engineer"
                      />
                      {formErrors.designation && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.designation}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Department *
                      </label>
                      <select
                        name="department"
                        value={formData.department || ''}
                        onChange={handleFormChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          formErrors.department ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select Department</option>
                        {availableDepartments.map(dept => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </select>
                      {formErrors.department && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.department}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Employment Type
                      </label>
                      <select
                        name="employmentType"
                        value={formData.employmentType || 'Permanent'}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="Permanent">Permanent</option>
                        <option value="Contract">Contract</option>
                        <option value="Probation">Probation</option>
                        <option value="Temporary">Temporary</option>
                        <option value="Intern">Intern</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date of Joining *
                      </label>
                      <input
                        type="date"
                        name="dateOfJoining"
                        value={formData.dateOfJoining || ''}
                        onChange={handleFormChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          formErrors.dateOfJoining ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {formErrors.dateOfJoining && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.dateOfJoining}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Basic Salary (USD) *
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2 text-gray-500">$</span>
                        <input
                          type="number"
                          name="basicSalary"
                          value={formData.basicSalary || ''}
                          onChange={handleFormChange}
                          className={`w-full pl-7 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            formErrors.basicSalary ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="0.00"
                          min="0"
                          step="0.01"
                        />
                      </div>
                      {formErrors.basicSalary && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.basicSalary}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Allowances (USD)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2 text-gray-500">$</span>
                        <input
                          type="number"
                          name="allowances"
                          value={formData.allowances || ''}
                          onChange={handleFormChange}
                          className="w-full pl-7 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="0.00"
                          min="0"
                          step="0.01"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Reporting Manager
                      </label>
                      <input
                        type="text"
                        name="reportingManager"
                        value={formData.reportingManager || ''}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: EPF/ETF Details */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  EPF & ETF Details
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        EPF Number *
                      </label>
                      <input
                        type="text"
                        name="epfNumber"
                        value={formData.epfNumber || ''}
                        onChange={handleFormChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          formErrors.epfNumber ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="e.g., EPF123456789"
                      />
                      {formErrors.epfNumber && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.epfNumber}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ETF Number *
                      </label>
                      <input
                        type="text"
                        name="etfNumber"
                        value={formData.etfNumber || ''}
                        onChange={handleFormChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          formErrors.etfNumber ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="e.g., ETF987654321"
                      />
                      {formErrors.etfNumber && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.etfNumber}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        EPF Start Date
                      </label>
                      <input
                        type="date"
                        name="epfStartDate"
                        value={formData.epfStartDate || ''}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Employee EPF Rate (%)
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            name="employeeEpfRate"
                            value={formData.employeeEpfRate || '8'}
                            onChange={handleFormChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            min="0"
                            max="100"
                            step="0.01"
                          />
                          <span className="absolute right-3 top-2 text-gray-500">%</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Employer EPF Rate (%)
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            name="employerEpfRate"
                            value={formData.employerEpfRate || '12'}
                            onChange={handleFormChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            min="0"
                            max="100"
                            step="0.01"
                          />
                          <span className="absolute right-3 top-2 text-gray-500">%</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ETF Rate (%)
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          name="etfRate"
                          value={formData.etfRate || '3'}
                          onChange={handleFormChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          min="0"
                          max="100"
                          step="0.01"
                        />
                        <span className="absolute right-3 top-2 text-gray-500">%</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        EPF Contribution Type
                      </label>
                      <select
                        name="epfContributionType"
                        value={formData.epfContributionType || 'employee'}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="employee">Employee Contribution</option>
                        <option value="employer">Employer Contribution</option>
                        <option value="both">Both</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Bank Details */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  Bank Details
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Bank Name *
                      </label>
                      <select
                        name="bankName"
                        value={formData.bankName || ''}
                        onChange={handleFormChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          formErrors.bankName ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select Bank</option>
                        <option value="Bank of America">Bank of America</option>
                        <option value="Chase Bank">Chase Bank</option>
                        <option value="Wells Fargo">Wells Fargo</option>
                        <option value="Citibank">Citibank</option>
                        <option value="HSBC">HSBC</option>
                        <option value="Other">Other</option>
                      </select>
                      {formErrors.bankName && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.bankName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Branch *
                      </label>
                      <input
                        type="text"
                        name="branch"
                        value={formData.branch || ''}
                        onChange={handleFormChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          formErrors.branch ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="e.g., New York Main Branch"
                      />
                      {formErrors.branch && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.branch}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Account Number *
                      </label>
                      <input
                        type="text"
                        name="accountNumber"
                        value={formData.accountNumber || ''}
                        onChange={handleFormChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          formErrors.accountNumber ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="e.g., 1234567890"
                      />
                      {formErrors.accountNumber && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.accountNumber}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Account Type *
                      </label>
                      <select
                        name="accountType"
                        value={formData.accountType || 'Savings'}
                        onChange={handleFormChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          formErrors.accountType ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select Account Type</option>
                        <option value="Savings">Savings</option>
                        <option value="Current">Current</option>
                        <option value="Salary">Salary</option>
                        <option value="Checking">Checking</option>
                      </select>
                      {formErrors.accountType && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.accountType}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Account Holder Name *
                      </label>
                      <input
                        type="text"
                        name="accountHolderName"
                        value={formData.accountHolderName || ''}
                        onChange={handleFormChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          formErrors.accountHolderName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="As per bank records"
                      />
                      {formErrors.accountHolderName && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.accountHolderName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Payment Method
                      </label>
                      <select
                        name="paymentMethod"
                        value={formData.paymentMethod || 'Bank Transfer'}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="Bank Transfer">Bank Transfer</option>
                        <option value="Cheque">Cheque</option>
                        <option value="Cash">Cash</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 6: Documents - New Step */}
            {currentStep === 6 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  Employee Documents
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Employee Photo
                      </label>
                      <div className="mt-1 flex items-center">
                        <div className="relative">
                          <input
                            type="file"
                            name="employeePhoto"
                            onChange={handleFileChange}
                            accept="image/*"
                            className="sr-only"
                            id="employee-photo"
                          />
                          <label
                            htmlFor="employee-photo"
                            className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Choose Photo
                          </label>
                        </div>
                        <div className="ml-4">
                          {formData.employeePhoto ? (
                            <div className="flex items-center space-x-2">
                              <img
                                src={URL.createObjectURL(formData.employeePhoto)}
                                alt="Employee"
                                className="w-16 h-16 object-cover rounded"
                              />
                              <span className="text-sm text-gray-600">
                                {formData.employeePhoto.name}
                              </span>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-500">No photo selected</span>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Upload a professional photo (JPG, PNG, max 5MB)
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CV/Resume
                      </label>
                      <div className="mt-1 flex items-center">
                        <div className="relative">
                          <input
                            type="file"
                            name="cvDocument"
                            onChange={handleFileChange}
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            className="sr-only"
                            id="cv-document"
                          />
                          <label
                            htmlFor="cv-document"
                            className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Choose File
                          </label>
                        </div>
                        <div className="ml-4">
                          {formData.cvDocument ? (
                            <div className="flex items-center space-x-2">
                              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              <div>
                                <span className="text-sm text-gray-600 block">
                                  {formData.cvDocument.name}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {(formData.cvDocument.size / 1024 / 1024).toFixed(2)} MB
                                </span>
                              </div>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-500">No file selected</span>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Upload CV/Resume (PDF, DOC, DOCX, JPG, PNG, max 10MB)
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Additional Documents
                      </label>
                      <div className="mt-1">
                        {formData.additionalDocuments && formData.additionalDocuments.length > 0 ? (
                          <div className="space-y-2">
                            {formData.additionalDocuments.map((file, index) => (
                              <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                                <div className="flex items-center space-x-2">
                                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                  </svg>
                                  <span className="text-sm text-gray-600 truncate">
                                    {file.name}
                                  </span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newFiles = [...formData.additionalDocuments];
                                    newFiles.splice(index, 1);
                                    handleFormChange({
                                      target: {
                                        name: 'additionalDocuments',
                                        value: newFiles
                                      }
                                    });
                                  }}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">No additional documents</span>
                        )}
                      </div>
                      <div className="mt-2">
                        <input
                          type="file"
                          id="additional-documents"
                          className="sr-only"
                          multiple
                          onChange={(e) => {
                            const files = Array.from(e.target.files);
                            const currentFiles = formData.additionalDocuments || [];
                            handleFormChange({
                              target: {
                                name: 'additionalDocuments',
                                value: [...currentFiles, ...files]
                              }
                            });
                          }}
                        />
                        <label
                          htmlFor="additional-documents"
                          className="cursor-pointer inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                          </svg>
                          Add More Files
                        </label>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Add other supporting documents (max 5 files, 10MB each)
                      </p>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-blue-900 mb-2">Document Requirements</h4>
                      <ul className="text-xs text-blue-700 space-y-1">
                        <li>• Photo should be recent and professional</li>
                        <li>• CV should include work history and qualifications</li>
                        <li>• All documents should be clear and readable</li>
                        <li>• Maximum file size: 10MB per file</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 mt-8 border-t border-gray-200">
              <div>
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    Previous
                  </button>
                )}
              </div>
              
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleCloseAddModal}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                
                {currentStep < 6 ? ( // Changed from 5 to 6
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    Next Step
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Add Employee
                  </button>
                )}
              </div>
            </div>

            {/* Step Indicator */}
            <div className="mt-4 text-center text-sm text-gray-500">
              Step {currentStep} of 6 {/* Changed from 5 to 6 */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
});

// Employee Card Component
const EmployeeCard = React.memo(({ employee, onView, onEdit, onDelete, isDark }) => {
  return (
    <div className={isDark ? "bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-5 hover:shadow-md transition-shadow" : "bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow"}>
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          {employee.employeePhoto ? (
            <img
              src={employee.employeePhoto}
              alt={employee.name}
              className={`w-14 h-14 rounded-full border-2 ${isDark ? "border-gray-700" : "border-white"} shadow-sm object-cover`}
            />
          ) : (
            <img
              src={employee.avatar}
              alt={employee.name}
              className={`w-14 h-14 rounded-full border-2 ${isDark ? "border-gray-700" : "border-white"} shadow-sm`}
            />
          )}
          <div>
            <h3 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>{employee.name}</h3>
            <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>{employee.position}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-xs px-2 py-1 rounded ${
                isDark ? "bg-blue-900 text-blue-200" : "bg-blue-50 text-blue-700"
              }`}>
                {employee.department}
              </span>
              <span className={`text-xs px-2 py-1 rounded ${
                employee.status === 'active' 
                  ? (isDark ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800')
                  : (isDark ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800')
              }`}>
                {employee.status}
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onView}
            className={isDark ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-800"}
            title="View Details"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
          <button
            onClick={onEdit}
            className={isDark ? "text-green-400 hover:text-green-300" : "text-green-600 hover:text-green-800"}
            title="Edit"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={onDelete}
            className={isDark ? "text-red-400 hover:text-red-300" : "text-red-600 hover:text-red-800"}
            title="Delete"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="mt-4 space-y-3">
        <div className={`flex items-center gap-2 text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span className="truncate">{employee.email}</span>
        </div>
        <div className={`flex items-center gap-2 text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Joined {new Date(employee.hireDate).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Skills */}
      <div className="mt-4">
        <div className="flex flex-wrap gap-2">
          {employee.skills.slice(0, 3).map((skill, index) => (
            <span
              key={index}
              className={`px-2 py-1 text-xs font-medium rounded ${
                isDark ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700"
              }`}
            >
              {skill}
            </span>
          ))}
          {employee.skills.length > 3 && (
            <span className={`px-2 py-1 text-xs font-medium ${isDark ? "text-gray-400" : "text-gray-500"}`}>
              +{employee.skills.length - 3} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
});

const Employees = () => {
  const { isDark } = useTheme();
  // Start with empty employee data
  const initialEmployees = [];

  // State Management
  const [employees, setEmployees] = useState(initialEmployees);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('name');
  
  // Multi-step form state - Updated to include document fields
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Personal Information
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    nicNumber: '',
    passportNumber: '',
    nationality: 'Sri Lankan',
    maritalStatus: '',
    email: '',
    mobile: '',
    homePhone: '',
    permanentAddress: '',
    currentAddress: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelationship: '',
    
    // Step 2: Qualification Details
    highestQualification: '',
    university: '',
    yearOfGraduation: '',
    degree: '',
    professionalQualifications: '',
    technicalSkills: '',
    languages: '',
    certifications: '',
    
    // Step 3: Job Details
    employeeId: '',
    designation: '',
    department: 'Engineering',
    employmentType: 'Permanent',
    dateOfJoining: '',
    reportingManager: '',
    workLocation: '',
    workingHours: '09:00 - 17:00',
    probationPeriod: '6',
    noticePeriod: '1',
    basicSalary: '',
    allowances: '',
    grossSalary: '',
    
    // Step 4: EPF/ETF Details
    epfNumber: '',
    etfNumber: '',
    epfStartDate: '',
    employeeEpfRate: '8',
    employerEpfRate: '12',
    etfRate: '3',
    epfContributionType: 'employee',
    epfNomineeName: '',
    epfNomineeRelationship: '',
    
    // Step 5: Bank Details
    bankName: '',
    branch: '',
    accountNumber: '',
    accountType: 'Savings',
    accountHolderName: '',
    bankCode: '',
    paymentMethod: 'Bank Transfer',
    
    // Step 6: Documents - New fields
    employeePhoto: null,
    cvDocument: null,
    additionalDocuments: [],
  });

  const [formErrors, setFormErrors] = useState({});

  // Get unique departments for filters
  const departments = ['all', ...new Set(employees.map(emp => emp.department))];

  // Available departments for form
  const availableDepartments = [
    'Engineering',
    'Product',
    'Design',
    'Marketing',
    'Sales',
    'Human Resources',
    'Finance',
    'Operations'
  ];

  // Filter and sort employees
  const filteredEmployees = employees
    .filter(employee => {
      const matchesSearch = 
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDepartment = 
        selectedDepartment === 'all' || employee.department === selectedDepartment;
      
      return matchesSearch && matchesDepartment;
    })
    .sort((a, b) => {
      switch(sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'department':
          return a.department.localeCompare(b.department);
        case 'hireDate':
          return new Date(b.hireDate) - new Date(a.hireDate);
        case 'salary':
          return parseInt(b.salary.replace(/[$,]/g, '')) - parseInt(a.salary.replace(/[$,]/g, ''));
        default:
          return 0;
      }
    });

  // Statistics - Handle empty state
  const stats = {
    total: employees.length,
    active: employees.filter(emp => emp.status === 'active').length,
    departments: [...new Set(employees.map(emp => emp.department))].length,
    avgPerformance: employees.length > 0 
      ? (employees.reduce((acc, emp) => acc + emp.performance, 0) / employees.length).toFixed(1)
      : '0.0'
  };

  // Generate employee ID
  const generateEmployeeId = () => {
    const prefix = 'EMP';
    const year = new Date().getFullYear().toString().slice(-2);
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `${prefix}${year}${randomNum}`;
  };

  // Initialize form when modal opens
  React.useEffect(() => {
    if (isAddModalOpen) {
      setFormData(prev => ({
        ...prev,
        employeeId: generateEmployeeId(),
        dateOfJoining: new Date().toISOString().split('T')[0]
      }));
    }
  }, [isAddModalOpen]);

  // Use useCallback for form handlers to prevent unnecessary re-renders
  const handleFormChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  }, [formErrors]);

  // Handle file uploads separately
  const handleFileChange = useCallback((e) => {
    const { name, files } = e.target;
    const file = files[0];
    
    if (file) {
      // Check file size
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        alert(`File ${file.name} is too large. Maximum size is 10MB.`);
        return;
      }
      
      setFormData(prev => ({
        ...prev,
        [name]: file
      }));
    }
  }, []);

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
      if (!formData.gender) newErrors.gender = 'Gender is required';
      if (!formData.nicNumber.trim()) newErrors.nicNumber = 'NIC number is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Invalid email format';
      if (!formData.mobile.trim()) newErrors.mobile = 'Mobile number is required';
      if (!formData.permanentAddress.trim()) newErrors.permanentAddress = 'Permanent address is required';
    }
    
    if (step === 2) {
      if (!formData.highestQualification) newErrors.highestQualification = 'Highest qualification is required';
    }
    
    if (step === 3) {
      if (!formData.designation.trim()) newErrors.designation = 'Designation is required';
      if (!formData.department) newErrors.department = 'Department is required';
      if (!formData.dateOfJoining) newErrors.dateOfJoining = 'Date of joining is required';
      if (!formData.basicSalary || parseFloat(formData.basicSalary) <= 0) 
        newErrors.basicSalary = 'Valid basic salary is required';
    }
    
    if (step === 4) {
      if (!formData.epfNumber.trim()) newErrors.epfNumber = 'EPF number is required';
      if (!formData.etfNumber.trim()) newErrors.etfNumber = 'ETF number is required';
    }
    
    if (step === 5) {
      if (!formData.bankName) newErrors.bankName = 'Bank name is required';
      if (!formData.branch.trim()) newErrors.branch = 'Branch is required';
      if (!formData.accountNumber.trim()) newErrors.accountNumber = 'Account number is required';
      if (!formData.accountType) newErrors.accountType = 'Account type is required';
      if (!formData.accountHolderName.trim()) newErrors.accountHolderName = 'Account holder name is required';
    }
    
    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = useCallback(() => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 6)); // Changed from 5 to 6
    }
  }, [currentStep, validateStep]);

  const prevStep = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  }, []);

  const handleAddEmployee = useCallback((e) => {
    e.preventDefault();
    
    if (validateStep(currentStep)) {
      // Calculate gross salary if not provided
      const allowances = parseFloat(formData.allowances) || 0;
      const basicSalary = parseFloat(formData.basicSalary) || 0;
      const grossSalary = formData.grossSalary || (basicSalary + allowances).toString();
      
      // Convert employee photo to base64 if exists
      const convertFileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
          if (!file) {
            resolve(null);
            return;
          }
          
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      };

      const createEmployee = async () => {
        const employeePhotoBase64 = await convertFileToBase64(formData.employeePhoto);
        const cvDocumentBase64 = await convertFileToBase64(formData.cvDocument);
        
        // Convert additional documents to base64
        const additionalDocsBase64 = [];
        if (formData.additionalDocuments && formData.additionalDocuments.length > 0) {
          for (const doc of formData.additionalDocuments) {
            const base64 = await convertFileToBase64(doc);
            additionalDocsBase64.push({
              name: doc.name,
              type: doc.type,
              size: doc.size,
              data: base64
            });
          }
        }

        const finalData = {
          ...formData,
          grossSalary,
        };

        // Create new employee object
        const newId = employees.length > 0 ? Math.max(...employees.map(emp => emp.id)) + 1 : 1;
        const skills = finalData.technicalSkills 
          ? finalData.technicalSkills.split(',').map(skill => skill.trim())
          : [];
        
        const newEmployee = {
          id: newId,
          name: `${finalData.firstName} ${finalData.lastName}`,
          position: finalData.designation,
          department: finalData.department,
          email: finalData.email,
          phone: finalData.mobile,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${finalData.firstName}`,
          employeePhoto: employeePhotoBase64,
          cvDocument: cvDocumentBase64 ? {
            data: cvDocumentBase64,
            name: formData.cvDocument?.name || 'cv.pdf',
            type: formData.cvDocument?.type || 'application/pdf'
          } : null,
          additionalDocuments: additionalDocsBase64,
          status: 'active',
          hireDate: finalData.dateOfJoining,
          salary: `$${parseFloat(finalData.basicSalary || 0).toLocaleString()}`,
          skills: skills,
          projects: 0,
          performance: 4.0,
          // Enhanced fields
          personalInfo: {
            firstName: finalData.firstName,
            lastName: finalData.lastName,
            dateOfBirth: finalData.dateOfBirth,
            gender: finalData.gender,
            nicNumber: finalData.nicNumber,
            nationality: finalData.nationality,
            maritalStatus: finalData.maritalStatus,
            address: finalData.permanentAddress
          },
          qualifications: {
            highestQualification: finalData.highestQualification,
            university: finalData.university,
            yearOfGraduation: finalData.yearOfGraduation,
            degree: finalData.degree,
            professionalQualifications: finalData.professionalQualifications
          },
          jobDetails: {
            employeeId: finalData.employeeId,
            designation: finalData.designation,
            employmentType: finalData.employmentType,
            reportingManager: finalData.reportingManager,
            workLocation: finalData.workLocation,
            basicSalary: finalData.basicSalary,
            allowances: finalData.allowances,
            grossSalary: finalData.grossSalary
          },
          epfEtfDetails: {
            epfNumber: finalData.epfNumber,
            etfNumber: finalData.etfNumber,
            epfStartDate: finalData.epfStartDate,
            employeeEpfRate: finalData.employeeEpfRate,
            employerEpfRate: finalData.employerEpfRate,
            etfRate: finalData.etfRate
          },
          bankDetails: {
            bankName: finalData.bankName,
            branch: finalData.branch,
            accountNumber: finalData.accountNumber,
            accountType: finalData.accountType,
            accountHolderName: finalData.accountHolderName,
            paymentMethod: finalData.paymentMethod
          }
        };

        setEmployees([...employees, newEmployee]);
        resetForm();
        setIsAddModalOpen(false);
        setCurrentStep(1);
        
        alert('Employee added successfully!');
      };

      createEmployee().catch(error => {
        console.error('Error creating employee:', error);
        alert('Error adding employee. Please try again.');
      });
    }
  }, [currentStep, formData, employees, validateStep]);

  const resetForm = useCallback(() => {
    setFormData({
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: '',
      nicNumber: '',
      passportNumber: '',
      nationality: 'Sri Lankan',
      maritalStatus: '',
      email: '',
      mobile: '',
      homePhone: '',
      permanentAddress: '',
      currentAddress: '',
      emergencyContactName: '',
      emergencyContactPhone: '',
      emergencyContactRelationship: '',
      highestQualification: '',
      university: '',
      yearOfGraduation: '',
      degree: '',
      professionalQualifications: '',
      technicalSkills: '',
      languages: '',
      certifications: '',
      employeeId: generateEmployeeId(),
      designation: '',
      department: 'Engineering',
      employmentType: 'Permanent',
      dateOfJoining: new Date().toISOString().split('T')[0],
      reportingManager: '',
      workLocation: '',
      workingHours: '09:00 - 17:00',
      probationPeriod: '6',
      noticePeriod: '1',
      basicSalary: '',
      allowances: '',
      grossSalary: '',
      epfNumber: '',
      etfNumber: '',
      epfStartDate: '',
      employeeEpfRate: '8',
      employerEpfRate: '12',
      etfRate: '3',
      epfContributionType: 'employee',
      epfNomineeName: '',
      epfNomineeRelationship: '',
      bankName: '',
      branch: '',
      accountNumber: '',
      accountType: 'Savings',
      accountHolderName: '',
      bankCode: '',
      paymentMethod: 'Bank Transfer',
      employeePhoto: null,
      cvDocument: null,
      additionalDocuments: [],
    });
    setFormErrors({});
  }, []);

  const handleCloseAddModal = useCallback(() => {
    resetForm();
    setCurrentStep(1);
    setIsAddModalOpen(false);
  }, [resetForm]);

  const handleDeleteEmployee = useCallback((id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      setEmployees(employees.filter(emp => emp.id !== id));
      if (selectedEmployee && selectedEmployee.id === id) {
        setSelectedEmployee(null);
      }
    }
  }, [employees, selectedEmployee]);

  const handleEditClick = useCallback((employee) => {
    setSelectedEmployee(employee);
    setIsEditModalOpen(true);
  }, []);

  const handleAddClick = useCallback(() => {
    setIsAddModalOpen(true);
  }, []);

  // Employee Detail Modal Component - Updated to show documents
  const EmployeeModal = React.memo(({ employee, onClose, onEdit, onDelete }) => {
    if (!employee) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{employee.name}</h2>
                <p className="text-gray-600">{employee.position}</p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="md:col-span-2 space-y-6">
                {/* Personal Information */}
                {employee.personalInfo && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-3">Personal Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Date of Birth</h4>
                        <p className="font-medium text-gray-900">
                          {new Date(employee.personalInfo.dateOfBirth).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Gender</h4>
                        <p className="font-medium text-gray-900">{employee.personalInfo.gender}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">NIC Number</h4>
                        <p className="font-medium text-gray-900">{employee.personalInfo.nicNumber}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Nationality</h4>
                        <p className="font-medium text-gray-900">{employee.personalInfo.nationality}</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Address</h4>
                      <p className="font-medium text-gray-900">{employee.personalInfo.address}</p>
                    </div>
                  </div>
                )}

                {/* Contact Information */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-3">Contact Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>{employee.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>{employee.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Department & Status */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Department</h4>
                    <p className="font-medium text-gray-900">{employee.department}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Status</h4>
                    <span className={`px-2 py-1 text-sm font-medium rounded-full ${
                      employee.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {employee.status}
                    </span>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Hire Date</h4>
                    <p className="font-medium text-gray-900">
                      {new Date(employee.hireDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Salary</h4>
                    <p className="font-medium text-gray-900">{employee.salary}</p>
                  </div>
                </div>

                {/* Job Details */}
                {employee.jobDetails && (
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-3">Job Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Employee ID</h4>
                        <p className="font-medium text-gray-900">{employee.jobDetails.employeeId}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Employment Type</h4>
                        <p className="font-medium text-gray-900">{employee.jobDetails.employmentType}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Work Location</h4>
                        <p className="font-medium text-gray-900">{employee.jobDetails.workLocation}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Reporting Manager</h4>
                        <p className="font-medium text-gray-900">{employee.jobDetails.reportingManager}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Skills */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {employee.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Avatar */}
                <div className="flex flex-col items-center">
                  {employee.employeePhoto ? (
                    <img
                      src={employee.employeePhoto}
                      alt={employee.name}
                      className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                    />
                  ) : (
                    <img
                      src={employee.avatar}
                      alt={employee.name}
                      className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                    />
                  )}
                  <div className="mt-4 text-center">
                    <div className="text-lg font-semibold text-gray-900">{employee.name}</div>
                    <div className="text-gray-600">{employee.position}</div>
                  </div>
                </div>

                {/* Performance */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">Performance</h3>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-blue-700">{employee.performance}</div>
                    <div className="text-gray-600">/ 5.0</div>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    {employee.projects} projects completed
                  </div>
                </div>

                {/* Bank Details */}
                {employee.bankDetails && (
                  <div className="bg-green-50 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-2">Bank Details</h3>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-500">Bank:</span>
                        <span className="font-medium text-gray-900 ml-2">{employee.bankDetails.bankName}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Account:</span>
                        <span className="font-medium text-gray-900 ml-2">****{employee.bankDetails.accountNumber?.slice(-4)}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Type:</span>
                        <span className="font-medium text-gray-900 ml-2">{employee.bankDetails.accountType}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* EPF/ETF Details */}
                {employee.epfEtfDetails && (
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-2">EPF/ETF Details</h3>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-500">EPF No:</span>
                        <span className="font-medium text-gray-900 ml-2">{employee.epfEtfDetails.epfNumber}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">ETF No:</span>
                        <span className="font-medium text-gray-900 ml-2">{employee.epfEtfDetails.etfNumber}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Documents Section */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-3">Documents</h3>
                  <div className="space-y-3">
                    {employee.cvDocument && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span className="text-sm">CV/Resume</span>
                        </div>
                        <button
                          onClick={() => {
                            // Create download link for CV
                            const link = document.createElement('a');
                            link.href = employee.cvDocument.data;
                            link.download = employee.cvDocument.name;
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                          }}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          Download
                        </button>
                      </div>
                    )}
                    
                    {employee.additionalDocuments && employee.additionalDocuments.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Additional Documents</h4>
                        <div className="space-y-2">
                          {employee.additionalDocuments.map((doc, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <span className="text-xs truncate">{doc.name}</span>
                              </div>
                              <button
                                onClick={() => {
                                  // Create download link for additional document
                                  const link = document.createElement('a');
                                  link.href = doc.data;
                                  link.download = doc.name;
                                  document.body.appendChild(link);
                                  link.click();
                                  document.body.removeChild(link);
                                }}
                                className="text-blue-600 hover:text-blue-800 text-xs font-medium"
                              >
                                View
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      // Handle edit (to be implemented)
                      onClose();
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
                  >
                    Edit Employee
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this employee?')) {
                        onDelete(employee.id);
                        onClose();
                      }
                    }}
                    className="w-full border border-red-300 text-red-600 hover:bg-red-50 py-2 rounded-lg transition-colors"
                  >
                    Delete Employee
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className={isDark ? "min-h-screen bg-gray-900" : "min-h-screen bg-gray-50"}>
      <TopNav />
      
      <div className="p-4 md:p-6">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Employee Directory</h1>
              <p className="text-gray-600 mt-1 md:mt-2">Manage your team members and their information</p>
            </div>
            <div className="flex items-center gap-3">
              {/* Add Employee Button */}
              <button
                onClick={handleAddClick}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm md:text-base"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                Add New Employee
              </button>
              
              {/* View Mode Toggle */}
              <div className="flex bg-white rounded-lg border border-gray-300 overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100' : ''}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-gray-100' : ''}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className={isDark ? "bg-gray-800 rounded-xl p-4 border border-gray-700 shadow-sm" : "bg-white rounded-xl p-4 border border-gray-200 shadow-sm"}>
              <div className={`text-2xl font-bold ${isDark ? "text-gray-300" : "text-gray-900"}`}>{stats.total}</div>
              <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>Total Employees</div>
            </div>
            <div className={isDark ? "bg-gray-800 rounded-xl p-4 border border-gray-700 shadow-sm" : "bg-white rounded-xl p-4 border border-gray-200 shadow-sm"}>
              <div className={isDark ? "text-2xl font-bold text-green-400" : "text-2xl font-bold text-green-600"}>{stats.active}</div>
              <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>Active</div>
            </div>
            <div className={isDark ? "bg-gray-800 rounded-xl p-4 border border-gray-700 shadow-sm" : "bg-white rounded-xl p-4 border border-gray-200 shadow-sm"}>
              <div className={isDark ? "text-2xl font-bold text-blue-400" : "text-2xl font-bold text-blue-600"}>{stats.departments}</div>
              <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>Departments</div>
            </div>
            <div className={isDark ? "bg-gray-800 rounded-xl p-4 border border-gray-700 shadow-sm" : "bg-white rounded-xl p-4 border border-gray-200 shadow-sm"}>
              <div className={isDark ? "text-2xl font-bold text-purple-400" : "text-2xl font-bold text-purple-600"}>{stats.avgPerformance}</div>
              <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>Avg Performance</div>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className={isDark ? "bg-gray-800 rounded-xl p-4 mb-6 border border-gray-700 shadow-sm" : "bg-white rounded-xl p-4 mb-6 border border-gray-200 shadow-sm"}>
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className={`w-5 h-5 ${isDark ? "text-gray-500" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search employees by name, position, or email..."
                  className={isDark ? "w-full pl-10 pr-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" : "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"}
                />
              </div>
            </div>

            {/* Department Filter */}
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className={isDark ? "border border-gray-600 rounded-lg px-4 py-2 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500" : "border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"}
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>
                  {dept === 'all' ? 'All Departments' : dept}
                </option>
              ))}
            </select>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={isDark ? "border border-gray-600 rounded-lg px-4 py-2 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500" : "border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"}
            >
              <option value="name">Sort by Name</option>
              <option value="department">Sort by Department</option>
              <option value="hireDate">Sort by Hire Date</option>
              <option value="salary">Sort by Salary</option>
            </select>
          </div>
        </div>

        {/* Employee Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filteredEmployees.map(employee => (
              <EmployeeCard
                key={employee.id}
                employee={employee}
                isDark={isDark}
                onView={() => setSelectedEmployee(employee)}
                onEdit={() => handleEditClick(employee)}
                onDelete={() => handleDeleteEmployee(employee.id)}
              />
            ))}
          </div>
        ) : (
          <div className={isDark ? "bg-gray-800 rounded-xl border border-gray-700 shadow-sm overflow-hidden" : "bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"}>
            <table className="w-full">
              <thead className={isDark ? "bg-gray-700" : "bg-gray-50"}>
                <tr>
                  <th className={isDark ? "px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider" : "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"}>Employee</th>
                  <th className={isDark ? "px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider" : "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"}>Department</th>
                  <th className={isDark ? "px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider" : "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"}>Position</th>
                  <th className={isDark ? "px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider" : "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"}>Status</th>
                  <th className={isDark ? "px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider" : "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"}>Actions</th>
                </tr>
              </thead>
              <tbody className={isDark ? "divide-y divide-gray-700 bg-gray-800" : "divide-y divide-gray-200 bg-white"}>
                {filteredEmployees.map(employee => (
                  <tr key={employee.id} className={isDark ? "hover:bg-gray-700" : "hover:bg-gray-50"}>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {employee.employeePhoto ? (
                          <img src={employee.employeePhoto} alt={employee.name} className="w-10 h-10 rounded-full object-cover" />
                        ) : (
                          <img src={employee.avatar} alt={employee.name} className="w-10 h-10 rounded-full" />
                        )}
                        <div className="ml-4">
                          <div className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>{employee.name}</div>
                          <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>{employee.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        isDark ? "bg-blue-900 text-blue-200" : "bg-blue-50 text-blue-700"
                      }`}>
                        {employee.department}
                      </span>
                    </td>
                    <td className={`px-6 py-4 ${isDark ? "text-gray-300" : "text-gray-900"}`}>{employee.position}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        employee.status === 'active' 
                          ? (isDark ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800')
                          : (isDark ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800')
                      }`}>
                        {employee.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedEmployee(employee)}
                          className={isDark ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-900"}
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleEditClick(employee)}
                          className={isDark ? "text-green-400 hover:text-green-300" : "text-green-600 hover:text-green-900"}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteEmployee(employee.id)}
                          className={isDark ? "text-red-400 hover:text-red-300" : "text-red-600 hover:text-red-900"}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* No Results */}
        {filteredEmployees.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 115.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No employees found</h3>
            <p className="text-gray-600">Add your first employee using the "Add New Employee" button</p>
          </div>
        )}
      </div>

      {/* Employee Detail Modal */}
      {selectedEmployee && (
        <EmployeeModal
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
          onEdit={() => handleEditClick(selectedEmployee)}
          onDelete={handleDeleteEmployee}
        />
      )}

      {/* Add Employee Form Modal */}
      <AddEmployeeForm
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
        currentStep={currentStep}
        formData={formData}
        formErrors={formErrors}
        availableDepartments={availableDepartments}
        handleFormChange={handleFormChange}
        handleFileChange={handleFileChange}
        nextStep={nextStep}
        prevStep={prevStep}
        handleAddEmployee={handleAddEmployee}
        handleCloseAddModal={handleCloseAddModal}
        isDark={isDark}
      />
    </div>
  );
};

export default Employees;