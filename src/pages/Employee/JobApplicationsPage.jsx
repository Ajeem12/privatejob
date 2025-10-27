import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchJobDetails } from "../../redux/slice/employeer/jobDetailsSlice";
import {
  FiBriefcase,
  FiMapPin,
  FiDollarSign,
  FiClock,
  FiUser,
  FiMail,
  FiPhoneCall,
  FiFileText,
  FiChevronDown,
  FiUsers,
  FiCalendar,
  FiAward,
  FiBook,
  FiLayers,
  FiTool,
  FiHeart,
  FiEye,
  FiDownload,
  FiExternalLink,
  FiGlobe
} from "react-icons/fi";
import moment from "moment";
import {
  changeJobStatus,
  resetJobStatus,
} from "../../redux/slice/employeer/jobStatusSlice";
import toast from "react-hot-toast";
import { fetchJobWithoutRegUser } from '../../redux/slice/employeer/jobWithoutRegSlice';

const JobApplicationsPage = () => {
  const { id: jobId } = useParams();
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector((state) => state.jobDetails);
  const { job: jobs, loading: withoutRegLoading, error: withoutRegError } = useSelector((state) => state.jobWithoutReg);

  const { success, error: statusError } = useSelector(
    (state) => state.jobStatus
  );
  const [updatingStatus, setUpdatingStatus] = useState(null);
  const [activeTab, setActiveTab] = useState("applications");
  const [expandedApplication, setExpandedApplication] = useState(null);

  const job = data?.[0];
  // Get without login applications from the job data
  const withoutLoginApplications = job?.withOutloginDetails || [];

  useEffect(() => {
    if (jobId) {
      dispatch(fetchJobDetails(jobId));
      dispatch(fetchJobWithoutRegUser(jobId));
    }
  }, [dispatch, jobId]);

  const handleStatusUpdate = (newStatus, applicationId) => {
    setUpdatingStatus(applicationId);
    dispatch(changeJobStatus({ jobId: applicationId, newStatus }));
  };

  useEffect(() => {
    if (success) {
      toast.success("Application status updated successfully!");
      dispatch(fetchJobDetails(jobId)); // Refresh job data
      dispatch(resetJobStatus());
      setUpdatingStatus(null);
    }

    if (statusError) {
      toast.error(statusError);
      dispatch(resetJobStatus());
      setUpdatingStatus(null);
    }
  }, [success, statusError, dispatch, jobId]);

  const statusConfig = {
    0: { text: "Pending", color: "bg-yellow-100 text-yellow-800", icon: "⏳" },
    1: { text: "Shortlisted", color: "bg-blue-100 text-blue-800", icon: "⭐" },
    2: { text: "Rejected", color: "bg-red-100 text-red-800", icon: "❌" },
    3: {
      text: "Interview",
      color: "bg-purple-100 text-purple-800",
      icon: "📅",
    },
    4: { text: "Hired", color: "bg-green-100 text-green-800", icon: "✅" },
  };

  const toggleApplicationDetails = (applicationId) => {
    if (expandedApplication === applicationId) {
      setExpandedApplication(null);
    } else {
      setExpandedApplication(applicationId);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <p className="font-medium text-red-700">Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <h3 className="text-lg font-medium text-gray-800">
            No job data found
          </h3>
        </div>
      </div>
    );
  }

  // Count applications from registered users
  const registeredApplicationsCount = job.jobapplied_details?.length || 0;
  
  // Count applications from non-registered users
  const nonRegisteredApplicationsCount = withoutLoginApplications.length;
  
  // Total applications count
  const totalApplicationsCount = registeredApplicationsCount + nonRegisteredApplicationsCount;

  return (
    <div className="">
      {/* Job Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-200">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
          <div className="flex-1">
            <div className="flex items-start gap-4">
              {job.company_logo && (
                <img
                  src={`${import.meta.env.VITE_MEDIA_URL}${job.company_logo}`}
                  alt={job.employer_name}
                  className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              )}
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-800">
                  {job.category_details}
                </h1>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-gray-600">
                  <div className="flex items-center">
                    <FiBriefcase className="mr-1.5 h-4 w-4" />
                    <span className="font-medium">{job.employer_name}</span>
                  </div>
                  <div className="flex items-center">
                    <FiMapPin className="mr-1.5 h-4 w-4" />
                    <span>{job.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold flex items-center">
              <FiUsers className="mr-1" />
              {totalApplicationsCount} Applications
            </span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                job.status === 1
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {job.status === 1 ? "Active" : "Closed"}
            </span>
          </div>
        </div>

        {/* Job Details Tabs */}
        <div className="mt-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("details")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "details"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Job Details
            </button>
            <button
              onClick={() => setActiveTab("applications")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "applications"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Registered Applications ({registeredApplicationsCount})
            </button>
            <button
              onClick={() => setActiveTab("withoutLogin")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "withoutLogin"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Without Login Applications ({nonRegisteredApplicationsCount})
            </button>
          </nav>
        </div>

        {/* Job Details Content */}
        {activeTab === "details" && (
          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-gray-500 text-sm flex items-center mb-1">
                   Salary
                </div>
                <p className="font-medium text-gray-800">
                  ₹{job.salarymin} - ₹{job.salarymax} {job.salary_set}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-gray-500 text-sm flex items-center mb-1">
                  <FiClock className="mr-1.5 h-4 w-4" /> Experience
                </div>
                <p className="font-medium text-gray-800">
                  {job.experience} years
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-gray-500 text-sm flex items-center mb-1">
                  <FiFileText className="mr-1.5 h-4 w-4" /> Employment Type
                </div>
                <p className="font-medium text-gray-800">
                  {job.employment_type}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-gray-500 text-sm flex items-center mb-1">
                  <FiMapPin className="mr-1.5 h-4 w-4" /> Prefer location
                </div>
                <p className="font-medium text-gray-800">
                  {job.prefer_location || "-"}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-gray-500 text-sm flex items-center mb-1">
                  <FiClock className="mr-1.5 h-4 w-4" /> Shift
                </div>
                <p className="font-medium text-gray-800">{job.shift}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-gray-500 text-sm flex items-center mb-1">
                  <FiCalendar className="mr-1.5 h-4 w-4" /> Working Time
                </div>
                <p className="font-medium text-gray-800">{job.working_time}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-gray-500 text-sm flex items-center mb-1">
                  <FiClock className="mr-1.5 h-4 w-4" /> Duty hour
                </div>
                <p className="font-medium text-gray-800">{job.duty_hour}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-gray-500 text-sm flex items-center mb-1">
                  <FiUser className="mr-1.5 h-4 w-4" /> Age Limit
                </div>
                <p className="font-medium text-gray-800">{job.age_limit}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-gray-500 text-sm flex items-center mb-1">
                  <FiBook className="mr-1.5 h-4 w-4" /> Education
                </div>
                <p className="font-medium text-gray-800">{job.education}</p>
              </div>
            </div>

            {job.skill_name?.length > 0 && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 mb-3 flex items-center">
                  <FiTool className="mr-2" /> Required Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {job.skill_name.map((skill) => (
                    <span
                      key={skill.id}
                      className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                    >
                      {skill.sub_category_eng}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {job.facilities_details?.length > 0 && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 mb-3 flex items-center">
                  <FiHeart className="mr-2" /> Facilities & Benefits
                </h3>
                <div className="flex flex-wrap gap-2">
                  {job.facilities_details.map((facility) => (
                    <span
                      key={facility.id}
                      className="px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium"
                    >
                      {facility.facility}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-3 flex items-center">
                <FiFileText className="mr-2" /> Job Description
              </h3>
              <p className="text-gray-700 whitespace-pre-line">
                {job.jobs_description}
              </p>
            </div>
          </div>
        )}

        {/* Registered Applications Content */}
        {activeTab === "applications" && (
          <div className="mt-6">
            {job.jobapplied_details?.length > 0 ? (
              <div className="space-y-4">
                {job.jobapplied_details.map((application,index) => {
                  const seeker = application.jobseeker_details || {};
                  const status = application.job_status ?? 0;
                  const currentStatus = statusConfig[status];
                  const appliedAt = moment(application.created_at).format(
                    "DD MMM YYYY, hh:mm A"
                  );

                  return (
                    <div
                      key={application.id}
                      className="border border-gray-200 rounded-lg overflow-hidden"
                    >
                      <div
                        className="bg-white p-6 hover:bg-gray-50 transition cursor-pointer"
                        onClick={() => toggleApplicationDetails(application.id)}
                      >
                        <div className="flex flex-col md:flex-row gap-6 items-start">
                          {/* Applicant Info */}
                          <div className="flex items-start gap-4 flex-1 min-w-0">
                            <div className="flex-shrink-0">
                              <div className="relative h-14 w-14">
                                {seeker.profileimage ? (
                                  <img
                                    src={`${import.meta.env.VITE_MEDIA_URL}${
                                      seeker.profileimage
                                    }`}
                                    alt="Profile"
                                    className="rounded-full h-14 w-14 object-cover border border-gray-200"
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src =
                                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%239CA3AF'%3E%3Cpath d='M12 12a4 4 0 100-8 4 4 0 000 8zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E";
                                    }}
                                  />
                                ) : (
                                  <div className="h-14 w-14 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center">
                                    <FiUser className="text-gray-400 text-xl" />
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="min-w-0 space-y-2 flex-1">
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm text-gray-500">#{index + 1}</span>
                                  <h3 className="text-lg font-medium text-gray-800">
                                    {seeker.first_name || "Unnamed Seeker"}
                                  </h3>
                                </div>
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-semibold ${currentStatus.color} flex items-center gap-1 flex-shrink-0`}
                                >
                                  <span>{currentStatus.icon}</span>
                                  {currentStatus.text}
                                </span>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                                <div className="flex items-center">
                                  <FiMail className="h-4 w-4 text-gray-400 mr-2" />
                                  <span className="text-gray-600 text-sm truncate">
                                    {seeker.email || "N/A"}
                                  </span>
                                </div>
                                <div className="flex items-center">
                                  <FiPhoneCall className="h-4 w-4 text-gray-400 mr-2" />
                                  <span className="text-gray-600 text-sm">
                                    {seeker.contact_number ||
                                      seeker.user_name ||
                                      "N/A"}
                                  </span>
                                </div>
                              </div>

                              <p className="text-xs text-gray-400">
                                Applied on {appliedAt}
                              </p>
                            </div>
                          </div>

                          {/* Status Dropdown and Actions */}
                          <div className="flex-shrink-0 flex flex-col items-end gap-3">
                            <div className="relative w-full min-w-[180px]">
                              <select
                                className="appearance-none w-full pl-3 pr-8 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                value={status}
                                onChange={(e) =>
                                  handleStatusUpdate(
                                    Number(e.target.value),
                                    application.id
                                  )
                                }
                                disabled={updatingStatus === application.id}
                                onClick={(e) => e.stopPropagation()}
                              >
                                <option value={0}>Pending</option>
                                <option value={2}>Rejected</option>
                                <option value={1}>Shortlisted </option>
                                <option value={4}>Selected</option>
                                <option value={3}>Interview</option>
                              </select> 
                              <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            </div>
                            {updatingStatus === application.id && (
                              <span className="text-xs text-gray-500">
                                Updating status...
                              </span>
                            )}
                            <button
                              className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleApplicationDetails(application.id);
                              }}
                            >
                              <FiEye className="mr-1" />
                              {expandedApplication === application.id
                                ? "Hide Details"
                                : "View Details"}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Expanded Application Details */}
                      {expandedApplication === application.id && (
                        <div className="bg-gray-50 p-6 border-t border-gray-200">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                                <FiUser className="mr-2" /> Candidate
                                Information
                              </h4>
                              <div className="space-y-2">
                                <div>
                                  <span className="text-sm text-gray-500">
                                    Full Name:
                                  </span>
                                  <p className="font-medium">
                                    {seeker.first_name || "N/A"}
                                  </p>
                                </div>
                                <div>
                                  <span className="text-sm text-gray-500">
                                    Contact:
                                  </span>
                                  <p className="font-medium">
                                    {seeker.contact_number ||
                                      seeker.user_name ||
                                      "N/A"}
                                  </p>
                                </div>
                                <div>
                                  <span className="text-sm text-gray-500">
                                    Email:
                                  </span>
                                  <p className="font-medium">
                                    {seeker.email || "N/A"}
                                  </p>
                                </div>
                                <div>
                                  <span className="text-sm text-gray-500">
                                    Location:
                                  </span>
                                  <p className="font-medium">
                                    {seeker.location || "N/A"}
                                  </p>
                                </div>
                                {seeker.dob && (
                                  <div>
                                    <span className="text-sm text-gray-500">
                                      Date of Birth:
                                    </span>
                                    <p className="font-medium">{seeker.dob}</p>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div>
                              <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                                <FiBriefcase className="mr-2" /> Professional
                                Details
                              </h4>
                              <div className="space-y-2">
                                {seeker.experience && (
                                  <div>
                                    <span className="text-sm text-gray-500">
                                      Experience:
                                    </span>
                                    <p className="font-medium">
                                      {seeker.experience}
                                    </p>
                                  </div>
                                )}
                                {seeker.job_position && (
                                  <div>
                                    <span className="text-sm text-gray-500">
                                      Current Position:
                                    </span>
                                    <p className="font-medium">
                                      {seeker.job_position}
                                    </p>
                                  </div>
                                )}
                                {seeker.working && (
                                  <div>
                                    <span className="text-sm text-gray-500">
                                      Working Status:
                                    </span>
                                    <p className="font-medium">
                                      {seeker.working}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          {seeker.aboutme && (
                            <div className="mt-6">
                              <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                                <FiFileText className="mr-2" /> About Me
                              </h4>
                              <p className="text-gray-700 bg-white p-4 rounded-lg border border-gray-200">
                                {seeker.aboutme}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <div className="mx-auto h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                  <FiUsers className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  No applications yet
                </h3>
                <p className="text-gray-500">
                  Candidates who apply will appear here
                </p>
              </div>
            )}
          </div>
        )}

        {/* Without Login Applications Content */}
        {activeTab === "withoutLogin" && (
          <div className="mt-6">
            {withoutLoginApplications.length > 0 ? (
              <div className="space-y-4">
                {withoutLoginApplications.map((application, index) => {
                  const appliedAt = moment(application.created_at).format(
                    "DD MMM YYYY, hh:mm A"
                  );
                  
                  return (
                    <div
                      key={application.id}
                      className="border border-gray-200 rounded-lg overflow-hidden"
                    >
                      <div
                        className="bg-white p-6 hover:bg-gray-50 transition cursor-pointer"
                        onClick={() => toggleApplicationDetails(`without-login-${application.id}`)}
                      >
                        <div className="flex flex-col md:flex-row gap-6 items-start">
                          {/* Applicant Info */}
                          <div className="flex items-start gap-4 flex-1 min-w-0">
                            <div className="flex-shrink-0">
                              <div className="h-14 w-14 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center">
                                <FiGlobe className="text-blue-500 text-xl" />
                              </div>
                            </div>

                            <div className="min-w-0 space-y-2 flex-1">
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm text-gray-500">#{index + 1}</span>
                                  <h3 className="text-lg font-medium text-gray-800">
                                    {application.full_name || "Guest Applicant"}
                                  </h3>
                                  <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium">
                                    Without Login
                                  </span>
                                </div>
                               
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                                <div className="flex items-center">
                                  <FiPhoneCall className="h-4 w-4 text-gray-400 mr-2" />
                                  <span className="text-gray-600 text-sm">
                                    {application.contact_number || "N/A"}
                                  </span>
                                </div>
                               
                              </div>

                              <p className="text-xs text-gray-400">
                                Applied on {appliedAt}
                              </p>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex-shrink-0 flex flex-col items-end gap-3">
                            <button
                              className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleApplicationDetails(`without-login-${application.id}`);
                              }}
                            >
                              <FiEye className="mr-1" />
                              {expandedApplication === `without-login-${application.id}`
                                ? "Hide Details"
                                : "View Details"}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Expanded Application Details */}
                      {expandedApplication === `without-login-${application.id}` && (
                        <div className="bg-gray-50 p-6 border-t border-gray-200">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                                <FiUser className="mr-2" /> Applicant
                                Information
                              </h4>
                              <div className="space-y-2">
                                <div>
                                  <span className="text-sm text-gray-500">
                                    Full Name:
                                  </span>
                                  <p className="font-medium">
                                    {application.full_name || "N/A"}
                                  </p>
                                </div>
                                <div>
                                  <span className="text-sm text-gray-500">
                                    Contact:
                                  </span>
                                  <p className="font-medium">
                                    {application.contact_number || "N/A"}
                                  </p>
                                </div>
                               
                                <div>
                                  <span className="text-sm text-gray-500">
                                    Current Location:
                                  </span>
                                  <p className="font-medium">
                                    {application.current_location || "N/A"}
                                  </p>
                                </div>
                                <div>
                                  <span className="text-sm text-gray-500">
                                    Address:
                                  </span>
                                  <p className="font-medium">
                                    {application.address || "N/A"}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div>
                              <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                                <FiBriefcase className="mr-2" /> Professional
                                Details
                              </h4>
                              <div className="space-y-2">
                                <div>
                                  <span className="text-sm text-gray-500">
                                    Experience:
                                  </span>
                                  <p className="font-medium">
                                    {application.experience || "N/A"} years
                                  </p>
                                </div>
                                <div>
                                  <span className="text-sm text-gray-500">
                                    Current Designation:
                                  </span>
                                  <p className="font-medium">
                                    {application.current_designation || "N/A"}
                                  </p>
                                </div>
                                <div>
                                  <span className="text-sm text-gray-500">
                                    Current Company:
                                  </span>
                                  <p className="font-medium">
                                    {application.current_company || "N/A"}
                                  </p>
                                </div>
                                <div>
                                  <span className="text-sm text-gray-500">
                                    Current Salary:
                                  </span>
                                  <p className="font-medium">
                                    {application.current_salary ? `₹${application.current_salary}` : "N/A"}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <div className="mx-auto h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                  <FiGlobe className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  No applications without login
                </h3>
                <p className="text-gray-500">
                  Applications from non-registered users will appear here
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobApplicationsPage;