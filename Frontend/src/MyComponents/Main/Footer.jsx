import { Brain } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!firstName.trim() || !email.trim()) return;

    alert("Form Submited");
    setFirstName('');
    setEmail('');
    setIsSubmitting(false);
  };

  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-12">
      <div className="container mx-auto px-4">
        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-gray-200">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className='flex gap-2 items-center'>
              <div className='mt-1'>
                <Brain size={30} className='text-[#00b2a9]' />
              </div>
              <h1
                onClick={() => navigate('/')}
                className='cursor-pointer text-2xl md:text-3xl font-bold text-white'
              >
                <span className='text-[#bbc1d1]'>Hire</span><span className='text-[#00b2a9]'>Mind</span>
              </h1>
            </div>
            <p className="text-gray-400 mt-2 mb-4 max-w-md">
              HireMind is your trusted job portal for discovering top career opportunities worldwide. Connect with leading employers, explore jobs tailored to your skills, and take the next step in your professional journey with ease.
            </p>

            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-400 hover:text-[#6A38C2] transition-colors" aria-label="Facebook">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.676 0H1.324C.593 0 0 .592 0 1.324v21.352C0 23.408.593 24 1.324 24H12.82V14.706H9.692v-3.578h3.128V8.408c0-3.1 1.893-4.787 4.657-4.787 1.325 0 2.463.1 2.794.144v3.238l-1.918.001c-1.503 0-1.794.715-1.794 1.762v2.31h3.587l-.468 3.578h-3.119V24h6.116C23.407 24 24 23.408 24 22.676V1.324C24 .592 23.407 0 22.676 0z" />
                </svg>
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-[#6A38C2] transition-colors" aria-label="Twitter">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557a9.835 9.835 0 01-2.828.775 4.934 4.934 0 002.165-2.724 9.867 9.867 0 01-3.127 1.195 4.924 4.924 0 00-8.38 4.49A13.978 13.978 0 011.67 3.149 4.93 4.93 0 003.16 9.724a4.903 4.903 0 01-2.229-.616v.062a4.93 4.93 0 003.946 4.827 4.902 4.902 0 01-2.224.084 4.93 4.93 0 004.6 3.417A9.869 9.869 0 010 21.543a13.978 13.978 0 007.548 2.212c9.057 0 14.01-7.507 14.01-14.01 0-.213-.004-.425-.015-.636A10.012 10.012 0 0024 4.557z" />
                </svg>
              </a>
              <a href="https://linkedin.com" className="text-gray-400 hover:text-[#6A38C2] transition-colors" aria-label="LinkedIn">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452H16.85v-5.569c0-1.327-.027-3.037-1.852-3.037-1.854 0-2.137 1.446-2.137 2.94v5.666H9.147V9.756h3.448v1.464h.05c.48-.91 1.653-1.871 3.401-1.871 3.634 0 4.307 2.39 4.307 5.498v5.605zM5.337 8.29c-1.105 0-2-.896-2-2 0-1.106.895-2 2-2 1.104 0 2 .895 2 2 0 1.104-.896 2-2 2zM7.119 20.452H3.553V9.756h3.566v10.696zM22.225 0H1.771C.791 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451c.979 0 1.771-.774 1.771-1.729V1.729C24 .774 23.205 0 22.225 0z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/" className="hover:text-[#6A38C2] transition-colors">Home</Link></li>
              <li><Link to="/jobs" className="hover:text-[#6A38C2] transition-colors">Job Listings</Link></li>
              <li><Link to="/profile" className="hover:text-[#6A38C2] transition-colors">Profile</Link></li>
            </ul>
          </div>

          {/* Newsletter Signup Form */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Stay Updated</h3>
            <p className="text-sm mb-4 text-gray-400">Subscribe to our newsletter for job alerts and career tips.</p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                className="w-full px-3 py-2 rounded-md bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#6A38C2] focus:border-transparent"
                required
                disabled={isSubmitting}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-3 py-2 rounded-md bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#6A38C2] focus:border-transparent"
                required
                disabled={isSubmitting}
              />
              <button
                type="submit"
                disabled={isSubmitting || !firstName.trim() || !email.trim()}
                className="w-full bg-[#6A38C2] hover:bg-[#5b30a6] text-white py-2 px-4 rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>


        {/* Copyright */}
        <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
          <p>&copy; 2024 Job Hunt. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
