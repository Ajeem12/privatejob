import {
  FiUser,
  FiPhone,
  FiLock,
  FiMail,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUser,
  resetRegisterState,
} from "../../redux/slice/user/userRegisterSlice";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector(
    (state) => state.userRegister
  );

  const [form, setForm] = useState({
    name: "",
    mobileNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const isMobileValid = /^\d{10}$/.test(form.mobileNumber);
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  const passwordsMatch = form.password === form.confirmPassword;
  const isPasswordValid = form.password.length >= 6;
  const isFormValid =
    form.name &&
    isMobileValid &&
    isEmailValid &&
    isPasswordValid &&
    passwordsMatch &&
    form.agree;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    const formData = new FormData();
    formData.append("first_name", form.name);
    formData.append("contact_number", form.mobileNumber);
    formData.append("email", form.email);
    formData.append("password", form.password);
    formData.append("password_confirmation", form.confirmPassword);
    formData.append("terms_condition", form.agree ? "1" : "");

    const toastId = toast.loading("Registering...");

    try {
      await dispatch(registerUser(formData)).unwrap();
      toast.success("Registration successful!", { id: toastId });

      // Clear form after success
      setForm({
        name: "",
        mobileNumber: "",
        email: "",
        password: "",
        confirmPassword: "",
        agree: false,
      });
        // Navigate to login page
      navigate('/login');
    } catch (error) {
      let errorMessage = "Registration failed!";

      if (error) {
        if (error.data) {
          const firstKey = Object.keys(error.data)[0];
          if (Array.isArray(error.data[firstKey])) {
            errorMessage = error.data[firstKey][0];
          } else if (typeof error.data[firstKey] === "string") {
            errorMessage = error.data[firstKey];
          }
        } else if (error.message) {
          errorMessage = error.message;
        } else if (typeof error === "string") {
          errorMessage = error;
        }
      }

      toast.error(errorMessage, { id: toastId });
    }
  };

  const formatError = (err) => {
    if (!err) return null;

    // If string, return as is
    if (typeof err === "string") return err;

    // If object, join all error messages from all keys
    if (typeof err === "object") {
      // Get all values, flatten arrays, join with commas
      const messages = Object.values(err).flat().filter(Boolean).join(", ");
      return messages || "An error occurred";
    }

    return "An error occurred";
  };

  useEffect(() => {
    if (success) {
      dispatch(resetRegisterState());
    }
  }, [success, dispatch]);

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <div className="w-full max-w-7xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Left Side - Illustration */}
          <div className="lg:w-1/2 bg-cyan-700 p-8 hidden lg:flex flex-col justify-center items-center">
            <img
              src="https://jobstack-shreethemes.vercel.app/assets/woman_working_2-CtRt_vob.svg"
              alt="Career Illustration"
              className="w-full h-auto max-w-md"
            />
            <div className="text-center mt-8 text-white">
              <h3 className="text-2xl font-bold mb-2">Join Our Community</h3>
              <p className="text-cyan-100">
                Find your dream job with the best opportunities
              </p>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="lg:w-1/2 p-8 sm:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Create Account
              </h2>
              <p className="text-gray-600">
                Register to access thousands of job opportunities
              </p>
            </div>

            {/* {error && (
  <div className="mb-6 p-3 bg-red-50 text-red-600 rounded-lg text-center">
    {formatError(error)}
  </div>
)}
 */}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
                    required
                    autoComplete="name"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
                    required
                    autoComplete="email"
                  />
                </div>
                {form.email && !isEmailValid && (
                  <p className="mt-1 text-sm text-red-600">
                    Please enter a valid email address
                  </p>
                )}
              </div>

              {/* Mobile Field */}
              <div>
                <label
                  htmlFor="mobileNumber"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Mobile Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiPhone className="text-gray-400" />
                  </div>
                  <div className="absolute inset-y-0 left-8 flex items-center pointer-events-none">
                    <span className="text-gray-500">+91</span>
                  </div>
                  <input
                    type="tel"
                    id="mobileNumber"
                    name="mobileNumber"
                    value={form.mobileNumber}
                    onChange={handleChange}
                    placeholder="9876543210"
                    maxLength={10}
                    className="w-full pl-16 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
                    required
                  />
                </div>
                {form.mobileNumber && !isMobileValid && (
                  <p className="mt-1 text-sm text-red-600">
                    Please enter a valid 10-digit number
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
                    required
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FiEyeOff className="text-gray-400 hover:text-gray-600" />
                    ) : (
                      <FiEye className="text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
                {form.password && !isPasswordValid && (
                  <p className="mt-1 text-sm text-red-600">
                    Password must be at least 6 characters
                  </p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-gray-400" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
                    required
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <FiEyeOff className="text-gray-400 hover:text-gray-600" />
                    ) : (
                      <FiEye className="text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
                {form.confirmPassword && !passwordsMatch && (
                  <p className="mt-1 text-sm text-red-600">
                    Passwords don't match
                  </p>
                )}
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="agree"
                    name="agree"
                    type="checkbox"
                    checked={form.agree}
                    onChange={handleChange}
                    className="focus:ring-cyan-500 h-4 w-4 text-cyan-600 border-gray-300 rounded"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="agree" className="text-gray-600">
                    I agree to the{" "}
                    <a
                      href="#"
                      className="text-cyan-600 hover:text-cyan-500"
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      href="#"
                      className="text-cyan-600 hover:text-cyan-500"
                    >
                      Privacy Policy
                    </a>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!isFormValid || loading}
                className={`w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition ${
                  isFormValid && !loading
                    ? "bg-cyan-600 hover:bg-cyan-700"
                    : "bg-cyan-400 cursor-not-allowed"
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating Account...
                  </span>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-cyan-600 hover:text-cyan-500 font-medium"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
