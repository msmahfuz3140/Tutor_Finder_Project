"use client";

import Link from "next/link";
import {
  FaFacebook,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-950 to-gray-900 text-gray-300 mt-20">

      <div className="max-w-7xl mx-auto px-6 py-14 grid sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* LOGO + ABOUT */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Tutors-Finder
          </h2>

          <p className="text-sm leading-relaxed text-gray-400">
            Connect with expert tutors anytime, anywhere.
            Learn smarter, grow faster, and achieve your academic goals with ease.
          </p>
        </div>

        {/* SERVICES */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-5">
            Learning Services
          </h3>

          <ul className="space-y-3 text-sm">
            {[
              { name: "Find Tutor", link: "/tutor" },
              { name: "Become Tutor", link: "/add-tutor" },
              { name: "My Tutors", link: "/my-tutor" },
              { name: "Booked Sessions", link: "/booked-session" },
            ].map((item, i) => (
              <li key={i}>
                <Link
                  href={item.link}
                  className="hover:text-white transition hover:translate-x-1 duration-200 inline-block"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-5">
            Contact Information
          </h3>

          <ul className="space-y-4 text-sm text-gray-400">

            <li className="flex items-center gap-3 hover:text-white transition">
              <MapPin size={18} className="text-blue-500" />
              Mymensingh, Bangladesh
            </li>

            <li className="flex items-center gap-3 hover:text-white transition">
              <Phone size={18} className="text-green-500" />
              +880 1234-567890
            </li>

            <li className="flex items-center gap-3 hover:text-white transition">
              <Mail size={18} className="text-red-500" />
              support@tutorsfinder.com
            </li>

          </ul>
        </div>

        {/* SOCIAL */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-5">
            Follow Us
          </h3>

          <div className="flex gap-4">

            <a
              href="#"
              className="p-3 bg-gray-800 rounded-full hover:bg-blue-600 hover:scale-110 transition duration-300"
            >
              <FaFacebook />
            </a>

            <a
              href="#"
              className="p-3 bg-gray-800 rounded-full hover:bg-gray-600 hover:scale-110 transition duration-300"
            >
              <FaGithub />
            </a>

            <a
              href="#"
              className="p-3 bg-gray-800 rounded-full hover:bg-blue-500 hover:scale-110 transition duration-300"
            >
              <FaLinkedin />
            </a>

          </div>
        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-gray-800 text-center py-5 text-sm text-gray-500">
        © {new Date().getFullYear()}{" "}
        <span className="text-white font-medium">Tutors-Finder</span>.
        All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;