import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, Mail, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAdminStore } from '../../store/adminStore';
import { supabase } from '../../lib/supabase';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '', role: 'superadmin' });
  const [loading, setLoading] = useState(false);
  const setRole = useAdminStore((state) => state.setRole);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const inputEmail = formData.email.trim().toLowerCase();
    
    // Fallback static login if Supabase fails or is not connected
    const staticLogin = () => {
      let isLocalStaff = false;
      let matchedRole = formData.role;

      try {
        const savedStaffList = localStorage.getItem('staff_list');
        if (savedStaffList) {
          const localStaff = JSON.parse(savedStaffList);
          const match = localStaff.find(
            (s: any) => s.email.toLowerCase() === inputEmail && s.password === formData.password
          );
          if (match) {
            isLocalStaff = true;
            matchedRole = match.role === 'Live Chat Agent' ? 'chat_agent' : 
                          match.role === 'Delivery Agent' ? 'delivery' : 
                          match.role === 'Shop Manager' ? 'manager' : 'superadmin';
          }
        }
      } catch (e) {
        console.error('Failed to parse local staff', e);
      }

      if ((inputEmail === 'shorifulyt8@gmail.com' && formData.password === '1') || isLocalStaff) {
        const finalRole = isLocalStaff ? matchedRole : formData.role;
        setRole(finalRole);
        toast.success(`Admin login successful!`);
        if (finalRole === 'chat_agent') {
           navigate('/admin/chat');
        } else {
           navigate('/admin');
        }
      } else {
        toast.error('Invalid email or password');
      }
    };

    setLoading(true);
    try {
      // Trying Supabase authentication
      const { data, error } = await supabase.auth.signInWithPassword({
        email: inputEmail,
        password: formData.password
      });

      if (error) {
        // Fallback to static login if Supabase auth fails (might not be set up)
        console.warn('Supabase auth failed, falling back to static auth...', error.message);
        staticLogin();
        return;
      }

      if (data.user) {
        // Fetch role from profiles table
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single();
          
        const userRole = profile?.role || formData.role;
        setRole(userRole);
        toast.success('Admin login successful!');
        
        if (userRole === 'chat_agent') {
           navigate('/admin/chat');
        } else {
           navigate('/admin');
        }
      }
    } catch (err) {
      console.error(err);
      staticLogin();
    } finally {
      setLoading(false);
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
            <p className="text-xs text-gray-500 mt-1">If using Supabase, role is auto-assigned.</p>
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
            disabled={loading}
            className="w-full bg-gray-900 text-white py-2.5 rounded-lg font-bold text-sm hover:bg-black transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Access Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
}
