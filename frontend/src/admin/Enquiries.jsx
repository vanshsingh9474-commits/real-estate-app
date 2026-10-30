import React, { useState } from 'react';
import { useEffect } from 'react';

const AdminEnquiries = () => {
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [enquiries, setEnquiries] = useState([]);

  useEffect(() => {
    const fetchEnquiries = async () => {
        try {
            // Clerk session ready hone ka thoda wait aur token fetch
            let token = null;
            if (window.Clerk?.session) {
                token = await window.Clerk.session.getToken();
            }

            const response = await fetch('http://localhost:5000/api/enquiries', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token ? `Bearer ${token}` : ''
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setEnquiries(Array.isArray(data) ? data : (data.enquiries || []));
        } catch (error) {
            console.error('Error fetching enquiries:', error);
        }
    };

    // Fast initial load + session setup ke baad retry
    fetchEnquiries();
}, []);

  const handleDelete = async (id) => {
    if (window.confirm('Kya aap is enquiry ko delete karna chahte hain?')) {
        try {
            const token = await window.Clerk?.session?.getToken();
            const response = await fetch(`http://localhost:5000/api/enquiries/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                setEnquiries(enquiries.filter(item => (item.id || item._id) !== id));
                if (selectedEnquiry?.id === id || selectedEnquiry?._id === id) setSelectedEnquiry(null);
                alert('Enquiry deleted successfully!');
            }
        } catch (error) {
            console.error('Error deleting enquiry:', error);
        }
    }
};
 const handleStatusChange = async (id, newStatus) => {
    try {
        const token = await window.Clerk?.session?.getToken();
        const response = await fetch(`http://localhost:5000/api/enquiries/${id}`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify({ status: newStatus })
        });
        if (response.ok) {
            setEnquiries(enquiries.map(item => (item.id || item._id) === id ? { ...item, status: newStatus } : item));
        }
    } catch (error) {
        console.error('Error updating status:', error);
    }
};

  return (
    <div style={{ padding: '32px', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      
      {/* Header Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', margin: 0 }}><span className='font-serif text-blue-500 text-4xl'>E</span>nquiry Management</h1>
          <p style={{ fontSize: '14px', color: '#64748b', marginTop: '4px' }}>
            Monitor and handle leads submitted by property buyers
          </p>
        </div>
        <div style={{ backgroundColor: '#e2e8f0', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '600', color: '#334155' }}>
          Total Leads: {enquiries.length}
        </div>
      </div>

      {/* Modern Table Container */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#f1f5f9', borderBottom: '1px solid #e2e8f0', color: '#475569', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <th style={{ padding: '16px 20px' }}>User Details</th>
              <th style={{ padding: '16px 20px' }}>Property</th>
              <th style={{ padding: '16px 20px' }}>Message</th>
              <th style={{ padding: '16px 20px' }}>Date</th>
              <th style={{ padding: '16px 20px' }}>Status</th>
              <th style={{ padding: '16px 20px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody style={{ fontSize: '14px', color: '#1e293b' }}>
            {enquiries.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                  No enquiries found.
                </td>
              </tr>
            ) : (
              enquiries.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background-color 0.2s' }}>
                  
                  {/* User Column */}
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ fontWeight: '600', color: '#0f172a' }}>{item.name}</div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>{item.email}</div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>{item.phone}</div>
                  </td>

                  {/* Property Column */}
                  <td style={{ padding: '16px 20px', maxWidth: '200px' }}>
                    <span style={{ fontWeight: '500', color: '#334155', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {item.propertyTitle}
                    </span>
                  </td>

                  {/* Message Preview */}
                  <td style={{ padding: '16px 20px', maxWidth: '240px' }}>
                    <p style={{ margin: 0, fontSize: '13px', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.message}
                    </p>
                    <button
                      onClick={() => setSelectedEnquiry(item)}
                      style={{ border: 'none', background: 'none', color: '#2563eb', padding: 0, fontSize: '12px', fontWeight: '500', cursor: 'pointer', marginTop: '4px' }}
                    >
                      Read full message →
                    </button>
                  </td>

                  {/* Date */}
                  <td style={{ padding: '16px 20px', fontSize: '13px', color: '#64748b' }}>
                    {item.date}
                  </td>

                  {/* Status Dropdown */}
                  <td style={{ padding: '16px 20px' }}>
                    <select
                      value={item.status}
                      onChange={(e) => handleStatusChange(item.id, e.target.value)}
                      style={{
                        padding: '6px 10px',
                        borderRadius: '20px',
                        border: 'none',
                        fontSize: '12px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        outline: 'none',
                        backgroundColor: 
                          item.status === 'Contacted' ? '#dcfce7' : 
                          item.status === 'Resolved' ? '#e0f2fe' : '#fef3c7',
                        color: 
                          item.status === 'Contacted' ? '#166534' : 
                          item.status === 'Resolved' ? '#075985' : '#92400e',
                      }}
                    >
                      <option value="Pending">● Pending</option>
                      <option value="Contacted">● Contacted</option>
                      <option value="Resolved">● Resolved</option>
                    </select>
                  </td>

                  {/* Actions */}
                  <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                    <button
                      onClick={() => handleDelete(item.id)}
                      style={{
                        backgroundColor: '#fff1f2',
                        color: '#e11d48',
                        border: '1px solid #fecdd3',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: '500',
                        transition: 'all 0.2s',
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modern Modal / Details Popup */}
      {selectedEnquiry && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', maxWidth: '480px', width: '90%', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', color: '#0f172a' }}>Enquiry Details</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
              <div>
                <span style={{ color: '#64748b', fontSize: '12px' }}>Client Name</span>
                <div style={{ fontWeight: '600', color: '#1e293b' }}>{selectedEnquiry.name}</div>
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div>
                  <span style={{ color: '#64748b', fontSize: '12px' }}>Email</span>
                  <div style={{ color: '#1e293b' }}>{selectedEnquiry.email}</div>
                </div>
                <div>
                  <span style={{ color: '#64748b', fontSize: '12px' }}>Phone</span>
                  <div style={{ color: '#1e293b' }}>{selectedEnquiry.phone}</div>
                </div>
              </div>
              <div>
                <span style={{ color: '#64748b', fontSize: '12px' }}>Property Title</span>
                <div style={{ fontWeight: '500', color: '#1e293b' }}>{selectedEnquiry.propertyTitle}</div>
              </div>
              <div>
                <span style={{ color: '#64748b', fontSize: '12px' }}>Message</span>
                <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', padding: '12px', borderRadius: '8px', color: '#334155', marginTop: '4px', lineHeight: '1.5' }}>
                  {selectedEnquiry.message}
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedEnquiry(null)}
              style={{ marginTop: '20px', width: '100%', backgroundColor: '#0f172a', color: '#ffffff', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: '500', cursor: 'pointer' }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEnquiries;