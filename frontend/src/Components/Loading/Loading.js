import React from 'react'

const Loading = () => {
  return (
    <div className='w-full'>
            <div className=" w-full flex justify-center items-center h-screen bg-gray-100">
                <svg className="animate-spin h-16 w-16" viewBox="0 0 24 24">
            <defs>
            <linearGradient id="spinner-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
            </defs>
            <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            />
            <path
            className="opacity-75"
            fill="url(#spinner-gradient)"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
        </svg>
        </div>
    </div>
  )
}

export default Loading