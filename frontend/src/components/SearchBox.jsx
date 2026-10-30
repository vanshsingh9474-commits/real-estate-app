import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
  const navigate = useNavigate();  
  const [purpose, setPurpose] = useState('Sale');
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    
    const params = new URLSearchParams();
    if (purpose) params.append('purpose', purpose);
    if (location.trim()) params.append('location', location.trim());
    if (propertyType) params.append('type', propertyType);
    if (minPrice) params.append('minPrice', minPrice);
    if (maxPrice) params.append('maxPrice', maxPrice);

    // Filtered URL par navigate karega
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Modern Floating Buy / Rent Tabs */}
      <div className="inline-flex p-1.5 bg-white/20 backdrop-blur-md border border-white/30 rounded-t-2xl gap-2">
        <button
          type="button"
          onClick={() => setPurpose('Sale')}
          className={`px-6 py-2 rounded-xl font-semibold text-sm transition-all duration-300 ${
            purpose === 'Sale'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/40 scale-105'
              : 'text-gray-100 bg-gray-400 hover:bg-gray-500/80'
          }`}
        >
          Buy
        </button>
        <button
          type="button"
          onClick={() => setPurpose('Rent')}
          className={`px-6 py-2 rounded-xl font-semibold text-sm transition-all duration-300 ${
            purpose === 'Rent'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/40 scale-105'
              : 'text-gray-100 bg-gray-400 hover:bg-gray-500/80'
          }`}
        >
          Rent
        </button>
      </div>

      {/* Main Glassmorphism Card */}
      <div className="bg-white/95 backdrop-blur-xl p-6 rounded-b-3xl rounded-t-3xl shadow-2xl border border-white/40 text-gray-800">
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 items-center">
          
          {/* Location Field (4 Cols) */}
          <div className="lg:col-span-4 relative group">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
              Location
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-gray-400 group-focus-within:text-blue-600 transition">
                
              </span>
              <input
                type="text"
                placeholder="City or Locality (e.g. Dwarka)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full pl-9 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-sm font-medium hover:border-blue-300"
              />
            </div>
          </div>

          {/* Property Type Field (3 Cols) */}
          <div className="lg:col-span-3 relative group">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
              Property Type
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-gray-400 group-focus-within:text-blue-600 transition">
                
              </span>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full pl-9 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-sm font-medium cursor-pointer appearance-none hover:border-blue-300"
              >
                <option value="">All Property Types</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Plot">Independent House</option>
                <option value="Commercial">Plot</option>
                <option value="Commercial">Commercial</option>
                <option value="Commercial">Office</option>
                <option value="Commercial">Shop</option>
                <option value="Commercial">Farmhouse</option>
              </select>
            </div>
          </div>

          {/* Budget Range Field (3 Cols) */}
          <div className="lg:col-span-3 relative group">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
              Budget Range
            </label>
            <div className="grid grid-cols-2 gap-2">
              <select
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className=" hover:border-blue-300 w-full px-2 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-xs font-medium cursor-pointer"
              >
                <option value="">Min Price</option>
                <option value="500000">₹5 Lakh</option>
                <option value="1000000">₹10 Lakh</option>
                <option value="2000000">₹20 Lakh</option>
                <option value="5000000">₹50 Lakh</option>
                <option value="10000000">₹1 Crore</option>
              </select>

              <select
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full px-2 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-xs font-medium cursor-pointer hover:border-blue-300"
              >
                <option value="">Max Price</option>
                <option value="5000000">₹50 Lakh</option>
                <option value="10000000">₹1 Crore</option>
                <option value="20000000">₹2 Crore</option>
                <option value="50000000">₹5 Crore</option>
                <option value="100000000">₹10 Crore</option>
              </select>
            </div>
          </div>

          {/* Search Button (2 Cols) */}
          <div className="lg:col-span-2 flex items-end h-full pt-2 lg:pt-0">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-blue-600/30 transition-all duration-200 flex items-center justify-center gap-2"
            >
               <span>Search</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default SearchBox;