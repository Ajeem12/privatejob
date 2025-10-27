import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../../redux/slice/categoriesSlice';
import { useNavigate } from "react-router-dom";


// Utility function to generate random colors for categories
const getRandomColors = () => {
  const colors = [
    ["#D0E6FF", "#A2C1FF"], // Blue
    ["#FFE0F0", "#FFB3D9"], // Pink
    ["#D0FFE8", "#A2FFC9"], // Green
    ["#FFF6D1", "#FFE885"], // Yellow
    ["#E8D9FF", "#C1A9FF"], // Purple
    ["#D6FFF7", "#AAFFF0"], // Teal
    ["#FFE6CC", "#FFC380"], // Orange
    ["#FDE2E2", "#FAA0A0"], // Red
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const JobCategoryGrid = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items: categories, loading, error } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) {
    return <div className="text-center py-16">Loading categories...</div>;
  }

  if (error) {
    return <div className="text-center py-16 text-red-500">Error loading categories: {error}</div>;
  }

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-3 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6">
          Explore Job Categories
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto mb-12 text-base sm:text-lg">
          Discover the industries hiring now — find your dream role in top sectors.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6">
          {categories.slice(0,8).map((category) => {
            const colors = getRandomColors();
            const iconColor = colors[1]; // Use the darker color for the icon
            const jobCount = category.subcategory_details?.length || 0;
            const imageUrl = category.image_details 
              ? `${import.meta.env.VITE_MEDIA_URL}/${category.image_details}`
              : '/placeholder-image.jpg'; // Fallback image

            return (
              <motion.div
                key={category.id}
                onClick={() => navigate(`/jobs?cat=${category.id}`)}
                initial={{ y: 0, boxShadow: "0px 3px 5px rgba(0,0,0,0.1)" }}
                whileHover={{
                  y: -6,
                  boxShadow: `0px 12px 20px ${iconColor}50`,
                }}
                transition={{ type: "spring", stiffness: 220, damping: 22 }}
                style={{
                  background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`,
                }}
                className="rounded-2xl p-6 cursor-pointer flex flex-col items-center justify-center shadow-sm text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  className="mb-5 p-2 rounded-full bg-white shadow-md flex justify-center items-center mx-auto w-16 h-16 overflow-hidden"
                >
                  <img 
                    src={imageUrl} 
                    alt={category.category_name_eng}
                    className="w-full h-full object-contain"
                    
                  />
                </motion.div>

                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {category.category_name_eng}
                </h3>
                <p className="text-gray-700 font-medium text-sm">
                  {jobCount}+ {jobCount === 1 ? 'subcategory' : 'subcategories'}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            to="/categories"
            className="px-10 py-3 bg-blue-500 text-white rounded-full text-base font-semibold shadow-md hover:from-indigo-600 hover:to-blue-700 transition duration-300"
          >
            See More Categories
          </Link>
        </div>
      </div>
    </section>
  );
};

export default JobCategoryGrid;