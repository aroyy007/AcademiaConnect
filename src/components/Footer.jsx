import React from "react";
import { Mail, Phone, MapPin } from 'lucide-react';

export default function footer() {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-4">Contact Us</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <MapPin size={18} />
                                <span>Chittagong, Bangladesh</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone size={18} />
                                <span>+880 123 456 789</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail size={18} />
                                <span>info@eastdelta.edu.bd</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-white transition">About University</a></li>
                            <li><a href="#" className="hover:text-white transition">Academic Programs</a></li>
                            <li><a href="#" className="hover:text-white transition">Student Portal</a></li>
                            <li><a href="#" className="hover:text-white transition">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold text-lg mb-4">Connect With Us</h3>
                        <p className="mb-4">Follow us on social media for updates and news.</p>
                        <div className="flex gap-4">
                            <a href="#" className="hover:text-white transition">Facebook</a>
                            <a href="#" className="hover:text-white transition">Twitter</a>
                            <a href="#" className="hover:text-white transition">LinkedIn</a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                    <p>&copy; {new Date().getFullYear()} East Delta University. All rights reserved.</p>
                </div>
            </div>
        </footer>

    );

}