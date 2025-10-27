// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { fetchAllJobs } from '../redux/slice/allJobSlice';

// const FilterSidebar = () => {
//   const dispatch = useDispatch();
//   const [showMobileFilter, setShowMobileFilter] = useState(false);

//   const jobTypes = ['Full', 'Part', 'Remote'];

//   const salaryRanges = [
//     { label: '₹0 - ₹50,000', min: 0, max: 50000 },
//     { label: '₹50,000 - ₹1,00,000', min: 50000, max: 100000 },
//     { label: '₹1,00,000+', min: 100000, max: null },
//   ];

//   const [filters, setFilters] = useState({
//     jobType: '',
//     salaryRange: null,
//     remoteOnly: false,
//   });

//   const toggleFilter = (filterKey, option) => {
//     if (filterKey === 'remoteOnly') {
//       setFilters(prev => ({ ...prev, remoteOnly: !prev.remoteOnly }));
//     } else {
//       setFilters(prev => ({ ...prev, [filterKey]: option }));
//     }
//   };

//   const resetFilters = () => {
//     setFilters({
//       jobType: '',
//       salaryRange: null,
//       remoteOnly: false,
//     });
//     dispatch(fetchAllJobs({}));
//     setShowMobileFilter(false);
//   };

//   const applyFilters = () => {
//     const postData = {
//       work_type: filters.jobType,
//       salarymin: filters.salaryRange?.min ?? null,
//       salarymax: filters.salaryRange?.max ?? null,

//     };

//     dispatch(fetchAllJobs(postData));
//     setShowMobileFilter(false);
//   };

//   return (
//     <>
//       {/* Mobile Filter Button */}
//       <div className="lg:hidden flex justify-end mb-4 px-4">
//         <button
//           onClick={() => setShowMobileFilter(true)}
//           className="bg-blue-600 text-white py-2 px-4 rounded-md text-sm"
//         >
//           Open Filters
//         </button>
//       </div>

//       {/* Sidebar */}
//       <aside
//         className={`${
//           showMobileFilter ? 'fixed inset-0 z-40 bg-black bg-opacity-50' : 'hidden'
//         } lg:block`}
//       >
//         <div
//           className={`${
//             showMobileFilter ? 'translate-x-0' : '-translate-x-full'
//           } lg:translate-x-0 transition-transform duration-300 transform bg-white p-6 rounded-lg shadow-sm sticky top-8 w-3/4 max-w-sm lg:w-full h-full overflow-auto lg:static`}
//         >
//           <div className="lg:hidden flex justify-end mb-4">
//             <button
//               onClick={() => setShowMobileFilter(false)}
//               className="text-gray-600 text-sm"
//             >
//               Close ✖
//             </button>
//           </div>

//           <h2 className="text-lg font-medium text-gray-900 mb-6">Filter Jobs</h2>

//           {/* Job Type (radio) */}
//           <FilterSection
//             title="Job Type"
//             options={jobTypes}
//             selected={filters.jobType}
//             type="radio"
//             toggle={toggleFilter}
//             filterKey="jobType"
//           />

//           {/* Salary Range */}
//           <div className="mb-6">
//             <h3 className="text-sm font-medium text-gray-900 mb-3">Salary Range</h3>
//             <div className="space-y-2">
//               {salaryRanges.map(range => (
//                 <div key={range.label} className="flex items-center">
//                   <input
//                     type="radio"
//                     id={`salary-${range.label}`}
//                     name="salaryRange"
//                     checked={filters.salaryRange?.label === range.label}
//                     onChange={() => toggleFilter('salaryRange', range)}
//                     className="h-4 w-4 text-blue-600"
//                   />
//                   <label
//                     htmlFor={`salary-${range.label}`}
//                     className="ml-2 text-sm text-gray-600"
//                   >
//                     {range.label}
//                   </label>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Remote Only */}
//           <div className="mb-6 flex items-center">
//             <input
//               id="remote"
//               type="checkbox"
//               checked={filters.remoteOnly}
//               onChange={() => toggleFilter('remoteOnly')}
//               className="h-4 w-4 text-blue-600"
//             />
//             <label htmlFor="remote" className="ml-2 text-sm text-gray-600">
//               Remote Only
//             </label>
//           </div>

//           {/* Action Buttons */}
//           <button
//             className="w-full bg-green-600 text-white py-2 px-4 rounded-md text-sm hover:bg-green-700 transition mb-2"
//             onClick={applyFilters}
//           >
//             Apply Filters
//           </button>

//           <button
//             className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-md text-sm hover:bg-gray-300 transition"
//             onClick={resetFilters}
//           >
//             Reset Filters
//           </button>
//         </div>
//       </aside>
//     </>
//   );
// };

// // Reusable for Job Type only now
// const FilterSection = ({ title, options, selected, type, toggle, filterKey }) => (
//   <div className="mb-6">
//     <h3 className="text-sm font-medium text-gray-900 mb-3">{title}</h3>
//     <div className="space-y-2">
//       {options.map(option => (
//         <div key={option} className="flex items-center">
//           <input
//             type={type}
//             id={`${filterKey}-${option}`}
//             name={filterKey}
//             checked={selected === option}
//             onChange={() => toggle(filterKey, option)}
//             className="h-4 w-4 text-blue-600"
//           />
//           <label htmlFor={`${filterKey}-${option}`} className="ml-2 text-sm text-gray-600">
//             {option}
//           </label>
//         </div>
//       ))}
//     </div>
//   </div>
// );

// export default FilterSidebar;
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAllJobs } from '../redux/slice/allJobSlice';

const FilterSidebar = () => {
  const dispatch = useDispatch();
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const jobTypes = ['Full-time', 'Part-time', 'Remote'];

  const salaryRanges = [
    { label: '₹0 - ₹50,000', min: 0, max: 50000 },
    { label: '₹50,000 - ₹1,00,000', min: 50000, max: 100000 },
    { label: '₹1,00,000+', min: 100000, max: null },
  ];

  const [filters, setFilters] = useState({
    jobType: '',
    salaryRange: null,
    remoteOnly: false,
  });

  const toggleFilter = (filterKey, option) => {
    if (filterKey === 'remoteOnly') {
      setFilters(prev => ({ ...prev, remoteOnly: !prev.remoteOnly }));
    } else {
      setFilters(prev => ({ ...prev, [filterKey]: option }));
    }
  };

  const resetFilters = () => {
    setFilters({
      jobType: '',
      salaryRange: null,
      remoteOnly: false,
    });
    dispatch(fetchAllJobs({}));
    setShowMobileFilter(false);
  };

  const applyFilters = () => {
    const postData = {
      work_type: filters.jobType,
      salarymin: filters.salaryRange?.min ?? null,
      salarymax: filters.salaryRange?.max ?? null,
    };
    dispatch(fetchAllJobs(postData));
    setShowMobileFilter(false);
  };

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden flex justify-end mb-4 ">
        <button
          onClick={() => setShowMobileFilter(true)}
          className="bg-blue-600 w-full text-white py-4 px-4 rounded-md text-sm"
        >
          Filters
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block ">
        <div className="bg-white p-6 rounded-lg shadow-sm sticky top-8">
          <FilterContent
            filters={filters}
            jobTypes={jobTypes}
            salaryRanges={salaryRanges}
            toggleFilter={toggleFilter}
            applyFilters={applyFilters}
            resetFilters={resetFilters}
          />
        </div>
      </aside>

      {/* Mobile Centered Modal */}
      {showMobileFilter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 lg:hidden">
          <div className="bg-white w-[90%] max-w-md p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Filter Jobs</h2>
              <button
                onClick={() => setShowMobileFilter(false)}
                className="text-gray-600 text-sm"
              >
                ✖
              </button>
            </div>

            <FilterContent
              filters={filters}
              jobTypes={jobTypes}
              salaryRanges={salaryRanges}
              toggleFilter={toggleFilter}
              applyFilters={applyFilters}
              resetFilters={resetFilters}
            />
          </div>
        </div>
      )}
    </>
  );
};

// Extracted reusable FilterContent for both desktop & mobile
const FilterContent = ({
  filters,
  jobTypes,
  salaryRanges,
  toggleFilter,
  applyFilters,
  resetFilters,
}) => (
  <>
    {/* Job Type */}
    <FilterSection
      title="Job Type"
      options={jobTypes}
      selected={filters.jobType}
      type="radio"
      toggle={toggleFilter}
      filterKey="jobType"
    />

    {/* Salary Range */}
    <div className="mb-6">
      <h3 className="text-sm font-medium text-gray-900 mb-3">Salary Range</h3>
      <div className="space-y-2">
        {salaryRanges.map(range => (
          <div key={range.label} className="flex items-center">
            <input
              type="radio"
              id={`salary-${range.label}`}
              name="salaryRange"
              checked={filters.salaryRange?.label === range.label}
              onChange={() => toggleFilter('salaryRange', range)}
              className="h-4 w-4 text-blue-600"
            />
            <label
              htmlFor={`salary-${range.label}`}
              className="ml-2 text-sm text-gray-600"
            >
              {range.label}
            </label>
          </div>
        ))}
      </div>
    </div>



    {/* Buttons */}
    <button
      className="w-full bg-green-600 text-white py-2 px-4 rounded-md text-sm hover:bg-green-700 transition mb-2"
      onClick={applyFilters}
    >
      Apply Filters
    </button>

    <button
      className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-md text-sm hover:bg-gray-300 transition"
      onClick={resetFilters}
    >
      Reset Filters
    </button>
  </>
);

// Generic filter section
const FilterSection = ({ title, options, selected, type, toggle, filterKey }) => (
  <div className="mb-6">
    <h3 className="text-sm font-medium text-gray-900 mb-3">{title}</h3>
    <div className="space-y-2">
      {options.map(option => (
        <div key={option} className="flex items-center">
          <input
            type={type}
            id={`${filterKey}-${option}`}
            name={filterKey}
            checked={selected === option}
            onChange={() => toggle(filterKey, option)}
            className="h-4 w-4 text-blue-600"
          />
          <label htmlFor={`${filterKey}-${option}`} className="ml-2 text-sm text-gray-600">
            {option}
          </label>
        </div>
      ))}
    </div>
  </div>
);

export default FilterSidebar;
