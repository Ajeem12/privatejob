import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { AuthContext } from '../../context/AuthContext'; // Adjust path if needed
import { toast } from 'react-hot-toast';

const EmployerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { loginEmployer, error } = useContext(AuthContext);
  const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   try {
  //     await loginEmployer({ email, password });
  //     // Redirect after successful login
  //     navigate('/');
  //   } catch (err) {
  //     console.error('Login failed:', err.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   setIsLoading(true);

//   const loadingToast = toast.loading('Logging in...');

//   try {
//     await loginEmployer({ email, password });
//     toast.success('Login successful!', { id: loadingToast });
//     navigate('/');
//   } catch (err) {
//     console.error('Login failed:', err.message);
//     toast.error('Login failed: ' + (err?.message || 'Unexpected error'), { id: loadingToast });
//   } finally {
//     setIsLoading(false);
//   }
// };
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  const loadingToast = toast.loading('Logging in...');

  try {
    await loginEmployer({ email, password });
    toast.success('Login successful!', { id: loadingToast });
    navigate('/');
  } catch (err) {
    // Check for the specific "24 hours" message
    if (err?.response?.data?.data?.includes('24 hours after registration')) {
      toast.error('Your account is not yet active. Please wait 24 hours after registration.', { 
        id: loadingToast,
        duration: 5000 // Show for longer since it's important
      });
    } else {
      // Fallback to generic error handling
      const message = err?.response?.data?.message || 
                     err?.response?.data?.data || 
                     err?.message || 
                     'Login failed';
      console.error('Login failed:', message);
      toast.error('Login failed: ' + message, { id: loadingToast });
    }
  } finally {
    setIsLoading(false);
  }
};

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setIsLoading(true);

//   const loadingToast = toast.loading('Logging in...');

//   try {
//     await loginEmployer({ email, password });
//     toast.success('Login successful!', { id: loadingToast });
//     navigate('/');
//   } catch (err) {
//     console.log(err);
    
//     // ✅ Extract a user-friendly message from the server response
//     const message = err?.response?.data?.message || err?.message || 'Login failed';
//     console.error('Login failed:', message);

//     toast.error('Login failed: ' + message, { id: loadingToast });
//   } finally {
//     setIsLoading(false);
//   }
// };


  return (
    <div className="mt-0 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-cyan-600 py-6 px-8 text-center">
            <h1 className="text-2xl font-bold text-white">Employer Portal</h1>
            <p className="text-cyan-100 mt-1">Access your recruitment dashboard</p>
          </div>

          {/* Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit} autoComplete="off" className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Work Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                  placeholder="your@company.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition pr-12"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
                  >
                    {showPassword ? <HiEyeOff className="h-5 w-5" /> : <HiEye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

             

              {error && <p className="text-red-500 text-sm text-center">{error}</p>}

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-lg font-medium text-white ${
                  isLoading ? 'bg-cyan-400' : 'bg-cyan-600 hover:bg-cyan-700'
                } transition duration-200 flex items-center justify-center`}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  'Sign in'
                )}
              </button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">New to our platform?</span>
                </div>
              </div>

              <div className="mt-4">
                <Link
                  to="/employer/register"
                  className="w-full block text-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition"
                >
                  Create employer account
                </Link>
              </div>
            </div>
          </div>
        </div>

       
       
      </div>
    </div>
  );
};

export default EmployerLogin;
