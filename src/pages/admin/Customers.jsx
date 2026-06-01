import React from 'react';
import { FiDownload, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const mockCustomers = [
  { user: 'Putri Indah', email: 'putri.indah@example.com', status: 'Active', joined: '12 May 2026', totalOrders: 12 },
  { user: 'Novanda', email: 'novanda@example.com', status: 'Inactive', joined: '10 May 2026', totalOrders: 5 },
  { user: 'Angga Adi', email: 'angga.adi@example.com', status: 'Active', joined: '08 May 2026', totalOrders: 2 },
  { user: 'Dani Ahmad', email: 'dani.ahmad@example.com', status: 'Active', joined: '01 May 2026', totalOrders: 8 },
  { user: 'Cholifah', email: 'cholifah@example.com', status: 'Inactive', joined: '28 Apr 2026', totalOrders: 0 },
];

export default function Customers() {
  return (
    <div className="p-6 md:p-8 w-full max-w-7xl mx-auto">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Customers</h1>
          <p className="text-sm text-gray-500 mt-1 font-medium">Welcome back, admin.</p>
        </div>
        <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm">
          <FiDownload size={16} /> Export
        </button>
      </div>

      {/* TABLE SECTION */}
      <div className="bg-white rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="py-4 px-6 font-semibold text-xs text-gray-500 uppercase tracking-wider">User</th>
                <th className="py-4 px-6 font-semibold text-xs text-gray-500 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 font-semibold text-xs text-gray-500 uppercase tracking-wider">Joined</th>
                <th className="py-4 px-6 font-semibold text-xs text-gray-500 uppercase tracking-wider">Total Orders</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockCustomers.map((cust, index) => (
                <tr key={index} className="hover:bg-blue-50/30 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img 
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(cust.user)}&background=random`} 
                        alt={cust.user} 
                        className="w-10 h-10 rounded-full object-cover shadow-sm"
                      />
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{cust.user}</p>
                        <p className="text-xs text-gray-500">{cust.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                      cust.status === 'Active' 
                        ? 'bg-green-100 text-green-700 border border-green-200' 
                        : 'bg-white text-gray-600 border border-gray-300 shadow-sm'
                    }`}>
                      {cust.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-500 text-sm">{cust.joined}</td>
                  <td className="py-4 px-6 font-medium text-gray-900 text-sm">{cust.totalOrders}</td>
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
          <span className="text-sm text-gray-500 font-medium">Page 1 of 10</span>
          <button className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors px-3 py-1.5 border border-transparent hover:border-gray-200 rounded-lg">
            Next <FiChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}