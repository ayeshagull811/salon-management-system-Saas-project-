import { CheckCircle, Clock, ListChecks, XCircle } from "lucide-react";
import React from "react";

export default function Cards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      <div className="bg-white flex justify-between items-center shadow-lg rounded-xl p-6 text-center border border-amber-200">
        <div>
              <h1 className="text-lg font-bold text-amber-800">Total</h1>
        <p className="text-2sm  text-amber-600">12 </p>    
        </div>
 <div className="bg-blue-200/50 rounded p-3">
          <ListChecks className="w-5 h-5 text-blue-500" />
        </div>
      </div>
      <div className="bg-white flex justify-between items-center shadow-lg rounded-xl p-6 text-center border border-amber-200">
        <div>
          <h1 className="text-lg font-bold text-amber-800">Completed</h1>
        <p className="text-2sm text-amber-600">12 </p>
        </div>
         <div className="bg-green-200/50 rounded p-3">
          <CheckCircle className="w-5 h-5 text-green-500" />
        </div>
      </div>
      <div className="bg-white  flex justify-between items-center shadow-lg rounded-xl p-6 text-center border border-amber-200">
        <div>
            <h1 className="text-lg font-bold text-amber-800">Pending</h1>
        <p className="text-2sm text-amber-600">12 </p>
        </div>
        <div className="bg-amber-200/50 rounded p-3">
          <Clock className="w-6 h-6 text-yellow-500" />
        </div>
      
      </div>
      <div className="bg-white flex justify-between items-center shadow-lg rounded-xl p-6 text-center border border-amber-200">
        <div>
          <h1 className="text-lg font-bold text-amber-800">Cancelled</h1>
        <p className="text-2sm text-amber-600">12 </p>
        </div>
        <div className="bg-red-200/50 rounded p-3">
          <XCircle className="w-5 h-5 text-red-500" />
        </div>
      </div>
    </div>
  );
}
