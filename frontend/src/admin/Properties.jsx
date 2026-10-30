import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Building2, 
  MapPin, 
  Eye 
} from 'lucide-react';



const Properties = () => {
  // Demo state - ise apne API response data se replace karein
  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProperty, setSelectedProperty] = useState(null);

  // Backend se properties fetch karne ke liye
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/properties');
        const data = await response.json();
        // Agar backend array bhej raha hai ya object, us hisab se set karein:
        setProperties(Array.isArray(data) ? data : data.properties || []);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, []);

  const handleView = (property) => {
    setSelectedProperty(property);
  };

   const handleDelete = async (id) => {
    if (window.confirm('Kya aap sach mein is property ko delete karna chahte hain?')) {
        try {
            // Clerk se session token lene ke liye
            const token = await window.Clerk?.session?.getToken();

            const response = await fetch(`http://localhost:5000/api/properties/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Yeh token backend ke Clerk middleware ko bhejega
                },
            });

            if (response.ok) {
                setProperties(properties.filter(item => (item.id || item._id) !== id));
                alert('Property successfully deleted!');
            } else {
                const errData = await response.json();
                alert('Failed to delete property: ' + (errData.message || 'Unknown error'));
            }
        } catch (error) {
            console.error('Error deleting property:', error);
            alert('Something went wrong!');
        }
    }
};
  // Status Badge color helper function
  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'available':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'sold':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'rented':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Primary Action Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800"><span className='text-blue-600 text-4xl font-serif'>M</span>anage Properties</h1>
          <p className="text-sm text-slate-500">View, search, edit, or delete all property listings.</p>
        </div>
        <Link
          to="/admin/properties/create"
          className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2.5 rounded-lg shadow-sm transition-all duration-200 active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Add New Property
        </Link>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        
        {/* Search & Filter Toolbar */}
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search property title or city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 hover:border-blue-300 bg-white text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
          <p className="text-xs font-medium text-slate-500 self-end sm:self-center">
            Total Properties: <span className="text-slate-800 font-semibold">{properties.length}</span>
          </p>
        </div>

        {/* Properties Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase tracking-wider border-b border-slate-100">
                <th className="py-3.5 px-6">Property Title</th>
                <th className="py-3.5 px-6">Price</th>
                <th className="py-3.5 px-6">Location / City</th>
                <th className="py-3.5 px-6">Purpose</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
              {properties.length > 0 ? (
                properties.map((item) => (
                  <tr key={item.id || item._id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Title */}
                    <td className="py-4 px-6 font-medium text-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
                          <Building2 className="w-4 h-4" />
                        </div>
                        <span className="line-clamp-1">{item.title}</span>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="py-4 px-6 font-semibold text-slate-800">
                      ₹{Number(item.price).toLocaleString('en-IN')}
                    </td>

                    {/* City */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{item.city}</span>
                      </div>
                    </td>

                    {/* Purpose */}
                    <td className="py-4 px-6">
                      <span className="capitalize px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-medium">
                        For {item.purpose}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-6">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadge(item.status)}`}>
                        {item.status || 'Available'}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right space-x-2">
                      <button
                        onClick={() => handleView(item)}
                        title="View Details"
                        className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <Link
                        to={`/admin/properties/edit/${item.id || item._id}`}
                        title="Edit Property"
                        className="inline-block p-1.5 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id || item._id)}
                        title="Delete Property"
                        className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                /* Empty State UI */
                <tr>
                  <td colSpan="6" className="py-16 text-center">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="p-4 bg-slate-100 rounded-full text-slate-400">
                        <Building2 className="w-8 h-8" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-base font-semibold text-slate-700">No Properties Found</p>
                        <p className="text-xs text-slate-400">Click the button above to add new properties</p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {selectedProperty && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
                    <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '12px', width: '500px', maxWidth: '90%', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
                        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', color: '#1e293b' }}>{selectedProperty.title}</h2>
                        <p style={{ marginBottom: '8px', color: '#475569' }}><strong>Price:</strong> ₹ {Number(selectedProperty.price).toLocaleString('en-IN')}</p>
                        <p style={{ marginBottom: '8px', color: '#475569' }}><strong>City / Location:</strong> {selectedProperty.city}, {selectedProperty.location || selectedProperty.locality}</p>
                        <p style={{ marginBottom: '8px', color: '#475569' }}><strong>Type:</strong> {selectedProperty.type} | <strong>Purpose:</strong> {selectedProperty.purpose}</p>
                        <p style={{ marginBottom: '16px', color: '#475569' }}><strong>Description:</strong> {selectedProperty.description}</p>
                        
                        <button 
                            onClick={() => setSelectedProperty(null)}
                            style={{ backgroundColor: '#2563eb', color: '#fff', padding: '8px 16px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
    </div>
  );
};

export default Properties;