import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../store/slices/cartSlice";

const ADDRESSES = [
  {
    id: 1,
    label: "Rumah",
    address: "Jl. Sudirman No.43, Jakarta Selatan, DKI Jakarta 12190",
  },
  {
    id: 2,
    label: "Kantor",
    address: "Jl. Mawar No.12, Jakarta Pusat, DKI Jakarta 15320",
  },
];

const COURIERS = [
  { id: 1, name: "GoSend Instan", eta: "30-35 Menit", price: 15000 },
  { id: 2, name: "Grab Instan", eta: "30-35 Menit", price: 14000 },
  { id: 3, name: "AntarAja Same Day", eta: "3-5 Jam", price: 8000 },
];

const PAYMENTS = [
  {
    id: 1,
    name: "Bayar di Tempat (COD)",
    desc: "Bayar saat pesanan telah tiba",
  },
  { id: 2, name: "Transfer Bank", desc: "BCA, Mandiri, BNI, BRI" },
  { id: 3, name: "E-Wallet", desc: "GoPay, OVO, Dana, ShopeePay" },
];

const STORE_NAME = "AIDA FROZEN";

export default function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const [selectedAddress, setSelectedAddress] = useState(1);
  const [selectedCourier, setSelectedCourier] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState(1);

  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const ongkosKirim =
    COURIERS.find((c) => c.id === selectedCourier)?.price || 0;
  const total = subtotal + ongkosKirim;

  const handleBuatPesanan = () => {
    alert(
      "Pesanan berhasil dibuat! Terima kasih telah berbelanja di FrostMart 🎉",
    );
    dispatch(clearCart());
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Checkout</h1>

        <div className="flex gap-6 items-start">
          {/* ===== KIRI ===== */}
          <div className="flex-1 flex flex-col gap-5">
            {/* ALAMAT PENGIRIMAN */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-700">
                  Alamat Pengiriman
                </h2>
              </div>
              <div className="divide-y divide-gray-50">
                {ADDRESSES.map((addr) => (
                  <label
                    key={addr.id}
                    className={`flex items-start gap-3 px-5 py-4 cursor-pointer transition ${
                      selectedAddress === addr.id
                        ? "bg-blue-50"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="address"
                      checked={selectedAddress === addr.id}
                      onChange={() => setSelectedAddress(addr.id)}
                      className="accent-blue-600 mt-1"
                    />
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">
                        {addr.label}
                      </p>
                      <p className="text-sm text-gray-500 mt-0.5">
                        {addr.address}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* KURIR PENGIRIMAN */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-700">
                  Kurir Pengiriman
                </h2>
              </div>
              <div className="divide-y divide-gray-50">
                {COURIERS.map((courier) => (
                  <label
                    key={courier.id}
                    className={`flex items-center justify-between px-5 py-4 cursor-pointer transition ${
                      selectedCourier === courier.id
                        ? "bg-blue-50"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="courier"
                        checked={selectedCourier === courier.id}
                        onChange={() => setSelectedCourier(courier.id)}
                        className="accent-blue-600"
                      />
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">
                          {courier.name}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {courier.eta}
                        </p>
                      </div>
                    </div>
                    <p className="text-blue-600 font-semibold text-sm">
                      Rp{courier.price.toLocaleString("id-ID")}
                    </p>
                  </label>
                ))}
              </div>
            </div>

            {/* METODE PEMBAYARAN */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-700">
                  Metode Pembayaran
                </h2>
              </div>
              <div className="divide-y divide-gray-50">
                {PAYMENTS.map((payment) => (
                  <label
                    key={payment.id}
                    className={`flex items-start gap-3 px-5 py-4 cursor-pointer transition ${
                      selectedPayment === payment.id
                        ? "bg-blue-50"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={selectedPayment === payment.id}
                      onChange={() => setSelectedPayment(payment.id)}
                      className="accent-blue-600 mt-1"
                    />
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">
                        {payment.name}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {payment.desc}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* ===== KANAN ===== */}
          <div className="w-72 shrink-0 flex flex-col gap-5">
            {/* DAFTAR PRODUK */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100">
                <p className="font-bold text-gray-800 text-sm">{STORE_NAME}</p>
              </div>
              <div className="divide-y divide-gray-50">
                {cartItems.length === 0 ? (
                  <p className="text-center text-gray-400 text-sm py-6">
                    Keranjang kosong
                  </p>
                ) : (
                  cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 px-5 py-4"
                    >
                      {/* Gambar */}
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src =
                              "https://placehold.co/48x48/e2e8f0/94a3b8?text=F";
                          }}
                        />
                      </div>
                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-800 line-clamp-1">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-400">{item.qty} PCS</p>
                        <p className="text-blue-600 font-bold text-sm mt-0.5">
                          Rp{item.price.toLocaleString("id-ID")}
                        </p>
                      </div>
                      {/* Qty */}
                      <p className="text-xs text-gray-400 shrink-0">
                        x{item.qty}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* RINGKASAN PESANAN */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h2 className="font-bold text-gray-800 text-base mb-4">
                Ringkasan Pesanan
              </h2>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>Rp{subtotal.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Ongkos Kirim</span>
                  <span>Rp{ongkosKirim.toLocaleString("id-ID")}</span>
                </div>
              </div>

              <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between items-center">
                <span className="font-semibold text-gray-700 text-sm">
                  Total Pembayaran
                </span>
                <span className="text-blue-600 font-bold text-base">
                  Rp{total.toLocaleString("id-ID")}
                </span>
              </div>

              <button
                onClick={handleBuatPesanan}
                className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl text-sm transition"
              >
                Buat Pesanan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
