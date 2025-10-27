import React from "react";
import {
   FaRegListAlt ,
  FaUserCircle
} from "react-icons/fa";
import {

  FiLogOut,
  FiLock 
} from "react-icons/fi";
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // Adjust the path if needed
import { FaTachometerAlt, FaPlusCircle, FaTasks, FaSearch } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { fetchEmployerProfile } from '../redux/slice/employeer/employerSlice';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { useState } from "react";
import { FaUser } from 'react-icons/fa';
import { FaBan } from "react-icons/fa";
const EmployeeSideBar = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const { profile, loading, error, updating } = useSelector((state) => state.employer);
const [showMoreMenu, setShowMoreMenu] = useState(false);
  const { logoutEmployer } = useContext(AuthContext);
  const navigate = useNavigate();

    useEffect(() => {
      dispatch(fetchEmployerProfile());
    
    }, [dispatch]);

      const toggleMoreMenu = () => {
    setShowMoreMenu(!showMoreMenu);
  };

  const navItems = [
  {
    name: "Dashboard",
    icon: <FaTachometerAlt className="text-lg" />,
    to: "/employer",
  },
  {
    name: "Post Job",
    icon: <FaPlusCircle className="text-lg" />,
    to: "/employer/postJob",
  },
  {
    name: "Manage Jobs",
    icon: <FaTasks className="text-lg" />,
    to: "/employer/manageJob",
  },
  {
    name: "Search",
    icon: <FaSearch className="text-lg" />,
    to: "/employer/search",
  },
  {
  name: "Profile",
  icon: <FaUserCircle className="text-lg" />,
  to: "/employer/profile",
},
{
  name: "Rejected List",
  icon: <FaBan className="text-lg" />,
  to: "/employer/reject",
},
{
  name: "Job Category",
  icon: <FaRegListAlt className="text-lg" />,
  to: "/employer/job_category",
},
{
  name: "Change password",
  icon: <FiLock  className="text-lg" />,
  to: "/employer/changepassword",
}

];


const logoUrl = profile?.logo
  ? `${import.meta.env.VITE_MEDIA_URL}/storage/${profile.logo.replace(/^\/+/, '')}`
  : null;


const handleLogout = () => {
    logoutEmployer();
    navigate("/"); 
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-80 rounded-xl h-screen bg-white border-r border-gray-100 shadow-sm">
        {/* Logo */}
        {/* <div className="px-6 py-5">
          <h1 className="text-2xl font-bold text-cyan-600">DashBoard</h1>
        </div> */}

        {/* User Profile */}
       <div className="px-6 py-4 flex items-center gap-3 border-b border-gray-100">
 <div className="relative">
  {logoUrl ? (
    <img
      src={logoUrl}
      alt="Company Logo"
      className="w-10 h-10 rounded-full object-cover border-2 border-cyan-100"
    />
  ) : (
    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border-2 border-cyan-100">
      <FaUser className="text-gray-400 text-sm" />
    </div>
  )}
  
</div>
  <div>
    <p className="font-medium text-gray-800">{profile?.company_name || 'Company'}</p>
    <span className="text-xs text-gray-500">{profile?.email || 'email@company.com'}</span>
  </div>
</div>


        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.to}
                  className={`flex items-center justify-between gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all
    ${
      location.pathname === item.to
        ? "bg-cyan-500 text-white shadow-md"
        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
    }
  `}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-lg ${
                        location.pathname === item.to
                          ? "text-white"
                          : "text-gray-400"
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                  </div>

                  {item.notification && (
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                        location.pathname === item.to
                          ? "bg-white text-cyan-600"
                          : "bg-cyan-500 text-white"
                      }`}
                    >
                      {item.notification}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="px-3 py-4 border-t border-gray-100">
            <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
          >
            <FiLogOut size={18} className="text-gray-400" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
    
  <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="flex justify-around items-center h-16 px-2 relative">
          {navItems.slice(0, 3).map((item) => (
            <Link
              key={item.name}
              to={item.to}
              className={`flex flex-col items-center justify-center px-2 py-2 flex-1 ${
                location.pathname === item.to
                  ? "text-cyan-600"
                  : "text-gray-500 hover:text-cyan-500"
              }`}
              onClick={() => setShowMoreMenu(false)}
            >
              <div className="relative">
                {item.icon}
                {item.notification && (
                  <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                    {item.notification}
                  </span>
                )}
              </div>
              <span className="text-xs mt-1">{item.name}</span>
              {location.pathname === item.to && (
                <div className="absolute bottom-0 w-full h-1 bg-cyan-600 rounded-t-full"></div>
              )}
            </Link>
          ))}

          {/* More Button */}
          <div className="flex flex-col items-center justify-center px-2 py-2 flex-1">
            <button 
              onClick={toggleMoreMenu}
              className={`flex flex-col items-center justify-center ${
                showMoreMenu ? "text-cyan-600" : "text-gray-500 hover:text-cyan-500"
              }`}
            >
              <FiMoreHorizontal size={20} />
              <span className="text-xs mt-1">More</span>
            </button>

            {/* Dropdown for remaining items */}
            {showMoreMenu && (
              <div className="absolute bottom-16 right-2 bg-white shadow-lg border border-gray-200 rounded-md w-48 p-2 z-50">
                {navItems.slice(4).map((item) => (
                  <Link
                    key={item.name}
                    to={item.to}
                    className={`flex items-center gap-2 px-3 py-2 text-sm rounded ${
                      location.pathname === item.to
                        ? "bg-cyan-50 text-cyan-600"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => setShowMoreMenu(false)}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                ))}
                <div className="border-t border-gray-200 mt-1 pt-1">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                  >
                    <FiLogOut size={16} />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

    </>
  );
};

export default EmployeeSideBar;
