import React from 'react';
import { FiPlus, FiChevronLeft, FiChevronRight, FiEdit2, FiTrash2 } from 'react-icons/fi';

const mockProducts = [
  { id: 'PRD-01', name: 'Chicken Wings Premium', category: 'Frozen Chicken', price: 'Rp 45.000', stock: 120, status: 'Tersedia' },
  { id: 'PRD-02', name: 'Vegetables Nugget', category: 'Frozen Chicken', price: 'Rp 65.000', stock: 85, status: 'Tersedia' },
  { id: 'PRD-03', name: 'Lumpia Frozen', category: 'Frozen Vegetables', price: 'Rp 85.000', stock: 15, status: 'Menipis' },
  { id: 'PRD-04', name: 'French Fries', category: 'Frozen Vegetables', price: 'Rp 25.000', stock: 0, status: 'Habis' },
  { id: 'PRD-05', name: 'Beef Patties', category: 'Frozen Beef', price: 'Rp 45.000', stock: 210, status: 'Tersedia' },
];

const getStatusStyle = (status) => {
  switch(status) {
    case 'Tersedia': return 'bg-green-100 text-green-700 border border-green-200';
    case 'Menipis': return 'bg-yellow-100 text-yellow-700 border border-yellow-200';
    case 'Habis': return 'bg-red-100 text-red-700 border border-red-200';
    default: return 'bg-gray-100 text-gray-700';
  }
};

export default function Products() {
  return (
    <div className="p-6 md:p-8 w-full max-w-7xl mx-auto">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Products</h1>
          <p className="text-sm text-gray-500 mt-1 font-medium">Welcome back, admin.</p>
        </div>
        <button className="flex items-center gap-2 bg-[#1c54ff] hover:bg-blue-800 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm">
          <FiPlus size={18} /> Add New Product
        </button>
      </div>

      {/* TABLE SECTION */}
      <div className="bg-white rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="py-4 px-6 font-semibold text-xs text-gray-500 uppercase tracking-wider">Product Info</th>
                <th className="py-4 px-6 font-semibold text-xs text-gray-500 uppercase tracking-wider">Category</th>
                <th className="py-4 px-6 font-semibold text-xs text-gray-500 uppercase tracking-wider">Price</th>
                <th className="py-4 px-6 font-semibold text-xs text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="py-4 px-6 font-semibold text-xs text-gray-500 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 font-semibold text-xs text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockProducts.map((product, index) => (
                <tr key={index} className="hover:bg-blue-50/30 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                        {product.id.split('-')[1]}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{product.name}</p>
                        <p className="text-xs text-gray-500">{product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-700 text-sm">{product.category}</td>
                  <td className="py-4 px-6 font-semibold text-gray-900 text-sm">{product.price}</td>
                  <td className="py-4 px-6 text-gray-700 text-sm">{product.stock} pcs</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1.5 rounded-lg text-xs font-bold ${getStatusStyle(product.status)}`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button className="text-blue-600 hover:text-blue-800 transition-colors">
                        <FiEdit2 size={16} />
                      </button>
                      <button className="text-red-500 hover:text-red-700 transition-colors">
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION FOOTER */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-white">
          <button className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors px-3 py-1.5 border border-transparent hover:border-gray-200 rounded-lg">
            <FiChevronLeft size={16} /> Previous
          </button>
          <span className="text-sm text-gray-500 font-medium">Page 1 of 5</span>
          <button className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors px-3 py-1.5 border border-transparent hover:border-gray-200 rounded-lg">
            Next <FiChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}