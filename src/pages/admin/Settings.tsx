import React from 'react';
import { Save } from 'lucide-react';

export default function Settings() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage global store settings and configurations.</p>
      </div>

      {/* General Settings */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">General Setup</h2>
          <p className="text-sm text-gray-500">Configure your store's basic information.</p>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Store Name</label>
              <input type="text" defaultValue="GHORER BAZAR" className="mt-1 w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:border-[#F37A20] focus:ring-1 focus:ring-[#F37A20]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Contact Email</label>
              <input type="email" defaultValue="admin@ghorerbazar.com" className="mt-1 w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:border-[#F37A20] focus:ring-1 focus:ring-[#F37A20]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input type="text" defaultValue="+880 1234 567890" className="mt-1 w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:border-[#F37A20] focus:ring-1 focus:ring-[#F37A20]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Currency</label>
              <select className="mt-1 w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:border-[#F37A20] focus:ring-1 focus:ring-[#F37A20]">
                <option>BDT (৳)</option>
                <option>USD ($)</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Store Address</label>
            <textarea rows={3} defaultValue="12/A, Dhanmondi, Dhaka, Bangladesh" className="mt-1 w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:border-[#F37A20] focus:ring-1 focus:ring-[#F37A20]"></textarea>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
          <p className="text-sm text-gray-500">Manage order alerts and customer communications.</p>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">New Order Alerts</h3>
              <p className="text-sm text-gray-500">Receive an email when a new order is placed.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#F37A20]"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Low Stock Warnings</h3>
              <p className="text-sm text-gray-500">Get notified when a product inventory drops below 10.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#F37A20]"></div>
            </label>
          </div>
        </div>
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
          <button className="inline-flex items-center gap-2 rounded-md bg-[#0B2A22] px-5 py-2.5 text-sm font-medium text-white shadow hover:bg-[#113a2f] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
