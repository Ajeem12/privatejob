import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changePassword,
  resetChangePasswordState,
} from '../../redux/slice/employeer/employerChangePasswordSlice';
import { toast } from 'react-hot-toast';
const ChangePasswordForm = () => {
  const dispatch = useDispatch();
  const { success } = useSelector((state) => state.employerChangePassword); // adjust slice name if needed

  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (success) {
      setFormData({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      dispatch(resetChangePasswordState());
    }
  }, [success, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.oldPassword) newErrors.oldPassword = 'Old password is required';
    if (!formData.newPassword) newErrors.newPassword = 'New password is required';
    if (formData.newPassword !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     const { oldPassword, newPassword, confirmPassword } = formData;

//     dispatch(
//       changePassword({
//         old_password: oldPassword,
//         new_password: newPassword,
//         confirm_password: confirmPassword,
//       })
//     );
//   };

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return;

  const { oldPassword, newPassword, confirmPassword } = formData;

  try {
    await dispatch(
      changePassword({
        old_password: oldPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      })
    ).unwrap();

    toast.success('Password changed successfully!');
    
    // Optional: Clear form
    setFormData({
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    });

  } catch (err) {
    toast.error(err || 'Failed to change password');
  }
};

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      {/* Form inputs (unchanged) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Old Password *</label>
        <input
          type="password"
          name="oldPassword"
          value={formData.oldPassword}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.oldPassword ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Enter your old password"
        />
        {errors.oldPassword && <p className="text-red-500 text-xs mt-1">{errors.oldPassword}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">New Password *</label>
        <input
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.newPassword ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Enter your new password"
        />
        {errors.newPassword && <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password *</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Re-enter your new password"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
      >
        Change Password
      </button>
    </form>
  );
};

export default ChangePasswordForm;
