import React, { useState, useEffect } from 'react';
import { FiEdit, FiX, FiSave, FiUser, FiMapPin, FiFileText } from 'react-icons/fi';
import { useDispatch,useSelector } from 'react-redux';
import { editBio } from '../../redux/slice/user/jobSeekerSlice';
import { fetchAllSkills } from '../../redux/slice/skillsSlice';
import Select from 'react-select';

const EditProfileModal = ({ isOpen, onClose, profile }) => {
  const dispatch = useDispatch();
   const { skills, loading, error } = useSelector((state) => state.skills);

  
   
 
  const [formData, setFormData] = useState({
    first_name: '',
    location: '',
    aboutme: '',
    skill: [],
    email: '',
    contact_number: '',
    alternative_contact_number:'',
    dob: '',
    father_name: '',
  });
  const [profileImage, setProfileImage] = useState(null); // To store image file or preview URL
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
      
        dispatch(fetchAllSkills());
  
    }, [ dispatch]);


 useEffect(() => {
  if (profile && isOpen && skills.length > 0) {
    // Parse the skill string into an array of numbers
    const profileSkills = typeof profile.skill === 'string' 
      ? JSON.parse(profile.skill) 
      : Array.isArray(profile.skill) 
        ? profile.skill 
        : [];

    const selectedSkillObjects = profileSkills.map((id) => {
      const match = skills.find((s) => s.id === id);
      return match ? { value: match.id, label: match.sub_category_eng } : null;
    }).filter(Boolean);

    setFormData({
      first_name: profile.first_name || '',
      location: profile.location || '',
      aboutme: profile.aboutme || '',
      skill: selectedSkillObjects,
      email: profile.email || '',
      contact_number: profile.contact_number || '',
      dob: profile.dob || '',
      father_name: profile.father_name || '',
        alternative_contact_number: profile.altranate_mobile_number || '',
    });

    setProfileImage(profile.profileImage || null);
    setErrors({});
  }
}, [profile, isOpen, skills]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Optional: Validate file type and size here
      // Create preview URL for display
      const previewUrl = URL.createObjectURL(file);
      setProfileImage(previewUrl);
      // Also store the actual file for upload
      setFormData(prev => ({
        ...prev,
        profileImageFile: file
      }));
    }
  };

  

 const handleSubmit = async (e) => {
  e.preventDefault();

  

  setIsSubmitting(true);

  try {
    const payload = new FormData();
    payload.append('firstname', formData.first_name);
    payload.append('location', formData.location);
    payload.append('aboutme', formData.aboutme);
    payload.append('email', formData.email);
    payload.append('contact_number', formData.contact_number);
    payload.append('dob', formData.dob);
    payload.append('alternative_contact_number', formData.alternative_contact_number);
    formData.skill.forEach((s) => {
  payload.append('skill[]', s.value);
});


    if (formData.profileImageFile) {
      payload.append('profileimage', formData.profileImageFile);
    }

    

    await dispatch(editBio(payload)).unwrap();
    onClose();
  } catch (error) {
    console.error('Failed to update profile:', error);
    setErrors(prev => ({
      ...prev,
      form: error.message || 'Failed to update profile'
    }));
  } finally {
    setIsSubmitting(false);
  }
};




  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-xl font-semibold">Edit Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            disabled={isSubmitting}
          >
            <FiX size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Image Upload */}
          <div className="mb-6 flex items-center space-x-4">
            <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-300">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile Preview"
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-gray-100 text-gray-400">
                  No Image
                </div>
              )}
            </div>
            <div>
              <label
                htmlFor="profileImage"
                className="cursor-pointer inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Upload Image
              </label>
              <input
                id="profileImage"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                <FiUser className="mr-2 text-blue-500" /> First Name *
              </label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.first_name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your first name"
              />
              {errors.first_name && (
                <p className="text-red-500 text-xs mt-1">{errors.first_name}</p>
              )}
            </div>

            {/* Location */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                <FiMapPin className="mr-2 text-blue-500" /> Location *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.location ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your location"
              />
              {errors.location && (
                <p className="text-red-500 text-xs mt-1">{errors.location}</p>
              )}
            </div>

           

            <div className="sm:col-span-2">
  <label className="text-sm font-medium text-gray-700 mb-1">Skills *</label>
  <Select
    isMulti
    options={skills.map(skill => ({
      value: skill.id,
      label: skill.sub_category_eng
    }))}
    value={formData.skill}
    onChange={(selectedOptions) => {
      setFormData(prev => ({
        ...prev,
        skill: selectedOptions
      }));
    }}
    classNamePrefix="react-select"
  />
  {errors.skill && (
    <p className="text-red-500 text-xs mt-1">{errors.skill}</p>
  )}
</div>

           

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Contact Number */}
            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number *</label>
              <input
                type="tel"
                name="contact_number"
                value={formData.contact_number}
                readOnly
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.contact_number ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your contact number"
              />
              {errors.contact_number && (
                <p className="text-red-500 text-xs mt-1">{errors.contact_number}</p>
              )}
            </div> */}

            <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number *</label>
  <input
    type="tel"
    name="contact_number"
    value={formData.contact_number}
    readOnly
    onChange={handleChange}
    className={`w-full px-3 py-2 border rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed focus:outline-none ${
      errors.contact_number ? 'border-red-500' : 'border-gray-300'
    }`}
    placeholder="Enter your contact number"
  />
  {errors.contact_number && (
    <p className="text-red-500 text-xs mt-1">{errors.contact_number}</p>
  )}
</div>


            {/* alternative_contact_number */}
          <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">Alternative Contact Number</label>
  <input
    type="tel"
    name="alternative_contact_number"
    value={formData.alternative_contact_number}
    onChange={handleChange}
    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    placeholder="Enter alternative contact number"
  />
  {errors.alternative_contact_number && (
    <p className="text-red-500 text-xs mt-1">{errors.alternative_contact_number}</p>
  )}
</div>

            {/* About Me */}
            <div className="sm:col-span-2 ">
              <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                <FiFileText className="mr-2 text-blue-500" /> About Me *
              </label>
              <textarea
                name="aboutme"
                value={formData.aboutme}
                onChange={handleChange}
                rows={4}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.aboutme ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Tell us about yourself"
              />
              {errors.aboutme && (
                <p className="text-red-500 text-xs mt-1">{errors.aboutme}</p>
              )}
            </div>
          
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-6 py-2 rounded-lg text-white ${
                isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : (
                <>
                  <FiSave className="inline mr-2" />
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

export default EditProfileModal;
