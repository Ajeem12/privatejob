import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MobileMenuFooter from '../components/MobileMenuFooter';
import { useMediaQuery } from 'react-responsive';
import ScrollToTop from '../utils/ScrollToTop';
import ContactSummary from '../components/ContactSummary';

const MainLayout = () => {
  // Define the breakpoint for mobile screens (Tailwind md = 768px)
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      
      <Navbar />
      
      <main className="flex-grow mb-20 lg:mb-0">
        <Outlet />
      </main>
      
      {/* Footer Section */}
      <div className="mt-auto">
        {!isMobile && <Footer />}
        {isMobile && <MobileMenuFooter />}
      </div>
      
      {/* Optional: Add ContactSummary if needed */}
      {/* <ContactSummary /> */}
    </div>
  );
};

export default MainLayout;