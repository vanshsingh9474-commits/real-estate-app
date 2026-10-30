import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { 
  ArrowLeft, 
  Upload, 
  Building2, 
  IndianRupee, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  CheckCircle2 
} from 'lucide-react';

const CreateProperty = () => {
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    purpose: 'Sale',
    city: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    description: '',
  });
  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

 const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 1. Yahan token get karein
      const token = await getToken({ template: undefined }); // ya agar koi specific JWT template banaya hai toh uska naam dein
      console.log("Generated Clerk Token:", token);

     const data = new FormData();
    data.append('title', formData.title);
    data.append('price', formData.price);
    data.append('purpose', formData.purpose);
    data.append('city', formData.city);
    data.append('location', formData.location);
    
    // Yeh do lines add karein (jo database maang raha hai):
    data.append('address', formData.location); // Location ko address bana kar bhej rahe hain
    data.append('type', formData.purpose);     // Purpose ko type bana kar bhej rahe hain

    data.append('bedrooms', formData.bedrooms);
    data.append('bathrooms', formData.bathrooms);
    data.append('area', formData.area);
    data.append('description', formData.description);

      for (let i = 0; i < images.length; i++) {
        data.append('images', images[i]);
      }

      // 2. Yahan headers me token pass karein
      const response = await fetch('http://localhost:5000/api/properties', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: data,
      });

      const result = await response.json();
      console.log("Backend Response Error:", result);

      if (response.ok) {
        alert('Property created successfully!');
        navigate('/admin/properties');
      } else {
        alert(result.message || 'Something went wrong!');
      }
    } catch (error) {
      console.error('Error creating property:', error);
      alert('Server error, please try again.');
    }
  };
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Header & Back Link */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/properties"
            className="p-2 text-slate-500 hover:text-slate-800 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 font-serif">Add New Property</h1>
            <p className="text-sm text-slate-500">Fill in the details to publish a new real estate listing.</p>
          </div>
        </div>
      </div>

      {/* Main Form Container */}
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Section 1: Basic Details */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-base font-semibold text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-blue-600" /> Basic Information
          </h2>

          <div className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                Property Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                required
                placeholder="e.g. 3 BHK Luxury Apartment in Dwarka"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 hover:border-blue-300 bg-slate-50/50 text-slate-800 text-sm border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Price & Purpose Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                  Price (₹) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <IndianRupee className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="number"
                    name="price"
                    required
                    placeholder="0000000"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3.5 py-2.5 hover:border-blue-300 bg-slate-50/50 text-slate-800 text-sm border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                  Purpose <span className="text-red-500">*</span>
                </label>
                <select
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-slate-50/50 hover:border-blue-300 text-slate-800 text-sm border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                >
                  <option value="Sale">For Sale</option>
                  <option value="Rent">For Rent</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Location & Specs */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-base font-semibold text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-600" /> Location & Specs
          </h2>

          <div className="space-y-4">
            {/* City & Location Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  required
                  placeholder="e.g. Delhi"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 hover:border-blue-300 bg-slate-50/50 text-slate-800 text-sm border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                  Location / Area Name <span className='text-red-500'>*</span>
                </label>
                <input
                  type="text"
                  name="location"
                  placeholder="e.g. Sector 12, Dwarka"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 hover:border-blue-300 bg-slate-50/50 text-slate-800 text-sm border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            {/* Bedrooms, Bathrooms, Area Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                  Bedrooms
                </label>
                <div className="relative">
                  <Bed className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="number"
                    name="bedrooms"
                    placeholder="0"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3.5 py-2.5 hover:border-blue-300 bg-slate-50/50 text-slate-800 text-sm border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                  Bathrooms
                </label>
                <div className="relative">
                  <Bath className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="number"
                    name="bathrooms"
                    placeholder="0"
                    value={formData.bathrooms}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3.5 py-2.5 hover:border-blue-300 bg-slate-50/50 text-slate-800 text-sm border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                  Area (sq.ft)
                </label>
                <div className="relative">
                  <Square className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="number"
                    name="area"
                    placeholder="000"
                    value={formData.area}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3.5 py-2.5 hover:border-blue-300 bg-slate-50/50 text-slate-800 text-sm border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                Description
              </label>
              <textarea
                name="description"
                rows="4"
                placeholder="Write property highlights and features..."
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 hover:border-blue-300 bg-slate-50/50 text-slate-800 text-sm border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Section 3: Media Upload */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-base font-semibold text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
            <Upload className="w-4 h-4 text-blue-600" /> Property Images
          </h2>

          <div className="relative border-2 border-dashed border-slate-200 hover:border-blue-400 bg-slate-50/50 hover:bg-blue-50/30 rounded-xl p-8 transition-all text-center cursor-pointer">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="absolute hover: border-blue-300 inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="p-3 bg-white rounded-full border border-slate-200 shadow-xs text-blue-600">
                <Upload className="w-6 h-6" />
              </div>
              <div className="text-sm font-medium text-slate-700">
                <span className="text-blue-600 hover:underline">Click to upload</span> or drag and drop
              </div>
              <p className="text-xs text-slate-400">PNG, JPG, WEBP up to 10MB each</p>
              {images.length > 0 && (
                <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {images.length} file(s) selected
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button Bar */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Link
            to="/admin/properties"
            className="px-5 py-2.5 text-slate-600 hover:text-slate-800 text-sm font-medium bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow-xs hover:shadow-md transition-all active:scale-95"
          >
            Save Property
          </button>
        </div>

      </form>
    </div>
  );
};

export default CreateProperty;