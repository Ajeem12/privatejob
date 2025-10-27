// import React, { useState } from 'react';
// import { FiLock } from 'react-icons/fi';
// import { useDispatch, useSelector } from 'react-redux';
// import { changePassword, resetChangePasswordState } from '../../redux/slice/changePasswordSlice';

// const UserSettings = () => {
//   const [oldPassword, setOldPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   const dispatch = useDispatch();
//   const { loading, error, success } = useSelector((state) => state.changePassword);

//   const handleChangePassword = (e) => {
//   e.preventDefault();
//   dispatch(changePassword({ oldPassword, newPassword, confirmPassword }));
// }

//   return (
//     <div className=" bg-white  rounded-xl ">
//       <h2 className="text-3xl font-bold text-gray-800 mb-6">Change Password</h2>

//       {error && <div className="mb-4 text-sm text-red-600 bg-red-50 p-2 rounded">{error}</div>}
//       {success && <div className="mb-4 text-sm text-green-600 bg-green-50 p-2 rounded">{success}</div>}

//       <form onSubmit={handleChangePassword} className="space-y-5">
//         {/* Old Password */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Old Password
//           </label>
//           <div className="relative">
//             <FiLock className="absolute top-3 left-3 text-gray-400" />
//             <input
//               type="password"
//               value={oldPassword}
//               onChange={(e) => setOldPassword(e.target.value)}
//               placeholder="Enter current password"
//               className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none text-gray-700"
//             />
//           </div>
//         </div>

//         {/* New Password */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             New Password
//           </label>
//           <div className="relative">
//             <FiLock className="absolute top-3 left-3 text-gray-400" />
//             <input
//               type="password"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               placeholder="Enter new password"
//               className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none text-gray-700"
//             />
//           </div>
//         </div>

//         {/* Confirm Password */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Confirm New Password
//           </label>
//           <div className="relative">
//             <FiLock className="absolute top-3 left-3 text-gray-400" />
//             <input
//               type="password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               placeholder="Confirm new password"
//               className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none text-gray-700"
//             />
//           </div>
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full bg-cyan-600 text-white py-2 rounded-lg hover:bg-cyan-700 transition font-medium"
//         >
//           Update Password
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UserSettings;
import React, { useState, useEffect } from 'react';
import { FiLock } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword, resetChangePasswordState } from '../../redux/slice/changePasswordSlice';
import { toast } from 'react-hot-toast';

const UserSettings = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.changePassword);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    try {
      await dispatch(changePassword({ oldPassword, newPassword, confirmPassword })).unwrap();
      toast.success('Password changed successfully!');
    } catch (err) {
      toast.error(err || 'Failed to change password');
    }
  };

  // Clear form after success
  useEffect(() => {
    if (success) {
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      dispatch(resetChangePasswordState());
    }
  }, [success, dispatch]);

  return (
    <div className="bg-white rounded-xl p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Change Password</h2>

      {error && <div className="mb-4 text-sm text-red-600 bg-red-50 p-2 rounded">{error}</div>}
      {success && <div className="mb-4 text-sm text-green-600 bg-green-50 p-2 rounded">{success}</div>}

      <form onSubmit={handleChangePassword} className="space-y-5">
        {/* Old Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Old Password</label>
          <div className="relative">
            <FiLock className="absolute top-3 left-3 text-gray-400" />
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Enter current password"
              className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none text-gray-700"
            />
          </div>
        </div>

        {/* New Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
          <div className="relative">
            <FiLock className="absolute top-3 left-3 text-gray-400" />
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none text-gray-700"
            />
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
          <div className="relative">
            <FiLock className="absolute top-3 left-3 text-gray-400" />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none text-gray-700"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-cyan-600 text-white py-2 rounded-lg transition font-medium ${
            loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-cyan-700'
          }`}
        >
          {loading ? 'Updating...' : 'Update Password'}
        </button>
      </form>
    </div>
  );
};

export default UserSettings;
