import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

export function NavbarBrand() {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <GraduationCap className="h-8 w-8 text-blue-600" />
      <span className="text-xl font-bold text-gray-900">EDU Social</span>
    </Link>
  );
}