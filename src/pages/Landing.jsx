import { Link } from "react-router-dom";
import { Users, Calendar, Bell } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PropTypes from "prop-types";

function Feature({ icon, title, description }) {
    return (
        <div className="pt-6">
            <div className="flow-root bg-white rounded-lg px-6 pb-8 hover:border hover:shadow-lg hover:shadow-blue-500/50">
                <div className="-mt-6">
                    <div className="inline-flex items-center justify-center p-3 bg-primary-500 rounded-md shadow-lg">
                        {icon}
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                        {title}
                    </h3>
                    <p className="mt-5 text-base text-gray-500">{description}</p>
                </div>
            </div>
        </div>
    );
}

function Landing() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#c7d7f0d7] to-white">
            <Navbar />

            <main>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center">
                        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                            <span className="block">Welcome to</span>
                            <span className="block text-primary-600">
                                East Delta University Social
                            </span>
                        </h1>
                        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                            Connect with your classmates, stay updated with university events,
                            and manage your academic life - all in one place.
                        </p>
                        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                            <Link to="/">
                                <button class="relative group px-6 py-3 text-white uppercase text-lg font-medium transition duration-300 ease-linear bg-[#111827] rounded-[15px] overflow-hidden border-2 border-[#111827] hover:bg-white hover:text-[#111827] hover:border-[#111827]">
                                    Get Started
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className="mt-24">
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            <Feature
                                icon={<Users className="h-6 w-6" />}
                                title="Connect with Peers"
                                description="Build your network within the university community. Connect with classmates and join study groups."
                            />
                            <Feature
                                icon={<Calendar className="h-6 w-6" />}
                                title="Class Routines"
                                description="Access your class schedules, important academic dates, and other essential information all in one convenient location."
                            />
                            <Feature
                                icon={<Bell className="h-6 w-6" />}
                                title="Stay Updated"
                                description="Never miss important university announcements, events, or deadlines with real-time notifications."
                            />
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
Feature.propTypes = {
    icon: PropTypes.element.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

export default Landing;
