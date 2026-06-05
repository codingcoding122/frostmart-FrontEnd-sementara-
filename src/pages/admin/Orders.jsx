import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance'; 
import { FiDownload, FiChevronLeft, FiChevronRight, FiLoader } from 'react-icons/fi';

const getStatusStyle = (status) => {
  const s = status?.toLowerCase();
  switch(s) {
    case 'completed': return 'bg-green-100 text-green-700 border border-green-200';
    case 'pending': return 'bg-yellow-100 text-yellow-700 border border-yellow-200';
    case 'cancelled': return 'bg-red-100 text-red-700 border border-red-200';
    case 'paid': return 'bg-blue-100 text-blue-700 border border-blue-200'; // Biru untuk status paid
    default: return 'bg-gray-100 text-gray-700';
  }
};

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axiosInstance.get('/orders');
      
      const fetchedData = response.data.map(item => ({
        id: item.id,
        orderCode: `FM-${item.id.toString().padStart(3, '0')}`,
        userId: item.user_id, // Menampilkan User ID asli dari database
        totalPrice: item.total_price, // Menampilkan total harga asli
        date: new Date(item.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
        status: item.status
      }));

      setOrders(fetchedData);
    } catch (error) {
      console.error("❌ Gagal mengambil data pesanan:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    const previousOrders = [...orders];

    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);

    try {
      await axiosInstance.patch(`/orders/${orderId}/status`, {
        status: newStatus
      });
      console.log(`✅ Sukses update order ${orderId} ke database dengan status: ${newStatus}`);
    } catch (error) {
      const detailError = error.response?.data?.message || error.message;
      console.error("❌ Gagal update status ke database:", detailError);
      setOrders(previousOrders);
      alert(`Gagal memperbarui status!\nAlasan Backend: ${detailError}`);
    }
  };

  return (
    <div className="p-6 md:p-8 w-full max-w-7xl mx-auto">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Orders</h1>
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
                <th className="py-4 px-6 font-semibold text-xs text-gray-500 uppercase tracking-wider">User ID</th>
                <th className="py-4 px-6 font-semibold text-xs text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="py-4 px-6 font-semibold text-xs text-gray-500 uppercase tracking-wider">Total Price</th>
                <th className="py-4 px-6 font-semibold text-xs text-gray-500 uppercase tracking-wider">Date</th>
                <th className="py-4 px-6 font-semibold text-xs text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="py-10 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-500">
                      <FiLoader className="animate-spin mb-2" size={24} />
                      <span className="text-sm font-medium">Memuat pesanan masuk...</span>
                    </div>
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-10 text-center text-gray-500 text-sm font-medium">
                    Belum ada pesanan yang masuk.
                  </td>
                </tr>
              ) : (
                orders.map((order, index) => (
                  <tr key={index} className="hover:bg-blue-50/30 transition-colors">
                    <td className="py-4 px-6 font-semibold text-gray-900 text-sm">
                      Customer #{order.userId}
                    </td>
                    <td className="py-4 px-6 font-medium text-gray-900 text-sm">{order.orderCode}</td>
                    <td className="py-4 px-6 text-gray-700 text-sm font-medium">
                      Rp {Number(order.totalPrice).toLocaleString('id-ID')}
                    </td>
                    <td className="py-4 px-6 text-gray-500 text-sm">{order.date}</td>
                    <td className="py-4 px-6">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer outline-none transition-colors ${getStatusStyle(order.status)}`}
                      >
                        <option value="pending">Menunggu</option>
                        <option value="paid">Paid (Dibayar)</option>
                        <option value="completed">Selesai</option>
                        <option value="cancelled">Dibatalkan</option>
                      </select>
                    </td>
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