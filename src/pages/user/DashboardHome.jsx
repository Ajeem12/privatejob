// import React ,{useEffect} from 'react';
// import { FiBriefcase, FiCalendar, FiBell, FiSearch, FiBarChart2, FiDollarSign } from 'react-icons/fi';
// import { useDispatch, useSelector } from 'react-redux';
// import { getAppliedJobs } from '../../redux/slice/applyJobSlice';

// const DashboardHome = () => {
//   // Sample data
//    const dispatch = useDispatch();
  
  
   
//      const {
//     appliedJobs,
//     appliedJobsLoading,
//     appliedJobsError
//   } = useSelector((state) => state.applyJob); 

//   useEffect(() => {
//     dispatch(getAppliedJobs());
//   }, [dispatch]); 


//   console.log(appliedJobs);
  

// const applicationCount = appliedJobs?.data?.length || 0;
//   const stats = [
//     { title: "Applications Sent", value: applicationCount, icon: <FiBriefcase className="text-cyan-500" size={24} /> },
//     { title: "Interviews", value: 8, icon: <FiCalendar className="text-green-500" size={24} /> },
//     { title: "Offers Received", value: 3, icon: <FiDollarSign className="text-purple-500" size={24} /> },
//     { title: "Rejections", value: 5,  icon: <FiBarChart2 className="text-red-500" size={24} /> }
//   ];

//   const recentApplications = [
//     {
//       id: 1,
//       title: "Senior UX Designer",
//       company: "TechCorp Inc.",
//       status: "Interview",
//       date: "2023-06-15",
//       logo: "https://logo.clearbit.com/techcorp.com"
//     },
//     {
//       id: 2,
//       title: "Product Manager",
//       company: "DesignHub",
//       status: "Applied",
//       date: "2023-06-10",
//       logo: "https://logo.clearbit.com/designhub.com"
//     },
//     {
//       id: 3,
//       title: "Frontend Developer",
//       company: "WebSolutions",
//       status: "Rejected",
//       date: "2023-06-05",
//       logo: "https://logo.clearbit.com/websolutions.com"
//     }
//   ];

//   const upcomingInterviews = [
//     {
//       id: 1,
//       title: "Final Interview",
//       company: "TechCorp Inc.",
//       date: "2023-06-20",
//       time: "10:00 AM",
//       via: "Zoom"
//     },
//     {
//       id: 2,
//       title: "Technical Round",
//       company: "DesignHub",
//       date: "2023-06-22",
//       time: "2:30 PM",
//       via: "Google Meet"
//     }
//   ];

//   const formatDate = (dateString) => {
//     const options = { month: 'short', day: 'numeric' };
//     return new Date(dateString).toLocaleDateString('en-US', options);
//   };

//   return (
//     <div className="max-w-7xl mx-auto ">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
//           <p className="mt-1 text-gray-600">Welcome back, John! Here's what's happening with your job search.</p>
//         </div>
//         <div className="mt-4 md:mt-0 relative">
//           <div className="flex items-center bg-white border border-gray-300 rounded-lg px-3 py-2 shadow-sm">
//             <FiSearch className="text-gray-400 mr-2" />
//             <input
//               type="text"
//               placeholder="Search dashboard..."
//               className="focus:outline-none w-full md:w-64"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         {stats.map((stat, index) => (
//           <div key={index} className="bg-white rounded-lg shadow p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-500">{stat.title}</p>
//                 <p className="mt-1 text-3xl font-semibold text-gray-900">{stat.value}</p>
               
//               </div>
//               <div className="bg-gray-100 p-3 rounded-lg">
//                 {stat.icon}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Main Content */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Recent Applications */}
//         <div className="lg:col-span-2">
//           <div className="bg-white rounded-lg shadow overflow-hidden">
//             <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
//               <h2 className="text-lg font-medium text-gray-900">Recent Applications</h2>
//               <button className="text-sm text-cyan-600 hover:text-cyan-800">View All</button>
//             </div>
//             <div className="divide-y divide-gray-200">
//               {recentApplications.map((job) => (
//                 <div key={job.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
//                   <div className="flex items-center">
//                     <img 
//                       src={job.logo} 
//                       alt={job.company} 
//                       className="w-10 h-10 rounded-md object-contain border border-gray-200 mr-4"
                     
                      
//                     />
//                     <div className="flex-1">
//                       <h3 className="text-md font-medium text-gray-900">{job.title}</h3>
//                       <p className="text-sm text-gray-600">{job.company}</p>
//                     </div>
//                     <div className="flex flex-col items-end">
//                       <span className={`text-xs px-2 py-1 rounded-full ${
//                         job.status === "Interview" ? "bg-cyan-100 text-cyan-800" :
//                         job.status === "Applied" ? "bg-gray-100 text-gray-800" :
//                         "bg-red-100 text-red-800"
//                       }`}>
//                         {job.status}
//                       </span>
//                       <span className="text-xs text-gray-500 mt-1">{formatDate(job.date)}</span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Right Sidebar */}
//         <div className="space-y-6">
//           {/* Upcoming Interviews */}
//           <div className="bg-white rounded-lg shadow overflow-hidden">
//             <div className="px-6 py-4 border-b border-gray-200">
//               <h2 className="text-lg font-medium text-gray-900">Upcoming Interviews</h2>
//             </div>
//             <div className="divide-y divide-gray-200">
//               {upcomingInterviews.map((interview) => (
//                 <div key={interview.id} className="px-6 py-4">
//                   <div className="flex items-start">
//                     <div className="bg-cyan-100 p-2 rounded-lg mr-4">
//                       <FiCalendar className="text-cyan-600" size={18} />
//                     </div>
//                     <div className="flex-1">
//                       <h3 className="text-md font-medium text-gray-900">{interview.title}</h3>
//                       <p className="text-sm text-gray-600">{interview.company}</p>
//                       <div className="mt-2 flex items-center text-sm text-gray-500">
//                         <span>{formatDate(interview.date)} at {interview.time}</span>
//                         <span className="mx-2">•</span>
//                         <span>{interview.via}</span>
//                       </div>
//                     </div>
//                     <button className="text-cyan-600 hover:text-cyan-800 text-sm font-medium">
//                       Details
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Notifications */}
//           <div className="bg-white rounded-lg shadow overflow-hidden">
//             <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
//               <h2 className="text-lg font-medium text-gray-900">Notifications</h2>
//               <button className="text-sm text-cyan-600 hover:text-cyan-800">Mark all as read</button>
//             </div>
//             <div className="divide-y divide-gray-200">
//               <div className="px-6 py-4 hover:bg-gray-50 transition-colors">
//                 <div className="flex items-start">
//                   <div className="bg-green-100 p-2 rounded-full mr-4">
//                     <FiBell className="text-green-600" size={16} />
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-gray-900">New job matches your profile</p>
//                     <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
//                   </div>
//                 </div>
//               </div>
//               <div className="px-6 py-4 hover:bg-gray-50 transition-colors">
//                 <div className="flex items-start">
//                   <div className="bg-cyan-100 p-2 rounded-full mr-4">
//                     <FiBriefcase className="text-cyan-600" size={16} />
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-gray-900">Application status updated</p>
//                     <p className="text-xs text-gray-500 mt-1">1 day ago</p>
//                   </div>
//                 </div>
//               </div>
//               <div className="px-6 py-4 hover:bg-gray-50 transition-colors">
//                 <div className="flex items-start">
//                   <div className="bg-purple-100 p-2 rounded-full mr-4">
//                     <FiDollarSign className="text-purple-600" size={16} />
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-gray-900">New salary insights available</p>
//                     <p className="text-xs text-gray-500 mt-1">3 days ago</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardHome;


import React, { useEffect } from 'react';
import {
  FiBriefcase,
  FiCalendar,
  FiBell,
  FiSearch,
  FiBarChart2,
  FiDollarSign
} from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { getAppliedJobs } from '../../redux/slice/applyJobSlice';
import { useNavigate } from 'react-router-dom';
const DashboardHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    appliedJobs,
    appliedJobsLoading,
    appliedJobsError
  } = useSelector((state) => state.applyJob);

  useEffect(() => {
    dispatch(getAppliedJobs());
  }, [dispatch]);

  const applicationCount = appliedJobs?.data?.length || 0;

  if (appliedJobsLoading) {
  return (
    <div className="min-h-screen flex justify-center">
      <div className="flex flex-col items-center">
        <svg className="animate-spin h-8 w-8 text-cyan-600 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
        <p className="text-cyan-700 text-sm font-medium">Loading dashboard...</p>
      </div>
    </div>
  );
}

const statusMap = {
  0: "Pending",
  1: "Shortlisted",
  2: "Rejected",
  3: "Interview",
  4: "Selected"
};

  // Get the 5 most recent applications
  const recentApplications = appliedJobs?.data
    ?.slice()
    ?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    ?.slice(0, 5)
    ?.map((item) => ({
      id: item.id,
      title: item.postjob_details?.job_title_details?.category_name_eng || "N/A",
      company: item.postjob_details?.employer_details?.company_name || "N/A",
      status: statusMap[item.job_status] || "Unknown",
      date: item.created_at,
      logo: item.postjob_details?.job_title_details?.logo
        ? `${import.meta.env.VITE_MEDIA_URL}/storage/${item.postjob_details.job_title_details.logo}`
        : "https://via.placeholder.com/40"
    })) || [];

  const stats = [
    {
      title: "Applications Sent",
      value: applicationCount,
      icon: <FiBriefcase className="text-cyan-500" size={24} />
    },
    // {
    //   title: "Interviews",
    //   value: 8,
    //   icon: <FiCalendar className="text-green-500" size={24} />
    // },
    // {
    //   title: "Offers Received",
    //   value: 3,
    //   icon: <FiDollarSign className="text-purple-500" size={24} />
    // },
    // {
    //   title: "Rejections",
    //   value: 5,
    //   icon: <FiBarChart2 className="text-red-500" size={24} />
    // }
  ];


  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="max-w-7xl mx-auto ">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-gray-600">
            Welcome back, John! Here's what's happening with your job search.
          </p>
        </div>
        {/* <div className="mt-4 md:mt-0 relative">
          <div className="flex items-center bg-white border border-gray-300 rounded-lg px-3 py-2 shadow-sm">
            <FiSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search dashboard..."
              className="focus:outline-none w-full md:w-64"
            />
          </div>
        </div> */}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="mt-1 text-3xl font-semibold text-gray-900">{stat.value}</p>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="">
        {/* Recent Applications */}
        <div className="w-full">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Recent Applications</h2>
             <button
      className="text-sm text-cyan-600 hover:text-cyan-800 cursor-pointer"
      onClick={() => navigate('/dashboard/jobs')}
    >
      View All
    </button>
            </div>
            <div className="divide-y divide-gray-200">
              {recentApplications.length === 0 ? (
                <div className="px-6 py-4 text-sm text-gray-500">
                  No recent applications found.
                </div>
              ) : (
                recentApplications.map((job,index) => (
                  <div key={job.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">

                    <div className="flex items-center">
                        <span className="text-sm font-semibold text-gray-500 w-6">{index + 1}.</span>
                        
                      <img
                        src={job.logo}
                        alt={job.company}
                        className="w-10 h-10 rounded-md object-contain border border-gray-200 mr-4"
                      />
                      <div className="flex-1">
                        <h3 className="text-md font-medium text-gray-900">{job.title}</h3>
                        <p className="text-sm text-gray-600">{job.company}</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            job.status === "Interview"
                              ? "bg-cyan-100 text-cyan-800"
                              : job.status === "Applied"
                              ? "bg-gray-100 text-gray-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {job.status}
                        </span>
                        <span className="text-xs text-gray-500 mt-1">
                          {formatDate(job.date)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

       
        
      </div>
    </div>
  );
};

export default DashboardHome;
