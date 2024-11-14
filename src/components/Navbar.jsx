import React from "react";
import { Link } from "react-router-dom";
import { GraduationCap, Users, Calendar, Bell } from "lucide-react";
import logo from "../images/logo.png";

function Navbar() {
    return (
        <nav className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/">
                            <img src={logo} alt="logo" className="h-20 w-20" />
                        </Link>
                    </div>
                    <div className="flex items-center space-x-6"> 
                        <Link to="/">
                            <button className="relative h-10 w-24 bg-transparent cursor-pointer border-2 border-gray-800 overflow-hidden rounded-full text-gray-800 transition-all duration-500 ease-in-out hover:bg-[#111827] hover:text-white">
                                <span className="z-10 tracking-widest">Login</span>
                                <span className="absolute inset-0 bg-gray-800 rounded-full transition-all duration-500 ease-in-out transform scale-0 hover:scale-[100]"></span>
                            </button>
                        </Link>
                        <Link to="/">
                            <button className="relative h-10 w-24 bg-[#111827] text-white cursor-pointer border-2 border-transparent overflow-hidden rounded-full transition-all duration-500 ease-in-out hover:bg-white hover:text-[#111827]">
                                <span className="z-10 tracking-widest">SignUp</span>
                                <span className="absolute inset-0 bg-[#111827] rounded-full transition-all duration-500 ease-in-out transform scale-0 hover:scale-[100]"></span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
