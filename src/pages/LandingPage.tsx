import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Users, Calendar, Bell } from 'lucide-react';
import { LandingNavbar } from '../components/layout/LandingNavbar';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <LandingNavbar />

      {/* Hero Section */}
      <div className="relative pt-16">
        <div className="absolute inset-x-0 top-0 h-[600px] md:h-[700px]">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="East Delta University Campus"
          />
          <div className="absolute inset-0 bg-gray-900 bg-opacity-70"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:py-32 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
              Welcome to EDU Social
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-300">
              Connect with fellow students, share updates, and stay informed about everything happening at East Delta University.
            </p>
            <div className="mt-10">
              <Link
                to="/signup"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Join Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              Everything you need in one place
            </h2>
          </div>

          <div className="mt-20">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <FeatureCard
                icon={<Users className="h-6 w-6 text-white" />}
                title="Connect with Peers"
                description="Build your network with fellow students and stay connected."
              />
              <FeatureCard
                icon={<GraduationCap className="h-6 w-6 text-white" />}
                title="Academic Updates"
                description="Stay updated with important academic announcements and events."
              />
              <FeatureCard
                icon={<Calendar className="h-6 w-6 text-white" />}
                title="Class Routines"
                description="Access your class schedules and routines easily."
              />
              <FeatureCard
                icon={<Bell className="h-6 w-6 text-white" />}
                title="Instant Notifications"
                description="Never miss important updates with real-time notifications."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
              <p className="text-gray-300">East Delta University</p>
              <p className="text-gray-300">Abdullah Al Noman Road, Noman Society</p>
              <p className="text-gray-300">Chittagong, Bangladesh</p>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://www.eastdelta.edu.bd"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Official Website
                  </a>
                </li>
                <li>
                  <Link to="/login" className="text-gray-300 hover:text-white transition-colors">
                    Student Portal
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Facebook
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Twitter
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8">
            <p className="text-center text-gray-400">
              © {new Date().getFullYear()} East Delta University. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="pt-6">
      <div className="flow-root bg-white rounded-lg px-6 pb-8">
        <div className="-mt-6">
          <div className="inline-flex items-center justify-center p-3 bg-blue-600 rounded-md shadow-lg">
            {icon}
          </div>
          <h3 className="mt-8 text-lg font-medium text-gray-900">{title}</h3>
          <p className="mt-5 text-base text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  );
}