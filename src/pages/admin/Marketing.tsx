import React from 'react';
import { Tag, Search, Plus } from 'lucide-react';

export default function Marketing() {
  const coupons = [
    { code: 'WINTER20', discount: '20%', usage: 145, status: 'Active' },
    { code: 'B2G1FREE', discount: 'B2G1', usage: 89, status: 'Active' },
    { code: 'MIN2000', discount: '৳ 500 off', usage: 231, status: 'Expired' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Marketing & Campaigns</h1>
        <button className="bg-gray-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-black transition-colors flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Create Campaign
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900 flex items-center gap-2">
            <Tag className="w-5 h-5 text-[#F37A20]" />
            Active Coupons & Discounts
          </h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search coupons..." className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#F37A20]" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 font-medium text-gray-500">Code</th>
                <th className="p-4 font-medium text-gray-500">Discount</th>
                <th className="p-4 font-medium text-gray-500">Usage Count</th>
                <th className="p-4 font-medium text-gray-500 text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((coupon, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <span className="font-mono font-bold text-gray-900 bg-gray-100 px-2 py-1 rounded">{coupon.code}</span>
                  </td>
                  <td className="p-4 text-gray-600 font-medium">{coupon.discount}</td>
                  <td className="p-4 text-gray-600">{coupon.usage}</td>
                  <td className="p-4 text-right">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      coupon.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {coupon.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
