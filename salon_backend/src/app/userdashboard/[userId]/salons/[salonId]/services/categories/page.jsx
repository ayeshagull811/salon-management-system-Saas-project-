"use client";
import React, { useEffect, useState } from 'react';
import { Plus, Search, Edit2, Trash2, MoreVertical, Scissors, Palette, Sparkles, Heart, User, Crown } from 'lucide-react';
import {getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  toggleCategoryStatus,} from '@/app/userdashboard/[userId]/commponents/categoryApi'
import { useParams } from 'next/navigation';
const CategoryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
    const { salonId } = useParams(); // ✅ salonId route se aayega
  console.log("SalonId from URL:", salonId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: '#8B5CF6',
    icon: 'Scissors'
  });

  const [categories, setCategories] = useState([]);
   const fetchCategories = async () => {
    try {
      const res =await getCategories(salonId)
       console.log("📥 Categories from API:", res); // Debug
    setCategories(res.categories); 
    } catch (error) {
        console.error("Failed to load categories", error);
    }
   }
    useEffect(() => {
    if (salonId) {
      fetchCategories();
    }
  }, [salonId]);

  const iconMap = {
    Scissors: Scissors,
    Palette: Palette,
    Sparkles: Sparkles,
    Heart: Heart,
    User: User,
    Crown: Crown
  };

  const colorOptions = [
    '#8B5CF6', '#EC4899', '#10B981', '#F59E0B', '#EF4444', '#3B82F6', '#8B5A2B', '#6B7280'
  ];
  const iconOptions = ['Scissors', 'Palette', 'Sparkles', 'Heart', 'User', 'Crown'];

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleAddCategory = () => {
     setEditingCategory(null);
    setFormData({
      name: "",
      description: "",
      color: "#8B5CF6",
      icon: "Scissors",
    });
    setIsModalOpen(true);
  };
  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      color: category.color,
      icon: category.icon
    });
    setIsModalOpen(true);
  };
  const handleSaveCategory = async () => {
   try {
    if(editingCategory){
      await updateCategory(editingCategory.id ,formData)
    }
    else{
      console.log("📤 Sending category data:", {
  ...formData,
 salonId
});
      await createCategory({...formData , salonId})
    };
    fetchCategories();
    setIsModalOpen(false)
   } catch (err) {
     console.error("Save failed", err);
   }
  };
  const handleDeleteCategory = async (id) => {
   try {
    await deleteCategory(id);
    fetchCategories()
   } catch (err) {
    console.error("Delete failed", err);
   }
  };
  const toggleCategoryStatus = async (id) => {
  try {
    await toggleCategoryStatus(id);
    fetchCategories()
  } catch (err) {
    console.error("Toggle failed", err);
  }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-amber-600 mb-2">Service Categories</h1>
              <p className="text-gray-600">Organize and manage your salon service categories</p>
            </div>
            <button
              onClick={handleAddCategory}
              className="bg-gradient-to-r from-purple-400 via-pink-300 to-cyan-200 hover:from-purple-500  hover:via-pink-400 hover:to-cyan-300 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              Add Category
            </button>
          </div>

          {/* Search and Stats */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white shadow-sm"
              />
            </div>
            <div className="flex gap-6 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{categories.length}</div>
                <div className="text-gray-500">Total Categories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{categories.filter(c => c.isActive).length}</div>
                <div className="text-gray-500">Active</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{categories.reduce((sum, c) => sum + c.serviceCount, 0)}</div>
                <div className="text-gray-500">Total Services</div>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => {
            const IconComponent = iconMap[category.icon];
            return (
              <div
                key={category.id}
                className="bg-white/50 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group"
              >
                <div
                  className="h-20 relative"
                  style={{ backgroundColor: `${category.color}15` }}
                >
                  <div
                    className="absolute top-4 left-4 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                    style={{ backgroundColor: category.color }}
                  >
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="relative">
                      <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                        <MoreVertical className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                  <div className="absolute top-4 right-16">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      category.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {category.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{category.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm text-gray-500">
                      <span className="font-medium text-gray-900">{category.serviceCount}</span> services
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditCategory(category)}
                      className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => toggleCategoryStatus(category.id)}
                      className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        category.isActive
                          ? 'bg-red-50 hover:bg-red-100 text-red-700'
                          : 'bg-green-50 hover:bg-green-100 text-green-700'
                      }`}
                    >
                      {category.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      className="px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredCategories.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No categories found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or create a new category</p>
            <button
              onClick={handleAddCategory}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
            >
              Create Category
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editingCategory ? 'Edit Category' : 'Add New Category'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter category name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  rows={3}
                  placeholder="Enter category description"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                <div className="flex gap-2 flex-wrap">
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      onClick={() => setFormData({ ...formData, color })}
                      className={`w-10 h-10 rounded-xl border-2 ${
                        formData.color === color ? 'border-gray-400' : 'border-gray-200'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                <div className="grid grid-cols-6 gap-2">
                  {iconOptions.map((icon) => {
                    const IconComponent = iconMap[icon];
                    return (
                      <button
                        key={icon}
                        onClick={() => setFormData({ ...formData, icon })}
                        className={`p-3 rounded-xl border-2 flex items-center justify-center ${
                          formData.icon === icon 
                            ? 'border-purple-500 bg-purple-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveCategory}
                disabled={!formData.name.trim()}
                className="flex-1 px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 text-white rounded-xl font-medium transition-colors"
              >
                {editingCategory ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;