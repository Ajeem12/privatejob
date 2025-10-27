import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerCandidate, resetCandidateState } from "../../redux/slice/user/candidateentryformslice";
import { FiUser, FiPhone, FiMail, FiFileText } from "react-icons/fi";
import toast from "react-hot-toast";

const CandidateEntryForm = () => {
  const dispatch = useDispatch();
  const { loading, success, error, candidate } = useSelector((state) => state.candidateRegister);

  const [form, setForm] = useState({
    name: "",
    mobilenumber: "",
    email: "",
    qualification: "",
    designation: "",
    experienceyears: "",
    experiencemonths: "",
    expectedsalary: "",
    address: "",
    resume: null,
  });

  useEffect(() => {
    if (success && candidate) {
      // API se message show karna
      const message = candidate?.message || "Form submitted successfully!";
      toast.success(message);
      dispatch(resetCandidateState());
      setForm({
        name: "",
        mobilenumber: "",
        email: "",
        qualification: "",
        designation: "",
        experienceyears: "",
        experiencemonths: "",
        expectedsalary: "",
        address: "",
        resume: null,
      });
    }
    

    if (error) {
      const message = error?.message || "Submission failed. Try again!";
      toast.error(message);
    }
  }, [success, error, candidate, dispatch]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "resume") {
      setForm({ ...form, resume: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    dispatch(registerCandidate(formData));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-7xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row">
        {/* Left Side Image */}
        <div className="lg:w-1/2 bg-cyan-700 p-8 hidden lg:flex flex-col justify-center items-center">
          <img
            src="https://smowl.net/wp-content/uploads/2022/11/aprendizaje-ubicuo-ventajas.jpg"
            alt="Professional"
            className="w-auto h-auto"
          />
          <div className="text-center mt-8 text-white">
            <h3 className="text-2xl font-bold mb-2">Join Our Talent Pool</h3>
            <p className="text-cyan-100">Submit your details and get discovered by top employers</p>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="lg:w-1/2 p-8 sm:p-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Candidate Entry Form</h2>
         
          <form onSubmit={handleSubmit} className="space-y-5">
            <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg px-3 py-3" />
            <input type="tel" name="mobilenumber" placeholder="Mobile Number" value={form.mobilenumber} onChange={handleChange} maxLength={10} required className="w-full border border-gray-300 rounded-lg px-3 py-3" />
            <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg px-3 py-3" />
            <select name="qualification" value={form.qualification} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg px-3 py-3">
              <option value="">Select Qualification</option>
              <option value="High School">High School</option>
              <option value="Diploma">Diploma</option>
              <option value="Bachelors">Bachelors</option>
              <option value="Masters">Masters</option>
            </select>
            <input type="text" name="designation" placeholder="Designation" value={form.designation} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-3" />
            <div className="flex gap-2">
              <input type="number" name="experienceyears" placeholder="Years" value={form.experienceyears} onChange={handleChange} className="w-1/2 border border-gray-300 rounded-lg px-3 py-3" />
              <input type="number" name="experiencemonths" placeholder="Months" value={form.experiencemonths} onChange={handleChange} className="w-1/2 border border-gray-300 rounded-lg px-3 py-3" />
            </div>
            <input type="text" name="expectedsalary" placeholder="Expected Salary" value={form.expectedsalary} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-3" />
            <textarea name="address" placeholder="Address" rows="3" value={form.address} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-3"></textarea>
            <input type="file" name="resume" accept=".pdf,.doc,.docx" onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2" />

            <button type="submit" disabled={loading} className="w-full bg-cyan-600 text-white py-3 rounded-lg hover:bg-cyan-700 transition">
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CandidateEntryForm;
