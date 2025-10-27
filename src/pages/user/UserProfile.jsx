import React, { useState, useEffect } from "react";
import {
  FiEdit,
  FiMail,
  FiPhone,
  FiMapPin,
  FiBriefcase,
  FiUser,
  FiTrash2,
  FiPlus,
  FiCalendar,
  FiAward,
  FiLinkedin,
  FiGithub,
  FiTwitter,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  fetchJobSeekerProfile,
  editBio,
} from "../../redux/slice/user/jobSeekerSlice";
import EducationModal from "./EducationModal";
import ExperienceModal from "./ExperienceModal";
import SkillsModal from "./SkillsModal";
import { fetchAllSkills } from "../../redux/slice/skillsSlice";
import { deleteEducation } from "../../redux/slice/user/educationSlice";
import { deleteExperience } from "../../redux/slice/user/experienceSlice";
import EditProfileModal from "./EditProfileModal";
import { toast } from 'react-hot-toast';
import { FaUser } from 'react-icons/fa';
const UserProfile = () => {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state) => state.jobSeeker);
  const [showSkillsModal, setShowSkillsModal] = useState(false);
  const [showEducationModal, setShowEducationModal] = useState(false);
  const [showExperienceModal, setShowExperienceModal] = useState(false);
  const [currentEducation, setCurrentEducation] = useState(null);
  const [currentExperience, setCurrentExperience] = useState(null);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  useEffect(() => {
    dispatch(fetchJobSeekerProfile());
  }, [dispatch]);

  const handleSaveBio = async (newBio) => {
    try {
      await dispatch(editBio(newBio)).unwrap();
      dispatch(fetchJobSeekerProfile()); // optional refresh
    } catch (error) {
      alert(error);
    }
  };

  // Date formatting helper
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { year: "numeric", month: "short" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Map backend data to frontend-friendly format
  const user = {
    name: profile?.first_name || "Name not specified",
    email: profile?.email || "Email not specified",
    phone: profile?.contact_number || "Phone not specified",
    location: profile?.location || "Location not specified",
    position: profile?.job_position || "Position not specified",
    company: profile?.working || "Company not specified",
    avatar:
      profile?.profileimage,
    bio: profile?.aboutme || "About me not specified",
    dob: profile?.dob || "Date of birth not specified",
    fatherName: profile?.father_name || "Father's name not specified",
    alternative_contact_number: profile?.altranate_mobile_number,

    // In UserProfile.js, update the education mapping:
    educations:
      profile?.education_details?.map((edu) => ({
        id: edu.id,
        university_name: edu.university_name || "University not specified",
        course_name: edu.course_name || "Course not specified",
        years: edu.years || "",
        currently_studying: false,
      })) || [],

    experiences:
      profile?.experince_details?.map((exp) => ({
        id: exp.id,
        job_title: exp.role || "Role not specified",
        role: exp.role || "Role not specified",
        company_name: exp.company_name || "Company not specified",
        year_from: exp.year_from,
        year_to: exp.year_to,
        start_date: exp.year_from ? formatDate(exp.year_from) : "Not specified", // Add formatted date
         end_date : !exp.year_to || exp.currently_working ? "Present" : formatDate(exp.year_to),

        desc: exp.desc || "",
        currently_working: !exp.year_to,
      })) || [],
  };


  

  // Education handlers
  const handleAddEducation = () => {
    setCurrentEducation(null);
    setShowEducationModal(true);
  };

  const handleEditEducation = (education) => {
    setCurrentEducation(education);
    setShowEducationModal(true);
  };

  // const handleDeleteEducation = async (id) => {
  //   if (window.confirm("Are you sure you want to delete this education?")) {
  //     try {
  //       await dispatch(deleteEducation(id)).unwrap();
  //       dispatch(fetchJobSeekerProfile()); // Refresh the profile
  //       // You might want to show a success toast here
  //     } catch (error) {
  //       alert(`Failed to delete education: ${error.message}`);
  //     }
  //   }
  // };

  const handleDeleteEducation = async (id) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "This education entry will be permanently deleted.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#E01D0E",
    cancelButtonColor: "#6c757d",
    confirmButtonText: "Yes, delete it!",
  });

  if (result.isConfirmed) {
    try {
      await dispatch(deleteEducation(id)).unwrap();
      dispatch(fetchJobSeekerProfile());

      Swal.fire({
        title: "Deleted!",
        text: "Education has been removed.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: `Failed to delete education: ${error.message}`,
        icon: "error",
      });
    }
  }
};

  // const handleSaveEducation = async (educationData) => {
  //   if (currentEducation) {
  //     console.log("Update education:", educationData);
  //   } else {
  //     console.log("Add new education:", educationData);
  //   }
  //   dispatch(fetchJobSeekerProfile());
  //   setShowEducationModal(false);
  // };

  // Experience handlers
  const handleAddExperience = () => {
    setCurrentExperience(null);
    setShowExperienceModal(true);
  };

  const handleEditExperience = (experience) => {
    setCurrentExperience(experience);
    setShowExperienceModal(true);
  };

  
  // const handleDeleteExperience = async (id) => {
  //   if (window.confirm("Are you sure you want to delete this experience?")) {
  //     try {
  //       await dispatch(deleteExperience(id)).unwrap();
  //       dispatch(fetchJobSeekerProfile()); // Refresh the profile
  //       // You might want to show a success toast here
  //     } catch (error) {
  //       alert(`Failed to delete experience: ${error.message}`);
  //     }
  //   }
  // };
  const handleDeleteExperience = async (id) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "This experience entry will be permanently deleted.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#E01D0E",
    cancelButtonColor: "#6c757d",
    confirmButtonText: "Yes, delete it!",
  });

  if (result.isConfirmed) {
    try {
      await dispatch(deleteExperience(id)).unwrap();
      dispatch(fetchJobSeekerProfile());

      Swal.fire({
        title: "Deleted!",
        text: "Experience has been removed.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: `Failed to delete experience: ${error.message}`,
        icon: "error",
      });
    }
  }
};

  // const handleSaveExperience = async (experienceData) => {
  //   if (currentExperience) {
  //     console.log("Update experience:", experienceData);
  //   } else {
  //     console.log("Add new experience:", experienceData);
  //   }
  //   dispatch(fetchJobSeekerProfile());
  //   setShowExperienceModal(false);
  // };

  // Modify the handleSaveEducation and handleSaveExperience functions
// const handleSaveEducation = async () => {
//   try {
//     await dispatch(fetchJobSeekerProfile());
//   } catch (error) {
//     console.error("Error refreshing profile:", error);
//   }
// };

const handleSaveEducation = async () => {
  try {
    await dispatch(fetchJobSeekerProfile());
    toast.success("Education details updated successfully!");
  } catch (error) {
    console.error("Error refreshing profile:", error);
    toast.error("Failed to update education details. Please try again.");
  }
}

// const handleSaveExperience = async () => {
//   try {
//     await dispatch(fetchJobSeekerProfile());
//   } catch (error) {
//     console.error("Error refreshing profile:", error);
//   }
// };

const handleSaveExperience = async () => {
  try {
    await dispatch(fetchJobSeekerProfile());
    toast.success("Profile refreshed successfully!");
  } catch (error) {
    console.error("Error refreshing profile:", error);
    toast.error("Failed to refresh profile. Please try again.");
  }
};



//   const handleSaveExperience = async (experienceData) => {
//   try {
//     if (currentExperience) {
//       await dispatch(updateExperience({
//         id: currentExperience.id, 
//         data: experienceData
//       })).unwrap();
//     } else {
//       await dispatch(addExperience(experienceData)).unwrap();
//     }
//     // Refresh profile data
//     dispatch(fetchJobSeekerProfile());
//     setShowExperienceModal(false);
//   } catch (error) {
//     console.error("Error saving experience:", error);
//   }
// };


// const handleSaveEducation = async (educationData) => {
//   try {
//     if (currentEducation) {
//       await dispatch(updateEducation({
//         id: currentEducation.id,
//         data: educationData
//       })).unwrap();
//     } else {
//       await dispatch(addEducation(educationData)).unwrap();
//     }
//     // Refresh profile data
//     dispatch(fetchJobSeekerProfile());
//     setShowEducationModal(false);
//   } catch (error) {
//     console.error("Error saving education:", error);
//   }
// };


  // const handleSaveSkills = async (skills) => {
  //   try {
  //     // Assuming editBio can handle skills update or you might need a separate action
  //     await dispatch(editBio({ aboutme: user.bio, skill: skills })).unwrap();
  //     dispatch(fetchJobSeekerProfile()); // Refresh profile
  //   } catch (error) {
  //     alert("Failed to update skills: " + error);
  //   }
  // };

  const handleSaveSkills = async (skills) => {
  try {
    await dispatch(editBio({ aboutme: user.bio, skill: skills })).unwrap();
    dispatch(fetchJobSeekerProfile());

    toast.success("Skills updated successfully!");
  } catch (error) {
    toast.error("Failed to update skills: " + (error?.message || error));
  }
};


  if (loading) {
    return (
      <div className="flex justify-center  h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        Error loading profile: {error}
      </div>
    );
  }

  return (
    <div className="">
      {/* Profile Header */}
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
  {/* Header with avatar and name */}
  <div className="relative h-auto bg-cyan-600 p-6 sm:flex sm:items-end sm:gap-6">
   <div className="relative w-24 h-24 shrink-0">
  {user.avatar ? (
    <img
      src={`${import.meta.env.VITE_MEDIA_URL}/storage/${user.avatar}`}
      alt="User Avatar"
      className="w-24 h-24 rounded-full object-cover border-4 border-white"
    />
  ) : (
    <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center border-4 border-white">
      <FaUser className="text-gray-400 text-3xl" />
    </div>
  )}
</div>
    <div className="mt-4 sm:mt-0 text-white">
      <h1 className="text-2xl sm:text-3xl font-bold">{user.name}</h1>
      {/* Optional position/company line */}
      {/* <p className="text-cyan-100">
        {user.position} {user.company && `at ${user.company}`}
      </p> */}

      {/* Contact info shown directly below the name */}
      <div className="mt-2 flex flex-wrap gap-4 text-sm text-cyan-100">
        {user.location && (
          <div className="flex items-center">
            <FiMapPin className="mr-1" />
            <span>{user.location}</span>
          </div>
        )}
        {user.email && (
          <div className="flex items-center">
            <FiMail className="mr-1" />
            <span>{user.email}</span>
          </div>
        )}
        {user.phone && (
          <div className="flex items-center">
            <FiPhone className="mr-1" />
            <span>{user.phone}</span>
          </div>
        )}
      </div>
    </div>
  </div>

 
</div>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-6">
          {/* About Card */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold flex items-center">
                <FiUser className="mr-2 text-cyan-500" /> About
              </h2>
              <button
                onClick={() => setShowEditProfileModal(true)}
                className="mt-4 text-cyan-600 hover:text-cyan-800 flex items-center text-sm font-medium"
              >
                <FiEdit className="mr-1" /> Edit Profile
              </button>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600">{user.bio}</p>
              {/* <div className="flex items-center text-gray-600">
                <FiCalendar className="mr-2 text-cyan-500" />
                <span>Date of Birth: {user.dob}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <FiUser className="mr-2 text-cyan-500" />
                <span>Father's Name: {user.fatherName}</span>
              </div> */}
            </div>
          </div>

          {/* Social Links */}
          {/* <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Social Links</h2>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition">
                <div className="flex items-center">
                  <FiLinkedin className="text-cyan-700 mr-3 text-lg" />
                  <span>LinkedIn</span>
                </div>
                <FiPlus className="text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition">
                <div className="flex items-center">
                  <FiGithub className="text-gray-800 mr-3 text-lg" />
                  <span>GitHub</span>
                </div>
                <FiPlus className="text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition">
                <div className="flex items-center">
                  <FiTwitter className="text-cyan-400 mr-3 text-lg" />
                  <span>Twitter</span>
                </div>
                <FiPlus className="text-gray-400" />
              </button>
            </div>
          </div> */}

          {/* Skills */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Skills</h2>
              {/* <button 
      onClick={() => setShowSkillsModal(true)}
      className="text-cyan-600 hover:text-cyan-800 flex items-center text-sm font-medium"
    >
      <FiEdit className="mr-1" /> {profile?.skill_name?.length ? 'Edit' : 'Add'}
    </button> */}
            </div>
            {profile?.skill_name?.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {profile.skill_name.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-sm hover:bg-cyan-200 transition"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No skills added yet</p>
            )}
          </div>
        </div>
        {/* Right Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Experience */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Work Experience</h2>
              <button
                onClick={handleAddExperience}
                className="flex items-center text-cyan-600 hover:text-cyan-800 px-4 py-2 rounded-lg bg-cyan-50 hover:bg-cyan-100 transition"
              >
                <FiPlus className="mr-2" /> Add Experience
              </button>
            </div>

            {user.experiences.length > 0 ? (
              <div className="space-y-6">
                {user.experiences.map((exp) => (
                  <div key={exp.id} className="relative group">
                    <div className="absolute -left-8 top-0 h-full w-0.5 bg-cyan-200"></div>
                    <div className="absolute -left-10 top-4 h-4 w-4 rounded-full bg-cyan-500 border-4 border-white"></div>
                    <div className="pl-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {exp.job_title}
                          </h3>
                          <p className="text-gray-600">
                            {exp.company_name} • {exp.start_date} -{" "}
                            {exp.end_date}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditExperience(exp)}
                            className="text-cyan-600"
                          >
                            <FiEdit size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteExperience(exp.id)}
                            className="text-red-600 "
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      </div>
                      {exp.desc && (
                        <p className="text-gray-700 mt-2">{exp.desc}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <FiBriefcase className="text-gray-400 text-3xl" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">
                  No experience added
                </h3>
                <p className="mt-1 text-gray-500">
                  Add your work experience to showcase your career journey
                </p>
                <button
                  onClick={handleAddExperience}
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none"
                >
                  <FiPlus className="mr-2" /> Add Experience
                </button>
              </div>
            )}
          </div>

          {/* Education */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Education</h2>
              <button
                onClick={handleAddEducation}
                className="flex items-center text-cyan-600 hover:text-cyan-800 px-4 py-2 rounded-lg bg-cyan-50 hover:bg-cyan-100 transition"
              >
                <FiPlus className="mr-2" /> Add Education
              </button>
            </div>

            {user.educations.length > 0 ? (
              <div className="space-y-6">
                {user.educations.map((edu) => (
                  <div key={edu.id} className="relative group">
                    <div className="absolute -left-8 top-0 h-full w-0.5 bg-cyan-200"></div>
                    <div className="absolute -left-10 top-4 h-4 w-4 rounded-full bg-cyan-500 border-4 border-white"></div>
                    <div className="pl-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {edu.course_name}
                          </h3>
                          <p className="text-gray-600">{edu.university_name}</p>
                          <p className="text-gray-500 text-sm mt-1">
                            {edu.years}
                          </p>
                        </div>
                        <div className="flex space-x-2 ">
                          <button
                            onClick={() => handleEditEducation(edu)}
                            className="text-cyan-600 hover:text-cyan-800 p-2 rounded-md hover:bg-cyan-50"
                          >
                            <FiEdit size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteEducation(edu.id)}
                            className="text-red-600 hover:text-red-800 p-2 rounded-md hover:bg-red-50"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <FiAward className="text-gray-400 text-3xl" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">
                  No education added
                </h3>
                <p className="mt-1 text-gray-500">
                  Add your education history to showcase your qualifications
                </p>
                <button
                  onClick={handleAddEducation}
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none"
                >
                  <FiPlus className="mr-2" /> Add Education
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Modals */}
      <EducationModal
        isOpen={showEducationModal}
        onClose={() => setShowEducationModal(false)}
        onSave={handleSaveEducation}
        education={currentEducation}
          onSaveSuccess={handleSaveEducation}
      />
      <ExperienceModal
        isOpen={showExperienceModal}
        onClose={() => setShowExperienceModal(false)}
        onSave={handleSaveExperience}
        experience={currentExperience}
         onSaveSuccess={handleSaveExperience} 
      />
      <SkillsModal
        isOpen={showSkillsModal}
        onClose={() => setShowSkillsModal(false)}
        onSave={handleSaveSkills}
        currentSkills={profile?.skill || ""}
      />

      <EditProfileModal
        isOpen={showEditProfileModal}
        onClose={() => setShowEditProfileModal(false)}
        profile={profile}
      />
    </div>
  );
};

export default UserProfile;
