import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRejectedJobSeekers } from '../../redux/slice/user/jobSeekerRejectedListSlice';
import DataTable from 'react-data-table-component';
import {
  FaBriefcase,
  FaBuilding,
  FaMoneyBillWave,
  FaTimesCircle,
  FaMapMarkerAlt
} from 'react-icons/fa';
import moment from 'moment';

const RejectedListPage = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.jobSeekerRejectedList);

  useEffect(() => {
    dispatch(fetchRejectedJobSeekers());
  }, [dispatch]);

  const columns = [
    {
  name: 'S. No.',
  selector: (row, index) => index + 1,
  sortable: false,
  width: '100px',
  cell: (row, index) => (
    <div className="text-gray-700 font-medium">{index + 1}</div>
  )
},

    {
      name: 'Job Details',
      selector: row => row.postjob_details?.job_title_details?.category_name_eng,
      sortable: true,
      cell: row => (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-md bg-blue-50 text-blue-600 mr-3">
            <FaBriefcase className="h-5 w-5" />
          </div>
          <div>
            <div className="font-medium text-gray-900">
              {row.postjob_details?.job_title_details?.category_name_eng || 'N/A'}
            </div>
            <div className="text-sm text-gray-500 flex items-center mt-1">
              <FaMapMarkerAlt className="mr-1.5 h-3.5 w-3.5 text-gray-400" />
              {row.postjob_details?.location || 'N/A'}
            </div>
          </div>
        </div>
      ),
      minWidth: '200px'
    },
    {
      name: 'Company',
      selector: row => row.postjob_details?.employer_details?.company_name,
      sortable: true,
      cell: row => (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-md bg-gray-50 text-gray-600 mr-3">
            <FaBuilding className="h-5 w-5" />
          </div>
          <div className="font-medium text-gray-900">
            {row.postjob_details?.employer_details?.company_name || 'N/A'}
          </div>
        </div>
      ),
      minWidth: '200px'
    },
    {
      name: 'Salary',
      selector: row => `${row.postjob_details?.salarymin || '0'} - ${row.postjob_details?.salarymax || '0'}`,
      sortable: true,
      cell: row => (
        <div>
          <div className="font-medium text-gray-900">
            ₹{row.postjob_details?.salarymin || '0'} - ₹{row.postjob_details?.salarymax || '0'}
          </div>
          {row.postjob_details?.salary_set && (
            <div className="text-xs text-gray-500 mt-1">
              {row.postjob_details.salary_set}
            </div>
          )}
        </div>
      ),
      minWidth: '150px'
    },
    {
      name: 'Status',
      selector: row => 'Rejected',
      cell: row => (
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
          Rejected
        </span>
      ),
      minWidth: '100px'
    }
  ];

  const customStyles = {
    headRow: {
      style: {
        backgroundColor: '#f9fafb',
        fontSize: '0.75rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        paddingTop: '0.75rem',
        paddingBottom: '0.75rem',
        borderBottomWidth: '1px',
        borderColor: '#e5e7eb'
      },
    },
    headCells: {
      style: {
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem',
        color: '#6b7280',
      },
    },
    cells: {
      style: {
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem',
        paddingTop: '1rem',
        paddingBottom: '1rem',
      },
    },
    rows: {
      style: {
        '&:not(:last-of-type)': {
          borderBottomWidth: '1px',
          borderColor: '#e5e7eb',
        },
        '&:hover': {
          backgroundColor: '#f9fafb',
        },
      },
    },
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <div className="bg-red-50 border-l-4 border-red-500 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <FaTimesCircle className="h-5 w-5 text-red-500" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">
              Error: {error.message || 'Failed to load rejected applications'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  if (!data || data.length === 0) return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <h3 className="mt-3 text-lg font-medium text-gray-900">No rejected applications</h3>
        <p className="mt-1 text-sm text-gray-500">There are currently no rejected job applications to display.</p>
      </div>
    </div>
  );

  return (
    <div className="">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-1">Rejected Job Applications</h1>
            <p className="text-gray-600">Review applications that were not accepted</p>
          </div>
          <div className="mt-4 md:mt-0">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
              {data.length} {data.length === 1 ? 'application' : 'applications'}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
        <DataTable
          columns={columns}
          data={data}
          customStyles={customStyles}
          pagination
          highlightOnHover
          responsive
          noDataComponent={
            <div className="p-4 text-center text-gray-500">
              No rejected applications found
            </div>
          }
        />
      </div>
    </div>
  );
};

export default RejectedListPage;