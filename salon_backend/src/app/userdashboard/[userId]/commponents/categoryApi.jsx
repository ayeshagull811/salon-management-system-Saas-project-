// api/categoryScheduleApi.js
import axiosInstance from "@/axiosInstance"; // updated axios instance

const CATEGORY_URL = "/category";
const SCHEDULE_URL = "/schedule";

// ✅ Get categories
export const getCategories = async (salonId) => {
  const res = await axiosInstance.get(`${CATEGORY_URL}/getcategory/${salonId}`);
  return res.data;
};

// ✅ Create category
export const createCategory = async (data) => {
  const res = await axiosInstance.post(`${CATEGORY_URL}/createcategory`, data);
  return res.data;
};

// ✅ Update category
export const updateCategory = async (id, data) => {
  const res = await axiosInstance.put(`${CATEGORY_URL}/updatecategory/${id}`, data);
  return res.data;
};

// ✅ Delete category
export const deleteCategory = async (id) => {
  const res = await axiosInstance.delete(`${CATEGORY_URL}/deletedcategory/${id}`);
  return res.data;
};

// ✅ Toggle active/inactive
export const toggleCategoryStatus = async (id) => {
  const res = await axiosInstance.patch(`${CATEGORY_URL}/${id}/toggle`);
  return res.data;
};

// ✅ Get schedule
export const getSchedule = async (userId, startDate, endDate) => {
  try {
    const res = await axiosInstance.get(`${SCHEDULE_URL}/getstaff/${userId}`, {
      params: {
        start_date: startDate,
        end_date: endDate,
      },
    });
    return res.data;
  } catch (error) {
    console.error("API getSchedule error:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Create schedule
export const createSchedule = async (data) => {
  try {
    const res = await axiosInstance.post(`${SCHEDULE_URL}/staffschedule`, data);
    return res.data;
  } catch (error) {
    console.error("API createSchedule error:", {
      message: error?.message,
      status: error?.response?.status,
      data: error?.response?.data,
      url: error?.config?.url,
      method: error?.config?.method,
    });
    throw error;
  }
};
