// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "../redux/slice/categoriesSlice";
import companiesReducer from "../redux/slice/companiesSlice";
import userRegisterReducer from "../redux/slice/user/userRegisterSlice";
import allJobReducer from "../redux/slice/allJobSlice";
import citiesReducer from "../redux/slice/citiesSlice";
import changePasswordReducer from "../redux/slice/changePasswordSlice";
import applyJobReducer from "../redux/slice/applyJobSlice";
import postJobReducer from "./slice/employeer/postJobSlice";
import searchCandidateReducer from "./slice/employeer/searchCandidateSlice";
import profileReducer from "./slice/user/profileSlice";
import skillsReducer from "./slice/skillsSlice";
import employeeRegisterReducer from "./slice/employeer/employeeRegisterSlice";
import otherFacilitiesReducer from "./slice/otherFacilitiesSlice";
import jobSeekerReducer from "../redux/slice/user/jobSeekerSlice";
import experienceReducer from "../redux/slice/user/experienceSlice";
import educationReducer from "./slice/user/educationSlice";
import employerReducer from "./slice/employeer/employerSlice";
import featuredJobsReducer from "./slice/featuredJobsSlice";
import dashboardCountReducer from "./slice/employeer/dashboardCountSlice";
import topHiringReducer from "./slice/topHiringSlice";
import similarJobsReducer from "./slice/similarJobsSlice";
import employerChangePasswordReducer from "./slice/employeer/employerChangePasswordSlice";
import jobDetailsReducer from "./slice/employeer/jobDetailsSlice";
import applicationWithoutRegReducer from "./slice/applicationWithoutRegSlice";
import jobStatusReducer from "./slice/employeer/jobStatusSlice";
import rejectedListReducer from "./slice/employeer/rejectedListSlice";
import jobSeekerRejectedListReducer from "./slice/user/jobSeekerRejectedListSlice";
import jobCategoriesReducer from "./slice/employeer/jobCategoriesSlice";
import SubCatReducer from "./slice/employeer/SubCatSlice";
import jobWithoutRegReducer from "./slice/employeer/jobWithoutRegSlice";
import contactReducer from "./slice/contactSlice";
import candidateRegisterReducer from "./slice/user/candidateentryformslice";
import hiredPeopleReducer from "./slice/hiredSlice";
const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    companies: companiesReducer,
    userRegister: userRegisterReducer,
    jobs: allJobReducer,
    cities: citiesReducer,
    changePassword: changePasswordReducer,
    applyJob: applyJobReducer,
    postJob: postJobReducer,
    searchCandidate: searchCandidateReducer,
    profile: profileReducer,
    skills: skillsReducer,
    employeeRegister: employeeRegisterReducer,
    otherFacilities: otherFacilitiesReducer,
    jobSeeker: jobSeekerReducer,
    education: educationReducer,
    experience: experienceReducer,
    employer: employerReducer,
    featuredJobs: featuredJobsReducer,
    dashboardCount: dashboardCountReducer,
    topHiring: topHiringReducer,
    similarJobs: similarJobsReducer,
    employerChangePassword: employerChangePasswordReducer,
    applicationWithoutReg: applicationWithoutRegReducer,
    jobDetails: jobDetailsReducer,
    jobStatus: jobStatusReducer,
    rejectedList: rejectedListReducer,
    jobSeekerRejectedList: jobSeekerRejectedListReducer,
    jobCategories: jobCategoriesReducer,
    subcat: SubCatReducer,
    jobWithoutReg: jobWithoutRegReducer,
    contact: contactReducer,
    candidateRegister: candidateRegisterReducer,
    hiredPeople: hiredPeopleReducer,
  },
});

export default store;
