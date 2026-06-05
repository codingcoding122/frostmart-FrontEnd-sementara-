import { useNavigate } from "react-router-dom";
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQty } from "../../store/slices/cartSlice";

const ONGKOS_KIRIM = 15000;
const STORE_NAME = "AIDA FROZEN"; // dummy store name, ganti kalau BE sudah ready

export default function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const isEmpty = cartItems.length === 0; 

  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const totalItem = cartItems.reduce((sum, i) => sum + i.qty, 0);
  const total = subtotal + (totalItem > 0 ? ONGKOS_KIRIM : 0);

  // ===== TAMPILAN KOSONG =====
  if (isEmpty) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center gap-4">
        <div className="text-gray-300">
          <FiShoppingBag size={120} strokeWidth={1} />
        </div>
        <h2 className="text-xl font-bold text-gray-700">
          Keranjang Belanja Kosong
        </h2>
        <p className="text-sm text-gray-400">
          Yuk mulai belanja frozen food berkualitas!
        </p>
        <button
          onClick={() => navigate("/menu")}
          className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-full font-medium text-sm transition"
        >
          Mulai Belanja
        </button>
      </div>
    );
  }

  // ===== TAMPILAN ADA PRODUK =====
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Keranjang Belanja
        </h1>

        <div className="flex gap-6 items-start">
          {/* KIRI: list produk */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Header toko */}
              <div className="px-5 py-3 border-b border-gray-100">
                <p className="font-bold text-gray-800 text-sm">{STORE_NAME}</p>
              </div>

              {/* Item list */}
              <div className="divide-y divide-gray-50">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 px-5 py-4"
                  >
                    {/* Gambar */}
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-50 shrink-0 border border-gray-100">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src =
                            "https://placehold.co/64x64/e2e8f0/94a3b8?text=F";
                        }}
                      />
                    </div>

                    {/* Info produk */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 leading-tight line-clamp-1">
                        {item.name}
                      </p>
                      {item.subLabel && (
                        <p className="text-xs text-gray-400 mt-0.5">
                          {item.subLabel}
                        </p>
                      )}

                      {/* Qty control + harga */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              dispatch(
                                updateQty({ id: item.id, qty: item.qty - 1 }),
                              )
                            }
                            className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-blue-500 hover:text-blue-500 transition"
                          >
                            <FiMinus size={11} />
                          </button>
                          <span className="text-sm font-medium w-4 text-center">
                            {item.qty}
                          </span>
                          <button
                            onClick={() =>
                              dispatch(
                                updateQty({ id: item.id, qty: item.qty + 1 }),
                              )
                            }
                            className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-blue-500 hover:text-blue-500 transition"
                          >
                            <FiPlus size={11} />
                          </button>
                        </div>

                        {/* Harga */}
                        <p className="text-blue-600 font-bold text-sm">
                          Rp{(item.price * item.qty).toLocaleString("id-ID")}
                        </p>
                      </div>
                    </div>

                    {/* Hapus */}
                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="text-red-400 hover:text-red-600 transition shrink-0 ml-1"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* KANAN: ringkasan pesanan */}
          <div className="w-64 shrink-0 bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sticky top-6">
            <h2 className="font-bold text-gray-800 text-base mb-4">
              Ringkasan Pesanan
            </h2>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({totalItem} item)</span>
                <span>Rp{subtotal.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Ongkos Kirim</span>
                <span>Rp{ONGKOS_KIRIM.toLocaleString("id-ID")}</span>
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
              onClick={() => navigate("/checkout")}
              className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl text-sm transition"
            >
              Lanjut ke Checkout
            </button>

            <button
              onClick={() => navigate("/menu")}
              className="mt-2 w-full text-blue-600 hover:text-blue-800 font-medium text-sm text-center transition"
            >
              Lanjut Belanja
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
