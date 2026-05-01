import React, { useState, useEffect } from 'react';
import { Plus, Search, Shield, User, X } from 'lucide-react';
import toast from 'react-hot-toast';

const DEFAULT_STAFF = [
  { id: 'STF-001', name: 'Super Admin', email: 'admin@ghorerbazar.com', role: 'Super Admin', status: 'Active' },
  { id: 'STF-002', name: 'Raju Hasan', email: 'raju@ghorerbazar.com', role: 'Shop Manager', status: 'Active' },
  { id: 'STF-003', name: 'Arif', email: 'arif@ghorerbazar.com', role: 'Delivery Agent', status: 'Active' },
];

export default function Staff() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [staffList, setStaffList] = useState(() => {
    const saved = localStorage.getItem('staff_list');
    if (saved) {
      return JSON.parse(saved);
    }
    return DEFAULT_STAFF;
  });

  useEffect(() => {
    localStorage.setItem('staff_list', JSON.stringify(staffList));
  }, [staffList]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Live Chat Agent'
  });

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
       toast.error('Please fill in all required fields');
       return;
    }
    const newStaff = {
      id: `STF-00${staffList.length + 1}`,
      name: formData.name,
      email: formData.email,
      role: formData.role,
      status: 'Active',
      password: formData.password
    };
    setStaffList([...staffList, newStaff]);
    toast.success(`${formData.role} added successfully`);
    setIsAddModalOpen(false);
    setFormData({ name: '', email: '', password: '', role: 'Live Chat Agent' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Staff & Agents</h1>
          <p className="text-sm text-gray-500 mt-1">Manage admin access, managers, and live chat agents.</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-[#F37A20] px-4 py-2 text-sm font-medium text-white shadow hover:bg-[#d96a18] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F37A20]"
        >
          <Plus className="h-4 w-4" />
          Add Staff
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
         <div className="relative w-full sm:w-96">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search staff members..."
              className="w-full bg-gray-50 border border-gray-200 rounded-md pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-[#F37A20] focus:ring-1 focus:ring-[#F37A20] transition-colors"
            />
         </div>
      </div>

      {/* Staff Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-semibold">User</th>
                <th className="px-6 py-4 font-semibold">Role</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {staffList.map((staff) => (
                <tr key={staff.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                     <div className="flex flex-col">
                        <div className="font-medium text-gray-900">{staff.name}</div>
                        <div className="text-gray-500">{staff.email}</div>
                     </div>
                  </td>
                  <td className="px-6 py-4">
                     <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium 
                        ${staff.role === 'Super Admin' ? 'bg-purple-100 text-purple-700' :
                        staff.role === 'Shop Manager' ? 'bg-blue-100 text-blue-700' : 
                        staff.role === 'Live Chat Agent' ? 'bg-orange-100 text-orange-700' :
                        'bg-gray-100 text-gray-700'}`}
                     >
                        <Shield className="w-3 h-3" />
                        {staff.role}
                     </span>
                  </td>
                  <td className="px-6 py-4">
                     <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
                        {staff.status}
                     </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                     <button className="text-[#F37A20] hover:underline font-medium text-sm">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Staff Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/50" onClick={() => setIsAddModalOpen(false)}></div>
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Add New Staff Member</h2>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-900">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              <form id="addStaffForm" onSubmit={handleAddStaff} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">Name</label>
                  <input required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#F37A20] focus:ring-1 focus:ring-[#F37A20]" placeholder="e.g. John Doe" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">Email Address (ID)</label>
                  <input required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} type="email" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#F37A20] focus:ring-1 focus:ring-[#F37A20]" placeholder="agent@store.com" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">Password</label>
                  <input required value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} type="password" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#F37A20] focus:ring-1 focus:ring-[#F37A20]" placeholder="Enter strong password" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">Role</label>
                  <select value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#F37A20] focus:ring-1 focus:ring-[#F37A20]">
                    <option value="Live Chat Agent">Live Chat Agent</option>
                    <option value="Shop Manager">Shop Manager</option>
                    <option value="Delivery Agent">Delivery Agent</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="p-6 border-t border-gray-100 flex items-center justify-end gap-3 bg-gray-50">
               <button onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">Cancel</button>
               <button type="submit" form="addStaffForm" className="px-4 py-2 text-sm font-medium text-white bg-[#F37A20] rounded-lg hover:bg-[#d96a18]">Add Staff</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
