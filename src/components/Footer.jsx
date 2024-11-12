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
                                <span>+ 88 0963 81444 13</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail size={18} />
                                <span>enquiry@eastdelta.edu.bd</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="https://www.eastdelta.edu.bd/home" className="hover:text-white transition">About University</a></li>
                            <li><a href="https://www.eastdelta.edu.bd/programs-offered-by-the-university/" className="hover:text-white transition">Academic Programs</a></li>
                            <li><a href="https://edu.orbund.com/einstein-freshair/index.jsp" className="hover:text-white transition">Student Portal</a></li>
                            <li><a href="https://www.eastdelta.edu.bd/important-links" className="hover:text-white transition">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold text-lg mb-4">Connect With Us</h3>
                        <p className="mb-4">Follow us on social media for updates and news.</p>
                        <div className="flex gap-4">
                            <a href="https://www.facebook.com/eastdeltauniversity1" className="hover:text-white transition">Facebook</a>
                            <a href="https://www.youtube.com/c/EastDeltaUniversity1" className="hover:text-white transition">YouTube</a>
                            <a href="https://www.linkedin.com/school/eastdeltauniversity/" className="hover:text-white transition">LinkedIn</a>
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
