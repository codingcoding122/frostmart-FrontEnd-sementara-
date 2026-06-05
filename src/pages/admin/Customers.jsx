import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { FiDownload, FiChevronLeft, FiChevronRight, FiLoader } from 'react-icons/fi';

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fungsi untuk narik data user dari backend
    const fetchCustomers = async () => {
      try {
        // Asumsi rute standar lu buat ngambil user adalah /users
        const response = await axiosInstance.get('/users');
        const data = response.data?.data || response.data || [];

        // Mapping agar pas dengan tabel lu
        const mappedData = data.map(user => ({
          id: user.id,
          user: user.name || user.username || 'User Tanpa Nama',
          email: user.email,
          // Asumsi tabel users lu punya role atau is_active. Kalau gak ada, kita set Active
          status: user.role === 'admin' ? 'Admin' : 'Active',
          joined: new Date(user.created_at || user.createdAt || new Date()).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
          // Jika ada relasi orders di backend lu, hitung jumlahnya
          totalOrders: user.orders?.length || user._count?.orders || 0 
        }));

        setCustomers(mappedData);
      } catch (error) {
        console.error("Gagal load customer", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div className="p-6 md:p-8 w-full max-w-7xl mx-auto">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Customers</h1>
          <p className="text-sm text-gray-500 mt-1 font-medium">Data riil pengguna Frostmart</p>
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
              {isLoading ? (
                <tr>
                  <td colSpan="4" className="py-10 text-center text-gray-500">
                    <FiLoader className="animate-spin inline mr-2"/> Memuat data pengguna...
                  </td>
                </tr>
              ) : customers.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-10 text-center text-gray-500">
                    Belum ada customer terdaftar.
                  </td>
                </tr>
              ) : (
                customers.map((cust) => (
                  <tr key={cust.id} className="hover:bg-blue-50/30 transition-colors">
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
                        cust.status === 'Active' || cust.status === 'Admin'
                          ? 'bg-green-100 text-green-700 border border-green-200' 
                          : 'bg-white text-gray-600 border border-gray-300 shadow-sm'
                      }`}>
                        {cust.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-500 text-sm">{cust.joined}</td>
                    <td className="py-4 px-6 font-medium text-gray-900 text-sm">{cust.totalOrders}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}