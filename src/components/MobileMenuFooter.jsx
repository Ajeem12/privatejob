import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FiHome, FiBriefcase, FiList, FiUser, FiPlus, FiSettings } from "react-icons/fi";
const menuItems = [
  {
    name: "Home",
    to: "/",
    icon: <FiHome className="w-6 h-6 mb-1" />,
  },
  {
    name: "Jobs",
    to: "/jobs",
    icon: <FiBriefcase className="w-6 h-6 mb-1" />,
  },
  {
    name: "Categories",
    to: "/categories",
    icon: <FiList className="w-6 h-6 mb-1" />,
  },
  {
    name: "Account",
    to: "/login",
    icon: <FiUser className="w-6 h-6 mb-1" />,
  },
];

const employerMenuItems = [
  {
    name: "Home",
    to: "/",
    icon: <FiHome className="w-6 h-6 mb-1" />,
  },
  {
    name: "Post Job",
    to: "/employer/postJob",
    icon: <FiPlus className="w-6 h-6 mb-1" />,
  },
  {
    name: "Manage Jobs",
    to: "/employer/manageJob",
    icon: <FiSettings className="w-6 h-6 mb-1" />,
  },
  {
    name: "Account",
    to: "/login",
    icon: <FiUser className="w-6 h-6 mb-1" />,
  },
];
const MobileMenuFooter = () => {
  const { jobSeeker, employer } = useContext(AuthContext);

  // Determine the correct account link based on login status
  const getAccountLink = () => {
    if (employer) return "/employer";
    if (jobSeeker) return "/dashboard";
    return "/login";
  };

  // Choose menu based on if employer is logged in or not
  const currentMenu = employer ? employerMenuItems : menuItems;

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-cyan-600  text-white shadow-lg md:hidden z-50">
      <ul className="flex justify-around items-center h-20">
        {currentMenu.map((item) => {
          // Override the "Account" link if logged in
          const linkTo = item.name === "Account" ? getAccountLink() : item.to;
          const displayName =
            item.name === "Account" && (employer || jobSeeker) ? "Profile" : item.name;

          return (
            <li key={item.name}>
              <Link
                to={linkTo}
                className="flex flex-col items-center text-xs text-white hover:text-yellow-300 transition-colors duration-300"
              >
                {item.icon}
                {displayName}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default MobileMenuFooter;
