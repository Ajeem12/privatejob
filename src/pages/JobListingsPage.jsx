import React, { useState } from "react";
import JobCard from "../components/JobCard";
import FilterSidebar from "../components/FilterSidebar";
import SearchBar from "../components/SearchBar";
import TopHiringCompanies from "../components/TopHiringCompanies";
// import MobileFilterDialog from './MobileFilterDialog'; // Optional

const JobListingsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* {mobileFiltersOpen && <MobileFilterDialog ... />} */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchBar />
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - 40% width */}
          <aside className="w-full lg:basis-2/5 lg:max-w-[30%] space-y-6">
            <FilterSidebar />
            <TopHiringCompanies />
          </aside>
          {/* Job Cards - 60% width */}
          <div className="w-full  lg:max-w-[70%] space-y-4">
            <JobCard />
            {/* Repeat JobCard if needed */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default JobListingsPage;
