"use client";
import { createSchedule, getSchedule } from "@/app/userdashboard/[userId]/commponents/categoryApi";
import axios from "axios";
import { CalendarDays, Clock, Plus, User, Trash2, Eye, Edit, X } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";



  function formatDate(date) {
    return date.toISOString().split("T")[0];
  }
  function formatDisplayDate(dateStr) {
    const date = new Date(dateStr + 'T00:00:00');
   const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    return {
      day: days[date.getDay()],
      date: date.getDate(),
      month: months[date.getMonth()]
    };
  }
function getWeekDates() {
  const today = new Date();
  const start = new Date(today);
  start.setDate(today.getDate() - today.getDay()); // Sunday
  const week = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    week.push(d.toISOString().split("T")[0]); // format: YYYY-MM-DD
  }
  return week;
}
export default function StaffSchedulePage() {
    const [staffMember, setStaffMember] = useState([]);
  const [schedule, setSchedule] = useState({});
  const [showViewPopup, setShowViewPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  const weekDates = getWeekDates();
  const today = weekDates[0]; 
const getScheduleList = async (userId) =>{
  if (!userId) return;
  try {
    const rows = await getSchedule(userId, weekDates[0], weekDates[6]);
    // rows should now be an array. If not, guard:
    const dataRows = Array.isArray(rows) ? rows : (rows?.data ?? []);
    const scheduleObj = {};
    dataRows.forEach((row) => {
      const d = row.date;
      if (!scheduleObj[d]) scheduleObj[d] = [];
      scheduleObj[d].push({
        id: row.id,
        start: row.start_time,
        end: row.end_time,
      });
    });
    setSchedule((prev) => ({
      ...prev,
      [userId]: scheduleObj,
    }));
  }  catch (error) {
  console.error("fetchScheduleForStaff error:", error);
}
}

  // function getWeekDates() {
  //   const now = new Date();
  //   const start = new Date(now);
  //   start.setDate(now.getDate() - now.getDay() + 1);

  //   return Array.from({ length: 7 }, (_, i) => {
  //     const date = new Date(start);
  //     date.setDate(start.getDate() + i);
  //     return formatDate(date);
  //   });
  // }
 const params = useParams();
  const SalonId = params.salonId;  
  
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/auth/getstaff/${SalonId}`
        );
        console.log("get api", res.data.data);
        if (res.data.success) {
          setStaffMember(res.data.data);
        } else {
          setError(res.data.message || "Failed to fetch services");
        }
        console.log("service data", res.data.data);
      } catch (err) {
        console.error(err);
        setError("Something went wrong!");
      }
    };

    if (SalonId) fetchServices();
  }, [SalonId])


  function removeShift(staffId, date, shiftIndex) {
    setSchedule((prev) => {
      const staffSchedule = prev[staffId] || {};
      const daySchedule = staffSchedule[date] || [];
      const newDaySchedule = daySchedule.filter((_, index) => index !== shiftIndex);
      
      return {
        ...prev,
        [staffId]: {
          ...staffSchedule,
          [date]: newDaySchedule,
        },
      };
    });
  }
async function addShift(userId, date, start_time, end_time) {
  try {
    // send staff_id (backend expects staff_id)
    const created = await createSchedule({
      staff_id: userId,
      date,
      start_time,
      end_time,
    });

    // update local state using the returned created object
    setSchedule((prev) => {
      const staffSchedule = prev[userId] || {};
      const daySchedule = staffSchedule[date] ? [...staffSchedule[date]] : [];
      daySchedule.push({
        id: created.id, // created is the schedule object returned by backend
        start: created.start_time,
        end: created.end_time,
      });
      return {
        ...prev,
        [userId]: {
          ...staffSchedule,
          [date]: daySchedule,
        },
      };
    });
  } catch (err) {
    console.error("addShift error:", err?.response?.data || err.message);
    alert(err?.response?.data?.message || "Failed to add shift");
  }
}
  function getTodaySchedule(staffId) {
    if (schedule[staffId] && schedule[staffId][today]) {
      return schedule[staffId][today];
    }
    return [];
  }

  function openViewPopup(staff) {
  setSelectedStaff(staff);
  getScheduleList(staff.id);
  setShowViewPopup(true);
}

function openEditPopup(staff) {
  setSelectedStaff(staff);
  getScheduleList(staff.id);
  setShowEditPopup(true);
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b-4 border-[#ba8e6c]">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-[#987356] to-[#ba8e6c] rounded-xl flex items-center justify-center shadow-lg">
              <CalendarDays className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#ba8e6c]">Staff Schedule</h1>
              <p className="text-amber-700 text-sm">Manage weekly shifts and timings</p>
            </div>
          </div>
        </div>
      </div>

      {/* Staff Cards Row */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {staffMember.map((staff) => {
            const todayShifts = getTodaySchedule(staff.id);
            
            return (
              <div key={staff.id} className="bg-white rounded-2xl shadow-lg border border-[#ba8e6c] p-6 hover:shadow-xl transition-all duration-300">
                {/* Staff Info */}
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#ba8e6c] to-[#ba8e6c] rounded-xl flex items-center justify-center text-white font-bold text-lg">
                    {staff.avatar}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-[#ba8e6c] text-lg">{staff.name}</h3>
                    <p className="text-amber-600 text-sm">{staff.role}</p>
                  </div>
                </div>

                {/* Today Schedule */}
                <div className="mb-4">
                  <h4 className="text-[#ba8e6c] font-semibold mb-2 text-sm">Today Schedule:</h4>
                  {todayShifts.length > 0 ? (
                    <div className="space-y-2">
                      {todayShifts.map((shift, i) => (
                        <div key={i} className="bg-emerald-100 rounded-lg px-3 py-2 border border-emerald-200">
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-emerald-600" />
                            <span className="text-emerald-800 font-medium text-sm">
                              {shift.start} - {shift.end}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-gray-100 rounded-lg px-3 py-2 border border-gray-200">
                      <span className="text-gray-600 text-sm italic">No shifts today</span>
                    </div>
                  )}
                </div>

                {/* Action Icons */}
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => openViewPopup(staff)}
                    className="w-10 h-10 bg-blue-500 hover:bg-blue-600 rounded-lg flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
                    title="View Weekly Schedule"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => openEditPopup(staff)}
                    className="w-10 h-10 bg-[#ba8e6c] hover:bg-[#987356] rounded-lg flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
                    title="Edit Schedule"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* View Schedule Popup */}
      {showViewPopup && selectedStaff && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-[#ba8e6c] to-[#ba8e6c] px-6 py-4 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-white font-bold">
                    {selectedStaff.avatar}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedStaff.name} - Weekly Schedule</h2>
                    <p className="text-white/80">{selectedStaff.role}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowViewPopup(false)}
                  className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center text-white transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                {weekDates.map((date) => {
                  const displayDate = formatDisplayDate(date);
                  const isToday = date === today;
                  const dayShifts = schedule[selectedStaff.id] && schedule[selectedStaff.id][date] ? schedule[selectedStaff.id][date] : [];
                  
                  return (
                    <div key={date} className={`border rounded-xl p-4 ${
                      isToday ? 'border-[#ba8e6c] bg-[#ba8e6c]/10' : 'border-gray-200'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center ${
                            isToday ? 'bg-[#ba8e6c] text-white' : 'bg-gray-100 text-gray-700'
                          }`}>
                            <span className="font-bold text-sm">{displayDate.date}</span>
                            <span className="text-xs">{displayDate.day}</span>
                          </div>
                          <div>
                            <div className="font-bold text-gray-800">{displayDate.day}</div>
                            <div className="text-gray-600 text-sm">{displayDate.date} {displayDate.month}</div>
                          </div>
                        </div>
                        
                        <div className="flex-1 ml-6">
                          {dayShifts.length > 0 ? (
                            <div className="space-y-2">
                              {dayShifts.map((shift, i) => (
                                <div key={i} className="bg-emerald-100 rounded-lg px-3 py-2 border border-emerald-200">
                                  <div className="flex items-center space-x-2">
                                    <Clock className="w-4 h-4 text-emerald-600" />
                                    <span className="text-emerald-800 font-medium">
                                      {shift.start} - {shift.end}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-gray-500 italic">No shifts scheduled</div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Schedule Popup */}
      {showEditPopup && selectedStaff && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-[#ba8e6c] to-[#ba8e6c] px-6 py-4 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-white font-bold">
                    {selectedStaff.avatar}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Edit {selectedStaff.name}'s Schedule</h2>
                    <p className="text-white/80">{selectedStaff.role}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowEditPopup(false)}
                  className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center text-white transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-gradient-to-r from-amber-50/50 to-orange-50/50 rounded-2xl overflow-hidden">
                  <thead>
                    <tr className="bg-gradient-to-r from-[#ba8e6c]/20 to-orange-100 border-b-2 border-[#ba8e6c]">
                      <th className="text-left py-4 px-6 text-[#ba8e6c] font-bold">Day</th>
                      <th className="text-left py-4 px-6 text-[#ba8e6c] font-bold">Scheduled Shifts</th>
                      <th className="text-left py-4 px-6 text-[#ba8e6c] font-bold">Add New Shift</th>
                    </tr>
                  </thead>
                  <tbody>
                    {weekDates.map((date) => {
                      const displayDate = formatDisplayDate(date);
                      const isToday = date === today;
                      const dayShifts = schedule[selectedStaff.id] && schedule[selectedStaff.id][date] ? schedule[selectedStaff.id][date] : [];
                      
                      return (
                        <tr key={date} className={`border-b border-[#ba8e6c]/20 hover:bg-[#ba8e6c]/10 transition-all duration-200 ${
                          isToday ? 'bg-[#ba8e6c]/20' : ''
                        }`}>
                          <td className="py-4 px-6">
                            <div className="flex items-center space-x-3">
                              <div className={`w-10 h-10 rounded-xl flex flex-col items-center justify-center ${
                                isToday ? 'bg-[#ba8e6c] text-white' : 'bg-gray-100 text-gray-700'
                              }`}>
                                <span className="font-bold text-sm">{displayDate.date}</span>
                                <span className="text-xs">{displayDate.day}</span>
                              </div>
                              <div>
                                <div className="font-bold text-[#ba8e6c]">{displayDate.day}</div>
                                <div className="text-gray-600 text-sm">{displayDate.date} {displayDate.month}</div>
                              </div>
                            </div>
                          </td>
                          
                          <td className="py-4 px-6">
                            {dayShifts.length > 0 ? (
                              <div className="space-y-2">
                                {dayShifts.map((shift, i) => (
                                  <div key={i} className="flex items-center justify-between bg-emerald-100 rounded-lg px-3 py-2 border border-emerald-200">
                                    <div className="flex items-center space-x-2">
                                      <Clock className="w-4 h-4 text-emerald-600" />
                                      <span className="font-medium text-emerald-800">
                                        {shift.start} - {shift.end}
                                      </span>
                                    </div>
                                    <button
                                      onClick={() => removeShift(selectedStaff.id, date, i)}
                                      className="w-6 h-6 bg-red-500 hover:bg-red-600 rounded-md flex items-center justify-center text-white transition-all"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="text-gray-500 italic">No shifts scheduled</div>
                            )}
                          </td>
                          
                          <td className="py-4 px-6">
                            <ShiftForm
                              onAdd={(start, end) => addShift(selectedStaff.id, date, start, end)}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ShiftForm({ onAdd }) {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = () => {
    if (!start || !end) {
      alert("Please select both start and end times");
      return;
    }
    if (start >= end) {
      alert("End time must be after start time");
      return;
    }
    onAdd(start, end);
    setStart("");
    setEnd("");
    setIsExpanded(false);
  };

  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="flex items-center space-x-2 bg-[#ba8e6c] ..."
      >
        <Plus className="w-4 h-4" />
        <span>Add Shift</span>
      </button>
    );
  }



  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 border-2 border-[#ba8e6c]/30 shadow-md space-y-3">
      <h4 className="text-[#ba8e6c] font-bold text-sm mb-2">Add New Shift</h4>
      <div className="space-y-3">
        <div className="flex flex-col space-y-1">
          <label className="text-[#ba8e6c] font-medium text-xs">Start Time:</label>
          <input
          type="time" value={start} onChange={(e) => setStart(e.target.value)}
            className="border-2 border-[#ba8e6c]/50 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#ba8e6c] focus:border-[#ba8e6c] bg-white transition-all w-full"
          />
        </div>
        
        <div className="flex flex-col space-y-1">
          <label className="text-[#ba8e6c] font-medium text-xs">End Time:</label>
          <input
           type="time" value={end} onChange={(e) => setEnd(e.target.value)}
            className="border-2 border-[#ba8e6c]/50 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#ba8e6c] focus:border-[#ba8e6c] bg-white transition-all w-full"
          />
        </div>
      </div>
      
      <div className="flex space-x-2 pt-2">
        <button
          onClick={handleSubmit}
          className="flex-1 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center space-x-1"
        >
          <Plus className="w-4 h-4" />
          <span>Add Shift</span>
        </button>
        <button
          onClick={() => {
            setIsExpanded(false);
            setStart("");
            setEnd("");
          }}
          className="px-4 py-2 text-[#ba8e6c] hover:text-white hover:bg-[#ba8e6c] border border-[#ba8e6c] rounded-lg text-sm font-medium transition-all duration-200"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}