import React from "react";
import { Link } from 'react-router-dom';
import { GraduationCap, Users, Calendar, Bell } from 'lucide-react';

function navbar() {
    return (
        <nav className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <GraduationCap className="h-8 w-8 text-primary-600" />
                        <span className="ml-2 text-xl font-bold text-gray-900">
                            EDU Social
                        </span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link to="/">
                            <Button variant="outline" size="sm">
                                Log in
                            </Button>
                        </Link>
                        <Link to="/">
                            <Button size="sm">Sign up</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default navbar;
