import React, { useState, useEffect } from 'react';
import { FiX, FiSave } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { addEducation, updateEducation, clearEducationMessages } from '../../redux/slice/user/educationSlice';

const EducationModal = ({ isOpen, onClose, education,onSaveSuccess  }) => {
  const dispatch = useDispatch();
  const { loading, error, successMessage } = useSelector((state) => state.education);
  
  const [formData, setFormData] = useState({
    university_name: '',
    course_name: '',
    years: '',
    currently_studying: false
  });

  const [errors, setErrors] = useState({
    university_name: '',
    course_name: '',
    years: ''
  });

  useEffect(() => {
    if (education) {
      setFormData({
        university_name: education.university_name || '',
        course_name: education.course_name || '',
        years: education.years || '',
        currently_studying: education.currently_studying || false
      });
    } else {
      setFormData({
        university_name: '',
        course_name: '',
        years: '',
        currently_studying: false
      });
    }
    // Clear any previous messages when modal opens
    dispatch(clearEducationMessages());
    setErrors({
      university_name: '',
      course_name: '',
      years: ''
    });
  }, [education, isOpen, dispatch]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

  };

  const validate = () => {
    const newErrors = {
      university_name: '',
      course_name: '',
      years: ''
    };

    let isValid = true;

    if (!formData.university_name.trim()) {
      newErrors.university_name = 'University name is required';
      isValid = false;
    }

    if (!formData.course_name.trim()) {
      newErrors.course_name = 'Course name is required';
      isValid = false;
    }

    if (!formData.years) {
      newErrors.years = 'Years are required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      if (education) {
        // Update existing education
        dispatch(updateEducation({
          id: education.id,
          data: formData
        }));
      } else {
        // Add new education
        dispatch(addEducation(formData));
      }
    }
  };

  // Close modal on successful save
 useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        onClose();
        onSaveSuccess(); // Call the success callback
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, onClose, onSaveSuccess]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-6">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md ">
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-xl font-semibold">
            {education ? 'Edit Education' : 'Add Education'}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            disabled={loading}
          >
            <FiX size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Error message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {/* Success message */}
          {successMessage && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
              {successMessage}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              University Name *
            </label>
            <input
              type="text"
              name="university_name"
              value={formData.university_name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.university_name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter university name"
              disabled={loading}
            />
            {errors.university_name && (
              <p className="text-red-500 text-xs mt-1">{errors.university_name}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Course Name *
            </label>
            <input
              type="text"
              name="course_name"
              value={formData.course_name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.course_name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter course name"
              disabled={loading}
            />
            {errors.course_name && (
              <p className="text-red-500 text-xs mt-1">{errors.course_name}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Years *
            </label>
            <input
              type="text"
              name="years"
              value={formData.years}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.years ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g. 2015-2019"
              disabled={loading}
            />
            {errors.years && (
              <p className="text-red-500 text-xs mt-1">{errors.years}</p>
            )}
          </div>

         

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center disabled:bg-blue-400"
              disabled={loading}
            >
              {loading ? (
                'Processing...'
              ) : (
                <>
                  <FiSave className="mr-2" />
                  Save
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EducationModal;