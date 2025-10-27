import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEmployerProfile, updateEmployerProfile } from '../../redux/slice/employeer/employerSlice';
import { FiSave, FiUploadCloud } from 'react-icons/fi';

const EmployerProfile = () => {
  const dispatch = useDispatch();
  const { profile, loading, error, success } = useSelector((state) => state.employer);

  const [formData, setFormData] = useState({
    person_name: '',
    email: '',
    password: '',
    company_name: '',
    tag_line: '',
    website: '',
    logo: null, // file
  });

  const [previewLogo, setPreviewLogo] = useState(null);

  useEffect(() => {
    dispatch(fetchEmployerProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setFormData({
        person_name: profile.person_name || '',
        email: profile.email || '',
        password: '',
        company_name: profile.company_name || '',
        tag_line: profile.tag_line || '',
        website: profile.website || '',
        logo: null,
      });
      setPreviewLogo(`${import.meta.env.VITE_MEDIA_URL}/${profile.logo}`);
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, logo: file }));
    if (file) {
      setPreviewLogo(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) updateData.append(key, value);
    });
    dispatch(updateEmployerProfile(updateData));
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading && !profile) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Edit Employer Profile</h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}
      {success && <div className="text-green-600 mb-4">Profile updated successfully!</div>}

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow">
        {/* Logo Upload */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold mb-2">Company Logo</label>
          {previewLogo && (
            <img src={previewLogo} alt="Logo Preview" className="w-32 h-32 object-contain mb-2 border rounded" />
          )}
          <input type="file" accept="image/*" onChange={handleFileChange} className="block text-sm text-gray-500" />
        </div>

        {/* Text Inputs */}
        {[
          ['person_name', 'Person Name'],
          ['email', 'Email'],
          ['password', 'Password'],
          ['company_name', 'Company Name'],
          ['tag_line', 'Tag Line'],
          ['website', 'Website URL'],
        ].map(([field, label]) => (
          <div key={field} className="flex flex-col">
            <label htmlFor={field} className="text-gray-700 font-semibold mb-1">{label}</label>
            <input
              type={field === 'password' ? 'password' : 'text'}
              name={field}
              id={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={`Enter ${label.toLowerCase()}`}
              className="border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>
        ))}

        {/* Created At Display */}
        <div className="text-gray-600 text-sm">
          <strong>Account Created:</strong> {formatDate(profile?.created_at)}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          <FiSave className="mr-2" />
          {loading ? 'Saving...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
};

export default EmployerProfile;
