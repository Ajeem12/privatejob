import React, { useState, useContext } from "react";
import { FiEye, FiEyeOff, FiSmartphone, FiLock, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { loginJobSeeker, error: authError, loading } = useContext(AuthContext);

  const validateMobile = (number) => /^\d{10}$/.test(number);

const handleSubmit = async (e) => {
  e.preventDefault();

  const toastId = toast.loading("Logging in...");

  if (!validateMobile(mobile)) {
    setError("Enter a valid 10-digit mobile number.");
    toast.dismiss(toastId);
    return;
  }

  if (password.length < 4) {
    setError("Password must be at least 4 characters.");
    toast.dismiss(toastId);
    return;
  }

  setError("");

  try {
    await loginJobSeeker({ user_name: mobile, password });
    toast.success("Login successful!", { id: toastId });
    navigate("/"); // ✅ Redirect after success
  } catch (err) {
    const message = err?.response?.data?.message || err?.message || "Login failed";
    toast.error(message, { id: toastId });
  }
};


  return (
    <div className=" flex flex-col lg:flex-row mt-0">
      {/* Left Illustration */}
      <div className="lg:w-1/2 hidden lg:flex items-center justify-center bg-cyan-700 p-12">
        <div className="max-w-md text-center">
          <img
            src="https://jobstack-shreethemes.vercel.app/assets/woman_working_2-CtRt_vob.svg"
            alt="Login illustration"
            className="mb-8 w-full h-auto"
          />
          <h3 className="text-white text-2xl font-semibold mb-2">Welcome Back to ShreeJob</h3>
          <p className="text-cyan-100">Find your dream job with the best opportunities</p>
        </div>
      </div>

      {/* Right Login Form */}
      <div className="lg:w-1/2 w-full flex items-center justify-center px-4 py-12 sm:px-8">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-xl">
          <h2 className="text-xl md:text-3xl font-bold text-gray-800 text-center mb-6">Login to Your Account</h2>

          {(error || authError) && (
            <div className="mb-4 p-3 text-sm text-red-600 bg-red-50 rounded">
              {error || authError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
            {/* Mobile Field */}
            <div>
              <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center space-x-2 text-gray-500">
                  <FiSmartphone className="text-gray-400" />
                  <span>+91</span>
                </div>
                <input
                  type="tel"
                  inputMode="numeric"
                  name="mobile"
                  id="mobile"
                  autoComplete="off"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                  maxLength={10}
                  required
                  placeholder="Enter Your Number"
                  className="w-full pl-28 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition text-gray-800"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center">
                  <FiLock className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  autoComplete="new-password" // Prevents autofill
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition text-gray-800"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 border border-transparent rounded-lg font-medium text-white shadow-md focus:outline-none transition-all ${
                loading
                  ? "bg-cyan-400 cursor-not-allowed"
                  : "bg-cyan-600 hover:bg-cyan-700 focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-3 text-white"
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
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                  Logging in...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  Login <FiArrowRight className="ml-2" />
                </span>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link to="/register" className="text-cyan-600 hover:underline font-medium">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
