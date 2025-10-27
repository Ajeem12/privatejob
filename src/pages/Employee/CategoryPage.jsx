import React, { useState, useEffect, useRef } from "react";
import DataTable from "react-data-table-component";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchJobCategories,
  addJobCategory,
  getJobCategoryById,
  updateJobCategory,
} from "../../redux/slice/employeer/jobCategoriesSlice";
import toast from "react-hot-toast";
const JobCategoryPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: categories = [], loading, error, editCategory } = useSelector(
    (state) => state.jobCategories
  );

  const [formData, setFormData] = useState({
    category: "",
    logo: null,
  });
  const [logoPreview, setLogoPreview] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const fileInputRef = useRef(null);

  useEffect(() => {
    dispatch(fetchJobCategories());
  }, [dispatch]);

  // Populate form when editing
  useEffect(() => {
    if (editCategory) {
      setFormData({
        category: editCategory.category_name_eng || "",
        logo: null,
      });

      if (editCategory.image_details) {
        setLogoPreview(`${import.meta.env.VITE_MEDIA_URL}${editCategory.image_details}`);
      }

      setEditingId(editCategory.id);
    }
  }, [editCategory]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, logo: file }));
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData();
  data.append("jobcategory", formData.category);

  if (formData.logo) {
    data.append("logo", formData.logo);
  }

  const action = editingId
    ? updateJobCategory({ id: editingId, formData: data })
    : addJobCategory(data);

  try {
    await dispatch(action).unwrap(); // Wait and unwrap for error handling
    toast.success(editingId ? 'Category updated successfully!' : 'Category added successfully!');
    resetForm();
    dispatch(fetchJobCategories());
  } catch (error) {
    toast.error('Something went wrong. Please try again.');
    console.error('Error:', error);
  }
};

  const resetForm = () => {
    setFormData({ category: "", logo: null });
    setLogoPreview(null);
    setEditingId(null);

    // Clear file input manually
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleEdit = (id) => {
    dispatch(getJobCategoryById(id));
  };

  const handleAddSkills = (id, categoryName) => {
    navigate(`/employer/skills/${id}`, { 
      state: { categoryName: categoryName } 
    });
  };

  const handleDeleteClick = (category) => {
    setCategoryToDelete(category);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = () => {
    // Implement your delete logic here
    console.log("Deleting category:", categoryToDelete);
    setShowDeleteConfirm(false);
    setCategoryToDelete(null);
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
    setCategoryToDelete(null);
  };

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      width: "80px",
    },
    {
      name: "Category",
      selector: (row) => row.category_name_eng,
      sortable: true,
    },
    {
      name: "Logo",
      cell: (row) =>
        row.image_details ? (
          <img
            src={`${import.meta.env.VITE_MEDIA_URL}${row.image_details}`}
            alt="Logo"
            className="h-10 w-10 object-contain rounded-md border border-gray-200"
          />
        ) : (
          <div className="h-10 w-10 flex items-center justify-center bg-gray-100 rounded-md border border-gray-200 text-xs text-gray-500">
            No Logo
          </div>
        ),
      center: true,
      width: "100px",
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleEdit(row.id)}
            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 text-xs font-medium transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => handleAddSkills(row.id, row.category_name_eng)}
            className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 text-xs font-medium transition-colors"
          >
            Add Skills
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "220px",
    },
  ];

  // Custom styles for the table
  const customStyles = {
    headRow: {
      style: {
        backgroundColor: '#f9fafb',
        fontWeight: 'bold',
        fontSize: '0.875rem',
      },
    },
    rows: {
      style: {
        fontSize: '0.875rem',
        minHeight: '60px',
      },
    },
  };
// ... (same imports and initial code as above)

return (
  <div className="">
    <div className="bg-white rounded-xl  mb-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Job Categories</h1>
          <p className="text-gray-600 text-sm mt-1">Manage your job categories and skills</p>
        </div>
        {editingId && (
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
            Editing: {editCategory?.category_name_eng}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[58%_40%] gap-4 lg:gap-4">
        {/* Table Section - 70% width */}
        <div className="w-full">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-700">Categories List</h2>
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {categories.length} {categories.length === 1 ? 'category' : 'categories'}
            </span>
          </div>
          
          <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <DataTable
              columns={columns}
              data={categories}
              progressPending={loading}
              noDataComponent={
                <div className="p-8 text-center text-gray-500">
                  <svg className="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  <p>No categories found</p>
                </div>
              }
              pagination
              highlightOnHover
              customStyles={customStyles}
              responsive
              dense
            />
          </div>
        </div>

        {/* Form Section - 30% width */}
        <div className="w-full">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200 h-full sticky top-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                {editingId ? "Edit Category" : "New Category"}
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                {editingId ? "Update category details" : "Add a new job category"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Category Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  placeholder="e.g., Information Technology"
                />
              </div>

              {/* Logo Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category Logo
                </label>
                <div className="flex flex-col items-center space-y-4">
                  <label className="flex flex-col items-center justify-center w-28 h-28 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-indigo-400 transition-colors bg-white">
                    <div className="flex flex-col items-center justify-center p-4">
                      <svg className="w-6 h-6 mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      <p className="text-xs text-gray-500 text-center">Upload logo</p>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                  
                  {logoPreview && (
                    <div className="flex flex-col items-center">
                      <img
                        src={logoPreview}
                        alt="Preview"
                        className="h-20 w-20 object-contain border-2 border-gray-200 rounded-xl shadow-sm"
                      />
                      {formData.logo && (
                        <p className="text-xs text-gray-600 mt-2 text-center max-w-24 truncate">
                          {formData.logo.name}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Submit / Cancel Buttons */}
              <div className="flex flex-col space-y-3 pt-4">
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors font-medium flex items-center justify-center"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : editingId ? (
                    <>
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Update Category
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                      </svg>
                      Add Category
                    </>
                  )}
                </button>

                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="w-full px-4 py-2 text-gray-600 hover:text-gray-800 font-medium border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                    Cancel Edit
                  </button>
                )}
              </div>

              {/* Error display */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm mt-4">
                  <strong>Error:</strong> {typeof error === "string" ? error : "Something went wrong. Please try again."}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}
export default JobCategoryPage;