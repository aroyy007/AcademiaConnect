import React from 'react';
import { NavbarBrand } from './NavbarBrand';
import { NavbarLinks } from './NavbarLinks';
import { NavbarMobile } from './NavbarMobile';
import { NavbarActions } from './NavbarActions';
import { UserSearch } from '../friends/UserSearch';
import { useAuthStore } from '../../store/auth';

export function Navbar() {
  const { isAuthenticated } = useAuthStore();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <NavbarBrand />
            {isAuthenticated && (
              <div className="ml-8">
                <UserSearch />
              </div>
            )}
          </div>

          <div className="flex items-center">
            <NavbarLinks />
            <NavbarMobile />
            <NavbarActions />
          </div>
        </div>
      </div>
    </nav>
  );
}