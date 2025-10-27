import React, { useState, useEffect } from "react";
import { FiMapPin, FiBriefcase, FiChevronDown } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../redux/slice/categoriesSlice";
import { fetchCities } from "../redux/slice/citiesSlice";
import TextField from "@mui/material/TextField";
import { Autocomplete, createFilterOptions } from "@mui/material";
import { useNavigate, useLocation as useRouterLocation } from "react-router-dom";

const jobTypes = ["Full-time", "Part-time", "Remote",];

const JobSearchBar = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const routerLocation = useRouterLocation();

  // Get URL params
  const queryParams = new URLSearchParams(routerLocation.search);
  const initialCat = queryParams.get("cat");
  const initialCity = queryParams.get("city");
  const initialWorkType = queryParams.get("work_type");

  // State initialization
  const [selectedJobType, setSelectedJobType] = useState(initialWorkType || "Full-time");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showJobTypes, setShowJobTypes] = useState(false);

  const { items: categories } = useSelector((state) => state.categories);
  const { items: cities } = useSelector((state) => state.cities);

  // Initialize state from URL params when data loads
  useEffect(() => {
    if (initialCat && categories?.length) {
      const foundCategory = categories.find(cat => cat.id.toString() === initialCat);
      setSelectedCategory(foundCategory || null);
    }

    if (initialCity && cities?.length) {
      const decodedCity = decodeURIComponent(initialCity);
      const [cityName, cityState] = decodedCity.split(",");
      const foundLocation = cities.find(city =>
        city.city_name === cityName.trim() &&
        city.city_state === cityState.trim()
      );
      setSelectedLocation(foundLocation || null);
    }
  }, [initialCat, initialCity, categories, cities]);

  // Fetch initial data
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchCities());
  }, [dispatch]);

  // const handleSearchSubmit = () => {
  //   const cat = selectedCategory?.id || null;
  //   const city = selectedLocation 
  //     ? `${selectedLocation.city_name},${selectedLocation.city_state}` 
  //     : "";
  //   const work_type = selectedJobType;

  //   const newQueryParams = new URLSearchParams();
  //   if (cat) newQueryParams.append("cat", cat.toString());
  //   if (city) newQueryParams.append("city", encodeURIComponent(city));
  //   if (work_type) newQueryParams.append("work_type", work_type);

  //   navigate(`/jobs?${newQueryParams.toString()}`);
  // };
  const handleSearchSubmit = () => {
    const cat = selectedCategory?.id || null;
    const city = selectedLocation
      ? `${selectedLocation.city_name},${selectedLocation.city_state}`
      : "";
    const work_type = selectedJobType;

    const newQueryParams = new URLSearchParams();
    if (cat) newQueryParams.append("cat", cat.toString());
    if (city) {
      // Encode only once
      newQueryParams.append("city", encodeURIComponent(city));
    }
    if (work_type) newQueryParams.append("work_type", work_type);

    navigate(`/jobs?${newQueryParams.toString()}`);
  };
  const filterOptions = createFilterOptions({
    matchFrom: "start",
    stringify: (option) => `${option.city_name}, ${option.city_state}`.toLowerCase(),
    ignoreCase: true,
    limit: 100,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-white rounded-xl shadow p-1 mb-4"
    >
      <div className="flex flex-col md:flex-row gap-1">
        {/* Job Category Autocomplete */}
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <FiBriefcase className="text-gray-400 text-lg" />
          </div>
          <Autocomplete
            options={categories || []}
            getOptionLabel={(option) => option.category_name_eng || ""}
            value={selectedCategory}
            onChange={(event, newValue) => setSelectedCategory(newValue)}
            isOptionEqualToValue={(option, value) => option?.id === value?.id}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Job category"
                variant="standard"
                InputProps={{
                  ...params.InputProps,
                  disableUnderline: true,
                  className: "pl-12 py-4 text-gray-700",
                }}
              />
            )}
          />
        </div>

        {/* Location Autocomplete */}
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <FiMapPin className="text-gray-400 text-lg" />
          </div>
          <Autocomplete
            options={cities || []}
            getOptionLabel={(option) =>
              option.city_name ? `${option.city_name}, ${option.city_state}` : ""
            }
            value={selectedLocation}
            onChange={(event, newValue) => setSelectedLocation(newValue)}
            isOptionEqualToValue={(option, value) =>
              option?.city_id === value?.city_id
            }
            filterOptions={filterOptions}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Location (city, state)"
                variant="standard"
                InputProps={{
                  ...params.InputProps,
                  disableUnderline: true,
                  className: "pl-12 py-4 text-gray-700",
                }}
              />
            )}
          />
        </div>

        {/* Job Type Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowJobTypes(!showJobTypes)}
            className="flex items-center justify-between w-full px-4 py-4 text-gray-700 bg-white rounded-lg border-0 focus:outline-none"
          >
            <span>{selectedJobType}</span>
            <FiChevronDown
              className={`ml-2 transition-transform ${showJobTypes ? "rotate-180" : ""
                }`}
            />
          </button>

          <AnimatePresence>
            {showJobTypes && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg py-1"
              >
                {jobTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setSelectedJobType(type);
                      setShowJobTypes(false);
                    }}
                    className={`block w-full text-left px-4 py-2 hover:bg-blue-50 ${selectedJobType === type
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700"
                      }`}
                  >
                    {type}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSearchSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-lg transition-colors shadow-md"
        >
          Search Jobs
        </button>
      </div>
    </motion.div>
  );
};

export default JobSearchBar;