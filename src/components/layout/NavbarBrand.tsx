import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';
import logo from '../logo.png';

export function NavbarBrand() {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <img src={logo} alt="Logo" className="w-28" />
      {/* <span className="text-xl font-bold text-gray-900">EDU Social</span> */}
    </Link>
  );
}