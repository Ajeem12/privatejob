import React from 'react';

const MEDIA_URL = import.meta.env.VITE_MEDIA_URL;

const CompaniesListPage = () => {
  // Hardcoded companies data
  const companies = [
    { id: 1, name: 'Acme Corp', logo: 'logos/acme.png' },
    { id: 2, name: 'Globex Inc', logo: '' },
    { id: 3, name: 'Initech', logo: 'logos/initech.jpg' },
    { id: 4, name: 'Umbrella Corp', logo: '' },
    { id: 5, name: 'Wayne Enterprises', logo: 'logos/wayne.png' },
    { id: 6, name: 'Stark Industries', logo: '' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
        Companies
      </h1>

      {companies.length === 0 ? (
        <p className="text-center text-gray-500">No companies found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {companies.map((company) => (
            <div
              key={company.id}
              className="flex flex-col items-center bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
            >
             <img
  src={
    company.logo
      ? `${MEDIA_URL.replace(/\/$/, '')}/${company.logo.replace(/^\/+/, '')}`
      : 'https://via.placeholder.com/100?text=Logo'
  }
  alt={company.name}
  className="w-24 h-24 object-contain mb-4 rounded"
  loading="lazy"
/>

              <h3 className="text-center text-lg font-semibold text-gray-900 truncate">
                {company.name}
              </h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompaniesListPage;
