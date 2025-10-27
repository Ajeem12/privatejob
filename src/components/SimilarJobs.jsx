import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FaMapMarkerAlt, FaMoneyBillWave } from 'react-icons/fa';
import { fetchSimilarJobs } from '../redux/slice/similarJobsSlice';
import { useNavigate } from 'react-router-dom';
const SimilarJobs = () => {
  const { id:jobId } = useParams();

  const navigate = useNavigate()
  const dispatch = useDispatch();

  const { similarJobs, loading, error } = useSelector((state) => state.similarJobs);

  useEffect(() => {
    if (jobId) {
      dispatch(fetchSimilarJobs(jobId));
    }
  }, [dispatch, jobId]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <p className="text-gray-600">Loading similar jobs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!similarJobs || similarJobs.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <p className="text-gray-600">No similar jobs found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Similar Jobs</h3>
      <div className="space-y-4">
        {similarJobs.map(({ id, job_title, company_name, location, salarymin, salarymax }) => (
          <div
            key={id}
            className="border-b border-gray-100 pb-4 last:border-0 last:pb-0 hover:bg-gray-50 cursor-pointer rounded transition"
            role="button"
            tabIndex={0}
           
            onKeyDown={(e) => {
              if (e.key === 'Enter') alert(`Navigate to job ID: ${id}`);
            }}
          >
            <h4 className="font-medium text-gray-900">{job_title}</h4>
            <p className="text-sm text-gray-600 mb-2">{company_name}</p>
            <div className="flex items-center text-sm text-gray-500 space-x-4">
              <span className="flex items-center">
                <FaMapMarkerAlt className="mr-1" /> {location || 'N/A'}
              </span>
              <span className="flex items-center">
                <FaMoneyBillWave className="mr-1" />
                ₹{salarymin || 0} - ₹{salarymax || 0}
              </span>
            </div>
           <button
        className="mt-3 text-sm text-blue-600 hover:underline focus:outline-none"
        onClick={(e) => {
          e.stopPropagation(); // prevent parent div click
          navigate(`/jobsdetails/${id}`); // navigate to dynamic route
        }}
        aria-label={`View details for ${job_title}`}
      >
        View Details
      </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarJobs;
