import { FiSearch, FiFilter, FiBookmark, FiMail, FiUser, } from "react-icons/fi";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchCandidates } from "../../redux/slice/employeer/searchCandidateSlice";

const CandidateSearch = () => {
  const dispatch = useDispatch();
  const { loading, candidates, error } = useSelector(
    (state) => state.searchCandidate
  );

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(searchCandidates({ query: "" }));
  }, [dispatch]);

  const handleSearch = () => {
    dispatch(searchCandidates({ skill: searchTerm }));
  };

  // Helper function to get current/most recent position
  const getCurrentPosition = (candidate) => {
    if (candidate.experince_details && candidate.experince_details.length > 0) {
      // Find current position (where year_to is empty or in future)
      const currentPosition = candidate.experince_details.find(
        exp => !exp.year_to || new Date(exp.year_to) > new Date()
      );
      return currentPosition?.role || candidate.experince_details[0]?.role;
    }
    return candidate.job_position || candidate.title || "Not mentioned";
  };

  return (
    <div className="max-w-6xl mx-auto p-2 bg-white rounded-xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Find Candidates</h1>
          <p className="text-gray-600">Search from 1,240+ active candidates</p>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Search by skills or job title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
          </div>

          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Search
          </button>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <FiSearch className="h-5 w-5 text-red-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                Error loading candidates: {error.message || error}
              </p>
            </div>
          </div>
        </div>
      )}

      {!loading && !error && candidates.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <div className="text-gray-400 mb-4">
            No candidates found matching your criteria
          </div>
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            onClick={() => {
              setSearchTerm("");
              dispatch(searchCandidates({ query: "" }));
            }}
          >
            Show All Candidates
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {!loading &&
          !error &&
          candidates.map((candidate) => (
            <div
              key={candidate.id}
              className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow bg-white"
            >
              <div className="flex items-start gap-4 mb-4">
                {candidate.profileimage ? (
                  <img 
                 
                     src={`${import.meta.env.VITE_MEDIA_URL}/storage/${candidate.profileimage}`}
                    alt={candidate.first_name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="bg-indigo-100 p-3 rounded-full">
                    <FiUser className="text-indigo-600 text-xl" />
                  </div>
                )}
                <div>
                  <h3 className="font-bold text-gray-800">
                    {candidate.first_name || candidate.name}
                  </h3>
                  <p className="text-gray-600">
                    {getCurrentPosition(candidate)}
                  </p>
                  {candidate.location && (
                   <p className="text-sm text-gray-500 mt-1 flex items-center">
  {candidate.location ? candidate.location : 'Not mentioned'}
</p>

                  )}
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {candidate.skill_name && candidate.skill_name.length > 0 ? (
                    candidate.skill_name.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-gray-500">No skills mentioned</span>
                  )}
                </div>
              </div>

             
            </div>
          ))}
      </div>
    </div>
  );
};

export default CandidateSearch;