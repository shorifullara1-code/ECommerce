import React, { useState } from 'react';
import { Plus, Search, Filter, MoreHorizontal, X, Upload } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Products() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const products = [
    { id: 1, name: 'Premium Sundarban Natural Honey', category: 'Honey', price: '৳ 550', stock: 45, status: 'Active', sku: 'HON-001', variants: 3 },
    { id: 2, name: 'Authentic Saudi Medjool Dates 1kg', category: 'Dates', price: '৳ 1,450', stock: 12, status: 'Active', sku: 'DAT-002', variants: 1 },
    { id: 3, name: 'Pure Cow Ghee 1L', category: 'Oil & Ghee', price: '৳ 1,200', stock: 8, status: 'Low Stock', sku: 'GHE-001', variants: 2 },
    { id: 4, name: 'Premium Chinigura Rice (Polao) 5kg', category: 'Rice', price: '৳ 750', stock: 120, status: 'Active', sku: 'RIC-004', variants: 1 },
    { id: 5, name: 'Organic Cold Pressed Mustard Oil', category: 'Oil & Ghee', price: '৳ 320', stock: 0, status: 'Out of Stock', sku: 'OIL-005', variants: 2 },
  ];

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Product added successfully. Images uploading to Supabase Storage.');
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Products</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your store's inventory and product listings.</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-[#F37A20] px-4 py-2 text-sm font-medium text-white shadow hover:bg-[#d96a18] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F37A20]"
        >
          <Plus className="h-4 w-4" />
          Add Product
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
         <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full bg-gray-50 border border-gray-200 rounded-md pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-[#F37A20] focus:ring-1 focus:ring-[#F37A20] transition-colors"
            />
         </div>
         <div className="flex gap-2 w-full sm:w-auto">
            <button className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 flex-1 sm:flex-none justify-center">
               <Filter className="h-4 w-4" />
               Category
            </button>
            <button className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 flex-1 sm:flex-none justify-center">
               <Filter className="h-4 w-4" />
               Status
            </button>
         </div>
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-semibold">Product</th>
                <th className="px-6 py-4 font-semibold">SKU</th>
                <th className="px-6 py-4 font-semibold">Category</th>
                <th className="px-6 py-4 font-semibold">Variants</th>
                <th className="px-6 py-4 font-semibold">Price</th>
                <th className="px-6 py-4 font-semibold">Stock</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                     <div className="flex items-center gap-3">
                        <div className="h-10 w-10 shrink-0 rounded-md bg-gray-100 flex items-center justify-center font-medium text-gray-500 border border-gray-200">
                           {product.name.charAt(0)}
                        </div>
                        <div className="font-medium text-gray-900 line-clamp-1">{product.name}</div>
                     </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs">{product.sku}</td>
                  <td className="px-6 py-4">{product.category}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-semibold">{product.variants}</span>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">{product.price}</td>
                  <td className="px-6 py-4">{product.stock}</td>
                  <td className="px-6 py-4">
                     <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        product.status === 'Active' ? 'bg-green-100 text-green-700' :
                        product.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-700'
                     }`}>
                        {product.status}
                     </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                     <button className="text-gray-400 hover:text-gray-900 p-1 rounded-md hover:bg-gray-100 transition-colors">
                        <MoreHorizontal className="h-5 w-5" />
                     </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/50" onClick={() => setIsAddModalOpen(false)}></div>
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Add New Product</h2>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-900">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              <form id="addProductForm" onSubmit={handleAddProduct} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-1.5 col-span-2">
                     <label className="text-sm font-medium text-gray-700">Product Title</label>
                     <input required type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#F37A20] focus:ring-1 focus:ring-[#F37A20]" placeholder="e.g. Premium Sundarban Honey" />
                   </div>
                   <div className="space-y-1.5 col-span-2 sm:col-span-1">
                     <label className="text-sm font-medium text-gray-700">Price (৳)</label>
                     <input required type="number" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#F37A20] focus:ring-1 focus:ring-[#F37A20]" placeholder="550" />
                   </div>
                   <div className="space-y-1.5 col-span-2 sm:col-span-1">
                     <label className="text-sm font-medium text-gray-700">Initial Stock</label>
                     <input required type="number" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#F37A20] focus:ring-1 focus:ring-[#F37A20]" placeholder="100" />
                   </div>
                   <div className="space-y-1.5 col-span-2 sm:col-span-1">
                     <label className="text-sm font-medium text-gray-700">Category</label>
                     <select className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#F37A20] focus:ring-1 focus:ring-[#F37A20]">
                        <option>Honey</option>
                        <option>Dates</option>
                        <option>Oil & Ghee</option>
                        <option>Rice</option>
                     </select>
                   </div>
                   <div className="space-y-1.5 col-span-2 sm:col-span-1">
                     <label className="text-sm font-medium text-gray-700">SKU</label>
                     <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#F37A20] focus:ring-1 focus:ring-[#F37A20]" placeholder="HON-001" />
                   </div>
                   <div className="space-y-1.5 col-span-2">
                     <label className="text-sm font-medium text-gray-700">Description</label>
                     <textarea rows={3} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#F37A20] focus:ring-1 focus:ring-[#F37A20]" placeholder="Describe your product..."></textarea>
                   </div>
                   <div className="space-y-1.5 col-span-2">
                     <label className="text-sm font-medium text-gray-700">Product Images</label>
                     <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 hover:bg-gray-50 transition-colors flex flex-col items-center justify-center cursor-pointer">
                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                        <p className="text-sm font-medium text-gray-700">Click to upload images</p>
                        <p className="text-xs text-gray-500 mt-1">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                     </div>
                   </div>
                </div>
              </form>
            </div>
            <div className="p-6 border-t border-gray-100 flex items-center justify-end gap-3 bg-gray-50">
               <button onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">Cancel</button>
               <button type="submit" form="addProductForm" className="px-4 py-2 text-sm font-medium text-white bg-[#F37A20] rounded-lg hover:bg-[#d96a18]">Save Product</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
