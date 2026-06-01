import React from 'react';
import { FiDownload, FiChevronLeft, FiChevronRight, FiPrinter } from 'react-icons/fi';

const mockInvoices = [
  { id: 'INV-2026-001', orderId: 'FM-012', customer: 'Putri Indah', date: '12 May 2026', amount: 'Rp 145.000', status: 'Paid' },
  { id: 'INV-2026-002', orderId: 'FM-011', customer: 'Novanda', date: '12 May 2026', amount: 'Rp 85.000', status: 'Paid' },
  { id: 'INV-2026-003', orderId: 'FM-010', customer: 'Angga Adi', date: '11 May 2026', amount: 'Rp 210.000', status: 'Unpaid' },
  { id: 'INV-2026-004', orderId: 'FM-008', customer: 'Siti Aminah', date: '09 May 2026', amount: 'Rp 320.000', status: 'Paid' },
  { id: 'INV-2026-005', orderId: 'FM-007', customer: 'Joko Anwar', date: '08 May 2026', amount: 'Rp 75.000', status: 'Paid' },
];

export default function Invoice() {
  return (
    <div className="p-6 md:p-8 w-full max-w-7xl mx-auto">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Invoices</h1>
          <p className="text-sm text-gray-500 mt-1 font-medium">Welcome back, admin.</p>
        </div>
        <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm">
          <FiDownload size={16} /> Download All
        </button>
      </div>

      {/* TABLE SECTION */}
      <div className="bg-white rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="py-4 px-6 font-semibold text-xs text-gray-500 uppercase tracking-wider">Invoice ID</th>
                <th className="py-4 px-6 font-semibold text-xs text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="py-4 px-6 font-semibold text-xs text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="py-4 px-6 font-semibold text-xs text-gray-500 uppercase tracking-wider">Date Issued</th>
                <th className="py-4 px-6 font-semibold text-xs text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="py-4 px-6 font-semibold text-xs text-gray-500 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 font-semibold text-xs text-gray-500 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockInvoices.map((inv, index) => (
                <tr key={index} className="hover:bg-blue-50/30 transition-colors">
                  <td className="py-4 px-6 font-semibold text-[#1c54ff] text-sm">{inv.id}</td>
                  <td className="py-4 px-6 text-gray-500 text-sm">{inv.orderId}</td>
                  <td className="py-4 px-6 font-medium text-gray-900 text-sm">{inv.customer}</td>
                  <td className="py-4 px-6 text-gray-500 text-sm">{inv.date}</td>
                  <td className="py-4 px-6 font-semibold text-gray-900 text-sm">{inv.amount}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                      inv.status === 'Paid' 
                        ? 'bg-green-100 text-green-700 border border-green-200' 
                        : 'bg-red-100 text-red-700 border border-red-200'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="flex items-center justify-end gap-1.5 text-gray-500 hover:text-[#1c54ff] font-medium text-xs ml-auto transition-colors">
                      <FiPrinter size={14} /> Print PDF
                    </button>
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
          <span className="text-sm text-gray-500 font-medium">Page 1 of 12</span>
          <button className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors px-3 py-1.5 border border-transparent hover:border-gray-200 rounded-lg">
            Next <FiChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}