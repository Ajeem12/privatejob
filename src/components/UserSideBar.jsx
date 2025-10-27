import React, { useState, useContext, useEffect } from "react";
import {
  FiHome,
  FiUser,
  FiBriefcase,
  FiSettings,
  FiLogOut,
  FiMoreHorizontal,
} from "react-icons/fi";
import { FaUser, FaBan } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobSeekerProfile } from "../redux/slice/user/jobSeekerSlice";

const UserSideBar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { logoutJobSeeker } = useContext(AuthContext);
  const { profile } = useSelector((state) => state.jobSeeker);

  const [isMoreOpen, setIsMoreOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchJobSeekerProfile());
  }, [dispatch]);

  const imageUrl = profile?.profileimage
    ? `${import.meta.env.VITE_MEDIA_URL}/storage/${profile.profileimage.replace(/^\/+/, "")}`
    : null;

  const navItems = [
    { name: "Dashboard", icon: <FiHome size={18} />, to: "/dashboard" },
    { name: "Profile", icon: <FiUser size={18} />, to: "/dashboard/profile" },
    { name: "Applied jobs", icon: <FiBriefcase size={18} />, to: "/dashboard/jobs" },
    { name: "Rejected List", icon: <FaBan size={18} />, to: "/dashboard/rejectedlist" },
    { name: "Settings", icon: <FiSettings size={18} />, to: "/dashboard/settings" },
  ];

  const visibleItems = navItems.slice(0, 3);
  const hiddenItems = navItems.slice(3);

  const handleLogout = () => {
    logoutJobSeeker();
    navigate("/");
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-80 rounded-xl h-screen bg-white border-r border-gray-100 shadow-sm">
        <div className="px-6 py-5">
          <h1 className="text-2xl font-bold text-cyan-600">Dashboard</h1>
        </div>

        <div className="px-6 py-4 flex items-center gap-3 border-b border-gray-100">
          <div className="relative">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="User"
                className="w-10 h-10 rounded-full object-cover border-2 border-indigo-100"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border-2 border-indigo-100">
                <FaUser className="text-gray-400 text-sm" />
              </div>
            )}
          </div>
          <div>
            <p className="font-medium text-gray-800">{profile?.first_name || "User"}</p>
            <span className="text-xs text-gray-500">
              {profile?.email || "Email not available"}
            </span>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.to}
                  className={`flex items-center gap-3 px-6 py-3 rounded-lg text-sm font-medium transition-all ${
                    location.pathname === item.to
                      ? "bg-cyan-500 text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

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
        <div className="flex justify-around items-center h-16">
          {visibleItems.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              className={`flex flex-col items-center justify-center p-1 relative w-full h-full ${
                location.pathname === item.to
                  ? "text-cyan-600 bg-cyan-50"
                  : "text-gray-500 hover:text-cyan-600"
              }`}
            >
              <div>{item.icon}</div>
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          ))}

          {/* More Button */}
          <button
            onClick={() => setIsMoreOpen(true)}
            className="flex flex-col items-center justify-center p-1 w-full h-full text-gray-500 hover:text-cyan-600"
          >
            <FiMoreHorizontal size={22} />
            <span className="text-xs mt-1">More</span>
          </button>
        </div>
      </div>

      {/* Modal for More Menu */}
      {isMoreOpen && (
  <div className="absolute bottom-20 right-2 bg-white shadow-lg border border-gray-200 rounded-md w-56 p-2 z-50">
    {hiddenItems.map((item) => (
      <Link
        key={item.name}
        to={item.to}
        onClick={() => setIsMoreOpen(false)}
        className={`flex items-center gap-2 px-3 py-2 text-sm rounded transition ${
          location.pathname === item.to
            ? "bg-cyan-50 text-cyan-600 font-medium"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        {item.icon}
        <span>{item.name}</span>
      </Link>
    ))}
    <div className="border-t border-gray-200 mt-2 pt-2">
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

    </>
  );
};

export default UserSideBar;
