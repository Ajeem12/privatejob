import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import {
  postJob,
  updateJob,
  getJobById,
  clearStatus,
} from "../../redux/slice/employeer/postJobSlice";
import { fetchCategories } from "../../redux/slice/categoriesSlice";
import { fetchAllSkills } from "../../redux/slice/skillsSlice";
import {
  FiPlusCircle,
  FiDollarSign,
  FiMapPin,
  FiBriefcase,
  FiClock,
  FiUpload,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";
import { fetchCities } from "../../redux/slice/citiesSlice";
import { fetchOtherFacilities } from "../../redux/slice/otherFacilitiesSlice";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const PostJob = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    loading,
    error,
    success,
    job: currentJob,
    loading: jobLoading,
  } = useSelector((state) => state.postJob);
  const { items: categories = [], loading: categoriesLoading } = useSelector(
    (state) => state.categories
  );
  const { skills: allSkills = [], loading: skillsLoading } = useSelector(
    (state) => state.skills
  );
  const { items: cities = [] } = useSelector((state) => state.cities);
  const { items: facilityOptions = [], loading: facilitiesLoading } =
    useSelector((state) => state.otherFacilities);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    education: "",
    experience: "",
    skills: [],
    salaryMin: "",
    salaryMax: "",
    salarySet: "Monthly",
    shift: "Day Shift",
    ageLimit: "",
    employmentType: "Full",
    location: "",
    preferLocation: "",
    otherFacilities: [],
    description: "",
    requirements: "",
    logo: null,
    category: "",
    regions: "1",
    industry_type: "",
    working_hrs: "",
    duty_hrs: "",
  });

  const [filePreview, setFilePreview] = useState(null);
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [locationInput, setLocationInput] = useState("");
  const [preferLocationInput, setPreferLocationInput] = useState("");
  const [otherFacilitiesInput, setOtherFacilitiesInput] = useState("");

  // Fetch initial data
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchAllSkills());
    dispatch(fetchCities());
    dispatch(fetchOtherFacilities());

    if (id) {
      dispatch(getJobById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (id && currentJob && currentJob.length > 0) {
      // Changed from currentJob.data to currentJob
      const jobData = currentJob[0]; // Get first item from array directly
      console.log("Job data:", jobData);

      // Transform API data to match form structure
      const transformJobData = {
        title: jobData.category_details || "",
        education: jobData.education || "",
        experience: jobData.experience || "",
        skills:
          jobData.multiple_skill && jobData.multiple_skill !== ""
            ? jobData.multiple_skill.split(",").map(Number)
            : [],
        salaryMin: jobData.salarymin || "",
        salaryMax: jobData.salarymax || "",
        salarySet: jobData.salary_set || "Monthly",
        shift: jobData.shift || "Day Shift",
        ageLimit: jobData.age_limit || "",
        employmentType: jobData.employment_type || "Full",
        location: jobData.location || "",
        preferLocation: jobData.prefer_location || "",
        otherFacilities:
          jobData.facilities_details?.length > 0
            ? jobData.facilities_details.map((facility) => ({
                id: facility.id,
                facility: facility.facility,
              }))
            : [],
        description: jobData.jobs_description || "",
        requirements: jobData.requirements || "",
        logo: jobData.company_logo || null,
        category: jobData.job_title?.toString() || "",
        regions: jobData.region?.toString() || "1",
        working_hrs:jobData.working_time,
        duty_hrs:jobData.duty_hour,
        industry_type:jobData.industry_type
      };

      setFormData(transformJobData);
      setLocationInput(jobData.location || "");
      setPreferLocationInput(jobData.prefer_location || "");

      if (jobData.company_logo) {
        setFilePreview(jobData.company_logo);
      }
    } else {
      console.log("Condition not met:", {
        idExists: !!id,
        currentJobExists: !!currentJob,
        isArray: Array.isArray(currentJob),
        length: currentJob?.length,
      });
    }
  }, [currentJob, id]);

  // Filter skills based on selected category
  useEffect(() => {
    if (!formData.category || allSkills.length === 0) {
      setFilteredSkills(allSkills);
      return;
    }

    const selectedCategory = categories.find(
      (cat) => cat.id == formData.category
    );
    if (!selectedCategory) return;

    const categorySkills = allSkills.filter(
      (skill) => skill.category_id == selectedCategory.id
    );
    setFilteredSkills(categorySkills);
  }, [formData.category, allSkills, categories]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillsChange = (selectedOptions) => {
    setFormData((prev) => ({
      ...prev,
      skills: selectedOptions
        ? selectedOptions.map((option) => option.value)
        : [],
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, logo: file }));
      setFilePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();

    form.append("job_title", formData.category);
    form.append("experience", formData.experience);
    formData.skills.forEach((skillId) => {
      form.append("multiple_skill[]", skillId);
    });
    form.append("location[]", formData.location);
    if (formData.preferLocation) {
      form.append("prefer_location[]", formData.preferLocation);
    }
    formData.otherFacilities.forEach((facility) => {
      if (facility.id) {
        form.append("other_facilities[]", facility.id);
      }
    });
    form.append("salarymin", formData.salaryMin);
    form.append("salarymax", formData.salaryMax);
    form.append("education", formData.education);
    form.append("shift", formData.shift);
    form.append("working_time", formData.working_hrs);
    form.append("duty_hour", formData.duty_hrs);
    form.append("jobs_description", formData.description);
    form.append("employment_type", formData.employmentType);
    form.append("age_limit", formData.ageLimit);
    form.append("salary_set", formData.salarySet);
    form.append("region", formData.regions);
    form.append("industry_type", formData.industry_type);
    if (formData.logo instanceof File) {
      form.append("hiring_logo", formData.logo);
    }

    const toastId = toast.loading(id ? "Updating job..." : "Posting job...");

    try {
      if (id) {
        await dispatch(updateJob({ id, jobData: form })).unwrap();
        toast.success("Job updated successfully!", { id: toastId });
        navigate("/employer/manageJob");
      } else {
        await dispatch(postJob(form)).unwrap();
        toast.success("Job posted successfully!", { id: toastId });

        // Clear the form
        setFormData({
          title: "",
          education: "",
          experience: "",
          skills: [],
          salaryMin: "",
          salaryMax: "",
          salarySet: "Monthly",
          shift: "Day Shift",
          ageLimit: "",
          employmentType: "Full",
          location: "",
          preferLocation: "",
          otherFacilities: [],
          description: "",
          requirements: "",
          logo: null,
          category: "",
          regions: "",
          industry_type: "",
          working_hrs: "",
          duty_hrs: "",
        });
        setFilePreview(null);
        setLocationInput("");
        setPreferLocationInput("");
        setOtherFacilitiesInput("");
      }

      // Clear Redux success/error after 3 seconds
      setTimeout(() => {
        dispatch(clearStatus());
      }, 3000);
    } catch (err) {
      console.log("Submit failed:", err);

      if (err.data) {
        const newErrors = {};
        Object.entries(err.data).forEach(([field, messages]) => {
          newErrors[field] = Array.isArray(messages) ? messages[0] : messages;
        });
        setErrors(newErrors); // <-- update the errors state here
        toast.error(Object.values(newErrors)[0]); // show first error message in toast
      } else {
        toast.error(err.message || "Something went wrong.");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      education: "",
      experience: "",
      skills: [],
      salaryMin: "",
      salaryMax: "",
      salarySet: "Monthly",
      shift: "Day Shift",
      ageLimit: "",
      employmentType: "Full",
      location: "",
      preferLocation: "",
      otherFacilities: [],
      description: "",
      requirements: "",
      logo: null,
      category: "",
      industry_type: "",
    });
    setFilePreview(null);
    setLocationInput("");
    setPreferLocationInput("");
    setOtherFacilitiesInput("");
  };

  // Prepare options for dropdowns
  const skillOptions = filteredSkills.map((skill) => ({
    value: skill.id,
    label: skill.name || skill.sub_category_eng,
  }));

  const selectedSkills = skillOptions.filter((option) =>
    formData.skills.includes(option.value)
  );

  const cityOptions = cities.map((city) => ({
    label: `${city.city_name}, ${city.city_state}`,
    value: city.city_name,
  }));

  const filteredLocationCities = cityOptions.filter((city) =>
    city.label.toLowerCase().includes(locationInput.toLowerCase())
  );

  const filteredPreferCities = cityOptions.filter((city) =>
    city.label.toLowerCase().includes(preferLocationInput.toLowerCase())
  );

  const facilitiesOptions = facilityOptions.map((facility) => ({
    id: facility.id,
    facility: facility.facility,
  }));

  if (id && jobLoading) {
    return <div className="text-center py-8">Loading job data...</div>;
  }

  return (
    <div className="">
      <div className="bg-white rounded-xl  p-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b pb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {id ? "Edit Job" : "Post New Job"}
            </h1>
            <p className="text-gray-600 mt-1">
              {id
                ? "Update the job details"
                : "Fill out the form below to create a new job posting"}
            </p>
          </div>
        </div>

        {/* {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg flex items-start gap-3">
            <FiXCircle className="mt-0.5 flex-shrink-0" />
            <div>{typeof error === 'string' ? error : 'An error occurred'}</div>
          </div>
        )} */}

        {success && (
          <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg flex items-start gap-3">
            <FiCheckCircle className="mt-0.5 flex-shrink-0" />
            <div>Job {id ? "updated" : "posted"} successfully!</div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8 mb-8 lg:mb-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Job Category */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Job Title*
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                disabled={categoriesLoading}
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.category_name_eng}
                  </option>
                ))}
              </select>
            </div>

            {/* Education */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Education Level*
              </label>
              <input
                type="text"
                name="education"
                value={formData.education}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter education level"
              />
            </div>

            {/* Experience */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Experience (Years)*
              </label>
              <input
                name="experience"
                type="number"
                min="0"
                value={formData.experience}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g., 3"
              />
            </div>

            {/* Skills */}
            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Required Skills*
              </label>
              <Select
                isMulti
                name="skills"
                options={skillOptions}
                value={selectedSkills}
                onChange={handleSkillsChange}
                className="basic-multi-select"
                classNamePrefix="select"
                isLoading={skillsLoading}
                placeholder="Select required skills..."
              />
            </div>

            {/* Salary Range */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Minimum Salary*
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  ₹
                </span>

                <input
                  name="salaryMin"
                  type="number"
                  min="0"
                  value={formData.salaryMin}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g., 50000"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Maximum Salary*
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  ₹
                </span>

                <input
                  name="salaryMax"
                  type="number"
                  min="0"
                  value={formData.salaryMax}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g., 80000"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Salary Type*
              </label>
              <select
                name="salarySet"
                value={formData.salarySet}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>

            {/* Employment Type */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Employment Type*
              </label>
              <select
                name="employmentType"
                value={formData.employmentType}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="Full">Full</option>
                <option value="Part">Part</option>
                <option value="Remote">Remote</option>
              </select>
            </div>

            {/* Shift */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Shift
              </label>
              <select
                name="shift"
                value={formData.shift}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="Night Shift">General Shift</option>
                <option value="Day Shift">Day Shift</option>
                <option value="Night Shift">Night Shift</option>
              </select>
            </div>

            {/* Age Limit */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Age Limit (Optional)
              </label>
              <input
                name="ageLimit"
                type="number"
                min="18"
                max="65"
                value={formData.ageLimit}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g., 35"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Industry Type
              </label>
              <input
                name="industry_type"
                type="text"
                value={formData.industry_type}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder=""
              />
            </div>

            {/* Region */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Region*
              </label>
              <select
                name="regions"
                value={formData.regions}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select Region</option>
                <option value="1">India</option>
                <option value="2">Outside India</option>
              </select>
            </div>

            {/* Location */}
            {formData.regions === "1" ? (
              <>
                {/* Job Location */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Job Location*
                  </label>
                  <Autocomplete
                    freeSolo
                    options={filteredLocationCities}
                    getOptionLabel={(option) =>
                      typeof option === "string" ? option : option.label
                    }
                    inputValue={locationInput}
                    onInputChange={(event, newInputValue) => {
                      setLocationInput(newInputValue);
                    }}
                    onChange={(event, newValue) => {
                      setFormData((prev) => ({
                        ...prev,
                        location: newValue
                          ? typeof newValue === "string"
                            ? newValue
                            : newValue.value
                          : "",
                      }));
                    }}
                    value={formData.location}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        required
                        variant="outlined"
                        size="small"
                        placeholder="Search for a city"
                      />
                    )}
                  />
                </div>

                {/* Preferred Location */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Preferred Location (Optional)
                  </label>
                  <Autocomplete
                    freeSolo
                    options={filteredPreferCities}
                    getOptionLabel={(option) =>
                      typeof option === "string" ? option : option.label
                    }
                    inputValue={preferLocationInput}
                    onInputChange={(event, newInputValue) => {
                      setPreferLocationInput(newInputValue);
                    }}
                    onChange={(event, newValue) => {
                      setFormData((prev) => ({
                        ...prev,
                        preferLocation: newValue
                          ? typeof newValue === "string"
                            ? newValue
                            : newValue.value
                          : "",
                      }));
                    }}
                    value={formData.preferLocation}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        size="small"
                        placeholder="Search for a preferred location"
                      />
                    )}
                  />
                </div>
              </>
            ) : (
              // If region is "Outside India", use plain input for country name
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Country Name*
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter country name"
                />
              </div>
            )}

            {/* Other Facilities */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Other Facilities (Optional)
              </label>
              <Autocomplete
                freeSolo
                multiple
                options={facilitiesOptions}
                getOptionLabel={(option) => {
                  if (typeof option === "string") return option;
                  return option.facility || "";
                }}
                inputValue={otherFacilitiesInput}
                onInputChange={(event, newInputValue) => {
                  setOtherFacilitiesInput(newInputValue);
                }}
                onChange={(event, newValue) => {
                  setFormData((prev) => ({
                    ...prev,
                    otherFacilities: newValue
                      ? newValue.map((item) => {
                          if (typeof item === "string") {
                            return { facility: item };
                          }
                          return item;
                        })
                      : [],
                  }));
                }}
                value={formData.otherFacilities}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    size="small"
                    placeholder="Add facilities (press enter after each)"
                  />
                )}
              />
            </div>

            {/* Upload Logo */}
            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Company Logo
              </label>
              <div className="flex items-center gap-4">
                <label className="flex flex-col items-center justify-center w-64 h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FiUpload className="w-8 h-8 text-gray-500" />
                    <p className="text-sm text-gray-500 mt-2">
                      Click to upload logo
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                {filePreview && (
                  <div className="w-32 h-32 border border-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={
                        filePreview?.startsWith("blob:")
                          ? filePreview
                          : `${import.meta.env.VITE_MEDIA_URL}${filePreview}`
                      }
                      alt="Logo preview"
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
              </div>
            </div>

           {/* Working Hours */}
<div className="space-y-2">
  <label className="block text-sm font-medium text-gray-700">
    Working Hours (Start Time)
  </label>
  <input
    name="working_hrs"
    type="text"
    value={formData.working_hrs}
    onChange={handleChange}
    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
  />
</div>

{/* Duty Hours */}
<div className="space-y-2">
  <label className="block text-sm font-medium text-gray-700">
    Duty Hours (End Time)
  </label>
  <input
    name="duty_hrs"
    type="text"
    value={formData.duty_hrs}
    onChange={handleChange}
    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
  />
</div>


            {/* Job Description */}
            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Job Description*
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Detailed job description..."
                required
              />
            </div>
          </div>

          <div className="pt-6 border-t border-gray-200 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-indigo-400"
            >
              {loading ? (
                id ? (
                  "Updating..."
                ) : (
                  "Posting..."
                )
              ) : (
                <>
                  <FiPlusCircle /> {id ? "Update Job" : "Post Job"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
