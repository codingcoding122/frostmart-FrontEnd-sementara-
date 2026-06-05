import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

export default function FrostmartHomePage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Narik data asli dari Backend pas halaman Home dibuka
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get("/products");
        const data = response.data.data || response.data || [];
        setProducts(data);
      } catch (error) {
        console.error("Gagal menarik data produk untuk Home:", error);
      } finally {
        isLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Potong array buat dipajang: 4 buat Hero, 4 buat Popular Menu
  const heroProducts = products.slice(0, 4);
  const menuProducts = products.slice(4, 8);

  return (
    <div className="bg-[#f5f5f5] text-gray-800 overflow-hidden">
      {/* HERO */}
      <section className="bg-gradient-to-b from-[#55a8ea] to-[#3a32ff] min-h-[700px] px-10 py-16 flex items-center justify-between">
        <div className="max-w-xl text-white">
          <h1 className="text-7xl font-bold leading-tight mb-8">
            Jadi yang Tercepat Dalam Mengantar Makananmu
          </h1>

          <p className="text-lg mb-8 text-gray-100">
            Pesan frozen food favoritmu sekarang. Pengiriman cepat, aman, dan pastinya halal.
          </p>

          {/* Penyesuaian Tombol: Padding seragam px-6 py-2.5 & rounded-lg */}
          <button className="px-6 py-2.5 bg-[#251c7a] hover:bg-opacity-90 text-white font-semibold rounded-lg transition">
            Mulai Sekarang
          </button>
        </div>

        <div className="grid grid-cols-2 gap-8">
          {isLoading ? (
            <p className="text-white text-xl">Memuat produk...</p>
          ) : (
            heroProducts.map((item) => (
              <div
                key={item.id}
                className="bg-white w-[260px] rounded-2xl pt-20 pb-8 px-6 relative shadow-xl"
              >
                <img
                  src={item.image || "https://placehold.co/128x128/e2e8f0/94a3b8?text=Image"}
                  alt={item.name}
                  className="w-32 h-32 rounded-full object-cover absolute -top-10 left-1/2 -translate-x-1/2 shadow-lg bg-gray-100"
                />

                <div className="text-center mt-12">
                  <h2 className="text-2xl font-bold truncate">{item.name}</h2>
                  <p className="text-gray-500 mt-1 truncate">Oleh {item.brand}</p>
                  <p className="text-yellow-400 mt-3 text-xl">★★★★★</p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* WHAT WE SERVE */}
      <section className="py-28 px-10 bg-[#f8f8f8] text-center">
        <p className="text-orange-400 font-semibold text-xl mb-4">
          Cara Kerja Kami
        </p>

        <h2 className="text-5xl font-bold mb-6">Layanan Terbaik Kami</h2>

        <p className="text-gray-500 text-xl max-w-3xl mx-auto mb-20">
          Kualitas Produk Adalah Prioritas Utama Kami, Dan Selalu Menjamin Kehalalan Serta
          Keamanan Hingga Sampai Di Tangan Anda.
        </p>

        <div className="grid grid-cols-3 gap-10">
          <div className="flex flex-col items-center">
            <div className="text-8xl mb-6">📱</div>
            <h3 className="text-3xl font-bold mb-4">Mudah Dipesan</h3>
            <p className="text-gray-500 text-xl">
              Anda hanya perlu memesan langsung lewat aplikasi
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="text-8xl mb-6">🛵</div>
            <h3 className="text-3xl font-bold mb-4">Pengiriman Tercepat</h3>
            <p className="text-gray-500 text-xl">
              Pesanan akan diantar tepat waktu ke lokasi Anda
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="text-8xl mb-6">📦</div>
            <h3 className="text-3xl font-bold mb-4">Kualitas Terbaik</h3>
            <p className="text-gray-500 text-xl">
              Menyediakan kualitas makanan beku terbaik untuk Anda
            </p>
          </div>
        </div>
      </section>

      {/* DISCOUNT SECTION */}
      <section
        className="h-[500px] bg-cover bg-center relative flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1615937691194-97dbd3f3dc29?q=80&w=800&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative text-center text-white">
          <h2 className="text-6xl font-bold mb-10 max-w-4xl leading-tight">
            Gabung jadi member kami dan dapatkan diskon hingga 50%
          </h2>

          <Link to="/register">
            {/* Penyesuaian Tombol: Padding seragam px-6 py-2.5 & rounded-lg & text-base */}
            <button
              className="
                bg-blue-900
                hover:bg-blue-700
                active:scale-95
                transition-all
                duration-200
                text-white
                px-6
                py-2.5
                rounded-lg
                text-base
                font-semibold
              "
            >
              Daftar Sekarang
            </button>
          </Link>
        </div>
      </section>

      {/* POPULAR MENU */}
      <section id="menu" className="py-28 px-10 text-center bg-[#f8f8f8]">
        <p className="text-blue-700 font-semibold text-xl mb-4">Menu Kami</p>

        <h2 className="text-5xl font-bold mb-6">
          Menu Frozen Food Populer Kami
        </h2>

        <p className="text-gray-500 text-xl mb-20">
          Pilihan terbaik dari Frostmart yang paling sering dibeli pelanggan.
        </p>

        <div className="grid grid-cols-4 gap-8 mb-14">
          {isLoading ? (
            <p className="col-span-4 text-center text-gray-500">Memuat menu...</p>
          ) : (
            menuProducts.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-6 shadow-md relative"
              >
                <img
                  src={item.image || "https://placehold.co/160x160/e2e8f0/94a3b8?text=Image"}
                  alt={item.name}
                  className="w-40 h-40 object-cover rounded-full mx-auto mb-6 bg-gray-100"
                />

                <h3 className="text-2xl font-bold truncate">{item.name}</h3>

                <p className="text-gray-500 mt-2 truncate">Oleh {item.brand}</p>

                <p className="font-bold text-xl mt-4">
                  Rp {item.price ? item.price.toLocaleString("id-ID") : "0"}
                </p>

                <span className="absolute bottom-5 right-5 text-yellow-500 text-2xl">
                  ♥
                </span>
              </div>
            ))
          )}
        </div>

        <Link to="/menu">
          {/* Penyesuaian Tombol: Padding seragam px-6 py-2.5, text-base, rounded-lg */}
          <button className="bg-blue-700 hover:bg-blue-800 transition-colors text-white px-6 py-2.5 rounded-lg text-base font-semibold">
            Menu Lainnya
          </button>
        </Link>
      </section>

      {/* TESTIMONI */}
      <section className="px-10 pb-28 bg-[#f8f8f8]">
        <div className="grid grid-cols-2 gap-10 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop"
              alt="frozen"
              className="rounded-3xl h-[500px] w-full object-cover"
            />
          </div>

          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-md">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gray-300"></div>

                <div>
                  <h3 className="font-bold text-2xl">Hans</h3>
                  <p className="text-yellow-400 text-xl">★★★★★</p>
                </div>
              </div>

              <p className="text-gray-600 text-lg leading-relaxed">
                “Di aplikasi ini sangat rekomen banget untuk kalian yang mau
                pesan Frozen Food tanpa ribet keluar Rumah.”
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-md ml-24">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gray-300"></div>

                <div>
                  <h3 className="font-bold text-2xl">Naura Silvana</h3>
                  <p className="text-yellow-400 text-xl">★★★★★</p>
                </div>
              </div>

              <p className="text-gray-600 text-lg leading-relaxed">
                “Keren banget aplikasinya, buat kaum mager cocok nih!!”
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}