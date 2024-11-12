import React from "react";
import { Link } from 'react-router-dom';
import { GraduationCap, Users, Calendar, Bell } from 'lucide-react';
import navbar from "../components/navbar";
import footer from "../components/footer";


export default function landing() {
    return (
        <>
            <navbar />

            <main>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center">
                        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                            <span className="block">Welcome to</span>
                            <span className="block text-primary-600">East Delta University Social</span>
                        </h1>
                        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                            Connect with your classmates, stay updated with university events, and manage your academic life - all in one place.
                        </p>
                        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                            <Link to="/">
                                <Button size="lg">Get Started</Button>
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
                                description="Access your class schedules and important academic dates in one convenient location."
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


        </>

    );
}