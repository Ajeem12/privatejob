import React, { useState, useEffect } from "react";
import { FiUser, FiPhone, FiMail, FiMessageCircle } from "react-icons/fi";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  submitFeedback,
  resetFeedbackState,
} from "../redux/slice/feedbackSlice";

const FeedbackForm = () => {
  const dispatch = useDispatch();
  const {
    loading,
    success,
    error,
    feedback: feedbackData,
  } = useSelector((state) => state.feedback);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    mobilenumber: "",
    email: "",
    feedback: "",
  });

  useEffect(() => {
    if (success && feedbackData) {
      toast.success(feedbackData?.message || "Thank you for your feedback!");
      dispatch(resetFeedbackState());
      setForm({
        first_name: "",
        last_name: "",
        mobilenumber: "",
        email: "",
        feedback: "",
      });
    }

    if (error) {
      toast.error(error?.message || "Something went wrong. Please try again.");
    }
  }, [success, error, feedbackData, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !form.first_name ||
      !form.last_name ||
      !form.mobilenumber ||
      !form.feedback
    ) {
      toast.error("Please fill all required fields.");
      return;
    }
    dispatch(submitFeedback(form));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row">
        {/* Left Side Banner */}
        <div className="lg:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-500 p-10 hidden lg:flex flex-col justify-center items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2210/2210153.png"
            alt="Feedback Illustration"
            className="w-3/4 h-auto drop-shadow-xl"
          />
          <div className="text-center mt-6 text-white">
            <h3 className="text-2xl font-semibold mb-2">
              We Value Your Feedback
            </h3>
            <p className="text-indigo-100">
              Your opinion helps us grow and serve you better!
            </p>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="lg:w-1/2 p-8 sm:p-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Feedback Form
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex gap-3">
              <input
                type="text"
                name="first_name"
                placeholder="First Name"
                value={form.first_name}
                onChange={handleChange}
                required
                className="w-1/2 border border-gray-300 rounded-lg px-3 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={form.last_name}
                onChange={handleChange}
                required
                className="w-1/2 border border-gray-300 rounded-lg px-3 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <input
              type="tel"
              name="mobilenumber"
              placeholder="Mobile Number"
              value={form.mobilenumber}
              onChange={handleChange}
              maxLength={15}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

            <input
              type="email"
              name="email"
              placeholder="Email (optional)"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

            <textarea
              name="feedback"
              placeholder="Your Feedback"
              rows="4"
              value={form.feedback}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            ></textarea>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-medium text-white 
             bg-gradient-to-r from-blue-600 to-indigo-500 
             hover:from-indigo-500 hover:to-blue-600 
             transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-70"
            >
              {loading ? "Submitting..." : "Submit Feedback"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;
