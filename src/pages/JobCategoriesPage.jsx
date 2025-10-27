import React, { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../redux/slice/categoriesSlice';
import ShreeJobLoader from '../components/ShreeJobLoader';
import { useNavigate } from 'react-router-dom';

const MEDIA_URL = import.meta.env.VITE_MEDIA_URL

const JobCategoriesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items: categories, loading, error } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) return <ShreeJobLoader />;
  if (error) return <p className="text-center text-red-600 mt-10">{error}</p>;

  const filteredCategories = categories.filter((category) =>
    category.category_name_eng.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900">Explore Job Categories</h1>
        <p className="mt-3 text-lg text-gray-600">Find the right field for your future career.</p>
      </header>

      {/* Search Input */}
      <div className="max-w-md mx-auto mb-12 relative">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        <input
          type="search"
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 shadow-sm"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search job categories"
        />
      </div>

      {/* Categories Grid */}
      {filteredCategories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm hover:shadow-lg transition-transform hover:-translate-y-1 flex flex-col items-center"
            >
              {/* Category Image */}
              {category.image_details ? (
              <img
  src={`${import.meta.env.VITE_MEDIA_URL.replace(/\/$/, '')}/${category.image_details.replace(/^\/+/, '')}`}
  alt={category.category_name_eng}
  className="w-24 h-24 object-contain mb-5 rounded-lg"
  loading="lazy"
/>

              ) : (
                <div className="w-24 h-24 mb-5 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-3xl select-none">
                  📁
                </div>
              )}

              <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center truncate">
                {category.category_name_eng}
              </h3>

              {/* Show jobs count only if > 0 */}
              {category.jobs_count > 0 && (
                <p className="text-sm text-gray-500 mb-4">
                  {category.jobs_count.toLocaleString()} job{category.jobs_count > 1 ? 's' : ''} available
                </p>
              )}

             <button
  onClick={() => navigate(`/jobs?cat=${category.id}`)}
  className="w-full py-2 bg-cyan-50 text-cyan-600 rounded-xl font-semibold hover:bg-cyan-100 transition-colors"
  aria-label={`View jobs in ${category.category_name_eng}`}
>
  View Jobs
</button>

            </div>
          ))}
        </div>
      ) : (
        <div className="text-center bg-white p-12 rounded-2xl shadow-sm border border-gray-200">
          <p className="text-gray-500 text-lg mb-6">No categories found for your search.</p>
          <button
            onClick={() => setSearchTerm('')}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-semibold hover:opacity-90 transition"
          >
            Reset Search
          </button>
        </div>
      )}
    </div>
  );
};

export default JobCategoriesPage;
