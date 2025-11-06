import { Link } from "react-router-dom";
import { fetchCategories } from "../redux/slice/categoriesSlice";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useRef } from "react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Job Listings", href: "/jobs" },
  { label: "Contact", href: "/contact" },
  { label: "Feedback", href: "/feedback" },
];

const contactInfo = [
  {
    icon: (
      <svg
        className="w-5 h-5 mr-3 text-cyan-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    text: "info@privatejobsearch.com",
  },
  {
    icon: (
      <svg
        className="w-5 h-5 mr-3 text-cyan-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    text: "Mon-Sat: 9:00 AM - 6:00 PM",
  },
];

const Footer = () => {
  const dispatch = useDispatch();
  const {
    items: categories = [],
    loading,
    error,
  } = useSelector((state) => state.categories);
  const [visitors, setVisitors] = useState(0);
  const didInsertVisitor = useRef(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (didInsertVisitor.current) return;
    didInsertVisitor.current = true;

    const insertVisitor = async () => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/insert_visitor`,
          {
            url: window.location.href,
            ip: "",
          }
        );

        console.log("API Response:", res.data);

        if (res.data.status === "success") {
          setVisitors(res.data.counter);
        }
      } catch (error) {
        console.error("Visitor insert error:", error);
      }
    };

    insertVisitor();
  }, []);

  const topCategories = categories.slice(0, 5);

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="text-xl font-bold">Private Job Search</div>
            <p className="text-gray-300">
              Your trusted partner in finding the right career opportunities and
              the best talent for your organization.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold relative pb-2 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-12 after:bg-cyan-500">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-white transition duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services from Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold relative pb-2 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-12 after:bg-cyan-500">
              Services
            </h3>
            <ul className="space-y-2">
              {topCategories.map((category) => (
                <li key={category.id}>
                  <Link
                    to={`/jobs?cat=${category.id}`}
                    className="text-gray-300 hover:text-white transition duration-300"
                  >
                    {category.category_name_eng}
                  </Link>
                </li>
              ))}
            </ul>

            {categories.length > 5 && (
              <Link
                to="/categories"
                className="inline-block text-sm text-cyan-400 hover:text-white transition duration-300 mt-2"
              >
                See More →
              </Link>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold relative pb-2 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-12 after:bg-cyan-500">
              Contact Us
            </h3>
            <ul className="space-y-3">
              {contactInfo.map((item, i) => (
                <li key={i} className="flex items-start">
                  {item.icon}
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; 2023 Private Job Search. All rights reserved.
            </p>
            <p
              className="text-center mt-2 text-sm md:text-base font-semibold text-cyan-400 tracking-wide 
            drop-shadow-[0_0_8px_rgba(0,255,255,0.6)] 
            hover:drop-shadow-[0_0_12px_rgba(0,255,255,0.9)] 
            transition-all duration-300 ease-in-out "
            >
              Visitors:{" "}
              <span
                className="text-white-400 font-bold text-lg drop-shadow-[0_0_8px_rgba(0,255,255,0.6)] 
            hover:drop-shadow-[0_0_12px_rgba(0,255,255,0.9)] 
            transition-all duration-300 ease-in-out"
              >
                {visitors}
              </span>
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {["Privacy Policy", "Terms of Service", "Sitemap"].map(
                (text, i) => (
                  <a
                    key={i}
                    href="#"
                    className="text-gray-400 hover:text-white text-sm transition duration-300"
                  >
                    {text}
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
