import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEmployerProfile, updateEmployerProfile } from '../../redux/slice/employeer/employerSlice';
import { fetchCities } from '../../redux/slice/citiesSlice';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { 
  FiEdit, 
  FiSave, 
  FiX, 
  FiUpload, 
  FiBriefcase, 
  FiMail, 
  FiUser, 
  FiGlobe, 
  FiPhone, 
  FiMapPin,
  FiAward
} from 'react-icons/fi';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { MdOutlineBusiness, MdOutlineWorkOutline } from 'react-icons/md';
import { CircularProgress } from '@mui/material';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const companyTypes = [
  'Consulting',
  'Manufacturing',
  'Healthcare',
  'Finance',
  'Education',
  'Retail',
  'Technology',
  'Other',
];

const EmployerProfile = () => {
  const dispatch = useDispatch();
  const { items: cities, loading: citiesLoading } = useSelector((state) => state.cities);
  const { profile, loading, error, updating } = useSelector((state) => state.employer);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
  person_name: '',
  contact_person_name: '',
  designation: '',
  email: '',
  company_name: '',
  brand_name: '',
  tag_line: '',
  website: '',
  logo: null,
  employment_type: '',
  contact_number: '',
  office_number: '',
  location: null,
});


  const [errors, setErrors] = useState({});
  const [logoPreview, setLogoPreview] = useState(null);

  useEffect(() => {
    dispatch(fetchEmployerProfile());
    dispatch(fetchCities());
  }, [dispatch]);

  useEffect(() => {
    if (profile && cities) {
      const matchedCity = cities.find(
        (c) => c.city_name.toLowerCase() === profile.location?.toLowerCase()
      ) || null;

      setFormData({
  person_name: profile.person_name || '',
  contact_person_name: profile.contact_person_name || '',
  designation: profile.designation || '',
  email: profile.email || '',
  company_name: profile.company_name || '',
  brand_name: profile.brand_name || '',
  tag_line: profile.tag_line || '',
  website: profile.website || '',
  logo: null,
  employment_type: profile.employment_type || '',
  contact_number: profile.contact_number || '',
  office_number: profile.office_number || '',
  location: matchedCity,
});
      
      if (profile.logo) {
        setLogoPreview(`${import.meta.env.VITE_MEDIA_URL}/storage/${profile.logo}`);
      }
      
      setErrors({});
    }
  }, [profile, cities]);

  const validate = () => {
    const newErrors = {};
    if (!formData.company_name.trim()) newErrors.company_name = 'Required field';
    if (!formData.email.trim()) newErrors.email = 'Required field';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.employment_type) newErrors.employment_type = 'Please select type';
    if (!formData.contact_person_name.trim()) newErrors.contact_person_name = 'Required field';
    if (!formData.location) newErrors.location = 'Please select location';
      if (!formData.designation.trim()) newErrors.designation = 'Designation is required';
  if (!formData.brand_name.trim()) newErrors.brand_name = 'Brand name is required';
  if (!formData.office_number.trim()) newErrors.office_number = 'Office number is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'logo') {
      setFormData((prev) => ({ ...prev, logo: files[0] }));
      if (files[0]) {
        setLogoPreview(URL.createObjectURL(files[0]));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleLocationChange = (event, newValue) => {
    setFormData((prev) => ({ ...prev, location: newValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'location') {
        if (value && value.city_name) data.append('location', value.city_name);
      } else if (key === 'website') {
        if (value) data.append('website_link', value);
      } else if (value !== null && value !== undefined) {
        data.append(key, value);
      }
    });

    try {
      await dispatch(updateEmployerProfile(data)).unwrap();
      toast.success('Profile updated successfully!');
      setIsEditing(false);
      dispatch(fetchEmployerProfile());
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  if (loading || citiesLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <CircularProgress size={60} thickness={4} className="text-blue-600" />
          <p className="text-lg font-medium text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error loading profile</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-cyan-600 px-6 py-5 sm:px-8 sm:py-6 text-white">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                <HiOutlineOfficeBuilding size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">
                  {isEditing ? 'Edit Company Profile' : 'Company Profile'}
                </h1>
                <p className="text-blue-100 text-sm mt-1">
                  {isEditing ? 'Update your company information' : 'View and manage company details'}
                </p>
              </div>
            </div>
            
            {!isEditing ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 bg-white text-blue-700 px-4 py-2.5 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium"
              >
                <FiEdit size={18} /> Edit Profile
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsEditing(false)}
                className="flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white px-4 py-2.5 rounded-lg hover:bg-white/30 transition-colors text-sm font-medium"
              >
                <FiX size={18} /> Cancel
              </motion.button>
            )}
          </div>
        </div>

        {/* Profile Form */}
        <div className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Company Name */}
              <div className="md:col-span-2">
                <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <MdOutlineBusiness className="text-blue-600" />
                  Company Name <span className="text-red-500">*</span>
                </label>
                {isEditing ? (
                  <div className="relative">
                    <input
                      type="text"
                      name="company_name"
                      value={formData.company_name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                        errors.company_name ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                      }`}
                      placeholder="Enter company name"
                      required
                    />
                    {errors.company_name && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.company_name}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-gray-800">{profile?.company_name || 'Not provided'}</p>
                  </div>
                )}
              </div>

              {/* Tag Line */}
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <FiAward className="text-blue-600" />
                  Tag Line
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="tag_line"
                    value={formData.tag_line}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg hover:border-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="Your company tagline"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-gray-800">{profile?.tag_line || 'Not provided'}</p>
                  </div>
                )}
              </div>

              {/* Contact Person */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <FiUser className="text-blue-600" />
                  Contact Person <span className="text-red-500">*</span>
                </label>
                {isEditing ? (
                  <div className="relative">
                    <input
                      type="text"
                      name="contact_person_name"
                      value={formData.contact_person_name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                        errors.contact_person_name ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                      }`}
                      placeholder="Full name"
                      required
                    />
                    {errors.contact_person_name && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.contact_person_name}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-gray-800">{profile?.person_name || 'Not provided'}</p>
                  </div>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <FiMail className="text-blue-600" />
                  Email <span className="text-red-500">*</span>
                </label>
                {isEditing ? (
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      readOnly
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                        errors.email ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                      }`}
                      placeholder="company@email.com"
                      required
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.email}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-gray-800">{profile?.email || 'Not provided'}</p>
                  </div>
                )}
              </div>

              {/* Website */}
              {/* <div>
                <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <FiGlobe className="text-blue-600" />
                  Website
                </label>
                {isEditing ? (
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg hover:border-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="https://example.com"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-gray-800">{profile?.website || 'Not provided'}</p>
                  </div>
                )}
              </div> */}


              {/* Employer's Designation */}
<div>
  <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
    <FiBriefcase className="text-blue-600" />
    Employer's Designation
  </label>
  {isEditing ? (
    <input
      type="text"
      name="designation"
      value={formData.designation}
      onChange={handleChange}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg hover:border-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
      placeholder="e.g., HR Manager, CEO"
    />
  ) : (
    <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
      <p className="text-gray-800">{profile?.designation || 'Not provided'}</p>
    </div>
  )}
</div>

{/* Brand Name */}
<div>
  <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
    <MdOutlineBusiness className="text-blue-600" />
    Brand Name
  </label>
  {isEditing ? (
    <input
      type="text"
      name="brand_name"
      value={formData.brand_name}
      onChange={handleChange}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg hover:border-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
      placeholder="Enter brand name"
    />
  ) : (
    <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
      <p className="text-gray-800">{profile?.brand_name || 'Not provided'}</p>
    </div>
  )}
</div>
{/* Office Number */}
<div>
  <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
    <FiPhone className="text-blue-600" />
    Office Number
  </label>
  {isEditing ? (
    <input
      type="tel"
      name="office_number"
      value={formData.office_number}
      onChange={handleChange}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg hover:border-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
      placeholder="+1 (___) ___-____"
    />
  ) : (
    <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
      <p className="text-gray-800">{profile?.office_number || 'Not provided'}</p>
    </div>
  )}
</div>


              <div>
  <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
    <FiGlobe className="text-blue-600" />
    Website
  </label>
  {isEditing ? (
    <input
      type="url"
      name="website"
      value={formData.website}
      onChange={handleChange}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg hover:border-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
      placeholder="https://example.com"
    />
  ) : (
    <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
      <p className="text-gray-800 truncate">
        {profile?.website || 'Not provided'}
      </p>
    </div>
  )}
</div>

              {/* Contact Number */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <FiPhone className="text-blue-600" />
                  Contact Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="contact_number"
                    value={formData.contact_number}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg hover:border-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="+1 (___) ___-____"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-gray-800">{profile?.contact_number || 'Not provided'}</p>
                  </div>
                )}
              </div>

              {/* Location */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <FiMapPin className="text-blue-600" />
                  Location <span className="text-red-500">*</span>
                </label>
                {isEditing ? (
                  <div className="relative">
                    <Autocomplete
                      options={cities || []}
                      getOptionLabel={(option) =>
                        option.city_name ? `${option.city_name}, ${option.city_state}` : ''
                      }
                      isOptionEqualToValue={(option, value) => value && option.city_id === value.city_id}
                      value={formData.location}
                      onChange={handleLocationChange}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Search location..."
                          variant="outlined"
                          size="small"
                          className="w-full"
                          InputProps={{
                            ...params.InputProps,
                            className: 'py-2.5 px-4 rounded-lg hover:border-gray-400',
                          }}
                        />
                      )}
                    />
                    {errors.location && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.location}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-gray-800">{profile?.location || 'Not provided'}</p>
                  </div>
                )}
              </div>

              {/* Company Type */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <MdOutlineWorkOutline className="text-blue-600" />
                  Company Type <span className="text-red-500">*</span>
                </label>
                {isEditing ? (
                  <div className="relative">
                    <select
                      name="employment_type"
                      value={formData.employment_type}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none ${
                        errors.employment_type ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                      }`}
                      required
                    >
                      <option value="">Select company type</option>
                      {companyTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                    {errors.employment_type && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.employment_type}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-gray-800">{profile?.employment_type || 'Not provided'}</p>
                  </div>
                )}
              </div>

              {/* Company Logo */}
              <div className="md:col-span-2">
                <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <FiUpload className="text-blue-600" />
                  Company Logo
                </label>
                {isEditing ? (
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <motion.label 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex flex-col items-center justify-center w-40 h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors overflow-hidden relative group"
                    >
                      <div className="flex flex-col items-center justify-center p-6 text-center">
                        <FiUpload className="w-8 h-8 text-gray-400 group-hover:text-blue-500 transition-colors" />
                        <p className="text-sm text-gray-500 mt-2 group-hover:text-blue-600 transition-colors">
                          Upload Logo
                        </p>
                        <p className="text-xs text-gray-400 mt-1">PNG, JPG (max. 5MB)</p>
                      </div>
                      <input
                        type="file"
                        name="logo"
                        onChange={handleChange}
                        className="hidden"
                        accept="image/*"
                      />
                    </motion.label>
                    {logoPreview && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="relative w-40 h-40 rounded-xl border border-gray-200 overflow-hidden shadow-sm bg-white"
                      >
                        <img
                          src={logoPreview}
                          alt="Logo preview"
                          className="w-full h-full object-contain p-4"
                        />
                      </motion.div>
                    )}
                  </div>
                ) : profile?.logo ? (
                  <div className="w-40 h-40 rounded-xl border border-gray-200 overflow-hidden shadow-sm bg-white">
                    <img
                      src={`${import.meta.env.VITE_MEDIA_URL}/storage/${profile.logo}`}
                      alt="Company Logo"
                      className="w-full h-full object-contain p-4"
                    />
                  </div>
                ) : (
                  <div className="w-40 h-40 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
                    <p className="text-gray-500 text-sm">No logo uploaded</p>
                  </div>
                )}
              </div>
            </div>

            {isEditing && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-end mt-10 pt-6 border-t border-gray-200"
              >
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
                  disabled={updating}
                >
                  {updating ? (
                    <>
                      <CircularProgress size={20} color="inherit" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <FiSave size={18} />
                      Save Changes
                    </>
                  )}
                </motion.button>
              </motion.div>
            )}
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default EmployerProfile;