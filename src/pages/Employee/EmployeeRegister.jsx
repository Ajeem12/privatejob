// import React, { useState } from "react";
// import {
//   FiUser,
//   FiMail,
//   FiPhone,
//   FiBriefcase,
//   FiLock,
//   FiGlobe,
//   FiImage
// } from "react-icons/fi";
// import { useDispatch } from 'react-redux';
// import { registerEmployee } from '../../redux/slice/employeer/employeeRegisterSlice';

// const EmployeeRegister = () => {
//   const dispatch = useDispatch();
//   const { loading } = useSelector((state) => state.employeeRegister);
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     password: "",
//     companyName: "",
//     companyWebsite: "",
//     companyType: "",
//     companyLogo: null
//   });

//   const [errors, setErrors] = useState({});
//   const [successMsg, setSuccessMsg] = useState("");
//   const [logoPreview, setLogoPreview] = useState("");

//   const companyTypes = [
//     "Consulting", "Manufacturing", "Healthcare", "Finance", "Education", "Retail", "Other"
//   ];

//   const validate = () => {
//     const newErrors = {};
//     if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = "Email is invalid";
//     }
//     if (!formData.phone.trim()) {
//       newErrors.phone = "Phone number is required";
//     } else if (!/^\d{10}$/.test(formData.phone)) {
//       newErrors.phone = "Phone number must be 10 digits";
//     }

//     if (!formData.password || formData.password.length < 8)
//       newErrors.password = "Password must be at least 8 characters";
//     if (!formData.companyName.trim()) newErrors.companyName = "Company name is required";
//     if (!formData.companyType) newErrors.companyType = "Company type is required";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData(prev => ({ ...prev, companyLogo: file }));
//       setLogoPreview(URL.createObjectURL(file));
//     }
//   };

// const handleSubmit = (e) => {
//   e.preventDefault();
//   setSuccessMsg("");

//   if (validate()) {
//     const formPayload = new FormData();

//     // 👇 Match backend field names exactly
//     formPayload.append("contact_person_name", formData.fullName); // if required
//     formPayload.append("email", formData.email);
//     formPayload.append("contact_number", formData.phone);
//     formPayload.append("password", formData.password);
//     formPayload.append("company_name", formData.companyName); //
//     formPayload.append("website_link", formData.companyWebsite);
//     formPayload.append("company_type", formData.companyType);

//     formPayload.append("location", formData.location); //

//     if (formData.companyLogo) {
//       formPayload.append("logo", formData.companyLogo); // file upload
//     }

//     dispatch(registerEmployee(formPayload)).then((res) => {
//       const payload = res.payload;
//       if (payload?.success) {
//         setSuccessMsg("Employee registered successfully!");
//         // Reset form
//         setFormData({
//           fullName: "",
//           email: "",
//           phone: "",
//           position: "",
//           password: "",
//           companyName: "",
//           companyWebsite: "",
//           companyType: "",
//           employmentType: "",
//           contactPersonName: "",
//           location: "",
//           companyLogo: null,
//         });
//         setLogoPreview("");
//       } else {
//         console.error("Registration failed:", payload?.message || "Unknown error");
//         setErrors(payload?.data || { general: payload?.message || "Server error" });
//       }
//     });
//   }
// };

//   const inputFields = [
//     { label: "Full Name", name: "fullName", type: "text", icon: <FiUser /> },
//     { label: "Email", name: "email", type: "email", icon: <FiMail /> },
//     { label: "Phone Number", name: "phone", type: "tel", maxLength: 10, icon: <FiPhone /> },
//     { label: "Password", name: "password", type: "password", icon: <FiLock /> },
//     { label: "Company Name", name: "companyName", type: "text", icon: <FiBriefcase /> },
//        { label: "location", name: "location", type: "text", icon: <FiBriefcase /> },
//     { label: "Company Website", name: "companyWebsite", type: "url", icon: <FiGlobe /> }
//   ];

//   return (
//     <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
//       {/* Left side image */}
//       <div className="md:w-1/2 hidden md:block relative">
//         <img
//           src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80"
//           alt="Employee Registration"
//           className="w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8">
//           <div>
//             <h2 className="text-3xl font-bold text-white mb-2">Join Our Team</h2>
//             <p className="text-gray-200">Register your employees and grow your business with us</p>
//           </div>
//         </div>
//       </div>

//       {/* Right side form */}
//       <div className="md:w-1/2 flex items-center justify-center px-6 py-12">
//         <div className="w-full bg-white p-8 rounded-xl shadow-lg">
//           <div className="flex justify-center mb-6">
//             <div className="bg-amber-100 p-3 rounded-full">
//               <FiBriefcase className="text-amber-600 text-2xl" />
//             </div>
//           </div>
//           <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
//             Employee Registration
//           </h2>

//           {successMsg && (
//             <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-center">
//               {successMsg}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} autoComplete="off" noValidate className="space-y-4">
//             {/* Hidden dummy fields to confuse autofill */}
//             <input type="text" name="fake-username" autoComplete="username" className="hidden" />
//             <input type="password" name="fake-password" autoComplete="current-password" className="hidden" />

//             {inputFields.map(({ label, name, type, icon, maxLength }) => (
//               <div className="space-y-1" key={name}>
//                 <label className="block text-sm font-medium text-gray-700">{label}</label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
//                     {icon}
//                   </div>
//                   <input
//                     type={type}
//                     name={name}
//                     autoComplete={name === "password" ? "new-password" : "off"}
//                     value={formData[name]}
//                     onChange={handleChange}
//                     maxLength={maxLength}
//                     className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
//                       errors[name] ? "border-red-500" : "border-gray-300"
//                     }`}
//                   />
//                 </div>
//                 {errors[name] && (
//                   <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
//                 )}
//               </div>
//             ))}

//             {/* Company Type */}
//             <div className="space-y-1">
//               <label className="block text-sm font-medium text-gray-700">Company Type*</label>
//               <select
//                 name="companyType"
//                 value={formData.companyType}
//                 onChange={handleChange}
//                 className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
//                   errors.companyType ? "border-red-500" : "border-gray-300"
//                 }`}
//               >
//                 <option value="">Select company type</option>
//                 {companyTypes.map(type => (
//                   <option key={type} value={type}>{type}</option>
//                 ))}
//               </select>
//               {errors.companyType && (
//                 <p className="text-red-500 text-xs mt-1">{errors.companyType}</p>
//               )}
//             </div>

//             {/* Company Logo */}
//             <div className="space-y-1">
//               <label className="block text-sm font-medium text-gray-700">Company Logo</label>
//               <div className="flex items-center gap-4">
//                 <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
//                   <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                     <FiImage className="w-8 h-8 text-gray-400" />
//                     <p className="text-sm text-gray-500 mt-2">Upload company logo</p>
//                   </div>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleFileChange}
//                     className="hidden"
//                   />
//                 </label>
//                 {logoPreview && (
//                   <div className="w-20 h-20 border border-gray-200 rounded-lg overflow-hidden">
//                     <img src={logoPreview} alt="Logo preview" className="w-full h-full object-cover" />
//                   </div>
//                 )}
//               </div>
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 transition mt-6 flex items-center justify-center gap-2"
//             >
//               <FiUser className="text-lg" />
//               Register Employee
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmployeeRegister;

import React, { useState } from "react";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiBriefcase,
  FiLock,
  FiGlobe,
  FiImage,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { registerEmployee } from "../../redux/slice/employeer/employeeRegisterSlice";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const EmployeeRegister = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.employeeRegister);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    companyName: "",
    companyWebsite: "",
    companyType: "",
    location: "",
    companyLogo: null,
  });

  const [errors, setErrors] = useState({});
  const [logoPreview, setLogoPreview] = useState("");

  const companyTypes = [
    "Consulting",
    "Manufacturing",
    "Healthcare",
    "Finance",
    "Education",
    "Retail",
    "Other",
  ];

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }
    if (!formData.password || formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (!formData.companyName.trim())
      newErrors.companyName = "Company name is required";
    if (!formData.companyType)
      newErrors.companyType = "Company type is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, companyLogo: file }));
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (validate()) {
  //     const formPayload = new FormData();
  //     formPayload.append("contact_person_name", formData.fullName);
  //     formPayload.append("email", formData.email);
  //     formPayload.append("contact_number", formData.phone);
  //     formPayload.append("password", formData.password);
  //     formPayload.append("company_name", formData.companyName);
  //     formPayload.append("website_link", formData.companyWebsite);
  //     formPayload.append("company_type", formData.companyType);
  //     formPayload.append("location", formData.location);
  //     if (formData.companyLogo) {
  //       formPayload.append("logo", formData.companyLogo);
  //     }

  //     try {
  //       const res = await dispatch(registerEmployee(formPayload)).unwrap();
  //       if (res?.success) {
  //         Swal.fire("Success", "Employee registered successfully!", "success");

  //         setFormData({
  //           fullName: "",
  //           email: "",
  //           phone: "",
  //           password: "",
  //           companyName: "",
  //           companyWebsite: "",
  //           companyType: "",
  //           location: "",
  //           companyLogo: null
  //         });
  //         setLogoPreview("");
  //         setErrors({});
  //       } else {
  //         Swal.fire("Failed", res?.message || "Registration failed", "error");
  //       }
  //     } catch (err) {
  //       Swal.fire("Error", err || "Something went wrong!", "error");
  //     }
  //   }
  // }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors

    if (!validate()) return;

    const formPayload = new FormData();
    formPayload.append("contact_person_name", formData.fullName);
    formPayload.append("email", formData.email);
    formPayload.append("contact_number", formData.phone);
    formPayload.append("password", formData.password);
    formPayload.append("company_name", formData.companyName);
    formPayload.append("website_link", formData.companyWebsite);
    formPayload.append("company_type", formData.companyType);
    formPayload.append("location", formData.location);
    if (formData.companyLogo) {
      formPayload.append("logo", formData.companyLogo);
    }

    try {
      const result = await dispatch(registerEmployee(formPayload)).unwrap();

      // Handle success based on API response format
      if (result.message && result.message.includes("successfully")) {
        toast.success(result.message); // "reg. done successfully."

        // Reset form
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          password: "",
          companyName: "",
          companyWebsite: "",
          companyType: "",
          location: "",
          companyLogo: null,
        });
        setLogoPreview("");
        setErrors({});
      } else {
        toast.error("Registration completed but with unexpected response");
      }
    } catch (err) {
      // Handle API validation errors
      if (err.data) {
        const newErrors = {};
        Object.entries(err.data).forEach(([field, messages]) => {
          newErrors[field] = Array.isArray(messages) ? messages[0] : messages;
        });
        setErrors(newErrors);
        toast.error(Object.values(newErrors)[0]); // Show first error
      } else {
        toast.error(err.message || "Registration failed");
      }
    }
  };
  const inputFields = [
    { label: "Full Name", name: "fullName", type: "text", icon: <FiUser /> },
    { label: "Email", name: "email", type: "email", icon: <FiMail /> },
    {
      label: "Phone Number",
      name: "phone",
      type: "tel",
      maxLength: 10,
      icon: <FiPhone />,
    },
    { label: "Password", name: "password", type: "password", icon: <FiLock /> },
    {
      label: "Company Name",
      name: "companyName",
      type: "text",
      icon: <FiBriefcase />,
    },
    {
      label: "location",
      name: "location",
      type: "text",
      icon: <FiBriefcase />,
    },
    {
      label: "Company Website",
      name: "companyWebsite",
      type: "url",
      icon: <FiGlobe />,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Left side image */}
      <div className="md:w-1/2 hidden md:block relative">
        <img
          src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80"
          alt="Employee Registration"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Join Our Team
            </h2>
            <p className="text-gray-200">
              Register your employees and grow your business with us
            </p>
          </div>
        </div>
      </div>

      {/* Right side form */}
      <div className="md:w-1/2 flex items-center justify-center px-6 py-12">
        <div className="w-full bg-white p-8 rounded-xl shadow-lg">
          <div className="flex justify-center mb-6">
            <div className="bg-amber-100 p-3 rounded-full">
              <FiBriefcase className="text-amber-600 text-2xl" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Employer Registration
          </h2>

          <form
            onSubmit={handleSubmit}
            autoComplete="off"
            noValidate
            className="space-y-4"
          >
            {/* Anti-autofill hidden fields */}
            <input
              type="text"
              name="fake-username"
              autoComplete="username"
              className="hidden"
            />
            <input
              type="password"
              name="fake-password"
              autoComplete="current-password"
              className="hidden"
            />

            {inputFields.map(({ label, name, type, icon, maxLength }) => (
              <div className="space-y-1" key={name}>
                <label className="block text-sm font-medium text-gray-700">
                  {label}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    {icon}
                  </div>
                  <input
                    type={type}
                    name={name}
                    autoComplete="off"
                    value={formData[name]}
                    onChange={handleChange}
                    maxLength={maxLength}
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                      errors[name] ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
                {errors[name] && (
                  <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
                )}
              </div>
            ))}

            {/* Company Type */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Company Type*
              </label>
              <select
                name="companyType"
                value={formData.companyType}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                  errors.companyType ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select company type</option>
                {companyTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.companyType && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.companyType}
                </p>
              )}
            </div>

            {/* Company Logo */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Company Logo
              </label>
              <div className="flex items-center gap-4">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FiImage className="w-8 h-8 text-gray-400" />
                    <p className="text-sm text-gray-500 mt-2">
                      Upload company logo
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                {logoPreview && (
                  <div className="w-20 h-20 border border-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={logoPreview}
                      alt="Logo preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-amber-600 text-white py-3 rounded-lg mt-6 flex items-center justify-center gap-2 transition ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-amber-700"
              }`}
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
              ) : (
                <>
                  <FiUser className="text-lg" />
                  Register Employer
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeRegister;
