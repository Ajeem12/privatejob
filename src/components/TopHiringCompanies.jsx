
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTopHiring } from '../redux/slice/topHiringSlice';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { FaBuilding } from 'react-icons/fa';

const TopHiringCompanies = () => {
  const dispatch = useDispatch();
  const { data: companies, status, error } = useSelector((state) => state.topHiring);

  useEffect(() => {
    dispatch(fetchTopHiring());
  }, [dispatch]);


  function truncateCompanyName(name, maxLength = 8) {
  if (!name) return 'Unnamed Company';
  return name.length > maxLength ? name.slice(0, maxLength) + '...' : name;
}


  return (
    <aside className=" hidden lg:block">
      <div className="bg-white p-6 rounded-xl shadow-md border border-cyan-200 sticky top-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-5 border-b border-cyan-200 pb-2">
          Top Hiring Companies
        </h2>

        {status === 'loading' && <p className="text-sm text-gray-500">Loading companies...</p>}
        {status === 'failed' && <p className="text-sm text-red-500">Error: {error}</p>}

        {status === 'succeeded' && (
          <div className="space-y-4">
            {companies.length === 0 ? (
              <p className="text-sm text-gray-500">No companies found.</p>
            ) : (
              companies.map((company) => {
                const employer = company.employer_details;
                const rating = 4.0; 
                const jobs = company.total || 0;
                const logoUrl = employer.logo
                  ? `${import.meta.env.VITE_MEDIA_URL}/storage/${employer.logo}`
                  : 'https://via.placeholder.com/48';

                return (
                  <div
                    key={employer.id}
                    className="flex items-center gap-4 p-4 rounded-md hover:bg-gray-50 transition"
                  >
                   <div className="relative w-12 h-12">
  {employer.logo ? (
    <img
      src={`${import.meta.env.VITE_MEDIA_URL}/storage/${employer.logo}`}
      alt="Company Logo"
      className="w-full h-full rounded-full object-cover border-2 border-cyan-100"
    />
  ) : (
    <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center border-2 border-cyan-100 text-gray-400">
      <FaBuilding className="text-xl" />
    </div>
  )}
</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                       <h3 className="text-sm font-medium text-gray-900 truncate">
  {truncateCompanyName(employer.company_name)}
</h3>

                        <span className="text-xs text-gray-500">{jobs} jobs</span>
                      </div>
                      {/* <div className="flex items-center mt-1 space-x-1">
                        {[...Array(5)].map((_, i) =>
                          i < Math.floor(rating) ? (
                            <FaStar key={i} className="text-yellow-400 w-4 h-4" />
                          ) : (
                            <FaRegStar key={i} className="text-gray-300 w-4 h-4" />
                          )
                        )}
                        <span className="text-xs text-gray-500 ml-1">({rating.toFixed(1)})</span>
                      </div> */}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* <button className="w-full mt-6 text-sm font-medium text-blue-600 hover:underline text-center">
          View all companies →
        </button> */}
      </div>
    </aside>
  );
};

export default TopHiringCompanies;
