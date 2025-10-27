import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  submitContactForm,
  clearContactState,
} from "../redux/slice/contactSlice";
import {
  FaEnvelope,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
} from "react-icons/fa";

const ContactPage = () => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.contact);

  const [formData, setFormData] = useState({
    forum_name: "",
    sector: "",
    person_name: "",
    contact_number: "",
    designation: "",
    office_number: "",
    email_address: "",
    address: "",
    subject: "",
    message: "",
  });

  const [showMessage, setShowMessage] = useState(null);

  useEffect(() => {
    if (success) {
      setShowMessage({ type: "success", text: "Form submitted successfully!" });
      setFormData({
        forum_name: "",
        sector: "",
        person_name: "",
        contact_number: "",
        designation: "",
        office_number: "",
        email_address: "",
        address: "",
        subject: "",
        message: "",
      });

      dispatch(clearContactState());
      setTimeout(() => setShowMessage(null), 5000);
    }
    if (error) {
      setShowMessage({ type: "error", text: error });
      dispatch(clearContactState());
      setTimeout(() => setShowMessage(null), 3000);
    }
  }, [success, error, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitContactForm(formData));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Contact Private Job Search
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We'd love to hear from you! Reach out for partnerships, support, or
            just to say hello.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Get in Touch
            </h2>
            <div className="flex items-start">
              <div className="bg-cyan-100 p-3 rounded-full mr-4">
                <FaEnvelope className="text-cyan-600 text-xl" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Email</h3>
                <p className="text-gray-600">info@privatejobsearch.com</p>
              </div>                       
            </div>

            <div className="mt-8">
              <h3 className="font-medium text-gray-900 mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="bg-gray-100 p-3 rounded-full text-gray-700 hover:bg-cyan-100 hover:text-cyan-600 transition"
                >
                  <FaLinkedin className="text-xl" />
                </a>
                <a
                  href="#"
                  className="bg-gray-100 p-3 rounded-full text-gray-700 hover:bg-cyan-100 hover:text-cyan-600 transition"
                >
                  <FaTwitter className="text-xl" />
                </a>
                <a
                  href="#"
                  className="bg-gray-100 p-3 rounded-full text-gray-700 hover:bg-cyan-100 hover:text-cyan-600 transition"
                >
                  <FaFacebook className="text-xl" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-xl shadow-lg relative">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Send Us a Message
            </h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Firm Name */}
              <div>
                <label
                  htmlFor="forum_name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Firm Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="forum_name"
                  value={formData.forum_name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                  placeholder="Enter firm name"
                  required
                />
              </div>
               {/* Sector */}
               <div>
                <label
                  htmlFor="sector"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Sector
                </label>
                <input
                  type="text"
                  id="sector"
                  value={formData.sector}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                  placeholder="Enter sector"
                />
              </div>
             {/* Person Name */}
              <div>
                <label
                  htmlFor="person_name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Person Name
                </label>
                <input
                  type="text"
                  id="person_name"
                  value={formData.person_name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                  placeholder="Enter person name"
                />
              </div>
               {/* Contact Number */}
              <div>
                <label
                  htmlFor="contact_number"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Contact Number
                </label>
                <input
                  type="text"
                  id="contact_number"
                  value={formData.contact_number}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                  placeholder="Enter contact number"
                />
              </div>
               {/* Designation */}
               <div>
                <label
                  htmlFor="designation"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Designation
                </label>
                <input
                  type="text"
                  id="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                  placeholder="Enter designation"
                />
              </div>
              {/* Office Number */}
              <div>
                <label
                  htmlFor="office_number"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Office Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="office_number"
                  value={formData.office_number}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                  placeholder="Enter office number"
                  required
                />
              </div>
              {/* Email */}
              <div>
                <label
                  htmlFor="email_address"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address 
                </label>
                <input
                  type="email"
                  id="email_address"
                  value={formData.email_address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                  placeholder="your@email.com"
                 
                />
              </div>

              {/* Address */}
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Address
                </label>
                <textarea
                  id="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                  placeholder="Enter address"
                ></textarea>
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Subject
                </label>
                <select
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="">Select a subject</option>
                  <option value="support">Technical Support</option>
                  <option value="partnership">Partnership Inquiry</option>
                  <option value="careers">Careers</option>
                  <option value="feedback">Feedback/Suggestions</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                  placeholder="Type your message here..."
                 
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-lg transition duration-200"
              >
                {loading ? "Submitting..." : "Send Message"}
              </button>

              {showMessage && (
  <div
    className={`mt-3 px-4 py-2 rounded-lg text-sm font-medium shadow-md border transition ${
      showMessage.type === "success"
        ? "bg-white text-green-600 border-green-400"
        : "bg-white text-red-600 border-red-400"
    }`}
  >
    {showMessage.text}
  </div>
)}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
