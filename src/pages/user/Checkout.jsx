import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';

export default function PaymentSelection() {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [bankName, setBankName] = useState('BCA Virtual Account');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 1. Ambil data keranjang 
  const cartItems = useSelector((state) => state.cart.items);
  
  // PERBAIKAN HARGA: Hitung Subtotal + Ongkir 15rb biar sinkron dengan halaman Cart!
  const subTotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shippingFee = 15000;
  const totalPrice = subTotal + shippingFee; 

  // 2. Fungsi Kirim Data ke Backend pas klik Bayar
  const handlePayment = async () => {
    if (!selectedMethod || cartItems.length === 0) return;

    setIsSubmitting(true);
    try {
      const payload = {
        items: cartItems.map(item => ({
          product_id: item.id,
          quantity: item.qty,
          price: item.price
        })),
        total_amount: totalPrice,
        payment_method: selectedMethod,
        payment_details: selectedMethod === 'bank' ? bankName : selectedMethod === 'ewallet' ? phoneNumber : 'QRIS'
      };

      // Pastikan backend lu udah ditabahin router.post('/') !
      const response = await axiosInstance.post('/transactions', payload);

      if (response.status === 200 || response.status === 201) {
        dispatch({ type: 'cart/clearCart' });
        
        alert('Pembayaran Berhasil! Pesanan Anda sedang diproses.');
        navigate('/profile'); 
      }
    } catch (error) {
      console.error('Gagal memproses transaksi:', error);
      alert('Terjadi kesalahan sistem saat pembayaran. Coba periksa backend API Anda.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] w-full px-4">
      <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm max-w-lg w-full my-10">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Pilih Metode Pembayaran</h2>
        
        {/* RINGKASAN TOTAL */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6 flex flex-col gap-2 border border-gray-100">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Subtotal:</span>
            <span>Rp {subTotal.toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Ongkos Kirim:</span>
            <span>Rp {shippingFee.toLocaleString('id-ID')}</span>
          </div>
          <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between items-center">
            <span className="text-gray-800 font-bold text-sm">Total Pembayaran:</span>
            <span className="text-xl font-bold text-blue-600">
              Rp {totalPrice.toLocaleString('id-ID')}
            </span>
          </div>
        </div>
        
        {/* OPSI PEMBAYARAN */}
        <div className="space-y-3 mb-6">
          {/* Opsi 1: E-Wallet */}
          <label className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all ${selectedMethod === 'ewallet' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}>
            <div className="flex items-center gap-3">
              <input 
                type="radio" 
                name="payment" 
                value="ewallet" 
                checked={selectedMethod === 'ewallet'} 
                onChange={() => setSelectedMethod('ewallet')}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="font-semibold text-gray-800 text-sm">E-Wallet (Dana / GoPay / OVO)</span>
            </div>
            <span className="text-[10px] text-green-700 font-bold bg-green-100 px-2 py-0.5 rounded">Bebas Biaya</span>
          </label>

          {/* Opsi 2: QRIS */}
          <label className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all ${selectedMethod === 'qris' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}>
            <div className="flex items-center gap-3">
              <input 
                type="radio" 
                name="payment" 
                value="qris" 
                checked={selectedMethod === 'qris'} 
                onChange={() => setSelectedMethod('qris')}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="font-semibold text-gray-800 text-sm">QRIS (All Payment)</span>
            </div>
          </label>

          {/* Opsi 3: Transfer Bank */}
          <label className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all ${selectedMethod === 'bank' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}>
            <div className="flex items-center gap-3">
              <input 
                type="radio" 
                name="payment" 
                value="bank" 
                checked={selectedMethod === 'bank'} 
                onChange={() => setSelectedMethod('bank')}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="font-semibold text-gray-800 text-sm">Transfer Bank / Virtual Account</span>
            </div>
          </label>
        </div>

        {/* RENDER DYNAMIC FIELD */}
        {selectedMethod === 'qris' && (
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg mb-6 text-center animate-fade-in">
            <p className="text-xs text-gray-600 mb-3">Scan kode QRIS ini menggunakan aplikasi M-Banking atau E-Wallet Anda.</p>
            <img src="https://placehold.co/180x180?text=QRIS+CODE" alt="QRIS" className="mx-auto rounded-lg shadow-sm border border-gray-300"/>
          </div>
        )}

        {selectedMethod === 'bank' && (
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg mb-6 animate-fade-in">
            <label className="block text-xs font-medium text-gray-700 mb-2">Pilih Bank</label>
            <select 
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              className="w-full p-2.5 bg-white border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-600"
            >
              <option>BCA Virtual Account</option>
              <option>Mandiri Virtual Account</option>
              <option>BRI Virtual Account</option>
            </select>
          </div>
        )}

        {selectedMethod === 'ewallet' && (
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg mb-6 animate-fade-in">
            <label className="block text-xs font-medium text-gray-700 mb-2">Masukkan Nomor HP Terdaftar</label>
            <input 
              type="text" 
              placeholder="Contoh: 081234567890" 
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-2.5 bg-white border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-600" 
            />
          </div>
        )}

        <button 
          onClick={handlePayment}
          disabled={!selectedMethod || cartItems.length === 0 || isSubmitting}
          className={`w-full py-2.5 rounded-lg text-base font-semibold text-white transition-all shadow-sm ${
            !selectedMethod || cartItems.length === 0 || isSubmitting
              ? 'bg-gray-300 cursor-not-allowed shadow-none' 
              : 'bg-blue-600 hover:bg-blue-700 active:scale-[0.99]'
          }`}
        >
          {isSubmitting ? 'Memproses...' : 'Bayar Sekarang'}
        </button>
      </div>
    </div>
  );
}