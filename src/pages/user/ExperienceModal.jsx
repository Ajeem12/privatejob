import React, { useState, useEffect } from 'react';
import { FiX, FiCalendar, FiBriefcase, FiFileText } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { addExperience, updateExperience } from '../../redux/slice/user/experienceSlice';

const ExperienceModal = ({ isOpen, onClose, experience, onSaveSuccess }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.experience);

  const initialState = {
    company_name: '',
    role: '',
    year_from: '',
    year_to: '',
    desc: '',
    currently_working: false
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      setFormData({
        company_name: experience?.company_name || '',
        role: experience?.role || '',
        year_from: experience?.year_from || '',
        year_to: experience?.year_to || '',
        desc: experience?.description || experience?.desc || '',
        currently_working: !experience?.year_to
      });
      setErrors({});
    }
  }, [experience, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validate = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.company_name.trim()) {
      newErrors.company_name = 'Company name is required';
      isValid = false;
    }
    if (!formData.role.trim()) {
      newErrors.role = 'Role is required';
      isValid = false;
    }
    if (!formData.year_from) {
      newErrors.year_from = 'Start date is required';
      isValid = false;
    }
    if (!formData.currently_working && !formData.year_to) {
      newErrors.year_to = 'End date is required';
      isValid = false;
    }
    if (!formData.desc.trim()) {
      newErrors.desc = 'Description is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      ...formData,
      year_to: formData.currently_working ? null : formData.year_to
    };

    try {
      const result = await dispatch(
        experience
          ? updateExperience({ id: experience.id, data: payload })
          : addExperience(payload)
      );

      if (result.meta.requestStatus === 'fulfilled') {
        onClose();
        onSaveSuccess();
      }
    } catch (error) {
      console.error('Error saving experience:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-xl rounded-xl shadow-xl overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
          <h2 className="text-xl font-semibold text-gray-800">
            {experience ? 'Edit Experience' : 'Add Experience'}
          </h2>
          <button
            onClick={onClose}
            disabled={loading}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close modal"
          >
            <FiX size={22} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error.message || 'An unexpected error occurred.'}
            </div>
          )}

          {/* Company Name */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Company Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <FiBriefcase />
              </div>
              <input
                type="text"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                className={`block w-full pl-10 pr-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.company_name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g. Google"
                disabled={loading}
              />
            </div>
            {errors.company_name && (
              <p className="text-red-500 text-xs">{errors.company_name}</p>
            )}
          </div>

          {/* Role */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Role <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={`block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.role ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g. Software Engineer"
              disabled={loading}
            />
            {errors.role && (
              <p className="text-red-500 text-xs">{errors.role}</p>
            )}
          </div>

          {/* Date Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Start Date */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Start Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FiCalendar />
                </div>
                <input
                  type="date"
                  name="year_from"
                  value={formData.year_from}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.year_from ? 'border-red-500' : 'border-gray-300'
                  }`}
                  disabled={loading}
                />
              </div>
              {errors.year_from && (
                <p className="text-red-500 text-xs">{errors.year_from}</p>
              )}
            </div>

            {/* End Date */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                {formData.currently_working ? 'Currently Working' : 'End Date'}
                {!formData.currently_working && <span className="text-red-500"> *</span>}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FiCalendar />
                </div>
                <input
                  type="date"
                  name="year_to"
                  value={formData.year_to}
                  onChange={handleChange}
                  disabled={formData.currently_working || loading}
                  className={`block w-full pl-10 pr-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.year_to ? 'border-red-500' : 'border-gray-300'
                  } ${formData.currently_working ? 'bg-gray-100' : ''}`}
                />
              </div>
              {errors.year_to && (
                <p className="text-red-500 text-xs">{errors.year_to}</p>
              )}
            </div>
          </div>

          {/* Currently Working */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="currently_working"
              name="currently_working"
              checked={formData.currently_working}
              onChange={handleChange}
              disabled={loading}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="currently_working" className="ml-2 block text-sm text-gray-700">
              I currently work here
            </label>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Description <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute top-3 left-3 text-gray-400">
                <FiFileText />
              </div>
              <textarea
                name="desc"
                rows={4}
                value={formData.desc}
                onChange={handleChange}
                className={`block w-full pl-10 pr-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.desc ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Describe your responsibilities and achievements..."
                disabled={loading}
              />
            </div>
            {errors.desc && (
              <p className="text-red-500 text-xs">{errors.desc}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end pt-4 space-x-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {experience ? 'Updating...' : 'Adding...'}
                </span>
              ) : experience ? 'Update Experience' : 'Add Experience'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExperienceModal;