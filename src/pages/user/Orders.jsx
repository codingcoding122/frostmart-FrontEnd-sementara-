import React from 'react';
import { FiPackage, FiCheckCircle, FiClock, FiXCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const myOrders = [
  { id: 'FM-012', date: '12 May 2026', total: 'Rp 145.000', status: 'Selesai', items: 'Chicken Wings Premium, Vegetables Nugget' },
  { id: 'FM-010', date: '11 May 2026', total: 'Rp 210.000', status: 'Menunggu', items: 'Lumpia Frozen, Dimsum Frozen' },
  { id: 'FM-009', date: '10 May 2026', total: 'Rp 45.000', status: 'Dibatalkan', items: 'French Fries' },
];

const getStatusIcon = (status) => {
  switch(status) {
    case 'Selesai': return <FiCheckCircle className="text-green-500" size={18} />;
    case 'Menunggu': return <FiClock className="text-yellow-500" size={18} />;
    case 'Dibatalkan': return <FiXCircle className="text-red-500" size={18} />;
    default: return <FiPackage className="text-blue-500" size={18} />;
  }
};

const getStatusStyle = (status) => {
  switch(status) {
    case 'Selesai': return 'bg-green-100 text-green-700';
    case 'Menunggu': return 'bg-yellow-100 text-yellow-700';
    case 'Dibatalkan': return 'bg-red-100 text-red-700';
    default: return 'bg-blue-100 text-blue-700';
  }
};

export default function UserOrders() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-[1000px] mx-auto px-6">
        
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-[#11327c]">Riwayat Pesanan</h1>
          <p className="text-gray-500 mt-2 text-sm">Pantau status pengiriman dan riwayat belanja frozen food Anda di sini.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {myOrders.length === 0 ? (
            <div className="p-10 text-center">
              <div className="w-16 h-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiPackage size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Belum ada pesanan</h3>
              <p className="text-gray-500 text-sm mt-2 mb-6">Yuk, mulai belanja makanan beku favoritmu!</p>
              <Link to="/menu" className="bg-[#1c54ff] hover:bg-blue-800 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors">
                Mulai Belanja
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {myOrders.map((order, index) => (
                <div key={index} className="p-6 hover:bg-blue-50/30 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-6">
                  
                  {/* Info Kiri */}
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      {getStatusIcon(order.status)}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-bold text-gray-900">{order.id}</h3>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusStyle(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mb-2">Tanggal: {order.date}</p>
                      <p className="text-sm text-gray-700 line-clamp-1">{order.items}</p>
                    </div>
                  </div>

                  {/* Info Kanan & Aksi */}
                  <div className="flex flex-row md:flex-col items-center md:items-end justify-between border-t border-gray-100 md:border-0 pt-4 md:pt-0">
                    <div className="text-left md:text-right mb-0 md:mb-3">
                      <p className="text-xs text-gray-500 mb-1">Total Belanja</p>
                      <p className="font-extrabold text-[#1c54ff] text-lg">{order.total}</p>
                    </div>
                    <button className="text-sm font-semibold text-[#1c54ff] border border-[#1c54ff] hover:bg-[#1c54ff] hover:text-white px-4 py-2 rounded-lg transition-colors">
                      Lihat Detail
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}