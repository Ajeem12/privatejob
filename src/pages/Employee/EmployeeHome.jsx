import React, { useEffect, useState } from 'react';
import { FiBookmark, FiCheckCircle, FiArchive  } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardCounts } from '../../redux/slice/employeer/dashboardCountSlice';
import { getJobs } from '../../redux/slice/employeer/postJobSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

const EmployeeHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isCounting, setIsCounting] = useState(false);

  const { counts, loading: dashboardLoading, error: dashboardError } = useSelector((state) => state.dashboardCount);
  const { jobs, loading: jobsLoading, error: jobsError } = useSelector((state) => state.postJob);

  useEffect(() => {
    dispatch(getJobs());
    dispatch(getDashboardCounts());
  }, [dispatch]);

  useEffect(() => {
    if (counts && !dashboardLoading) {
      setIsCounting(true);
      const timer = setTimeout(() => setIsCounting(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [counts, dashboardLoading]);

  // Get latest 5 job posts with proper sorting
  const recentJobPosts = [...(jobs?.data || [])]
    .sort((a, b) => {
      const dateA = new Date(a.created_at.split('/').reverse().join('-'));
      const dateB = new Date(b.created_at.split('/').reverse().join('-'));
      return dateB - dateA;
    })
    .slice(0, 5);

  // Loading skeleton component
  const StatCardSkeleton = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
          <div className="h-8 w-16 bg-gray-300 rounded"></div>
        </div>
        <div className="p-3 rounded-lg bg-gray-100 text-gray-400">
          <div className="h-5 w-5"></div>
        </div>
      </div>
    </div>
  );

  // Animated Stat Card component
  const StatCard = ({ title, value, icon: Icon, color }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          {isCounting ? (
            <CountUp
              end={value}
              duration={2}
              className="text-2xl font-bold mt-1"
            />
          ) : (
            <p className="text-2xl font-bold mt-1">{value}</p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}-50 text-${color}-600`}>
          <Icon size={20} />
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Welcome back</h1>
          <p className="text-gray-600">Here's your job search overview</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {dashboardLoading ? (
          <>
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </>
        ) : dashboardError ? (
          <div className="col-span-3 text-red-500">
            Error loading dashboard stats: {dashboardError}
          </div>
        ) : (
          <>
            <StatCard 
              title="Total Jobs" 
              value={counts?.totaljobs ?? 0} 
              icon={FiBookmark} 
              color="blue" 
            />
            <StatCard 
              title="Live Jobs" 
              value={counts?.totallivejobs ?? 0} 
              icon={FiCheckCircle} 
              color="green" 
            />
            
          </>
        )}
      </div>

      {/* Recent Job Posts */}
      <div className="mt-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Recent Job Posts</h2>
          <button
            onClick={() => navigate('/employer/manageJob')}
            className="text-sm text-indigo-600 hover:text-indigo-800"
          >
            View All
          </button>
        </div>

        {jobsLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="p-4 border border-gray-200 rounded-lg animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : jobsError ? (
          <div className="text-red-500">Error loading jobs: {jobsError}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Experience</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Salary</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Posted On</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentJobPosts.map((job) => (
                  <motion.tr 
                    key={job.id} 
                    className="hover:bg-gray-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {job.category_details}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {job.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {job.experience} yrs
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ₹{job.salarymin} - ₹{job.salarymax}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {job.created_at}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeHome;