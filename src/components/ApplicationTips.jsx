import React from 'react';
import { FaFileAlt, FaUserTie, FaClock } from 'react-icons/fa';

const ApplicationTips = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Application Tips</h3>
      <div className="space-y-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
            <FaFileAlt />
          </div>
          <div>
            <h4 className="font-medium text-gray-900">Tailor your resume</h4>
            <p className="text-sm text-gray-600">Highlight relevant skills and experience</p>
          </div>
        </div>
        <div className="flex items-start">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
            <FaUserTie />
          </div>
          <div>
            <h4 className="font-medium text-gray-900">Custom cover letter</h4>
            <p className="text-sm text-gray-600">Explain why you're a good fit</p>
          </div>
        </div>
        <div className="flex items-start">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3">
            <FaClock />
          </div>
          <div>
            <h4 className="font-medium text-gray-900">Apply early</h4>
            <p className="text-sm text-gray-600">Jobs often get many applicants</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationTips;
