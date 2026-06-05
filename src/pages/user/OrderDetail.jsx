import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiPackage, FiCreditCard, FiClock } from 'react-icons/fi';
import axiosInstance from '../../api/axiosInstance'; // Pastikan path ini bener sesuai struktur lu

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const response = await axiosInstance.get(`/orders/${id}`);
        const data = response.data.data || response.data;
        setOrder(data);
      } catch (error) {
        console.error("Gagal menarik detail pesanan:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrderDetail();
  }, [id]);

  if (isLoading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center font-semibold text-gray-500">Mencetak struk pesanan...</div>;
  if (!order) return <div className="min-h-screen bg-gray-50 flex items-center justify-center font-semibold text-gray-500">Pesanan tidak ditemukan.</div>;

  const orderIdStr = order.id || order._id;
  const shortId = orderIdStr.toString().substring(0, 8).toUpperCase();
  const rawDate = order.createdAt || order.created_at;
  const formattedDate = rawDate ? new Date(rawDate).toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' }) : '-';
  const safeTotal = order.totalAmount || order.total_price || order.total || 0;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        
        {/* Header Navigation */}
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-200 rounded-full transition text-gray-600">
            <FiArrowLeft size={22} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800 leading-tight">Detail Pesanan</h1>
            <p className="text-sm text-gray-500">FM-{shortId}</p>
          </div>
        </div>

        {/* Status Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-50 text-[#1c54ff] rounded-full">
              <FiClock size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-0.5">Status Pesanan</p>
              <p className="font-bold text-lg text-[#1c54ff] uppercase tracking-wide">{order.status || 'PENDING'}</p>
            </div>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-sm text-gray-500 mb-0.5">Waktu Pembelian</p>
            <p className="font-semibold text-gray-800">{formattedDate}</p>
          </div>
        </div>

        {/* Rincian Produk */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-4">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-2">
            <FiPackage className="text-gray-600" />
            <h2 className="font-bold text-gray-800">Daftar Produk</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {order.items && order.items.map((item, idx) => {
              const pName = item.productName || item.product_name || item.name || 'Produk Frozen';
              const pPrice = Number(item.price) || 0;
              const pQty = Number(item.quantity) || 1;
              return (
                <div key={idx} className="p-6 flex justify-between items-center hover:bg-blue-50/20 transition">
                  <div>
                    <p className="font-bold text-gray-800 text-base">{pName}</p>
                    <p className="text-sm text-gray-500 mt-1">{pQty} x Rp {pPrice.toLocaleString('id-ID')}</p>
                  </div>
                  <p className="font-bold text-gray-800">Rp {(pQty * pPrice).toLocaleString('id-ID')}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Ringkasan Pembayaran */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-2">
            <FiCreditCard className="text-gray-600" />
            <h2 className="font-bold text-gray-800">Rincian Pembayaran</h2>
          </div>
          <div className="p-6 space-y-3 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Metode Pembayaran</span>
              <span className="font-semibold text-gray-800 uppercase">{order.payment_method || order.paymentMethod || 'Transfer / COD'}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Subtotal Produk</span>
              <span className="font-semibold text-gray-800">Rp {Number(safeTotal).toLocaleString('id-ID')}</span>
            </div>
            
            <div className="border-t border-dashed border-gray-200 mt-4 pt-4 flex justify-between items-center">
              <span className="font-bold text-gray-800 text-base">Total Belanja</span>
              <span className="font-extrabold text-[#1c54ff] text-xl">Rp {Number(safeTotal).toLocaleString('id-ID')}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}