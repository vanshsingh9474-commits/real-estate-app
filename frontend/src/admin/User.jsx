import React, { useState, useEffect } from 'react';
import api from '../services/api'; // ya axios/fetch

const Users = () => {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    // Backend se real users fetch karne ke liye
    const fetchUsers = async () => {
        try {
            const token = await window.Clerk?.session?.getToken();
            const response = await fetch('http://localhost:5000/api/users', {
                headers: {
                    'Authorization': token ? `Bearer ${token}` : ''
                }
            });
            const data = await response.json();
            setUsers(Array.isArray(data) ? data : (data.users || []));
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);
 // Delete User
    const handleDelete = async (id) => {
        if (window.confirm('Kya aap is user account ko remove karna chahte hain?')) {
            try {
                const token = await window.Clerk?.session?.getToken();
                const response = await fetch(`http://localhost:5000/api/users/${id}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': token ? `Bearer ${token}` : '' }
                });

                if (response.ok) {
                    setUsers(users.filter(user => (user.id || user._id) !== id));
                    alert('User deleted successfully!');
                }
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

    // Toggle Role (Admin / User)
    const handleRoleChange = async (id, newRole) => {
        try {
            const token = await window.Clerk?.session?.getToken();
            await fetch(`http://localhost:5000/api/users/${id}`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': token ? `Bearer ${token}` : '' 
                },
                body: JSON.stringify({ role: newRole })
            });

            setUsers(users.map(user => (user.id || user._id) === id ? { ...user, role: newRole } : user));
        } catch (error) {
            console.error('Error updating role:', error);
        }
    };

    // Toggle Status (Active / Blocked)
    const handleStatusChange = async (id, newStatus) => {
        try {
            const token = await window.Clerk?.session?.getToken();
            await fetch(`http://localhost:5000/api/users/${id}`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': token ? `Bearer ${token}` : '' 
                },
                body: JSON.stringify({ status: newStatus })
            });

            setUsers(users.map(user => (user.id || user._id) === id ? { ...user, status: newStatus } : user));
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };
  // Search Filter (Safe from undefined errors)
const filteredUsers = users.filter((u) => {
  const name = u?.name || '';
  const email = u?.email || '';
  const phone = u?.phone || '';
  const query = searchQuery || '';

  return (
    name.toLowerCase().includes(query.toLowerCase()) ||
    email.toLowerCase().includes(query.toLowerCase()) ||
    phone.toLowerCase().includes(query.toLowerCase())
  );
});

  return (
    <div style={{ padding: '32px', backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', margin: 0 }}>Users</h1>
          <p style={{ fontSize: '14px', color: '#64748b', marginTop: '4px' }}>
            Manage registered platform users, permissions, and status
          </p>
        </div>
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', color: '#334155', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
          Total Registered: {users.length}
        </div>
      </div>

      {/* Search Filter Input */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search by name, email, or phone number..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            maxWidth: '400px',
            padding: '10px 16px',
            borderRadius: '8px',
            border: '1px solid #cbd5e1',
            fontSize: '14px',
            outline: 'none',
            backgroundColor: '#ffffff',
          }}
        />
      </div>

      {/* Modern Users Table */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#f1f5f9', borderBottom: '1px solid #e2e8f0', color: '#475569', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <th style={{ padding: '16px 20px' }}>User Name</th>
              <th style={{ padding: '16px 20px' }}>Contact Info</th>
              <th style={{ padding: '16px 20px' }}>Role</th>
              <th style={{ padding: '16px 20px' }}>Status</th>
              <th style={{ padding: '16px 20px' }}>Registered On</th>
              <th style={{ padding: '16px 20px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody style={{ fontSize: '14px', color: '#1e293b' }}>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                  No users found.
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  
                  {/* Name + Profile Badge */}
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        backgroundColor: '#e0e7ff',
                        color: '#4338ca',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: '700',
                        fontSize: '14px'
                      }}>
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div style={{ fontWeight: '600', color: '#0f172a' }}>{user.name}</div>
                      </div>
                    </div>
                  </td>

                  {/* Contact Details */}
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ color: '#334155' }}>{user.email}</div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>{user.phone}</div>
                  </td>

                  {/* Role Dropdown */}
                  <td style={{ padding: '16px 20px' }}>
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user._id, e.target.value)}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        fontSize: '12px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        backgroundColor: user.role === 'Admin' ? '#f3e8ff' : '#f1f5f9',
                        color: user.role === 'Admin' ? '#6b21a8' : '#334155',
                      }}
                    >
                      <option value="User">User</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </td>

                  {/* Status Pills */}
                  <td style={{ padding: '16px 20px' }}>
                    <select
                      value={user.status}
                      onChange={(e) => handleStatusChange(user._id, e.target.value)}
                      style={{
                        padding: '6px 10px',
                        borderRadius: '20px',
                        border: 'none',
                        fontSize: '12px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        backgroundColor: user.status === 'Active' ? '#dcfce7' : '#fee2e2',
                        color: user.status === 'Active' ? '#166534' : '#991b1b',
                      }}
                    >
                      <option value="Active">● Active</option>
                      <option value="Blocked">● Blocked</option>
                    </select>
                  </td>

                  {/* Date */}
                  <td style={{ padding: '16px 20px', fontSize: '13px', color: '#64748b' }}>
                    {user.createdAt}
                  </td>

                  {/* Delete Action */}
                  <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                    <button
                      onClick={() => handleDelete(user._id)}
                      style={{
                        backgroundColor: '#fff1f2',
                        color: '#e11d48',
                        border: '1px solid #fecdd3',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: '500',
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
    </div>
  );
};

export default Users;