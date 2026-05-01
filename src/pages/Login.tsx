import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, Chrome } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email && formData.password) {
      toast.success(`Successfully ${isLogin ? 'logged in' : 'signed up'}!`);
      // Mock log in as user
      navigate('/dashboard');
    }
  };

  const handleGoogleAuth = () => {
    toast.success('Logged in with Google!');
    navigate('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto w-full px-4 py-20">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{isLogin ? 'Welcome Back' : 'Create an Account'}</h1>
          <p className="text-sm text-gray-500">
            {isLogin ? 'Enter your details to access your account' : 'Sign up to start shopping'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@example.com"
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

          {isLogin && (
            <div className="flex justify-end">
              <a href="#" className="text-sm text-[#F37A20] font-medium hover:underline">Forgot password?</a>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#F37A20] text-white py-2.5 rounded-lg font-bold text-sm hover:bg-[#d96a18] transition-colors flex items-center justify-center gap-2"
          >
            {isLogin ? (
              <>Sign In <LogIn className="w-4 h-4" /></>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <button
            onClick={handleGoogleAuth}
            className="mt-6 w-full bg-white border border-gray-200 text-gray-700 py-2.5 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            <Chrome className="w-5 h-5 text-blue-500" />
            Google
          </button>
        </div>

        <p className="mt-8 text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-[#F37A20] font-medium hover:underline"
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  );
}
