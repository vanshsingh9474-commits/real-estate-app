import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { 
  Building2, 
  Users, 
  MessageSquare, 
  ExternalLink 
} from 'lucide-react';

const Dashboard = () => {
  const { getToken } = useAuth();
  const [counts, setCounts] = useState({
    properties: 0,
    users: 0,
    enquiries: 0
  });
  const [recentProperties, setRecentProperties] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = await getToken();
        const response = await fetch('http://localhost:5000/api/properties/stats/overview', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        
        if (data.success) {
          setCounts({
            properties: data.totalProperties,
            users: data.totalUsers,
            enquiries: data.totalEnquiries
          });
          setRecentProperties(data.recentProperties);
        }
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };

    fetchDashboardData();
  }, [getToken]);

  const stats = [
    { title: 'Total Properties', count: counts.properties, icon: Building2, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Total Users', count: counts.users, icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'Total Enquiries', count: counts.enquiries, icon: MessageSquare, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard Overview</h1>
          <p className="text-sm text-slate-500">Welcome back! Here is what's happening with your properties today.</p>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                  <p className="text-3xl font-bold text-slate-800 mt-2">{stat.count}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Properties Section */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-800">Recent Properties</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                <th className="py-3 px-6">Property</th>
                <th className="py-3 px-6">Price</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
              {recentProperties.length > 0 ? (
                recentProperties.map((property) => (
                  <tr key={property.id}>
                    <td className="py-3 px-6 font-medium text-slate-800">{property.title}</td>
                    <td className="py-3 px-6">₹{property.price}</td>
                    <td className="py-3 px-6"><span className="px-2 py-1 bg-green-50 text-green-600 rounded text-xs">{property.type || 'Active'}</span></td>
                    <td className="py-3 px-6 text-right">
                      <span className="text-blue-600 cursor-pointer hover:underline">View</span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-8 text-center text-slate-400">
                    No recent properties found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;