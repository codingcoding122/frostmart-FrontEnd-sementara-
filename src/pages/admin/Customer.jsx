import React from 'react';

const mockCustomers = [
  { name: 'Putri Indah', email: 'putri.indah@example.com', phone: '081234567890', orders: 12, spent: 'Rp 1.450.000' },
  { name: 'Novanda', email: 'novanda@example.com', phone: '081298765432', orders: 5, spent: 'Rp 650.000' },
  { name: 'Angga Adi', email: 'angga.adi@example.com', phone: '085612341234', orders: 2, spent: 'Rp 210.000' },
  { name: 'Dani Ahmad', email: 'dani.ahmad@example.com', phone: '081122334455', orders: 8, spent: 'Rp 980.000' },
];

export default function Customers() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#11327c] mb-6">Customers</h1>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/50">
                <th className="py-4 px-6 font-semibold text-sm text-gray-600">Customer Name</th>
                <th className="py-4 px-6 font-semibold text-sm text-gray-600">Email</th>
                <th className="py-4 px-6 font-semibold text-sm text-gray-600">Phone</th>
                <th className="py-4 px-6 font-semibold text-sm text-gray-600 text-center">Total Orders</th>
                <th className="py-4 px-6 font-semibold text-sm text-gray-600">Total Spent</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {mockCustomers.map((cust, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-gray-900">{cust.name}</td>
                  <td className="py-4 px-6 text-gray-500">{cust.email}</td>
                  <td className="py-4 px-6 text-gray-500">{cust.phone}</td>
                  <td className="py-4 px-6 text-center font-medium text-gray-900">{cust.orders}</td>
                  <td className="py-4 px-6 font-medium text-gray-900">{cust.spent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}