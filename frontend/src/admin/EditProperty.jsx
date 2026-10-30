import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditProperty = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        type: 'Apartment',
        purpose: 'Sale',
        city: '',
        location: '',
        bedrooms: '',
        bathrooms: '',
        areaSqFt: '',
        featured: false,
        status: 'Available'
    });

    const [loading, setLoading] = useState(true);
    const [successMsg, setSuccessMsg] = useState('');

    // ✅ Real property data backend se fetch karne ke liye
    useEffect(() => {
        const fetchPropertyDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/properties/${id}`);
                const data = await response.json();
                
                if (response.ok) {
                    setFormData({
                        title: data.title || '',
                        description: data.description || '',
                        price: data.price || '',
                        type: data.type || 'Apartment',
                        purpose: data.purpose || 'Sale',
                        city: data.city || '',
                        location: data.location || data.locality || '',
                        bedrooms: data.bedrooms || '',
                        bathrooms: data.bathrooms || '',
                        areaSqFt: data.areaSqFt || '',
                        featured: data.featured || false,
                        status: data.status || 'Available'
                    });
                } else {
                    alert('Property details fetch karne mein error aaya!');
                }
            } catch (error) {
                console.error('Error fetching property:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchPropertyDetails();
        }
    }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // Clerk se token lene ke liye taaki backend unauthorized na bataye
        const token = await window.Clerk?.session?.getToken();

        const response = await fetch(`http://localhost:5000/api/properties/${id}`, {
            method: 'PUT', // ya PATCH (jo bhi aapke backend route mein ho)
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            setSuccessMsg('Property updated successfully!');
            setTimeout(() => {
                setSuccessMsg('');
                navigate('/admin/properties'); // Update hone ke baad properties list par bhej dega
            }, 1200);
        } else {
            const errData = await response.json();
            alert('Failed to update property: ' + (errData.message || 'Unknown error'));
        }
    } catch (error) {
        console.error('Update error:', error);
        alert('Something went wrong!');
    }
};

  if (loading) {
    return (
      <div style={{ padding: '40px', color: '#64748b', fontFamily: 'Inter, sans-serif' }}>
        Loading property editor...
      </div>
    );
  }

  return (
    <div style={{ padding: '32px', backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Top Action Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#0f172a', margin: 0 }}>Edit Property</h1>
            <span style={{ backgroundColor: '#eff6ff', color: '#2563eb', padding: '2px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '600', border: '1px solid #bfdbfe' }}>
              ID: {id || formData.id}
            </span>
          </div>
          <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px', margin: 0 }}>
            Update property attributes, pricing, location details, and status.
          </p>
        </div>

        <button
          onClick={() => navigate('/admin/properties')}
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #cbd5e1',
            padding: '8px 16px',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: '600',
            color: '#334155',
            cursor: 'pointer',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
          }}
        >
          ← Cancel & Return
        </button>
      </div>

      {/* Success Notification */}
      {successMsg && (
        <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', color: '#166534', padding: '12px 20px', borderRadius: '8px', marginBottom: '24px', fontSize: '14px', fontWeight: '600' }}>
          ✓ {successMsg}
        </div>
      )}

      {/* Form Container */}
      <form onSubmit={handleSubmit} style={{ maxWidth: '900px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Card 1: Basic Information */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', padding: '24px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a', margin: '0 0 20px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>📝</span> Basic Details
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '18px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                Property Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', color: '#0f172a', outline: 'none', backgroundColor: '#fff' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                Price (INR)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', color: '#0f172a', outline: 'none', fontWeight: '600' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
              Property Description
            </label>
            <textarea
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', color: '#0f172a', outline: 'none', fontFamily: 'inherit', resize: 'vertical' }}
            ></textarea>
          </div>
        </div>

        {/* Card 2: Categorization & Location */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', padding: '24px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a', margin: '0 0 20px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>📍</span> Classification & Location
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>Type</label>
              <select name="type" value={formData.type} onChange={handleChange} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', backgroundColor: '#fff' }}>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Commercial">Commercial</option>
                <option value="Plot">Plot</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>Purpose</label>
              <select name="purpose" value={formData.purpose} onChange={handleChange} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', backgroundColor: '#fff' }}>
                <option value="Sale">For Sale</option>
                <option value="Rent">For Rent</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>City</label>
              <input type="text" name="city" value={formData.city} onChange={handleChange} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>Locality / Area</label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }} />
            </div>
          </div>
        </div>

        {/* Card 3: Specifications & Features */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', padding: '24px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a', margin: '0 0 20px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>📐</span> Specifications & Visibility
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>Bedrooms</label>
              <input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>Bathrooms</label>
              <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>Area (Sq. Ft.)</label>
              <input type="number" name="areaSqFt" value={formData.areaSqFt} onChange={handleChange} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>Listing Status</label>
              <select name="status" value={formData.status} onChange={handleChange} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', backgroundColor: '#fff' }}>
                <option value="Available">Available</option>
                <option value="Sold">Sold</option>
                <option value="Rented">Rented</option>
              </select>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input type="checkbox" id="featured" name="featured" checked={formData.featured} onChange={handleChange} style={{ width: '16px', height: '16px', cursor: 'pointer', accentColor: '#2563eb' }} />
            <label htmlFor="featured" style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b', cursor: 'pointer' }}>
              Feature this property on home page hero slider ⭐
            </label>
          </div>
        </div>

        {/* Submit Actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '8px' }}>
          <button
            type="button"
            onClick={() => navigate('/admin/properties')}
            style={{ backgroundColor: '#ffffff', color: '#475569', border: '1px solid #cbd5e1', padding: '10px 20px', borderRadius: '8px', fontWeight: '600', fontSize: '14px', cursor: 'pointer' }}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{ backgroundColor: '#2563eb', color: '#ffffff', border: 'none', padding: '10px 24px', borderRadius: '8px', fontWeight: '600', fontSize: '14px', cursor: 'pointer', boxShadow: '0 2px 4px rgba(37,99,235,0.2)' }}
          >
            Save Changes
          </button>
        </div>

      </form>
    </div>
  );
};

export default EditProperty;