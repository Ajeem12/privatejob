import React, { useState,useEffect } from 'react';
import { FiSearch, FiMapPin, FiBriefcase, FiStar, FiChevronRight } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCompanies } from '../redux/slice/companiesSlice';

const CompanyListing = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  
  const { items, loading, error } = useSelector((state) => state.companies);

   useEffect(() => {
      dispatch(fetchCompanies());
    }, [dispatch]);

  const companies = [
    {
      id: 1,
      name: 'TechCorp Inc.',
      logo: 'https://logo.clearbit.com/techcorp.com',
      industry: 'Technology',
      location: 'San Francisco, CA',
      size: '1001–5000 employees',
      rating: 4.5,
      jobs: 24,
      description: 'Leading provider of enterprise software solutions.',
    },
    {
      id: 2,
      name: 'DesignHub',
      logo: 'https://logo.clearbit.com/designhub.com',
      industry: 'Design',
      location: 'Remote',
      size: '201–500 employees',
      rating: 4.2,
      jobs: 12,
      description: 'Creative design agency specializing in UX/UI.',
    },
    {
      id: 3,
      name: 'WebSolutions',
      logo: 'https://logo.clearbit.com/websolutions.com',
      industry: 'Web Development',
      location: 'New York, NY',
      size: '51–200 employees',
      rating: 4.0,
      jobs: 8,
      description: 'Full-service digital agency building modern web apps.',
    },
    {
      id: 4,
      name: 'DataSystems',
      logo: 'https://logo.clearbit.com/datasystems.com',
      industry: 'Big Data',
      location: 'Austin, TX',
      size: '501–1000 employees',
      rating: 4.3,
      jobs: 15,
      description: 'Data analytics and BI solutions for enterprises.',
    },
    {
      id: 5,
      name: 'CloudNine',
      logo: 'https://logo.clearbit.com/cloudnine.com',
      industry: 'Cloud Computing',
      location: 'Seattle, WA',
      size: '5001+ employees',
      rating: 4.7,
      jobs: 32,
      description: 'Enterprise cloud infrastructure services.',
    },
  ];

  const filteredCompanies = items.filter(
    (company) =>
      company.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.tag_line.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            {filteredCompanies.length} Companies Found
          </h2>

          <div className="relative w-full md:w-1/3">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search companies..."
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
            />
          </div>
        </div>

        {/* Company Grid */}
        {filteredCompanies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCompanies.map((company) => (
              <div
                key={company.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 p-5 flex flex-col"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                   src={`${import.meta.env.VITE_MEDIA_URL}/storage/${company.logo}`}

                    alt={company.name}
                    className="w-14 h-14 rounded-md border border-gray-200 object-contain"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{company.company_name}</h3>
                    <p className="text-sm text-gray-500 flex items-center">
                      <FiMapPin className="mr-1" /> {company.location}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-3 line-clamp-3">{company.tag_line}</p>

                <div className="text-sm text-gray-500 mb-2 flex items-center">
                  <FiBriefcase className="mr-1" /> {company.employment_type}
                </div>

                <div className="mt-auto pt-3 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
                  <span>{company.size}</span>
                  <div className="flex items-center">
                    <FiStar className="text-yellow-400 mr-1" />
                    {company.rating}
                  </div>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm font-medium bg-cyan-50 text-cyan-600 px-3 py-1 rounded-full">
                    {company.jobs} Jobs
                  </span>
                 
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-10 rounded-xl shadow text-center mt-10">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No companies found</h3>
            <p className="text-gray-500 mb-4">Try a different keyword or reset your search.</p>
            <button
              onClick={() => setSearchTerm('')}
              className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-5 py-2 rounded-md hover:opacity-90 transition"
            >
              Reset Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyListing;
