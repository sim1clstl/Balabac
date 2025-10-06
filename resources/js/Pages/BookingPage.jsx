// resources/js/Pages/BookingPage.jsx
import React from "react";
import { FaClipboardCheck, FaCalendarAlt, FaUserFriends, FaMapMarkerAlt } from "react-icons/fa";

export default function BookingPage() {
  return (
    <>
      {/* Navbar (reuse from homepage) */}
      <header className="fixed top-0 left-0 w-full z-50">
        <div className="flex items-center justify-between px-6 md:px-16 py-6">
          <div className="flex items-center gap-10">
            <button className="text-white text-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <nav className="hidden md:flex items-center gap-8 text-white font-semibold tracking-wide text-base">
              <a href="#" className="hover:text-cyan-300">HOME</a>
              <a href="#" className="hover:text-cyan-300">TOURS</a>
              <a href="#" className="hover:text-cyan-300">PACKAGES</a>
            </nav>
          </div>

          <div className="text-center">
            <img src="/logo.png" alt="Palawan Tours" className="h-20 mx-auto" />
          </div>

          <div>
            <a
              href="#"
              className="bg-brand-cyan hover:text-cyan-100 hover:bg-cyan-600 text-white font-bold px-6 py-3 rounded-full shadow-md flex items-center gap-2 transition"
            >
              <FaClipboardCheck className="text-lg" />
              BOOK NOW
            </a>
          </div>
        </div>
      </header>

      {/* Hero / Banner */}
      <section
        className="relative h-[50vh] w-full bg-cover bg-center"
        style={{
          backgroundImage: "url('/cover photo.png')",
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-[#EFE9DF]"></div>

        <div className="relative z-10 text-center text-white top-1/2 transform -translate-y-1/2 px-4">
          <h1 className="text-4xl md:text-5xl font-bold">
            El Nido to Coron Boat Expedition
          </h1>
          <p className="mt-3 text-lg">3 Days / 2 Nights · Island Hopping Adventure</p>
        </div>
      </section>

      {/* Booking Content */}
      <main className="bg-[#EFE9DF] text-gray-800">
        <section className="max-w-5xl mx-auto py-16 px-6">
          <div className="grid md:grid-cols-3 gap-10">
            {/* Left Content */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-brand-blue mb-3">
                  El Nido to Coron Boat Trip (3D2N Expedition)
                </h2>
                <p className="text-gray-600 mb-4">
                  Discover the stunning islands between El Nido and Coron on a 3-day expedition.
                  Experience camping under the stars, snorkeling, and exploring hidden lagoons and
                  white sand beaches.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-brand-green" />
                    <span>Available: Mondays, Wednesdays, and Saturdays</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaUserFriends className="text-brand-green" />
                    <span>Max 18 guests per boat</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-brand-green" />
                    <span>Start: El Nido · End: Coron</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaClipboardCheck className="text-brand-green" />
                    <span>Includes meals, tents, and island fees</span>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-brand-blue mb-2">What’s Included</h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>All meals during the expedition</li>
                  <li>Drinking water, coffee, and tea</li>
                  <li>Tent accommodations on the islands</li>
                  <li>Island entrance fees and environmental fees</li>
                  <li>Snorkeling gear and life jackets</li>
                  <li>Professional local guides and boat crew</li>
                </ul>

                <h3 className="text-lg font-semibold text-brand-blue mt-6 mb-2">
                  What to Bring
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>Personal towel and toiletries</li>
                  <li>Swimsuit, dry bag, sunscreen, insect repellent</li>
                  <li>Power bank (limited electricity on islands)</li>
                </ul>

                <h3 className="text-lg font-semibold text-brand-blue mt-6 mb-2">Sample Itinerary</h3>
                <p className="text-gray-700">
                  Each expedition may vary depending on weather, but generally includes visits to
                  Linapacan Islands, stunning lagoons, and hidden beaches between El Nido and Coron.
                </p>
              </div>
            </div>

            {/* Right Sidebar / Booking Card */}
            <div>
              <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24">
                <h3 className="text-xl font-bold text-brand-blue mb-3">Book This Trip</h3>
                <p className="text-gray-700 mb-4">₱26,800 / person</p>

                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1">Name</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-green outline-none"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-1">Email</label>
                    <input
                      type="email"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-green outline-none"
                      placeholder="you@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-1">Travel Date</label>
                    <input
                      type="date"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-green outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-1">Number of Guests</label>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-green outline-none"
                      placeholder="1"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-brand-green text-white font-semibold py-3 rounded-full hover:bg-green-700 transition"
                  >
                    Confirm Booking
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Footer (reuse same as homepage) */}
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
