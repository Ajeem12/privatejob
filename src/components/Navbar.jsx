import React, { useState, useEffect, useRef, useContext } from "react";
import {
  FiMenu,
  FiX,
  FiChevronDown,
  FiChevronUp,
  FiUser,
  FiBriefcase,
  FiLogOut,
  FiGrid,
  FiPhone,
  FiMail,
  FiLayers,
  FiHome,
  FiInfo,
  FiMessageSquare,
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaBuilding, FaCity, FaBusinessTime } from "react-icons/fa";
import { MdOutlineFeedback } from "react-icons/md";
const Navbar = () => {
  const { jobSeeker, employer, logoutJobSeeker, logoutEmployer } =
    useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeLoginDropdown, setActiveLoginDropdown] = useState(null);
  const dropdownRef = useRef();
  const loginRef = useRef();

  const navLinks = [
    { label: "Home", path: "/", icon: <FiHome className="mr-2" /> },
    { label: "Jobs", path: "/jobs", icon: <FiBriefcase className="mr-2" /> },
    {
      label: "Categories",
      path: "/categories",
      icon: <FiLayers className="mr-2" />,
    },
    {
      label: "Companies",
      path: "/company",
      icon: <FaBuilding className="mr-2" />,
    },
    { label: "About Us", path: "/about", icon: <FiInfo className="mr-2" /> },
    {
      label: "Contact",
      path: "/contact",
      icon: <FiMessageSquare className="mr-2" />,
    },
    {
      label: "Feedback",
      path: "/feedback",
      icon: <MdOutlineFeedback className="mr-2" />,
    },
  ];

  const isLoggedIn = jobSeeker || employer;
  const currentUser = jobSeeker || employer;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
      if (loginRef.current && !loginRef.current.contains(e.target)) {
        setActiveLoginDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const linkClasses = `text-sm px-4 py-2 rounded-lg font-medium transition-colors duration-300 flex items-center`;

  const handleLogout = () => {
    if (jobSeeker) {
      logoutJobSeeker();
    } else if (employer) {
      logoutEmployer();
    }
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Contact Bar */}
      <div className="bg-cyan-700 text-white text-sm py-2 px-4 shadow-md ">
        <div className="max-w-8xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex  flex-col md:flex-row items-center space-x-6 mb-2 md:mb-0">
            {/* <div className="flex  items-center hover:text-cyan-200 transition-colors">
              <FiPhone className="mr-2" />
              <a href="tel:+91 9179995552" className="hover:underline">+91 9179995552</a>
            </div> */}
            <div className="flex items-center hover:text-cyan-200 transition-colors">
              <FiMail className="mr-2" />
              <a
                href="mailto:info@privatejobsearch.com"
                className="hover:underline"
              >
                info@privatejobsearch.com
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-4">
              <span className="text-cyan-100">Follow us:</span>
              <a href="#" className="hover:text-white transition-colors">
                <FiFacebook className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <FiTwitter className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <FiInstagram className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <FiLinkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="sticky top-0 z-50 bg-white text-gray-800 shadow-sm border-b border-gray-100">
        <div className="max-w-8xl mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <motion.img
                src="/logo.png"
                alt="Logo"
                className="h-14 transition-transform duration-300 group-hover:scale-105"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `${linkClasses} ${
                      isActive
                        ? "bg-blue-50 text-blue-600 font-semibold"
                        : "hover:bg-blue-50 hover:text-blue-600"
                    }`
                  }
                >
                  {link.icon}
                  {link.label}
                </NavLink>
              ))}

              {isLoggedIn ? (
                <div className="relative ml-2" ref={dropdownRef}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() =>
                      setActiveDropdown(
                        activeDropdown === "profile" ? null : "profile"
                      )
                    }
                    className="flex items-center space-x-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg cursor-pointer transition-all"
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <FiUser className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="font-medium truncate max-w-[120px]">
                      {currentUser?.name || "Profile"}
                    </span>
                    {activeDropdown === "profile" ? (
                      <FiChevronUp className="ml-1" />
                    ) : (
                      <FiChevronDown className="ml-1" />
                    )}
                  </motion.button>

                  <AnimatePresence>
                    {activeDropdown === "profile" && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-40"
                      >
                        <Link
                          to={employer ? "/employer" : "/dashboard"}
                          onClick={() => setActiveDropdown(null)}
                          className="flex items-center space-x-3 px-4 py-3 hover:bg-blue-50 transition-colors"
                        >
                          <FiGrid className="w-5 h-5 text-blue-500" />
                          <span>Dashboard</span>
                        </Link>
                        <div className="border-t border-gray-100"></div>
                        <button
                          onClick={handleLogout}
                          className="flex items-center space-x-3 px-4 py-3 w-full text-left text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <FiLogOut className="w-5 h-5" />
                          <span>Logout</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="relative flex space-x-3 ml-3" ref={loginRef}>
                  {/* Job Seeker */}
                  <div className="relative">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() =>
                        setActiveLoginDropdown(
                          activeLoginDropdown === "jobseeker"
                            ? null
                            : "jobseeker"
                        )
                      }
                      className="flex items-center space-x-2 border border-blue-100 px-4 py-2 rounded-lg text-sm bg-white hover:bg-blue-50 text-blue-600 transition-colors"
                    >
                      <FiUser className="text-sm" />
                      <span>Job Seeker</span>
                      {activeLoginDropdown === "jobseeker" ? (
                        <FiChevronUp className="ml-1" />
                      ) : (
                        <FiChevronDown className="ml-1" />
                      )}
                    </motion.button>
                    <AnimatePresence>
                      {activeLoginDropdown === "jobseeker" && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg overflow-hidden z-30 border border-gray-100"
                        >
                          <Link
                            to="/login"
                            className="px-4 py-3 hover:bg-blue-50 text-sm flex items-center transition-colors"
                          >
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                            Login
                          </Link>
                          <Link
                            to="/register"
                            className="px-4 py-3 hover:bg-blue-50 text-sm border-t border-gray-100 flex items-center transition-colors"
                          >
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                            Register
                          </Link>
                          {/* <Link
  to="https://forms.gle/R7SSspNRajBuSwco6"
  target="_blank"
  rel="noopener noreferrer"
  className="px-4 py-3 hover:bg-blue-50 text-sm border-t border-gray-100 flex items-center transition-colors text-black-600"
>
  <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
  Send CV
</Link> */}
                          <Link
                            to="/CandidateEntryForm"
                            className="px-4 py-3 hover:bg-blue-50 text-sm border-t border-gray-100 flex items-center transition-colors"
                          >
                            <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                            {/* Candidate Entry Form */} Submit Your Details
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Employer */}
                  <div className="relative">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() =>
                        setActiveLoginDropdown(
                          activeLoginDropdown === "employer" ? null : "employer"
                        )
                      }
                      className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors shadow-sm"
                    >
                      <FiBriefcase className="text-sm" />
                      <span>Employer</span>
                      {activeLoginDropdown === "employer" ? (
                        <FiChevronUp className="ml-1" />
                      ) : (
                        <FiChevronDown className="ml-1" />
                      )}
                    </motion.button>
                    <AnimatePresence>
                      {activeLoginDropdown === "employer" && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg overflow-hidden z-30 border border-gray-100"
                        >
                          <Link
                            to="/employer/login"
                            className="px-4 py-3 hover:bg-blue-50 text-sm flex items-center transition-colors"
                          >
                            <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                            Employer Login
                          </Link>
                          <Link
                            to="/employer/register"
                            className="px-4 py-3 hover:bg-blue-50 text-sm border-t border-gray-100 flex items-center transition-colors"
                          >
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                            Employer Register
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 hover:text-blue-600 focus:outline-none p-2 rounded-full hover:bg-blue-50 transition-colors"
              >
                {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-white shadow-lg"
            >
              <div className="px-4 py-3 space-y-1">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? "bg-blue-100 text-blue-600 font-medium"
                          : "text-gray-700 hover:bg-blue-50"
                      }`
                    }
                  >
                    {link.icon}
                    {link.label}
                  </NavLink>
                ))}
                {isLoggedIn ? (
                  <>
                    <Link
                      to={employer ? "/employer" : "/dashboard"}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 transition-colors"
                    >
                      <FiGrid className="mr-2" />
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <FiLogOut className="mr-2" />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 transition-colors"
                    >
                      <FiUser className="mr-2" />
                      Job Seeker Login
                    </Link>
                    <Link
                      to="/employer/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 transition-colors"
                    >
                      <FiBriefcase className="mr-2" />
                      Employer Login
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;
