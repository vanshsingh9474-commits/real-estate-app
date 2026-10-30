import React, { useState, useEffect } from 'react';
import { 
  FolderPlus, 
  Tag, 
  Link2, 
  CheckCircle2, 
  XCircle, 
  Trash2, 
  Edit3, 
  Search,
  Layers
} from 'lucide-react';
import api from '../services/api';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [status, setStatus] = useState('Active');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  // Auto-generate slug from category name
  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    setSlug(value.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-'));
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get('/categories');
      setCategories(res.data.data || res.data || []);
    } catch (err) {
      console.error("Error fetching categories", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    try {
        // Clerk se token lene ke liye
        const token = await window.Clerk?.session?.getToken();

        await api.post('/categories', 
            { name, slug, status },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        setName('');
        setSlug('');
        setStatus('Active');
        fetchCategories();
        alert('Category added successfully!');
    } catch (err) {
        console.error("Error adding category", err);
        alert('Failed to add category. Make sure you are authenticated!');
    } finally {
        setLoading(false);
    }
};

  const handleDelete = async (id) => {
    if (window.confirm("Kya aap is category ko delete karna chahte hain?")) {
        try {
            // Clerk se token lene ke liye
            const token = await window.Clerk?.session?.getToken();

            await api.delete(`/categories/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            fetchCategories();
            alert('Category deleted successfully!');
        } catch (err) {
            console.error("Error deleting category", err);
            alert('Failed to delete category.');
        }
    }
};
  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 md:p-8 space-y-8 bg-slate-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-3 font-serif">
            <Layers className="text-blue-600 w-8 h-8" />
            Category Management
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Property categories ko manage aur organize karein.
          </p>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Form Card (4 Columns) */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden">
            <div className="bg-linear-to-r from-blue-600 to-indigo-600 p-5 text-white">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <FolderPlus className="w-5 h-5" />
                Add New Category
              </h2>
              <p className="text-xs text-blue-100 mt-0.5">Nayi category details yahan fill karein</p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Category Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                  Category Name
                </label>
                <div className="relative">
                  <Tag className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Villa, Luxury Apartment"
                    value={name}
                    onChange={handleNameChange}
                    className="w-full pl-10 pr-4 py-2.5 hover:border-blue-300 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              {/* Slug */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                  Slug (Auto-generated)
                </label>
                <div className="relative">
                  <Link2 className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. villa, luxury-apartment"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-sm hover:border-blue-300 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-600"
                  />
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm hover:border-blue-300 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-700"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-xl shadow-md shadow-blue-500/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading ? 'Adding...' : 'Add Category'}
              </button>
            </form>
          </div>
        </div>

        {/* Table Card (8 Columns) */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden">
            {/* Table Header & Search */}
            <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-lg font-semibold text-slate-800">
                All Categories <span className="text-xs font-normal text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full ml-2">{categories.length} Total</span>
              </h2>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs hover:border-blue-300 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            {/* Table View */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="py-3.5 px-5">ID</th>
                    <th className="py-3.5 px-5">Name</th>
                    <th className="py-3.5 px-5">Slug</th>
                    <th className="py-3.5 px-5">Status</th>
                    <th className="py-3.5 px-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {filteredCategories.length > 0 ? (
                    filteredCategories.map((cat, index) => (
                      <tr key={cat.id || index} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3.5 px-5 font-mono text-xs text-slate-400">#{cat.id || index + 1}</td>
                        <td className="py-3.5 px-5 font-medium text-slate-800">{cat.name}</td>
                        <td className="py-3.5 px-5 font-mono text-xs text-slate-500">
                          <span className="bg-slate-100 px-2 py-1 rounded-md">{cat.slug}</span>
                        </td>
                        <td className="py-3.5 px-5">
                          {cat.status === 'Active' ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600 border border-emerald-200/60">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-50 text-rose-600 border border-rose-200/60">
                              <XCircle className="w-3.5 h-3.5" /> Inactive
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              onClick={() => handleDelete(cat.id)}
                              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="py-12 text-center text-slate-400">
                        <div className="flex flex-col items-center gap-2">
                          <Layers className="w-8 h-8 text-slate-300 stroke-[1.5]" />
                          <p className="text-sm font-medium">No categories found.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Categories;