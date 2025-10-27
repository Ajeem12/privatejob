import { FiMapPin, FiDollarSign, FiBriefcase, FiClock, FiAward } from "react-icons/fi";
import { FaStar, FaIndustry, FaGraduationCap } from "react-icons/fa";
import { BiMaleFemale } from "react-icons/bi";
import { Link, useSearchParams } from "react-router-dom";
import { fetchAllJobs, resetJobsState } from "../redux/slice/allJobSlice";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";

const JobCard = () => {
  const dispatch = useDispatch();
  const { loading, jobs, error } = useSelector((state) => state.jobs);
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const cat = searchParams.get("cat");
    const cityParam = searchParams.get("city");
    const work_type = searchParams.get("work_type");

    // Decode the city parameter only once
    let city = "";
    if (cityParam) {
      try {
        // Handle cases where it might be double-encoded
        city = decodeURIComponent(cityParam);
        // If it still contains % encodings, decode again
        if (city.includes('%')) {
          city = decodeURIComponent(city);
        }
      } catch (e) {
        console.error("Error decoding city parameter:", e);
        city = cityParam;
      }
    }
    const filters = {
      cat: cat || null,
      city: city,
      work_type: work_type || "",
    };
    dispatch(fetchAllJobs(filters));
    return () => {
      dispatch(resetJobsState());
    };
  }, [dispatch, searchParams]);

  if (loading) return <div className="text-center py-8">Loading jobs...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error loading jobs</div>;
  if (jobs?.length === 0) {
    return <div className="text-center py-8 text-gray-500">No jobs found for the selected filters.</div>;
  }
  return (
    <div className="space-y-6">
      {jobs?.map((job) => (
        <div key={job.id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <img
                src={
                  job.company_logo
                    ? `${import.meta.env.VITE_MEDIA_URL}${job.company_logo}`
                    : "https://via.placeholder.com/100x100?text=Company"
                }
                alt="Company Logo"
                className="w-16 h-16 object-cover rounded-full"
              />
            </div>
            <div className="flex-grow">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{job.job_title2 ? job.job_title2 : "No Title Available"}</h3>
                  {/* <p className="text-gray-700 font-medium">{job.employer_name}</p> */}
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm">
                    <FiBriefcase className="mr-1" /> {job.employment_type}
                  </span>
                  {job.hiring_logo && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm">
                      <FiAward className="mr-1" /> Hiring
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm">
                <div className="flex items-center text-gray-700">
                  <FiMapPin className="mr-2 text-gray-500" />
                  <span>{job.location || 'Not specified'}</span>
                </div>

                <div className="flex items-center text-gray-700">
                  <FaIndustry className="mr-2 text-gray-500" />
                  <span>{job.category_details}</span>
                </div>

                <div className="flex items-center text-gray-700">
                  <FaGraduationCap className="mr-2 text-gray-500" />
                  <span>{job.education || 'Not specified'}</span>
                </div>
                <div className="flex items-center text-gray-700">

                  <span>
                    {job.salarymin && job.salarymax
                      ? `₹${job.salarymin} - ₹${job.salarymax}`
                      : 'Salary not disclosed'}
                  </span>
                </div>
              </div>
              <p className="text-gray-500 font-semibold mt-1">
                {/* <span className="text-gray-500">Job Title 2: </span> */}
                {/* {job.job_title2 ? job.job_title2 : "No Title Available"} */}
              </p>
              <p className="mt-4 text-gray-600 line-clamp-3"><div dangerouslySetInnerHTML={{ __html: job.jobs_description }} />
              </p>

              <div className="flex flex-col md:flex-row md:items-center gap-3 mt-2.5">
                {job.skill_name?.length > 0 && (
                  <div className="flex flex-wrap gap-2 max-w-full md:max-w-md">
                    {job.skill_name.map((skill) => (
                      <span
                        key={skill.id}
                        className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-sm font-medium truncate"
                        title={skill.sub_category_eng}
                      >
                        {skill.sub_category_eng}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center text-gray-700">
                  <BiMaleFemale className="mr-2 text-gray-500" />
                  <label htmlFor="gender" className="whitespace-nowrap">
                    Candidates:&nbsp;
                  </label>
                  <span>{job.applicable_gender || "Not specified"}</span>
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center text-sm text-gray-500">
                  <FiClock className="mr-1" />
                  <span>Posted on {job.created_at}</span>
                </div>

                <Link
                  to={`/jobsdetails/${job.id}`}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobCard;


