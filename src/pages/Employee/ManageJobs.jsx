import { FiEdit, FiTrash2, FiEye, FiSearch } from "react-icons/fi";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJobs } from "../../redux/slice/employeer/postJobSlice";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import moment from "moment";

const ManageJobs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10); 
  const { jobs, loading, error } = useSelector((state) => state.postJob);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    dispatch(getJobs());
  }, [dispatch]);

  useEffect(() => {
    if (jobs?.data) {
      setFilteredJobs(
        jobs.data.filter((job) =>
          job.category_details?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [jobs, searchTerm]);

  const columns = [
     {
  name: "S. No.",
  cell: (row, index) => (currentPage - 1) * perPage + index + 1,
  width: "80px",
  sortable: false,
},
    {
      name: "Job Title",
      selector: (row) => row.category_details || "N/A",
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) => row.employment_type || "N/A",
      sortable: true,
    },
    {
      name: "Applicants",
      cell: (row) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.jobapplied_details?.length > 0
              ? "bg-green-100 text-green-800"
              : "bg-blue-100 text-blue-800"
          }`}
        >
          {row.jobapplied_details?.length || 0} applicants
        </span>
      ),
      sortable: true,
    },
   {
  name: "Posted Date",
  selector: (row) => {
    const parsed = moment(row.created_at, ["DD/MM/YYYY", moment.ISO_8601], true);
    return parsed.isValid() ? parsed.format("DD MMM YYYY") : "Invalid date";
  },
  sortable: true,
},
    {
      name: "Status",
      cell: (row) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.status === 1 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {row.status === 1 ? "Active" : "Closed"}
        </span>
      ),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-3">
          <button
            className="text-blue-600 hover:text-blue-900"
            onClick={() => navigate(`/employer/application/${row.id}`)}
            title="View Applicants"
          >
            <FiEye size={18} />
          </button>
          <button
            className="text-yellow-600 hover:text-yellow-900"
            onClick={() => navigate(`/employer/postJob/${row.id}`)}
            title="Edit Job"
          >
            <FiEdit size={18} />
          </button>
        </div>
      ),
    },
  ];

  const customStyles = {
    headRow: {
      style: {
        backgroundColor: "#f9fafb",
        fontSize: "0.75rem",
        fontWeight: "bold",
        textTransform: "uppercase",
      },
    },
    rows: {
      style: {
        "&:hover": {
          backgroundColor: "#f3f4f6",
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-xl p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Manage Job Posts</h1>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Search jobs by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading jobs...</div>
      ) : error ? (
        <div className="text-center py-10 text-red-500">Error loading jobs</div>
      ) : filteredJobs.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">No jobs found matching your search</div>
          <button 
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            onClick={() => navigate("/employer/postJob")}
          >
            Post New Job
          </button>
        </div>
      ) : (
       <DataTable
  columns={columns}
  data={filteredJobs}
  customStyles={customStyles}
  pagination
  paginationPerPage={perPage}
  paginationDefaultPage={currentPage}
  onChangePage={(page) => setCurrentPage(page)}
  onChangeRowsPerPage={(newPerPage, page) => {
    setPerPage(newPerPage);
    setCurrentPage(page);
  }}
  highlightOnHover
  responsive
  noDataComponent={
    <div className="py-4 text-gray-500">No matching jobs found</div>
  }
/>
      )}
    </div>
  );
};

export default ManageJobs;