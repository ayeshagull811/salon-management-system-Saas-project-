import { Users } from 'lucide-react'
import React from 'react'

export default function AvailableStaff() {
  return (
    <div>
          <div className="bg-white shadow-lg rounded-xl p-6 mt-5 text-center border border-pink-200 hover:shadow-xl transition-shadow duration-300">
            {/* <div className="flex justify-center mb-3">
        <Users className="w-8 h-8 text-green-600" />
      </div> */}
      <h1 className="text-lg font-bold text-pink-800 mb-3">
        Available Staff
      </h1>
      <p className="text-4xl font-extrabold text-pink-600 mb-4">
        8
      </p>
        <button className="relative overflow-hidden px-7 py-2 bg-pink-200/30w-full bg-gradient-to-r from-pink-700 to-pink-500 text-white font-semibold rounded-full hover:opacity-90 transition duration-300 hover:text-pink-100 group">
                <span className="relative z-10">
                  View All
                </span>
                <span className="absolute left-0 top-0 h-full w-0 bg-pink-400 text-pink-700 transition-all duration-500 group-hover:w-full"></span>
              </button>
    </div>
    </div>
  )
}
