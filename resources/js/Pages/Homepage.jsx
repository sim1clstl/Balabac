import React from "react";
import { FaClipboardCheck } from "react-icons/fa";

// src/pages/Homepage.jsx
export default function Homepage() {
    return (
        <>
            {/* Navbar */}
            <header className="absolute top-0 left-0 w-full z-50">
      <div className="flex items-center justify-between px-6 md:px-16 py-6">
        
        {/* Left side: Hamburger + Menu */}
        <div className="flex items-center gap-10">
          {/* Hamburger */}
          <button className="text-white text-2xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Links */}
          <nav className="hidden md:flex items-center gap-8 text-white font-semibold tracking-wide text-base">
            <a href="#" className="hover:text-cyan-300">HOME</a>
            <a href="#" className="hover:text-cyan-300">TOURS</a>
            <a href="#" className="hover:text-cyan-300">PACKAGES</a>
          </nav>
        </div>

        {/* Logo */}
        <div className="text-center">
          <img src="/logo.png" alt="Palawan Tours" className="h-20 mx-auto" />
        </div>

        {/* Right side: Book Now */}
        <div>
          <a
            href="#"
            className="bg-brand-cyan hover:text-cyan-100 hover:bg-cyan-600 text-white font-bold px-6 py-3 rounded-full shadow-md flex items-center gap-2 transition"
          >
            <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="w-4 h-4 md:w-6 md:h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12l14-7-7 14-2-5-5-2z"
                  />
                </svg>
            BOOK NOW
          </a>
        </div>
      </div>
    </header>

            {/* Hero Section */}
            <section
                id="home"
                className="relative h-[60vh] w-full bg-cover bg-center"
                style={{
                    backgroundImage: "url('/cover photo.png')",
                }}
            >
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/20"></div>

                {/* Fade to next section */}
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-[#EFE9DF]"></div>
            </section>

            <main className="bg-[#EFE9DF] text-gray-800">
                {/* A tropical, barefoot paradise */}
                <section className="text-center py-10 px-4">
                    <h2 className="text-brand-blue font-bold text-4xl">
                    A tropical, barefoot paradise
                    </h2>
                    <h3 className="text-brand-green text-xs font-thin mt-1 uppercase tracking-widest">
                    At one with the Palawan sun
                    </h3>
                    <p className="mt-4 max-w-2xl mx-auto text-gray-600">
                    Experience the pristine beaches, underground rivers, &
                    breathtaking landscapes of the world’s most beautiful island.
                    Surrender to a tropical island adventure built exactly for you.
                    </p>
                    <button className="mt-6 px-6 py-3 bg-white text-brand-blue rounded-full font-semibold shadow hover:bg-brand-blue hover:text-white transition">
                        <span className="flex items-center justify-center gap-2">
                            <FaClipboardCheck />
                            Check my booking
                        </span>
                    </button>
                </section>

                {/* Popular Packages */}
                <section className="py-10 px-4">
                    <h2 className="text-center text-brand-blue font-bold text-3xl">
                    Our most popular <span className="text-brand-green">tour packages</span>
                    </h2>
                    <p className="text-center text-gray-600 mt-2">
                    Discover the best of Palawan with our carefully curated tour packages,
                    designed to give you unforgettable experiences.
                    </p>

                    {/* Package Cards */}
                    <div className="mt-10 grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {/* Card 1 */}
                    <div className="bg-white rounded-2xl shadow-md overflow-hidden p-4">
                        <div className="bg-gray-300 h-48 w-full rounded-lg"></div>
                        <h3 className="mt-4 font-bold text-lg">
                        Sabalate Eco Resort All-in Package
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">3 Days / 2 Nights</p>
                        <p className="text-teal-600 font-semibold mt-2">₱26,800 / person</p>
                        <button className="mt-4 px-5 py-2 bg-teal-500 text-white rounded-full font-medium shadow hover:bg-teal-600">
                        Book this package
                        </button>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white rounded-2xl shadow-md overflow-hidden p-4">
                        <div className="bg-gray-300 h-48 w-full rounded-lg"></div>
                        <h3 className="mt-4 font-bold text-lg">
                        Sabalate Eco Resort All-in Package
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">3 Days / 2 Nights</p>
                        <p className="text-teal-600 font-semibold mt-2">₱21,300 / person</p>
                        <button className="mt-4 px-5 py-2 bg-teal-500 text-white rounded-full font-medium shadow hover:bg-teal-600">
                        Book this package
                        </button>
                    </div>
                    </div>
                </section>

                {/* Why choose us */}
                <div className="bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-white"></div>
                <section className="py-10 bg-white text-center">
                    
                    <h2 className="text-2xl md:text-3xl font-bold">Why choose us?</h2>
                    <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div
                        key={i}
                        className="p-4 bg-gray-200 rounded-lg shadow text-sm font-medium"
                        >
                        We are cool
                        </div>
                    ))}
                    </div>
                </section>

                {/* See the Sights */}
                <section className="py-16 px-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-center">
                    See the Sights
                    </h2>
                    <div className="mt-8 bg-gray-300 h-64 md:h-96 w-full rounded-lg"></div>
                </section>

                {/* Rooms and Villas */}
                <section className="py-16 px-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-center">
                    Rooms and Villas
                    </h2>
                    <div className="mt-8 bg-gray-300 h-64 md:h-96 w-full rounded-lg"></div>
                </section>

                {/* Experiences */}
                <section className="py-16 px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto text-center">
                    <div>
                    <div className="bg-gray-300 h-40 w-full rounded-lg"></div>
                    <h3 className="mt-3 font-bold text-lg text-teal-600">
                        Holiday Experiences
                    </h3>
                    </div>
                    <div>
                    <div className="bg-gray-300 h-40 w-full rounded-lg"></div>
                    <h3 className="mt-3 font-bold text-lg text-teal-600">
                        Wonders in the Making
                    </h3>
                    </div>
                    <div>
                    <div className="bg-gray-300 h-40 w-full rounded-lg"></div>
                    <h3 className="mt-3 font-bold text-lg text-teal-600">
                        Love and Romance
                    </h3>
                    </div>
                    <div>
                    <div className="bg-gray-300 h-40 w-full rounded-lg"></div>
                    <h3 className="mt-3 font-bold text-lg text-teal-600">
                        Dive and Discover
                    </h3>
                    </div>
                </section>

                {/* FAQ */}
                <section className="py-16 bg-white px-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-center">
                    Frequently Asked Questions
                    </h2>
                    <p className="mt-2 text-gray-600 text-center">
                    Everything you need to know about booking your perfect Palawan
                    Adventure
                    </p>
                    <div className="mt-10 max-w-3xl mx-auto space-y-4">
                    {Array.from({ length: 7 }).map((_, i) => (
                        <details
                        key={i}
                        className="bg-gray-100 rounded-lg p-4 cursor-pointer"
                        >
                        <summary className="font-medium">
                            Here’s some questions people often asked when booking a tour to
                            palawan, right?
                        </summary>
                        <p className="mt-2 text-gray-600">
                            Answer content goes here. You can expand and collapse this item.
                        </p>
                        </details>
                    ))}
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-teal-700 text-white py-12 px-6">
                    <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto text-sm">
                    <div>
                        <h3 className="font-bold mb-2">Palawan Tours</h3>
                        <p>
                        Experience the most beautiful island in the world. Book guided
                        tours, accommodations, and unforgettable adventures.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-bold mb-2">Quick Links</h3>
                        <ul className="space-y-1">
                        <li>Home</li>
                        <li>Tours</li>
                        <li>Packages</li>
                        <li>Contact</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-2">Popular Destinations</h3>
                        <ul className="space-y-1">
                        <li>El Nido</li>
                        <li>Coron</li>
                        <li>Puerto Princesa</li>
                        <li>Port Barton</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-2">Contact Info</h3>
                        <ul className="space-y-1">
                        <li>123 Palawan Street, Palawan</li>
                        <li>+63 912 345 6789</li>
                        <li>info@palawantours.com</li>
                        </ul>
                    </div>
                    </div>
                    <p className="text-center text-xs mt-8">
                    © 2025 Palawan Tours. All rights reserved.
                    </p>
                </footer>
                </main>
        </>
    );
}
