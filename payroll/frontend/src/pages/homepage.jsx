// src/components/LandingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

// Inline lightweight SVG components to avoid adding @heroicons/react dependency
const BuildingOffice2Icon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
    <rect x="3" y="4" width="18" height="16" rx="2" strokeWidth="1.5" />
    <path d="M8 12h8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CalendarDaysIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
    <rect x="3" y="5" width="18" height="16" rx="2" strokeWidth="1.5" />
    <path d="M16 3v4M8 3v4M3 11h18" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowRightIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
    <path d="M5 12h14M13 5l6 7-6 7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const UserGroupIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
    <path d="M17 21v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="7" r="4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ShieldCheckIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
    <path d="M12 2l7 4v5c0 5-3.58 9-7 11-3.42-2-7-6-7-11V6l7-4z" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 12l2 2 4-4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChartBarIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
    <path d="M3 3v18h18" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="7" y="10" width="2" height="7" rx="1" strokeWidth="1.5" />
    <rect x="11" y="7" width="2" height="10" rx="1" strokeWidth="1.5" />
    <rect x="15" y="4" width="2" height="13" rx="1" strokeWidth="1.5" />
  </svg>
);

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <BuildingOffice2Icon className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-800">LeaveTrack</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                to="/login" 
                className="px-4 py-2 text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition"
              >
                Sign In
              </Link>
              <Link 
                to="/apply-leave" 
                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-md"
              >
                Apply Leave
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              Streamlined Leave Management
              <span className="text-blue-600 block">For Modern Teams</span>
            </h1>
            <p className="mt-6 text-xl text-gray-600">
              A comprehensive leave management system that simplifies employee time-off requests, 
              approvals, and tracking for organizations of all sizes.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link 
                to="/login" 
                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-lg"
              >
                Employee Login
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                to="/apply-leave" 
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-50 transition border-2 border-blue-600"
              >
                Quick Leave Application
                <CalendarDaysIcon className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-1">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 text-white">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold">Leave Application</h3>
                  <CalendarDaysIcon className="h-8 w-8" />
                </div>
                <p className="text-blue-100">
                  Submit leave requests in under 2 minutes. Get instant notifications and track approval status in real-time.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-blue-600 font-bold text-3xl">24/7</div>
                  <div className="text-gray-600">Access</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-blue-600 font-bold text-3xl">99%</div>
                  <div className="text-gray-600">Approval Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Why Choose Our System
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <UserGroupIcon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Employee Focused</h3>
              <p className="text-gray-600">
                Easy-to-use interface for employees to apply, track, and manage their leave requests.
              </p>
            </div>
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <ShieldCheckIcon className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure & Compliant</h3>
              <p className="text-gray-600">
                Enterprise-grade security with compliance to labor laws and company policies.
              </p>
            </div>
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                <ChartBarIcon className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Analytics Dashboard</h3>
              <p className="text-gray-600">
                Comprehensive reports and insights for better workforce management.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Cards */}
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Quick Actions
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-white transform hover:-translate-y-2 transition duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">Employee Login</h3>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <UserGroupIcon className="h-6 w-6" />
              </div>
            </div>
            <p className="text-blue-100 mb-8">
              Access your dashboard to view leave balance, submit requests, and check approvals.
            </p>
            <Link 
              to="/login"
              className="inline-flex items-center justify-center w-full py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition"
            >
              Go to Login
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
          </div>
          
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-8 text-white transform hover:-translate-y-2 transition duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">Apply for Leave</h3>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <CalendarDaysIcon className="h-6 w-6" />
              </div>
            </div>
            <p className="text-green-100 mb-8">
              Quick leave application without login. Perfect for urgent requests or first-time users.
            </p>
            <Link 
              to="/apply-leave"
              className="inline-flex items-center justify-center w-full py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-100 transition"
            >
              Apply Now
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <BuildingOffice2Icon className="h-6 w-6 text-blue-400" />
              <span className="text-xl font-bold">LeaveTrack Pro</span>
            </div>
            <div className="text-gray-400">
              © {new Date().getFullYear()} Leave Management System. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;