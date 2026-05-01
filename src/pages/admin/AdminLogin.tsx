import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, Mail } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAdminStore } from '../../store/adminStore';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '', role: 'superadmin' });
  const setRole = useAdminStore((state) => state.setRole);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email.toLowerCase() === 'shorifulyt8@gmail.com' && formData.password === '1') {
      setRole(formData.role);
      toast.success('Admin login successful!');
      if (formData.role === 'chat_agent') {
         navigate('/admin/chat');
      } else {
         navigate('/admin');
      }
    } else {
      toast.error('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#F37A20]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-[#F37A20]" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Portal</h1>
          <p className="text-sm text-gray-500">
            Sign in to manage your store
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Role</label>
            <div className="relative">
              <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select 
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#F37A20] focus:ring-1 focus:ring-[#F37A20]">
                <option value="superadmin">Super Admin</option>
                <option value="manager">Shop Manager</option>
                <option value="delivery">Delivery Agent</option>
                <option value="chat_agent">Live Chat Agent</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Admin Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="admin@store.com"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#F37A20] focus:ring-1 focus:ring-[#F37A20]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#F37A20] focus:ring-1 focus:ring-[#F37A20]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-2.5 rounded-lg font-bold text-sm hover:bg-black transition-colors flex items-center justify-center gap-2"
          >
            Access Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
