import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import UserDashboard from "./layouts/UserLayout";
import EmployeeDashboard from "./layouts/EmployeeLayout";

import Home from "./pages/Home";
import JobListingsPage from "./pages/JobListingsPage";
import JobDetailsPage from "./pages/JobDetailsPage";
import LoginPage from "./pages/user/LoginPage";
import RegisterPage from "./pages/user/RegisterPage";
import EmployerLogin from "./pages/Employee/Employerlogin";
import EmployeeRegister from "./pages/Employee/EmployeeRegister";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import CompanyListing from "./pages/CompanyListing";
import JobCategoriesPage from "./pages/JobCategoriesPage";

import DashboardHome from "./pages/user/DashboardHome";
import UserProfile from "./pages/user/UserProfile";
import UserJobs from "./pages/user/UserJobs";
import UserSettings from "./pages/user/UserSettings";

import PostJob from "./pages/Employee/PostJob";
import ManageJobs from "./pages/Employee/ManageJobs";
import CandidateSearch from "./pages/Employee/CandidateSearch";
import EmployeeHome from "./pages/Employee/EmployeeHome";

import PrivateRoute from "./utils/PrivateRoute";
import { Toaster } from "react-hot-toast";
import EmployerProfile from "./pages/Employee/EmployerProfile";
import ChangePasswordForm from "./pages/Employee/EmployerChangePasswordForm";
import JobApplicationsPage from "./pages/Employee/JobApplicationsPage";
import RejectedApplications from "./pages/Employee/RejectedApplications";
import RejectedListPage from "./pages/user/SeekerRejectedListPage";
import JobCategoryPage from "./pages/Employee/CategoryPage";
import AddSkills from "./pages/Employee/AddSkills";
import ErrorPage from "./components/ErrorPage";
import CandidateEntryForm from "./pages/user/CandidateEntryForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "jobs", element: <JobListingsPage /> },
      { path: "jobsdetails/:id", element: <JobDetailsPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "employer/login", element: <EmployerLogin /> },
      { path: "employer/register", element: <EmployeeRegister /> },
      { path: "company", element: <CompanyListing /> },
      { path: "categories", element: <JobCategoriesPage /> },
      { path: "*", element: <ErrorPage />},
      {
        path: "CandidateEntryForm",
        element: <CandidateEntryForm />,
      },
    ],
  },

  {
    path: "/dashboard",
    element: <PrivateRoute allowedRole="2" />,
    children: [
      {
        path: "",
        element: <UserDashboard />,
        children: [
          { index: true, element: <DashboardHome /> },
          { path: "profile", element: <UserProfile /> },
          { path: "jobs", element: <UserJobs /> },
          { path: "rejectedlist", element: <RejectedListPage /> },
          { path: "settings", element: <UserSettings /> },
        ],
      },
    ],
  },
  {
    path: "/employer",
    element: <PrivateRoute allowedRole="1" />,
    children: [
      {
        path: "",
        element: <EmployeeDashboard />,
        children: [
          { index: true, element: <EmployeeHome /> },
          { path: "profile", element: <EmployerProfile /> },
          { path: "postJob", element: <PostJob /> },
          { path: "postJob/:id", element: <PostJob /> },
          { path: "manageJob", element: <ManageJobs /> },
          { path: "search", element: <CandidateSearch /> },
          { path: "skills/:id", element: <AddSkills /> },
          { path: "job_category", element: <JobCategoryPage /> },
          { path: "reject", element: <RejectedApplications /> },
          { path: "changepassword", element: <ChangePasswordForm /> },
          { path: "application/:id", element: <JobApplicationsPage /> },
        ],
      },
    ],
  },
]);

const App = () => (
  <>
    <Toaster position="top-right" reverseOrder={false} />
    <RouterProvider router={router} />
  </>
);

export default App;
