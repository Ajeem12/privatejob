
// import { motion } from "framer-motion";
// import { FaBriefcase, FaMapMarkerAlt, FaClock, FaFire, FaRegStar, FaStar } from "react-icons/fa";
// import { IoRocketSharp } from "react-icons/io5";
// import { MdWorkOutline, MdOutlineAccessTime } from "react-icons/md";
// import { Link } from "react-router-dom";
// import { fetchFeaturedJobs } from '../../redux/slice/featuredJobsSlice';
// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';

// const jobs = [

  
//   {
//     title: "Senior React Developer",
//     company: "TechNova Solutions",
//     logo: "https://via.placeholder.com/40",
//     location: "Bangalore, India",
//     type: "Full-time",
//     salary: "₹15-25 LPA",
//     experience: "5+ years",
//     posted: "2 days ago",
//     tag: "Urgent",
//     featured: true,
//     skills: ["React", "TypeScript", "Redux", "Node.js"]
//   },
//   {
//     title: "UX/UI Designer",
//     company: "CreativePixel",
//     logo: "https://via.placeholder.com/40/FF9900",
//     location: "Remote",
//     type: "Contract",
//     salary: "₹8-12 LPA",
//     experience: "3+ years",
//     posted: "1 week ago",
//     tag: "Remote",
//     featured: false,
//     skills: ["Figma", "Adobe XD", "User Research", "Prototyping"]
//   },
//   {
//     title: "Product Manager",
//     company: "InnoSphere",
//     logo: "https://via.placeholder.com/40/3366CC",
//     location: "Mumbai, India",
//     type: "Full-time",
//     salary: "₹18-30 LPA",
//     experience: "6+ years",
//     posted: "3 days ago",
//     tag: "Hot",
//     featured: true,
//     skills: ["Product Strategy", "Agile", "Market Research", "Roadmapping"]
//   },
//   {
//     title: "DevOps Engineer",
//     company: "CloudCore",
//     logo: "https://via.placeholder.com/40/FF5722",
//     location: "Pune, India",
//     type: "Full-time",
//     salary: "₹12-20 LPA",
//     experience: "4+ years",
//     posted: "Just now",
//     tag: "New",
//     featured: false,
//     skills: ["AWS", "Docker", "Kubernetes", "CI/CD"]
//   },
//   {
//     title: "Digital Marketing Lead",
//     company: "MarketMate",
//     logo: "https://via.placeholder.com/40/8BC34A",
//     location: "Delhi, India",
//     type: "Part-time",
//     salary: "₹10-15 LPA",
//     experience: "4+ years",
//     posted: "5 days ago",
//     tag: "Remote",
//     featured: true,
//     skills: ["SEO", "PPC", "Social Media", "Content Marketing"]
//   },
//   {
//     title: "Data Analyst",
//     company: "DataNest",
//     logo: "https://via.placeholder.com/40/9C27B0",
//     location: "Hyderabad, India",
//     type: "Full-time",
//     salary: "₹9-15 LPA",
//     experience: "2+ years",
//     posted: "1 day ago",
//     tag: "Hot",
//     featured: false,
//     skills: ["SQL", "Python", "Tableau", "Statistics"]
//   },
// ];

// const tagConfig = {
//   Urgent: { color: "bg-red-100 text-red-600", icon: <IoRocketSharp className="mr-1" /> },
//   Remote: { color: "bg-green-100 text-green-600", icon: <FaMapMarkerAlt className="mr-1" /> },
//   Hot: { color: "bg-orange-100 text-orange-600", icon: <FaFire className="mr-1" /> },
//   New: { color: "bg-blue-100 text-blue-600", icon: <FaRegStar className="mr-1" /> },
// };

// const SpecialJobsSection = () => {

//    const dispatch = useDispatch();
//   const { jobs, loading, error } = useSelector((state) => state.featuredJobs);


//   useEffect(() => {
//     dispatch(fetchFeaturedJobs());
//   }, [dispatch]);




//   return (
//     <section className="py-16  bg-gradient-to-b from-white to-blue-50/30">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
//             Featured Job Opportunities
//           </h2>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             Discover hand-picked positions with competitive benefits
//           </p>
//         </motion.div>
// <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//   {jobs?.slice(0, 6).map((job, idx) => (
//     <motion.div
//       key={job.id}
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.4, delay: idx * 0.1 }}
//       viewport={{ once: true }}
//       whileHover={{ y: -8, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
//       className={`bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-all ${
//         job.urgent_hiring === 1 ? "ring-2 ring-red-500" : ""
//       }`}
//     >
//       <div className="p-6">
//         <div className="flex justify-between items-start mb-4">
//           <div className="flex items-center">
//             <img 
           
//   src={job.hiring_logo ? `${import.meta.env.VITE_MEDIA_URL}/storage/${job.hiring_logo}` : "https://via.placeholder.com/40"}
//   alt={job.category_name || "Job Logo"}
//   className="w-12 h-12 rounded-lg object-cover mr-4 border border-gray-200"
// />

            
            
//             <div>
//               <h3 className="text-lg font-bold text-gray-900">{job.category_name || "Job Category"}</h3>
//               <p className="text-sm text-gray-600">{job.location}</p>
//             </div>
//           </div>
//           {job.urgent_hiring === 1 && (
//             <span className="flex items-center text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded">
//               <IoRocketSharp className="mr-1" /> Urgent
//             </span>
//           )}
//         </div>

//         <div className="flex flex-wrap gap-2 mb-4">
//           <span className="text-xs font-medium px-3 py-1 rounded-full bg-purple-100 text-purple-600">
//             ₹{job.salarymin} - ₹{job.salarymax} {job.salary_set || ""}
//           </span>
//           <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-600">
//             {job.experience}+ years
//           </span>
//           <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-600">
//             {job.employment_type}
//           </span>
//         </div>

//         <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
//           <div className="flex items-center">
//             <MdWorkOutline className="mr-2 text-blue-400" />
//             <span>{job.shift}</span>
//           </div>
//           <div className="flex items-center">
//             <MdOutlineAccessTime className="mr-2 text-blue-400" />
//             <span>{new Date(job.created_at).toLocaleDateString()}</span>
//           </div>
//         </div>

//         <div className="mb-5">
//           <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Job Description:</h4>
//           <p className="text-sm text-gray-700">{job.jobs_description}</p>
//         </div>

//         <div className="flex justify-between items-center pt-4 border-t border-gray-100">
//           <Link
//             to={`/jobsdetails/${job.id}`}
//             className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-sm transition"
//           >
//             Apply Now
//           </Link>
//         </div>
//       </div>
//     </motion.div>
//   ))}
// </div>


               

//         <motion.div
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ delay: 0.4 }}
//           viewport={{ once: true }}
//           className="text-center mt-16"
//         >
//           <Link to='jobs'
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="px-8 py-3.5 bg-blue-500 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2"
//           >
//             Browse All Job Openings
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//             </svg>
//           </Link>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default SpecialJobsSection;

import { motion } from "framer-motion";
import { FaBriefcase, FaMapMarkerAlt, FaClock, FaFire, FaRegStar, FaStar } from "react-icons/fa";
import { IoRocketSharp } from "react-icons/io5";
import { MdWorkOutline, MdOutlineAccessTime } from "react-icons/md";
import { Link } from "react-router-dom";
import { fetchFeaturedJobs } from '../../redux/slice/featuredJobsSlice';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SkeletonCard from "../SkeletonCard";
const tagConfig = {
  Urgent: { color: "bg-red-100 text-red-600", icon: <IoRocketSharp className="mr-1" /> },
  Remote: { color: "bg-green-100 text-green-600", icon: <FaMapMarkerAlt className="mr-1" /> },
  Hot: { color: "bg-orange-100 text-orange-600", icon: <FaFire className="mr-1" /> },
  New: { color: "bg-blue-100 text-blue-600", icon: <FaRegStar className="mr-1" /> },
};

const SpecialJobsSection = () => {
  const dispatch = useDispatch();
  const { jobs, loading, error } = useSelector((state) => state.featuredJobs);

  useEffect(() => {
    dispatch(fetchFeaturedJobs());
  }, [dispatch]);

  if (loading) {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Featured Job Opportunities
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover hand-picked positions with competitive benefits
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, idx) => (
            <SkeletonCard key={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}


  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        Error loading jobs: {error}
      </div>
    );
  }

 function formatDate(dateStr) {
  // Expecting dateStr like "28/06/2025"
  const [day, month, year] = dateStr.split('/');
  if (!day || !month || !year) return dateStr; // fallback if format unexpected

  const dateObj = new Date(`${year}-${month}-${day}`); // ISO format YYYY-MM-DD
  if (isNaN(dateObj)) return dateStr; // invalid date fallback

  // Format e.g. to "June 28, 2025"
  return dateObj.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

  return (
    <section className="py-16 bg-gradient-to-b from-white to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Featured Job Opportunities
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover hand-picked positions with competitive benefits
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {jobs?.slice(0, 6).map((job, idx) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              className={`bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-all ${
                job.urgent_hiring === 1 ? "ring-2 ring-red-500" : ""
              }`}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <img 
                      src={job.company_logo   
                        ? `${import.meta.env.VITE_MEDIA_URL}${job.company_logo}` 
                        : "https://via.placeholder.com/40"
                      }
                      alt={job.employer_name || "Company Logo"}
                      className="w-12 h-12 rounded-lg object-cover mr-4 border border-gray-200"
                    />
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{job.category_details || "Job Category"}</h3>
                      <p className="text-sm text-gray-600">{job.employer_name}</p>
                    </div>
                  </div>
                  {job.urgent_hiring === 1 && (
                    <span className="flex items-center text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded">
                      <IoRocketSharp className="mr-1" /> Urgent
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-purple-100 text-purple-600">
                    ₹{job.salarymin} - ₹{job.salarymax} {job.salary_set || ""}
                  </span>
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-600">
                    {job.experience}+ years
                  </span>
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-600">
                    {job.employment_type}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-blue-400" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center">
                    <MdOutlineAccessTime className="mr-2 text-blue-400" />
                    <span>{formatDate(job.created_at)}</span>
                  </div>
                </div>
                <p className="text-black-500 font-semibold mt-1">
  {/* <span className="text-gray-500">Job Title 2: </span> */}
  {job.job_title2 ? job.job_title2 : "No Title Available"}
</p>

                <div className="mb-5">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Job Description:</h4>
                  <p className="text-sm text-gray-700 line-clamp-3">
                    {/* {job.jobs_description || "No description provided"} */}<div dangerouslySetInnerHTML={{ __html: job.jobs_description || "No description provided" }} />

 
                  </p>
                </div>

               {job.skill_name && job.skill_name.length > 0 ? (
  <div className="mb-4">
    <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Skills:</h4>
    <div className="flex flex-wrap gap-2">
      {job.skill_name.map((skill, index) => (
        <span 
          key={index} 
          className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-800"
        >
          {skill.sub_category_eng}
        </span>
      ))}
    </div>
  </div>
) : (
  <div className="mb-4">
    <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Skills:</h4>
    <p className="text-xs text-gray-400 italic">No skills added</p>
  </div>
)}


                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <Link
                    to={`/jobsdetails/${job.id}`}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-sm transition"
                  >
                    Apply Now
                  </Link>
                  <span className="text-xs text-gray-500">
                    {job.shift}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link 
            to="/jobs"
            className="px-8 py-3.5 bg-blue-600 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2"
          >
            Browse All Job Openings
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default SpecialJobsSection;