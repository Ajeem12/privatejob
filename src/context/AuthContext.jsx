import React, { createContext, useState, useEffect } from 'react';
import axios from '../utils/axiosInstance';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [jobSeeker, setJobSeeker] = useState(null);
  const [employer, setEmployer] = useState(null);
  const [loading, setLoading] = useState(false);       // For login API call loading
  const [error, setError] = useState(null);
  const [authLoading, setAuthLoading] = useState(true); // For initial auth state loading

  // Load users from localStorage on mount
  useEffect(() => {
    const storedJobSeeker = localStorage.getItem('jobSeeker');
    const storedEmployer = localStorage.getItem('employer');

    if (storedJobSeeker) setJobSeeker(JSON.parse(storedJobSeeker));
    if (storedEmployer) setEmployer(JSON.parse(storedEmployer));

    setAuthLoading(false); // Finished loading from localStorage
  }, []);

  // JobSeeker Login
  const loginJobSeeker = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post('/jobseekerlogin', credentials);
      if (!res.data.success) throw new Error(res.data.message || 'Login failed');

      const { token, name, role, job_finder_id } = res.data.data;
      const userData = { name, role, job_finder_id };

      localStorage.setItem('jobSeeker', JSON.stringify(userData));
      localStorage.setItem('token_jobseeker', token);
      setJobSeeker(userData);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Employer Login
  const loginEmployer = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post('/employerslogin', credentials);
      if (!res.data.success) throw new Error(res.data.message || 'Login failed');

      const { token, name, role, employer_id } = res.data.data;
      const employerData = { name, role, employer_id };

      localStorage.setItem('employer', JSON.stringify(employerData));
      localStorage.setItem('token_employer', token);
      setEmployer(employerData);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // JobSeeker Logout
  const logoutJobSeeker = () => {
    setJobSeeker(null);
    localStorage.removeItem('jobSeeker');
    localStorage.removeItem('token_jobseeker');
  };

  // Employer Logout
  const logoutEmployer = () => {
    setEmployer(null);
    localStorage.removeItem('employer');
    localStorage.removeItem('token_employer');
  };

  return (
    <AuthContext.Provider
      value={{
        jobSeeker,
        employer,
        loading,
        error,
        authLoading,
        loginJobSeeker,
        loginEmployer,
        logoutJobSeeker,
        logoutEmployer,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
