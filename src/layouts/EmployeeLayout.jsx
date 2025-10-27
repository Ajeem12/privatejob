import React from "react";
import { Outlet } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import UserSideBar from "../components/UserSideBar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EmployeeSideBar from "../components/EmployeeSideBar";
import ScrollToTop from '../utils/ScrollToTop'
const EmployeeDashboard = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <>
     <ScrollToTop />
    <div className="flex flex-col min-h-screen mb-20 lg:mb-0">
      {/* Navbar - Always visible */}
      <Navbar />

      <div className="flex flex-1 py-6 px-4 md:px-6">
        {/* Sidebar - 30% width */}
        <div className="hidden md:block  pr-4">
          <EmployeeSideBar />
        </div>

        {/* Main Content - 70% width */}
        <main className="w-[100%]">
          <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 min-h-[calc(100vh-64px-80px)]">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Full-width Footer - Hidden on mobile */}
      {!isMobile && (
        <div className="w-full ">
          <Footer />
        </div>
      )}

      {/* Mobile Bottom Navigation - Fixed at bottom */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 z-40">
          <EmployeeSideBar/>
        </div>
      )}
    </div>
    </>
  );
};

export default EmployeeDashboard;
