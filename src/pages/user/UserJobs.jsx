import React from 'react';
import {
  FiBriefcase,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiDollarSign,
  FiMapPin,
} from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { getAppliedJobs } from '../../redux/slice/applyJobSlice';
import { fetchAllSkills } from '../../redux/slice/skillsSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserJobs = () => {
  const dispatch = useDispatch();
    const navigate = useNavigate();

    const { skills, loading, error } = useSelector((state) => state.skills);

  useEffect(() => {
      dispatch(getAppliedJobs());
    dispatch(fetchAllSkills());
  }, [dispatch]);


 
  const {
    appliedJobs,
    appliedJobsLoading,
    appliedJobsError
  } = useSelector((state) => state.applyJob); 

  useEffect(() => {
    dispatch(getAppliedJobs());
  }, [dispatch]);

  // Check if data exists and is in the expected format
  if (appliedJobsLoading) return  <div className="min-h-screen flex justify-center">
      <div className="flex flex-col items-center">
        <svg className="animate-spin h-8 w-8 text-cyan-600 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
        <p className="text-cyan-700 text-sm font-medium">Loading ...</p>
      </div>
    </div>;
  if (appliedJobsError) return <p>Error: {appliedJobsError}</p>;
  if (!appliedJobs || !appliedJobs.data || appliedJobs.data.length === 0) {
    return <p>No applied jobs found</p>;
  }
   const handleViewDetails = (jobId) => {
    navigate(`/jobsdetails/${jobId}`);
  };
  const getStatusBadge = (status) => {
    const badgeClasses = 'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium';
    switch (status) {
      case 1: // Interview
        return (
          <span className={`${badgeClasses} bg-cyan-100 text-cyan-800`}>
            <FiClock className="mr-1" /> Shortlisted
          </span>
        );
      case 2: 
        return (
          <span className={`${badgeClasses} bg-red-100 text-red-800`}>
              <FiXCircle className="mr-1" /> Rejected
          </span>
        );
      case 3: 
        return (
          <span className={`${badgeClasses} bg-blue-100 text-blue-800`}>
             <FiCheckCircle className="mr-1" />Interview
          </span>
        );
          case 4: // Rejected
        return (
          <span className={`${badgeClasses} bg-green-100 text-green-800`}>
            <FiCheckCircle className="mr-1" /> Selected
          </span>
        );
      default: // 0 or other - Applied
        return (
          <span className={`${badgeClasses} bg-gray-100 text-gray-800`}>
            <FiBriefcase className="mr-1" /> Applied
          </span>
        );
    }
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch (e) {
      return dateString; // Return original if parsing fails
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Job Applications</h1>
          <p className="mt-2 text-gray-600">
            Track the status of all your job applications in one place
          </p>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Jobs List */}
          <ul className="divide-y divide-gray-200">
            {appliedJobs.data.map((application,index) => {
              const job = application.postjob_details;
              const employer = job?.employer_details;
              const jobTitle = job?.job_title_details;
              
              // Skip rendering if critical data is missing
              if (!job || !employer || !jobTitle) {
                return null;
              }

              return (
                <li
                  key={application.id}
                  className="px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-start gap-4">
                     <img
  src={
    jobTitle.logo
      ? `${import.meta.env.VITE_MEDIA_URL}/storage/${jobTitle.logo}`
      : job.hiring_logo
      ? `${import.meta.env.VITE_MEDIA_URL}/storage/${job.hiring_logo}`
      : 'https://via.placeholder.com/48'
  }
  alt={employer.company_name}
  className="w-12 h-12 min-w-[3rem] rounded-md object-contain border border-gray-200"
/>

                      <div>
                     <h3 className="text-lg font-medium text-gray-900">
  <span className="text-gray-500 mr-2">#{index + 1}</span>
  {jobTitle.category_name_eng || 'Job Title'}
</h3>

                        <div className="flex flex-wrap gap-3 mt-1 text-sm text-gray-600">
                          <span>{employer.company_name || 'Company'}</span>
                          <span className="flex items-center text-gray-500">
                            <FiMapPin className="mr-1" size={14} />
                            {job.location || 'Location not specified'}
                          </span>
                          <span className="flex items-center text-gray-500">
                          
                            {job.salarymin && job.salarymax 
                              ? `₹${job.salarymin} - ₹${job.salarymax}` 
                              : 'Salary not specified'}
                          </span>
                         <span className="text-gray-500">
  <strong className="mr-1">Exp:</strong> {job.experience || 'Experience not specified'}
</span>

                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-start md:items-end gap-2">
                      <span className="text-sm text-gray-500">
                        Applied on {formatDate(application.created_at)}
                      </span>
                      {getStatusBadge(application.job_status)}
                        <button
            onClick={() => handleViewDetails(job.id)}
            className="text-cyan-600 hover:text-cyan-800 font-medium text-sm mt-2"
          >
            View Details
          </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserJobs;