
import React from 'react';
import { FiPhone, FiMail } from 'react-icons/fi';

const ContactSummary = () => {
  const dummyData = [
    { mobile: "9876543210", email: "john.doe@example.com" },
    { mobile: "9123456789", email: "jane.smith@testmail.com" },
    { mobile: "9988776655", email: "hello@company.co" },
    { mobile: "9012345678", email: "user123@domain.org" },
  ];

  return (
    <div className="bg-blue-900 border border-gray-300 py-2 shadow-sm z-50 overflow-x-auto">
      <div className="flex space-x-4 px-3 min-w-full sm:flex-wrap sm:space-x-0 sm:space-y-2 sm:flex-col">
        {dummyData.map((item, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-blue-800 rounded-md px-3 py-2 text-xs font-medium text-white whitespace-nowrap min-w-[250px]"
          >
            <div className="flex items-center space-x-1 mb-1 sm:mb-0">
              <span className="font-semibold">{index + 1}.</span>
              <FiPhone />
              <span>{item.mobile}</span>
            </div>
            <div className="flex items-center space-x-1">
              <FiMail />
              <span className="truncate max-w-[140px]">{item.email}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactSummary;
