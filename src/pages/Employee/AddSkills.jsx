;

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  fetchSkills, 
  saveSkill, 
  updateSkill,
  getSkillById,
  resetSuccessMessage, 
  resetErrorMessage,
  clearCurrentSkill
} from '../../redux/slice/employeer/SubCatSlice';
import { fetchJobCategories } from "../../redux/slice/employeer/jobCategoriesSlice";
import toast from 'react-hot-toast';
const AddSkills = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Get state from Redux
  const { items: categories = [], loading: categoriesLoading } = useSelector(
    (state) => state.jobCategories
  );
  
  const { 
    items: skills = [],
    loading: skillsLoading, 
    error, 
    successMessage,
    currentSkill
  } = useSelector((state) => state.subcat);

  const currentCategory = categories.find(cat => cat.id === parseInt(id));

  const [selectedCategory, setSelectedCategory] = useState(id || '');
  const [skill, setSkill] = useState('');
  const [localError, setLocalError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  // Fetch categories and skills on component mount or when ID changes
  useEffect(() => {
    dispatch(fetchJobCategories());
    if (id) {
      dispatch(fetchSkills({ category_id: id }));
    }
  }, [dispatch, id]);

  // Populate form when currentSkill changes (for editing)
  useEffect(() => {
    if (currentSkill) {
      setSkill(currentSkill.sub_category_eng || '');
    }
  }, [currentSkill]);

  useEffect(() => {
    if (successMessage) {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        setShowSuccess(false);
        dispatch(resetSuccessMessage());
        // Refresh skills list after successful operation
        if (selectedCategory) {
          dispatch(fetchSkills({ category_id: selectedCategory }));
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, dispatch, selectedCategory]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(resetErrorMessage());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  // Handle category change
  const handleCategoryChange = (e) => {
    const newCategoryId = e.target.value;
    setSelectedCategory(newCategoryId);
    if (newCategoryId) {
      navigate(`/skills/${newCategoryId}`);
      dispatch(fetchSkills({ category_id: newCategoryId }));
    } else {
      navigate('/skills');
    }
    if (localError) setLocalError('');
    dispatch(clearCurrentSkill());
  };

  // Handle skill input change
  const handleSkillChange = (e) => {
    setSkill(e.target.value);
    if (localError) setLocalError('');
  };

  // Clear form
  const clearForm = () => {
    setSkill('');
    dispatch(clearCurrentSkill());
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!selectedCategory) {
    setLocalError('Please select a category');
    toast.error('Please select a category');
    return;
  }

  if (!skill.trim()) {
    setLocalError('Please enter a skill');
    toast.error('Please enter a skill');
    return;
  }

  try {
    const skillData = new FormData();
    skillData.append("jobcategory", selectedCategory);
    skillData.append("jobsubcategory", skill.trim());

    if (currentSkill) {
      // Update existing skill
      await dispatch(updateSkill({ id: currentSkill.id, skillData })).unwrap();
      toast.success('Skill updated successfully');
    } else {
      // Add new skill
      await dispatch(saveSkill(skillData)).unwrap();
      toast.success('Skill added successfully');
    }

    dispatch(fetchSkills({ category_id: selectedCategory }));
    clearForm();
  } catch (error) {
    console.error('Error saving skill:', error);
    toast.error('Something went wrong while saving the skill');
  }
};

  // Handle editing a skill
  const handleEditSkill = (skillItem) => {
    dispatch(getSkillById(skillItem.id));
  };

  // Display loading state
  if (categoriesLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-8 text-gray-600">Loading categories...</div>
      </div>
    );
  }

  return (
    <div className="">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Skills List Section */}
        <div className="bg-white rounded-lg  p-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              {currentCategory ? `Skills for ${currentCategory.category_name_eng}` : 'All Skills'}
            </h2>
            <span className="text-sm text-gray-500">
              {skills.length} {skills.length === 1 ? 'skill' : 'skills'}
            </span>
          </div>

          {skillsLoading ? (
            <div className="text-center py-8 text-gray-600">Loading skills...</div>
          ) : skills.length > 0 ? (
            <div className="space-y-3">
              {skills.map((skillItem) => (
                <div key={skillItem.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <span className="text-gray-700">{skillItem.sub_category_eng}</span>
                  <div className="flex space-x-2">
                    <button 
                      className="text-blue-600 hover:text-blue-800 text-sm" 
                      onClick={() => handleEditSkill(skillItem)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              {selectedCategory ? 'No skills found for this category.' : 'Select a category to view skills.'}
            </div>
          )}
        </div>

        {/* Add or Edit Skill Form Section */}
        <div className="bg-white rounded-lg  p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {currentSkill ? 'Edit Skill' : 'Add New Skill'}
          </h2>
          
          {/* Success Message */}
          {showSuccess && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              {successMessage}
            </div>
          )}
          
          {/* Error Messages */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          
          {localError && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {localError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                disabled={categoriesLoading || !!currentSkill}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.category_name_eng}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="skill" className="block text-sm font-medium text-gray-700 mb-1">
                Skill Name *
              </label>
              <input
                type="text"
                id="skill"
                value={skill}
                onChange={handleSkillChange}
                placeholder="Enter a skill name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                disabled={skillsLoading}
              />
            </div>

            <div className="flex gap-3 justify-end pt-4">
              <button 
                type="button" 
                onClick={clearForm}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={skillsLoading}
              >
                {currentSkill ? 'Cancel Edit' : 'Clear'}
              </button>
              <button 
                type="submit" 
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={skillsLoading || !selectedCategory || !skill.trim()}
              >
                {skillsLoading ? 'Processing...' : currentSkill ? 'Update Skill' : 'Add Skill'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSkills;