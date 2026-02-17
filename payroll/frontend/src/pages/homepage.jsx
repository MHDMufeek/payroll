import React from 'react';
import { Link } from 'react-router-dom';
import LogoSvg from '../assets/react.svg';

const HomePage = () => {
  const company = 'Nexora Solutions';

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-blue-50 to-indigo-50 flex flex-col text-slate-800">
      <header className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-lg">
        <div className="container mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-lg bg-white shadow-md flex items-center justify-center">
              <img src={LogoSvg} alt="logo" className="w-8 h-8" />
            </div>
            <div>
              <div className="text-lg font-bold text-white">{company}</div>
              <div className="text-xs text-blue-100">Smart software & digital services</div>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-sm font-medium text-white hover:text-blue-100 transition">Home</Link>
            <Link to="/about" className="text-sm font-medium text-white hover:text-blue-100 transition">About</Link>
            <Link to="/services" className="text-sm font-medium text-white hover:text-blue-100 transition">Services</Link>
            <Link to="/contact" className="text-sm font-medium text-white hover:text-blue-100 transition">Contact</Link>
          </nav>

          <div className="md:hidden">
            <button className="px-3 py-2 bg-white/20 text-white rounded-md text-sm hover:bg-white/30 transition">Menu</button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-16 flex-1">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <div>
              <h2 className="text-sm uppercase tracking-widest text-blue-600 font-semibold">Welcome to</h2>
              <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent mt-2">{company}</h1>
              <p className="text-lg text-slate-700 mt-2">Digital solutions that scale</p>
            </div>

            <p className="text-lg text-gray-700">
              At {company}, we believe in turning ideas into powerful digital experiences. We are a forward-thinking
              company dedicated to providing innovative technology solutions that help businesses grow, adapt, and succeed
              in today’s fast-changing world.
            </p>

            <p className="text-gray-600">
              With a passionate team of professionals, we specialize in web development, software solutions, and digital
              services tailored to meet our clients’ unique needs. Our mission is to deliver high-quality, reliable, and
              user-friendly solutions while building long-term relationships based on trust and excellence.
            </p>

            <p className="text-gray-600">
              Whether you're a startup looking to build your first online presence or an established business seeking to
              enhance your systems, {company} is your trusted partner for smart and scalable solutions. Let’s build the future together.
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <Link to="/about" className="px-5 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg">Learn More</Link>
              <Link to="/contact" className="px-5 py-3 border-2 border-blue-600 rounded-lg text-blue-700 hover:bg-blue-50 font-medium">Contact Us</Link>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg">
                <h4 className="font-semibold">Web Development</h4>
                <p className="mt-2 text-sm opacity-90">Modern, responsive web apps built to perform.</p>
              </div>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg">
                <h4 className="font-semibold">Custom Software</h4>
                <p className="mt-2 text-sm opacity-90">Tailored internal tools and automations.</p>
              </div>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-orange-500 to-rose-600 text-white shadow-lg">
                <h4 className="font-semibold">Integrations</h4>
                <p className="mt-2 text-sm opacity-90">APIs and workflow integrations to connect systems.</p>
              </div>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-yellow-500 to-amber-600 text-white shadow-lg">
                <h4 className="font-semibold">Design & UX</h4>
                <p className="mt-2 text-sm opacity-90">Usable interfaces with product-minded design.</p>
              </div>
            </div>

            <div className="mt-4">
              <div className="bg-white rounded-2xl shadow p-6">
                <h3 className="text-lg font-semibold">Get started</h3>
                <p className="mt-2 text-sm text-gray-600">Start your journey with our expert team today.</p>
                <div className="mt-4">
                  <Link to="/contact" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Contact Sales</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 border-t">
        <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded bg-white shadow-md flex items-center justify-center">
              <img src={LogoSvg} alt="logo" className="w-5 h-5" />
            </div>
            <div className="text-sm text-white/90">© {new Date().getFullYear()} {company}. All rights reserved.</div>
          </div>

          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <Link to="/login" className="text-sm px-4 py-2 bg-white text-blue-600 rounded-md font-medium hover:bg-blue-50 transition shadow-md">HR Login</Link>
            <Link to="/apply-leave" className="text-sm px-4 py-2 border-2 border-white text-white rounded-md hover:bg-white/10 transition font-medium">Apply Leave</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
