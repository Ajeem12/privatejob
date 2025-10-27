import React from 'react'

const SkeletonCard = () => {
  return (
 
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm animate-pulse">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gray-200 rounded-lg mr-4"></div>
            <div>
              <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
          <div className="h-5 w-14 bg-gray-200 rounded"></div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <div className="h-5 bg-gray-200 rounded-full w-24"></div>
          <div className="h-5 bg-gray-200 rounded-full w-20"></div>
          <div className="h-5 bg-gray-200 rounded-full w-20"></div>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-4 bg-gray-200 rounded w-20"></div>
        </div>

        <div className="mb-5">
          <div className="h-3 bg-gray-200 rounded w-28 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>

        <div className="mb-4">
          <div className="h-3 bg-gray-200 rounded w-20 mb-2"></div>
          <div className="flex flex-wrap gap-2">
            <div className="h-5 bg-gray-200 rounded-full w-16"></div>
            <div className="h-5 bg-gray-200 rounded-full w-16"></div>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <div className="h-8 w-24 bg-gray-200 rounded-lg"></div>
          <div className="h-4 w-12 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  
  )
}

export default SkeletonCard