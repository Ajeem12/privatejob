import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRejectedList } from '../../redux/slice/employeer/rejectedListSlice';
import DataTable from 'react-data-table-component';
import {
  FaBriefcase,
  FaUser,
  FaCalendarAlt,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaTimesCircle,
  FaUserTie,
  FaFileAlt
} from 'react-icons/fa';
import moment from 'moment';

const RejectedApplications = () => {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.rejectedList);

  useEffect(() => {
    dispatch(fetchRejectedList());
  }, [dispatch]);

  const ExpandedComponent = ({ data }) => (
    <div className="p-4 bg-gray-50 border-t border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Applicant Details */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
            <FaUserTie className="text-blue-500" />
            Applicant Information
          </h4>
          <table className="w-full text-sm">
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-2 font-medium text-gray-500 w-1/3">Full Name:</td>
                <td className="py-2">{data.jobseeker_details?.first_name || 'N/A'}</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 font-medium text-gray-500">Contact:</td>
                <td className="py-2 flex items-center gap-1">
                  <FaPhone className="text-gray-400" />
                  {data.jobseeker_details?.contact_number || 'N/A'}
                </td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 font-medium text-gray-500">Email:</td>
                <td className="py-2 flex items-center gap-1">
                  <FaEnvelope className="text-gray-400" />
                  <span className="truncate">{data.jobseeker_details?.email || 'N/A'}</span>
                </td>
              </tr>
              <tr>
                <td className="py-2 font-medium text-gray-500">Applied On:</td>
                <td className="py-2 flex items-center gap-1">
                  <FaCalendarAlt className="text-gray-400" />
                  {moment(data.created_at).format('DD MMM YYYY, h:mm A')}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Job and Rejection Details */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
            <FaFileAlt className="text-blue-500" />
            Application Details
          </h4>
          <table className="w-full text-sm">
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-2 font-medium text-gray-500 w-1/3">Job Title:</td>
                <td className="py-2">{data.postjob_details?.job_title_details?.category_name_eng || 'N/A'}</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 font-medium text-gray-500">Salary:</td>
                <td className="py-2">
                  ₹{data.postjob_details?.salarymin || '0'} - ₹{data.postjob_details?.salarymax || '0'}
                  {data.postjob_details?.salary_set && ` (${data.postjob_details.salary_set})`}
                </td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 font-medium text-gray-500">Location:</td>
                <td className="py-2 flex items-center gap-1">
                  <FaMapMarkerAlt className="text-gray-400" />
                  {data.postjob_details?.location || 'N/A'}
                </td>
              </tr>
              {data.remarks && (
                <tr>
                  <td className="py-2 font-medium text-gray-500">Rejection Remarks:</td>
                  <td className="py-2 text-red-600">{data.remarks}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const columns = [
    {
      name: 'Applicant',
      selector: row => row.jobseeker_details?.first_name,
      sortable: true,
      cell: row => (
        <div className="flex items-center gap-3 py-2">
          <div className="bg-blue-50 p-2 rounded-full text-blue-600">
            <FaUser className="h-4 w-4" />
          </div>
          <div>
            <div className="font-medium">{row.jobseeker_details?.first_name || 'N/A'}</div>
            <div className="text-xs text-gray-500">
              Applied {moment(row.created_at).fromNow()}
            </div>
          </div>
        </div>
      ),
      minWidth: '200px'
    },
    {
      name: 'Job Position',
      selector: row => row.postjob_details?.job_title_details?.category_name_eng,
      sortable: true,
      cell: row => (
        <div className="flex items-center gap-2">
          <FaBriefcase className="text-gray-500" />
          <span>{row.postjob_details?.job_title_details?.category_name_eng || 'N/A'}</span>
        </div>
      )
    },
    {
      name: 'Salary Offered',
      selector: row => row.postjob_details?.salarymin,
      sortable: true,
      cell: row => (
        <div>
          <div className="font-medium">
            ₹{row.postjob_details?.salarymin || '0'} - ₹{row.postjob_details?.salarymax || '0'}
          </div>
          {row.postjob_details?.salary_set && (
            <div className="text-xs text-gray-500">
              {row.postjob_details.salary_set}
            </div>
          )}
        </div>
      )
    },
    
  ];

  const customStyles = {
    headRow: {
      style: {
        backgroundColor: '#f8fafc',
        borderBottomWidth: '1px',
        borderColor: '#e2e8f0',
        fontSize: '0.75rem',
        fontWeight: 600,
        textTransform: 'uppercase'
      },
    },
    cells: {
      style: {
        paddingLeft: '0.75rem',
        paddingRight: '0.75rem',
        paddingTop: '0.75rem',
        paddingBottom: '0.75rem',
      },
    },
    rows: {
      style: {
        '&:not(:last-of-type)': {
          borderBottomWidth: '1px',
          borderColor: '#f1f5f9',
        },
        '&:hover': {
          backgroundColor: '#f8fafc',
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
      <div className="bg-white rounded-lg shadow-sm p-8 text-center border border-gray-200">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100">
          <FaTimesCircle className="h-6 w-6 text-gray-500" />
        </div>
        <h3 className="mt-3 text-lg font-medium text-gray-900">No rejected applications</h3>
        <p className="mt-1 text-sm text-gray-500">You haven't rejected any applications yet.</p>
      </div>
    </div>
  );

  return (
    <div className="">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-1">Rejected Applications</h1>
            <p className="text-gray-600">Review candidates you've declined for your job postings</p>
          </div>
          <div className="mt-4 md:mt-0">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
              {data.length} {data.length === 1 ? 'rejection' : 'rejections'}
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
          expandableRows
          expandableRowsComponent={ExpandedComponent}
          noDataComponent={
            <div className="p-8 text-center text-gray-500">
              No rejected applications found
            </div>
          }
        />
      </div>
    </div>
  );
};

export default RejectedApplications;