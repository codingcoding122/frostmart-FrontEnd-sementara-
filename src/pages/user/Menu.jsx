import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  FiStar,
  FiChevronLeft,
  FiChevronRight,
  FiPlus,
  FiSearch,
} from "react-icons/fi";

import heroImg from "../../assets/hero.png";

// =====================
// DATA DUMMY PRODUK
// =====================
const dummyProducts = [
  {
    id: 1,
    name: "Chicken Wings",
    brand: "So Good",
    category: "Frozen Chicken",
    price: 45000,
    rating: 4.5,
    image: "/src/assets/images/products/chiken nugget fiesta.jpg",
  },
  {
    id: 2,
    name: "Vegetables Nugget",
    brand: "Fiesta",
    category: "Frozen Chicken",
    price: 65000,
    rating: 4.2,
    image: "/src/assets/images/products/chiken nugget fiesta.jpg",
  },
  {
    id: 3,
    name: "Lumpia Frozen",
    brand: "Samijaya Jogja",
    category: "Frozen Chicken",
    price: 85000,
    rating: 4.0,
    image: "/src/assets/images/products/karage fiesta.jpg",
  },
  {
    id: 4,
    name: "French Fries",
    brand: "Belfoods",
    category: "Frozen Vegetables",
    price: 25000,
    rating: 4.3,
    image: "/src/assets/images/products/siomay frozen.jpg",
  },
  {
    id: 5,
    name: "Mixed Vegetables",
    brand: "Golden Farm",
    category: "Frozen Vegetables",
    price: 41000,
    rating: 4.1,
    image: "/src/assets/images/products/otak otak ikan.jpg",
  },
  {
    id: 6,
    name: "Beef Patties",
    brand: "Yona",
    category: "Frozen Beef",
    price: 45000,
    rating: 4.4,
    image: "/src/assets/images/products/sosis sapi fiesta.jpg",
  },
  {
    id: 7,
    name: "Dimsum Frozen",
    brand: "Damory",
    category: "Frozen Seafood",
    price: 28000,
    rating: 4.2,
    image: "/src/assets/images/products/otak otak ikan.jpg",
  },
  {
    id: 8,
    name: "Seafood Ebi Fry Tempura",
    brand: "Fiesta",
    category: "Frozen Seafood",
    price: 36000,
    rating: 4.1,
    image: "/src/assets/images/products/bakso ikan shifudo.jpg",
  },
  {
    id: 9,
    name: "Fillet Ikan Patin",
    brand: "Frozen Pangasius",
    category: "Frozen Seafood",
    price: 53000,
    rating: 4.3,
    image: "/src/assets/images/products/bakso ikan shifudo.jpg",
  },
  {
    id: 10,
    name: "Ayam Potong 1/2 Ekor",
    brand: "Frozen",
    category: "Frozen Chicken",
    price: 28000,
    rating: 4.0,
    image: "/src/assets/images/products/chiken sausage.jpg",
  },
  {
    id: 11,
    name: "Frozen Mix Vegetable",
    brand: "Golden Farm",
    category: "Frozen Vegetables",
    price: 32000,
    rating: 4.1,
    image: "/src/assets/images/products/siomay frozen.jpg",
  },
  {
    id: 12,
    name: "Risol Mayo",
    brand: "Nisofood",
    category: "Frozen Chicken",
    price: 20000,
    rating: 3.8,
    image: "/src/assets/images/products/karage fiesta.jpg",
  },
  {
    id: 13,
    name: "Minipou Isi Coklat",
    brand: "Chik Yen",
    category: "Frozen Chicken",
    price: 35000,
    rating: 4.4,
    image: "/src/assets/images/products/nugget kenzler.jpg",
  },
  {
    id: 14,
    name: "Baso Ayam Mini",
    brand: "Fiesta",
    category: "Frozen Chicken",
    price: 15000,
    rating: 4.1,
    image: "/src/assets/images/products/nugget kenzler.jpg",
  },
  {
    id: 15,
    name: "Chicken Sausage",
    brand: "SoGood",
    category: "Frozen Chicken",
    price: 48000,
    rating: 4.5,
    image: "/src/assets/images/products/chiken sausage.jpg",
  },
  {
    id: 16,
    name: "Nugget Kenzler",
    brand: "Kenzler",
    category: "Frozen Chicken",
    price: 47000,
    rating: 4.6,
    image: "/src/assets/images/products/nugget kenzler.jpg",
  },
  {
    id: 17,
    name: "Bakso Ikan Shifudo",
    brand: "Shifudo",
    category: "Frozen Seafood",
    price: 32000,
    rating: 4.1,
    image: "/src/assets/images/products/bakso ikan shifudo.jpg",
  },
  {
    id: 18,
    name: "Siomay Frozen",
    brand: "Belfoods",
    category: "Frozen Seafood",
    price: 35000,
    rating: 4.4,
    image: "/src/assets/images/products/siomay frozen.jpg",
  },
];

const CATEGORIES = [
  "Frozen Chicken",
  "Frozen Beef",
  "Frozen Seafood",
  "Frozen Vegetables",
];

const bestDeals = [
  {
    id: 16,
    name: "Nugget Kenzler",
    price: 47000,
    image: "/src/assets/images/products/nugget kenzler.jpg",
    rating: 4.6,
  },
  {
    id: 6,
    name: "Beef Patties",
    price: 45000,
    image: "/src/assets/images/products/sosis sapi fiesta.jpg",
    rating: 4.4,
  },
  {
    id: 18,
    name: "Siomay Frozen",
    price: 35000,
    image: "/src/assets/images/products/siomay frozen.jpg",
    rating: 4.4,
  },
  {
    id: 8,
    name: "Seafood Ebi Fry",
    price: 36000,
    image: "/src/assets/images/products/bakso ikan shifudo.jpg",
    rating: 4.1,
  },
  {
    id: 1,
    name: "Chicken Wings",
    price: 45000,
    image: "/src/assets/images/products/chiken nugget fiesta.jpg",
    rating: 4.5,
  },
];

const ITEMS_PER_PAGE = 9;

// Komponen bintang
function Stars({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <FiStar
          key={s}
          size={13}
          className={
            s <= Math.round(rating)
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-200 fill-gray-200"
          }
        />
      ))}
    </div>
  );
}

// =====================
// CARD PRODUK
// Foto bulat besar menonjol ~60% ke atas dari card putih
// TANPA border biru (itu cuma penanda Figma)
// Nama produk: bold + underline
// Tombol + biru bulat di pojok kanan bawah
// =====================
function ProductCard({ product, onAddToCart }) {
  // Ukuran disesuaikan agar proporsional seperti design Figma:
  // card sempit ~200px, foto 120px menonjol ~55% ke atas
  const CIRCLE_SIZE = 120;
  const OVERLAP = Math.round(CIRCLE_SIZE * 0.55); // ~66px menonjol ke atas

  return (
    // mx-auto + max-w membuat card tidak melebar, tapi tetap responsif dalam grid
    <div
      style={{ paddingTop: `${OVERLAP}px` }}
      className="mx-auto w-full max-w-[210px]"
    >
      <div className="relative bg-white rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col pb-4 px-3">
        {/* Foto bulat — menonjol ke atas card */}
        <div
          className="absolute left-1/2 -translate-x-1/2 rounded-full overflow-hidden shadow-lg bg-gray-100"
          style={{
            width: `${CIRCLE_SIZE}px`,
            height: `${CIRCLE_SIZE}px`,
            top: `-${OVERLAP}px`,
          }}
        >
          <Link to={`/product/${product.id}`}>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              onError={(e) => {
                e.target.src =
                  "https://placehold.co/120x120/e2e8f0/94a3b8?text=🧊";
              }}
            />
          </Link>
        </div>

        {/* Spacer — ruang untuk sisa foto yang masuk ke dalam card */}
        <div style={{ height: `${CIRCLE_SIZE - OVERLAP + 8}px` }} />

        {/* Info produk */}
        <div className="w-full">
          {/* Rating bintang */}
          <Stars rating={product.rating} />

          {/* Nama produk — bold + underline via inline style (anti-override Tailwind) */}
          <h3
            className="font-bold text-gray-800 mt-1 text-sm leading-tight line-clamp-1"
            style={{ textDecoration: "underline" }}
          >
            {product.name}
          </h3>

          {/* Brand */}
          <p className="text-xs text-gray-400 mt-0.5 mb-3">
            By {product.brand}
          </p>

          {/* Harga + tombol + */}
          <div className="flex items-end justify-between">
            <p className="text-gray-800 font-bold text-sm">
              RP: {product.price.toLocaleString("id-ID")}
            </p>
            {/* Warna tombol + sesuai design: biru medium (#3B82F6 = blue-500) */}
            <button
              onClick={() => onAddToCart(product)}
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-9 h-9 flex items-center justify-center shadow-md transition-all duration-200 hover:scale-110 active:scale-95"
            >
              <FiPlus size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Menu() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPrice, setMaxPrice] = useState(150000);
  const [searchSidebar, setSearchSidebar] = useState("");

  const filtered = useMemo(() => {
    return dummyProducts.filter((p) => {
      const matchCat = !activeCategory || p.category === activeCategory;
      const matchPrice = p.price <= maxPrice;
      const matchSearch =
        p.name.toLowerCase().includes(searchSidebar.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchSidebar.toLowerCase());
      return matchCat && matchPrice && matchSearch;
    });
  }, [activeCategory, maxPrice, searchSidebar]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleCategory = (cat) => {
    setActiveCategory(activeCategory === cat ? null : cat);
    setCurrentPage(1);
  };

  const handleAddToCart = (product) => {
    alert(`${product.name} ditambahkan ke keranjang!`);
    // TODO: dispatch ke Redux cartSlice
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ===== HERO ===== */}
      <div
        className="relative flex items-center justify-center text-white overflow-hidden"
        style={{
          height: "340px",
          backgroundImage: `url(${heroImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay gelap natural seperti design */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative text-center px-6">
          <h1
            className="font-extrabold uppercase leading-tight drop-shadow-lg text-white"
            style={{
              fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
              letterSpacing: "0.02em",
            }}
          >
            ALWAYS FROZEN
            <br />
            FOOD
          </h1>
        </div>
      </div>

      {/* ===== KONTEN ===== */}
      <div className="max-w-7xl mx-auto px-6 py-10 flex gap-8">
        {/* ===== GRID PRODUK (kiri) ===== */}
        <div className="flex-1">
          {paginated.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-4xl mb-3">🧊</p>
              <p className="text-lg font-medium">Tidak ada produk ditemukan</p>
            </div>
          ) : (
            // overflow-visible penting! supaya foto yang menonjol ke atas tidak terpotong
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-16 justify-items-center">
              {paginated.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <FiChevronLeft />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-9 h-9 rounded-xl text-sm font-medium transition-all ${
                      currentPage === page
                        ? "bg-blue-600 text-white shadow-md"
                        : "border border-gray-200 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <FiChevronRight />
              </button>
            </div>
          )}
        </div>

        {/* ===== SIDEBAR (kanan) ===== */}
        <aside className="hidden lg:flex flex-col gap-5 w-60 flex-shrink-0">
          {/* Kategori */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-800 mb-3 text-base">
              Categori
            </h3>
            <div className="space-y-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategory(cat)}
                  className={`w-full text-left text-sm px-3 py-2 rounded-xl transition-all ${
                    activeCategory === cat
                      ? "bg-blue-600 text-white font-medium"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Search produk */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-4 py-3">
            <div className="relative flex items-center">
              <input
                type="text"
                value={searchSidebar}
                onChange={(e) => {
                  setSearchSidebar(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search Products"
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 pr-8"
              />
              <FiSearch size={14} className="absolute right-3 text-gray-400" />
            </div>
            {searchSidebar && (
              <p
                className={`text-xs mt-2 ${filtered.length > 0 ? "text-gray-400" : "text-red-400"}`}
              >
                {filtered.length > 0
                  ? `${filtered.length} produk ditemukan`
                  : "Produk tidak ditemukan"}
              </p>
            )}
          </div>

          {/* Filter Harga */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-800 mb-3 text-base">
              Filter By Price
            </h3>
            <input
              type="range"
              min={0}
              max={150000}
              step={10000}
              value={maxPrice}
              onChange={(e) => {
                setMaxPrice(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="w-full accent-blue-600"
            />
            <p className="text-xs text-gray-400 mt-1">
              Pricing Rp 0 – Rp {maxPrice.toLocaleString("id-ID")}
            </p>
          </div>

          {/* Best Deals — sesuai gambar 3: foto bulat kecil kiri, rating + nama + harga kanan */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-800 mb-3 text-base">
              Best Deals
            </h3>
            <div className="space-y-2">
              {bestDeals.map((item) => (
                <Link
                  to={`/product/${item.id}`}
                  key={item.id}
                  className="flex items-center gap-3 border border-gray-100 rounded-xl p-2 hover:bg-gray-50 transition-colors group"
                >
                  {/* Foto bulat kecil */}
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-gray-200 group-hover:border-blue-300 transition-colors">
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
                  <div className="min-w-0">
                    <Stars rating={item.rating} />
                    <p className="text-sm font-semibold text-gray-700 truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500 font-medium">
                      Rp {item.price.toLocaleString("id-ID")}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Menu;
