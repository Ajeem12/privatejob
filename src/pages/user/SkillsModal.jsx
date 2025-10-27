import React, { useState, useEffect } from 'react';
import { FiX, FiCheck } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllSkills } from '../../redux/slice/skillsSlice';

const SkillsModal = ({ isOpen, onClose, currentSkills = [], onSave }) => {
  const dispatch = useDispatch();
  const { skills, loading, error } = useSelector((state) => state.skills);
  const [selectedSkills, setSelectedSkills] = useState([]);

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchAllSkills());

      // Pre-fill selected skills from prop
      if (Array.isArray(currentSkills)) {
        setSelectedSkills(currentSkills);
      } else if (typeof currentSkills === 'string') {
        
        // If it's a comma-separated string, convert to array of integers
        const parsed = currentSkills
          .split(',')
          .map((id) => parseInt(id.trim(), 10))
          .filter((id) => !isNaN(id));
        setSelectedSkills(parsed);
      } else {
        setSelectedSkills([]);
      }
    }
  }, [isOpen, dispatch, currentSkills]);

  const toggleSkill = (skillId) => {
    setSelectedSkills((prev) =>
      prev.includes(skillId)
        ? prev.filter((id) => id !== skillId)
        : [...prev, skillId]
    );
  };

  const handleSave = () => {
    onSave(selectedSkills); // Send array of IDs
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Select Skills</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FiX size={24} />
          </button>
        </div>

        {loading && <div className="text-center py-4">Loading skills...</div>}
        {error && <div className="text-red-500 text-center py-4">{error}</div>}

        <div className="max-h-96 overflow-y-auto">
          <div className="grid grid-cols-2 gap-2">
            {skills.map((skill) => (
              <button
                key={skill.id}
                onClick={() => toggleSkill(skill.id)}
                className={`p-3 rounded-md flex items-center justify-between ${
                  selectedSkills.includes(skill.id)
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <span>{skill.sub_category_eng}</span>
                {selectedSkills.includes(skill.id) && <FiCheck className="text-blue-600" />}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Save Skills
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkillsModal;
