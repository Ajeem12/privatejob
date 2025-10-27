import React from "react";
import HeroSection from "../components/Home/HeroSection";
import CompanyLogos from "../components/Home/CompanyLogos";
import JobCategoryGrid from "../components/Home/JobCategoryGrid";
import HowItWorks from "../components/Home/HowItWorks";
import Testimonials from "../components/Home/Testimonials";
import SpecialJobsSection from "../components/Home/SpecialJobsSection";
import HiredPeople from "../components/Home/HiredPeople";
import CTA from "../components/Home/CTA";
import ContactSummary from "../components/ContactSummary";

const Home = () => {
  return (
    <>
      <HeroSection />
      <JobCategoryGrid />
      <CompanyLogos />
      <SpecialJobsSection />
      <HiredPeople />
      <HowItWorks />
      {/* <Testimonials/> */}
      <CTA />
    </>
  );
};

export default Home;
