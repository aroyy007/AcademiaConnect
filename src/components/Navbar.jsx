import React from "react";
import { Link } from 'react-router-dom';
import { GraduationCap, Users, Calendar, Bell } from 'lucide-react';
import logo from '../images/logo.png';


function Navbar() {
    return (
        <nav className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        {/* <GraduationCap className="h-8 w-8 text-primary-600" />
                        <span className="ml-2 text-xl font-bold text-gray-900">
                            EDU Social
                        </span> */}
                        <Link to="/">
                            <img src={logo} alt="logo" className="h-20 w-20" />
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link to="/">
                            <button variant="outline" size="sm">
                                Log in
                            </button>
                        </Link>
                        <Link to="/">
                            <button size="sm">Sign up</button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
