import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaClock,
  FaShareAlt,
  FaUserTie,
  FaStar,
  FaRegStar,
  FaTimes,
  FaIndustry,
  FaRegClock,
  FaCalendarAlt,
  FaBookmark,
  FaRegBookmark,
  FaBuilding,
  FaGraduationCap,
  FaCheckCircle,
  FaExternalLinkAlt
} from "react-icons/fa";
import { BiMaleFemale } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchJobDetails,
  fetchJobDetailsLogin,
} from "../redux/slice/allJobSlice";
import { applyToJob } from "../redux/slice/applyJobSlice";
import SimilarJobs from "../components/SimilarJobs";
import ApplicationTips from "../components/ApplicationTips";
import Swal from "sweetalert2";
import {
  submitApplicationWithoutReg,
  resetApplicationState,
} from "../redux/slice/applicationWithoutRegSlice";
import toast from "react-hot-toast";

const JobDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [hasApplied, setHasApplied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [errors, setErrors] = useState({});
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

  const [formData, setFormData] = useState({
    full_name: "",
    contact_no: "",
    address: "",
    experience: "",
    current_salary: "",
    current_location: "",
    current_company: "",
    current_designation: "",
    alternate_contact_no: "",   // new
    email: "",                  // new
    notice_period: "",          // new
    job_id: id,
  });

  const {
    jobDetails,
    jobDetailsLoading,
    jobDetailsError,
    jobDetailsLogin,
    jobDetailsLoginLoading,
    jobDetailsLoginError,
  } = useSelector((state) => state.jobs);

  const token = localStorage.getItem("token_jobseeker");

  useEffect(() => {
    if (id) {
      if (token) {
        dispatch(fetchJobDetailsLogin(id));
      } else {
        dispatch(fetchJobDetails(id));
      }
    }
  }, [id, dispatch, token]);

  const jobData = token ? jobDetailsLogin : jobDetails;
  const job = jobData?.job_details;
  const isLoading = token ? jobDetailsLoginLoading : jobDetailsLoading;
  const isError = token ? jobDetailsLoginError : jobDetailsError;

  useEffect(() => {
    if (job && token) {
      setHasApplied(job.status_appied === 1);
    }
  }, [job, token]);

  const handleApplyNow = async () => {
    if (!token) {
      setShowApplicationModal(true);
      return;
    }

    const formData = {
      job_id: job.id,
      status: 1,
    };

    try {
      const response = await dispatch(applyToJob(formData)).unwrap();

      Swal.fire({
        title: "Application Submitted!",
        text: "You have successfully applied for the job.",
        icon: "success",
        confirmButtonText: "OK",
      });

      setHasApplied(true);
    } catch (error) {
      Swal.fire({
        title: "Application Failed!",
        text: error?.message || "Something went wrong while applying.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const { loading, success, error } = useSelector(
    (state) => state.applicationWithoutReg
  );

  const handleCancelApplication = () => {
    const formData = {
      job_id: job.id,
      status: 0,
    };
    dispatch(applyToJob(formData));
    setHasApplied(false);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.full_name.trim()) newErrors.full_name = "Full name is required";
    if (!formData.contact_no.trim()) newErrors.contact_no = "Contact number is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.experience.trim()) newErrors.experience = "Experience is required";
    if (!formData.current_salary.trim()) newErrors.current_salary = "Current salary is required";
    if (!formData.current_location.trim()) newErrors.current_location = "Current location is required";
    if (!formData.current_company.trim()) newErrors.current_company = "Current company is required";
    if (!formData.current_designation.trim()) newErrors.current_designation = "Current Designation is required";
    if (!formData.email.trim()) newErrors.email = "Email ID is required";
    if (!formData.alternate_contact_no.trim()) newErrors.alternate_contact_no = "Alternate Number is required";
    if (!formData.notice_period.trim()) newErrors.notice_period = "Notice Period is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitApplication = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(submitApplicationWithoutReg(formData));
    }
  };

  useEffect(() => {
    if (success) {
      toast.success("Application submitted successfully!");
      setShowApplicationModal(false);
      setFormData({
        full_name: "",
        contact_no: "",
        address: "",
        experience: "",
        current_salary: "",
        current_location: "",
        current_company: "",
        job_id: id,
      });
      dispatch(resetApplicationState());
    }

    if (error) {
      toast.error(error || "Submission failed.");
      dispatch(resetApplicationState());
    }
  }, [success, error, dispatch, id]);

  const toggleSaveJob = () => {
    setIsSaved(!isSaved);
    toast.success(isSaved ? "Job removed from saved jobs" : "Job saved successfully!");
  };

  const shareJob = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: job.job_title_details?.category_name_eng,
          text: job.jobs_description?.substring(0, 100) + '...',
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  if (isLoading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (isError) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-red-500 text-xl font-medium mb-2">Error loading job details</div>
        <p className="text-gray-600">Please try refreshing the page</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Refresh Page
        </button>
      </div>
    </div>
  );

  if (!job) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-gray-500 text-xl font-medium mb-2">No job details found</div>
        <button
          onClick={() => navigate('/jobs')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Browse Jobs
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Application Modal */}
      {showApplicationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white z-10 flex justify-between items-center border-b p-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Apply for {job.job_title_details?.category_name_eng || "this job"}
              </h3>
              <button
                onClick={() => setShowApplicationModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitApplication} className="p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Column */}
                <div className="space-y-5">
                  {/* Full Name Field */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 focus:ring-2 focus:border-transparent ${errors.full_name
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-blue-500"
                          }`}
                      // placeholder="John Doe"
                      />
                      {errors.full_name && (
                        <div className="absolute right-3 top-3">
                          <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    {errors.full_name && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.full_name}
                      </p>
                    )}
                  </div>

                  {/* Contact Number Field */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Number *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500">+91</span>
                      </div>
                      <input
                        type="tel"
                        name="contact_no"
                        value={formData.contact_no}
                        onChange={handleInputChange}
                        className={`w-full pl-12 pr-4 py-3 border rounded-lg transition-all duration-200 focus:ring-2 focus:border-transparent ${errors.contact_no
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-blue-500"
                          }`}
                        // placeholder="9876543210"
                        maxLength="10"
                      />
                      {errors.contact_no && (
                        <div className="absolute right-3 top-3">
                          <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    {errors.contact_no && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.contact_no}
                      </p>
                    )}
                  </div>


                  {/* Current Designation Field */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Designation *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="current_designation"
                        value={formData.current_designation}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 focus:ring-2 focus:border-transparent ${errors.current_designation
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-blue-500"
                          }`}
                      // placeholder="e.g. Software Engineer"
                      />
                      {errors.current_designation && (
                        <div className="absolute right-3 top-3">
                          <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    {errors.current_designation && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.current_designation}
                      </p>
                    )}
                  </div>


                  {/* Address Field */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address *
                    </label>
                    <div className="relative">
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        rows={3}
                        className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 focus:ring-2 focus:border-transparent resize-none ${errors.address
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-blue-500"
                          }`}
                      // placeholder="123 Main St, City, State, Pincode"
                      />
                      {errors.address && (
                        <div className="absolute right-3 top-3">
                          <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    {errors.address && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.address}
                      </p>
                    )}
                  </div>

                </div>

                {/* Second Column */}
                <div className="space-y-5">
                  {/* Experience Field */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Experience (Years) *
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 focus:ring-2 focus:border-transparent ${errors.experience
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-blue-500"
                          }`}
                        // placeholder="5"
                        min="0"
                        step="0.1"
                      />
                      {errors.experience && (
                        <div className="absolute right-3 top-3">
                          <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    {errors.experience && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.experience}
                      </p>
                    )}
                  </div>

                  {/* Current Salary Field */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Salary (₹) *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500">₹</span>
                      </div>
                      <input
                        type="text"
                        name="current_salary"
                        value={formData.current_salary}
                        onChange={handleInputChange}
                        className={`w-full pl-8 pr-4 py-3 border rounded-lg transition-all duration-200 focus:ring-2 focus:border-transparent ${errors.current_salary
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-blue-500"
                          }`}
                      // placeholder="50,000"
                      />
                      {errors.current_salary && (
                        <div className="absolute right-3 top-3">
                          <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    {errors.current_salary && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.current_salary}
                      </p>
                    )}
                  </div>

                  {/* Current Location Field */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Location *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="current_location"
                        value={formData.current_location}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 focus:ring-2 focus:border-transparent ${errors.current_location
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-blue-500"
                          }`}
                      // placeholder="Bangalore, India"
                      />
                      {errors.current_location && (
                        <div className="absolute right-3 top-3">
                          <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    {errors.current_location && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.current_location}
                      </p>
                    )}
                  </div>

                  {/* Current Company Field */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Company *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="current_company"
                        value={formData.current_company}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 focus:ring-2 focus:border-transparent ${errors.current_company
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-blue-500"
                          }`}
                      // placeholder="ABC Technologies"
                      />
                      {errors.current_company && (
                        <div className="absolute right-3 top-3">
                          <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    {errors.current_company && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.current_company}
                      </p>
                    )}
                  </div>

                </div>
                {/* Email ID Field */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email ID *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 focus:ring-2 focus:border-transparent ${errors.email
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                      }`}
                  // placeholder="example@mail.com"
                  />
                  {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                </div>

                {/* Alternate Contact Number Field */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alternate Number *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">+91</span>
                    </div>
                    <input
                      type="tel"
                      name="alternate_contact_no"
                      value={formData.alternate_contact_no}
                      onChange={handleInputChange}
                      className={`w-full pl-12 pr-4 py-3 border rounded-lg transition-all duration-200 focus:ring-2 focus:border-transparent ${errors.alternate_contact_no
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                        }`}
                      maxLength="10"
                    />
                    {errors.alternate_contact_no && <p className="mt-2 text-sm text-red-600">{errors.alternate_contact_no}</p>}
                  </div>
                </div>

                {/* Notice Period Field */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notice Period *
                  </label>
                  <select
                    name="notice_period"
                    value={formData.notice_period}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 focus:ring-2 focus:border-transparent ${errors.notice_period
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                      }`}
                  >
                    <option value="">Select Notice Period</option>
                    <option value="Immediate Join">Immediate Join</option>
                    <option value="15Days">15 Days</option>
                    <option value="30Days">30 Days</option>
                  </select>
                  {errors.notice_period && <p className="mt-2 text-sm text-red-600">{errors.notice_period}</p>}
                </div>

              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
                <button
                  type="button"
                  onClick={() => setShowApplicationModal(false)}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg text-sm font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center min-w-[140px]"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                      </svg>
                      Submit Application
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-6" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <button onClick={() => navigate('/')} className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600">
                Home
              </button>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <button onClick={() => navigate('/jobs')} className="text-sm font-medium text-gray-500 hover:text-blue-600">
                  Jobs
                </button>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-sm font-medium text-gray-500 truncate">
                  {job.job_title_details?.category_name_eng || "Job Details"}
                </span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* Job Header Card */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <img
                    src={
                      job.job_title_details?.logo
                        ? `${import.meta.env.VITE_MEDIA_URL}/storage/${job.job_title_details.logo
                        }`
                        : "https://via.placeholder.com/80"
                    }
                    alt="Company logo"
                    className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                  />
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      {job?.jobtitle2 || "Job Title"}
                    </h1>
                    <p className="text-lg text-gray-700 mt-1">{job.employer_name}</p>
                    <div className="flex items-center mt-2">
                      {[1, 2, 3, 4].map((star) => (
                        <FaStar key={star} className="text-yellow-400 w-4 h-4" />
                      ))}
                      <FaRegStar className="text-gray-300 w-4 h-4" />
                      <span className="text-sm text-gray-500 ml-1">4.0 (128 reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${job.status === 1 ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}>
                    {job.status === 1 ? "Active Hiring" : "Closed"}
                  </span>
                  <p className="text-sm text-gray-500">
                    Posted {new Date(job.created_at).toLocaleDateString()}
                  </p>

                </div>
              </div>

              {/* Key Information Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center">
                    <FaBriefcase className="text-blue-600 mr-2" />
                    <div>
                      <p className="text-xs text-gray-600">Job Type</p>
                      <p className="font-semibold text-gray-900">{job.employment_type}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="text-blue-600 mr-2" />
                    <div>
                      <p className="text-xs text-gray-600">Location</p>
                      <p className="font-semibold text-gray-900">{job.location}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center">
                    <FaMoneyBillWave className="text-blue-600 mr-2" />
                    <div>
                      <p className="text-xs text-gray-600">Salary</p>
                      <p className="font-semibold text-gray-900">
                        ₹{job.salarymin} - ₹{job.salarymax}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center">
                    <FaClock className="text-blue-600 mr-2" />
                    <div>
                      <p className="text-xs text-gray-600">Experience</p>
                      <p className="font-semibold text-gray-900">{job.experience}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Job Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <FaIndustry className="text-gray-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Industry</p>
                    <p className="font-medium">{job.industry_type || 'Not specified'}</p>
                  </div>
                </div>

                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <FaRegClock className="text-gray-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Working Time</p>
                    <p className="font-medium">{job.working_time || 'Not specified'}</p>
                  </div>
                </div>

                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <BiMaleFemale className="text-gray-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600"> Candidates</p>
                    <p className="font-medium">{job.applicable_gender || 'Not specified'}</p>
                  </div>
                </div>

                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <FaCalendarAlt className="text-gray-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Duty Hours</p>
                    <p className="font-medium">{job.duty_hour || 'Not specified'}</p>
                  </div>
                </div>

                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <FaGraduationCap className="text-gray-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Education</p>
                    <p className="font-medium">{job.education}</p>
                  </div>
                </div>
              </div>

              {/* Job Details Tabs */}
              <div className="mb-10">
                <div className="border-b border-gray-200">

                  <nav className="-mb-px flex space-x-8">
                    <button
                      onClick={() => setActiveTab("description")}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === "description"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                    >
                      Job Description
                    </button>
                    <button
                      onClick={() => setActiveTab("requirements")}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === "requirements"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                    >
                      Requirements
                    </button>
                    <button
                      onClick={() => setActiveTab("company")}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === "company"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                    >
                      Company Info
                    </button>
                  </nav>
                </div>

                <div className="mt-6">
                  {activeTab === "description" && (
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Job Description</h3>
                      <div className="prose prose-gray max-w-none">
                        <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                          {/* {job.jobs_description}  */}
                          <div dangerouslySetInnerHTML={{ __html: job.jobs_description }} />
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Shift:</h4>
                          <p className="text-gray-700">{job.shift}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Preferred Location:</h4>
                          <p className="text-gray-700">{job.prefer_location}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "requirements" && (
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Skills Required</h3>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {job.skills?.map((skill) => (
                          <span
                            key={skill.id}
                            className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                          >
                            {skill.sub_category_eng}
                          </span>
                        ))}
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Other Facilities</h3>
                      <div className="flex flex-wrap gap-2">
                        {job.otherfacilitesDetails?.map((facility) => (
                          <span
                            key={facility.id}
                            className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800"
                          >
                            {facility.facility}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === "company" && (
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">About {job.employer_name}</h3>
                      <div className="flex items-start gap-4">
                        <img
                          src={
                            job.job_title_details?.logo
                              ? `${import.meta.env.VITE_MEDIA_URL}/storage/${job.job_title_details.logo
                              }`
                              : "https://via.placeholder.com/80"
                          }
                          alt="Company logo"
                          className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                        />
                        <div>
                          <p className="text-gray-700">
                            {job.employer_name} is a leading company in the {job.industry_type} industry.
                            We are committed to providing excellent opportunities for growth and development.
                          </p>
                          <div className="mt-4 flex items-center">
                            <FaStar className="text-yellow-400 mr-1" />
                            <span className="text-gray-700 font-medium">4.0</span>
                            <span className="text-gray-500 ml-1">(128 reviews)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Apply Button */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                {hasApplied ? (
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      className="flex-1 bg-green-100 text-green-800 py-3 px-6 rounded-lg font-medium cursor-default flex items-center justify-center"
                      disabled
                    >
                      <FaCheckCircle className="mr-2" /> Applied Successfully
                    </button>

                  </div>
                ) : (
                  <button
                    onClick={handleApplyNow}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition flex items-center justify-center"
                  >
                    Apply Now <FaExternalLinkAlt className="ml-2" />
                  </button>
                )}
              </div>
            </div>


          </div>

          {/* Sidebar */}
          <aside className="lg:w-1/3 space-y-6">
            <SimilarJobs similarJobs={jobData?.similar_jobs} />
            <ApplicationTips />
          </aside>
        </div>
      </main>
    </div>
  );
};

export default JobDetailsPage;