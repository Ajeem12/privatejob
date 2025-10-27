import React from 'react'
import { getJobById } from '../../redux/slice/employeer/postJobSlice';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
const EmployeeJobdetails = () => {

    const dispatch = useDispatch();
   const navigate = useNavigate();
  const { id } = useParams();
  const { 
    loading, 
    error, 
    success, 
    job: currentJob,
    loading: jobLoading 
  } = useSelector((state) => state.postJob);


  return (
    <div>EmployeeJobdetails</div>
  )
}

export default EmployeeJobdetails