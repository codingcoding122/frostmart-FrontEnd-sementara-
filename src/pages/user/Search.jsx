import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiShoppingCart, FiStar, FiX } from "react-icons/fi";

// =====================
// DATA DUMMY PRODUK
// =====================
const dummyProducts = [
  {
    id: 1,
    name: "Chicken Nugget Fiesta",
    brand: "Fiesta",
    category: "Frozen Chicken",
    price: 45000,
    rating: 4.5,
    image: "/src/assets/images/products/chiken nugget fiesta.jpg",
  },
  {
    id: 2,
    name: "Chicken Sausage",
    brand: "So Good",
    category: "Frozen Chicken",
    price: 38000,
    rating: 4.2,
    image: "/src/assets/images/products/chiken sausage.jpg",
  },
  {
    id: 3,
    name: "Karage Fiesta",
    brand: "Fiesta",
    category: "Frozen Chicken",
    price: 42000,
    rating: 4.3,
    image: "/src/assets/images/products/karage fiesta.jpg",
  },
  {
    id: 4,
    name: "Nugget Kenzler",
    brand: "Kenzler",
    category: "Frozen Chicken",
    price: 47000,
    rating: 4.6,
    image: "/src/assets/images/products/nugget kenzler.jpg",
  },
  {
    id: 5,
    name: "Bakso Ikan Shifudo",
    brand: "Shifudo",
    category: "Frozen Seafood",
    price: 32000,
    rating: 4.1,
    image: "/src/assets/images/products/bakso ikan shifudo.jpg",
  },
  {
    id: 6,
    name: "Otak-Otak Ikan",
    brand: "Belfoods",
    category: "Frozen Seafood",
    price: 28000,
    rating: 4.0,
    image: "/src/assets/images/products/otak otak ikan.jpg",
  },
  {
    id: 7,
    name: "Siomay Frozen",
    brand: "Belfoods",
    category: "Frozen Seafood",
    price: 35000,
    rating: 4.4,
    image: "/src/assets/images/products/siomay frozen.jpg",
  },
  {
    id: 8,
    name: "Sosis Sapi Fiesta",
    brand: "Fiesta",
    category: "Frozen Beef",
    price: 48000,
    rating: 4.5,
    image: "/src/assets/images/products/sosis sapi fiesta.jpg",
  },
  {
    id: 9,
    name: "Dimsum Frozen",
    brand: "Damory",
    category: "Frozen Seafood",
    price: 29000,
    rating: 4.2,
    image: "/src/assets/images/products/otak otak ikan.jpg",
  },
  {
    id: 10,
    name: "Lumpia Frozen",
    brand: "Belfoods",
    category: "Frozen Chicken",
    price: 25000,
    rating: 4.0,
    image: "/src/assets/images/products/chiken nugget fiesta.jpg",
  },
  {
    id: 11,
    name: "Beef Burger Patty",
    brand: "Golden Farm",
    category: "Frozen Beef",
    price: 55000,
    rating: 4.7,
    image: "/src/assets/images/products/sosis sapi fiesta.jpg",
  },
  {
    id: 12,
    name: "Fillet Ikan Patin",
    brand: "Nisofood",
    category: "Frozen Seafood",
    price: 53000,
    rating: 4.3,
    image: "/src/assets/images/products/bakso ikan shifudo.jpg",
  },
  {
    id: 13,
    name: "French Fries Belfoods",
    brand: "Belfoods",
    category: "Frozen Vegetables",
    price: 25000,
    rating: 4.0,
    image: "/src/assets/images/products/siomay frozen.jpg",
  },
  {
    id: 14,
    name: "Mixed Vegetables",
    brand: "Golden Farm",
    category: "Frozen Vegetables",
    price: 41000,
    rating: 4.1,
    image: "/src/assets/images/products/otak otak ikan.jpg",
  },
  {
    id: 15,
    name: "Seafood Ebi Fry",
    brand: "Fiesta",
    category: "Frozen Seafood",
    price: 36000,
    rating: 4.2,
    image: "/src/assets/images/products/bakso ikan shifudo.jpg",
  },
  {
    id: 16,
    name: "Risol Mayo",
    brand: "Nisofood",
    category: "Frozen Chicken",
    price: 20000,
    rating: 3.9,
    image: "/src/assets/images/products/karage fiesta.jpg",
  },
  {
    id: 17,
    name: "Ayam Potong 1/2 Ekor",
    brand: "Frozen",
    category: "Frozen Chicken",
    price: 28000,
    rating: 4.0,
    image: "/src/assets/images/products/chiken sausage.jpg",
  },
  {
    id: 18,
    name: "Baso Ayam Mini",
    brand: "Fiesta",
    category: "Frozen Chicken",
    price: 15000,
    rating: 4.1,
    image: "/src/assets/images/products/nugget kenzler.jpg",
  },
];

const CATEGORIES = [
  "All Products",
  "Frozen Chicken",
  "Frozen Beef",
  "Frozen Seafood",
  "Frozen Vegetables",
];
const PRICE_OPTIONS = [
  { label: "Semua harga", min: 0, max: Infinity },
  { label: "<Rp 30.000", min: 0, max: 30000 },
  { label: "Rp 30.000 - Rp 80.000", min: 30000, max: 80000 },
  { label: "> Rp 80.000", min: 80000, max: Infinity },
];

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
              : "text-gray-300"
          }
        />
      ))}
    </div>
  );
}

function Search() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Products");
  const [priceFilter, setPriceFilter] = useState(0);

  const hasQuery = query.trim().length > 0;

  const filtered = useMemo(() => {
    if (!hasQuery) return [];
    return dummyProducts.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.brand.toLowerCase().includes(query.toLowerCase());
      const matchCat =
        activeCategory === "All Products" || p.category === activeCategory;
      const { min, max } = PRICE_OPTIONS[priceFilter];
      const matchPrice = p.price >= min && p.price <= max;
      return matchSearch && matchCat && matchPrice;
    });
  }, [query, activeCategory, priceFilter]);

  const handleAddToCart = (product) => {
    alert(`${product.name} ditambahkan ke keranjang!`);
    // TODO: dispatch ke Redux cartSlice
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO dengan wave */}
      <div className="relative bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-600 pb-16 pt-12 px-6 text-center overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" />

        <h1 className="text-white font-extrabold text-4xl tracking-widest uppercase mb-3 relative">
          ALWAYS FROZEN
        </h1>

        {hasQuery ? (
          <>
            <p className="text-blue-100 text-base mb-1">
              Hasil pencarian untuk:{" "}
              <span className="font-bold text-white">"{query}"</span>
            </p>
            <p className="text-blue-200 text-sm mb-6">
              {filtered.length} produk ditemukan
            </p>
          </>
        ) : (
          <p className="text-blue-100 text-base mb-6">
            Ketik nama produk yang kamu cari
          </p>
        )}

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari produk frozen food..."
            autoFocus
            className="w-full pl-11 pr-10 py-3.5 rounded-2xl text-gray-800 text-base shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <FiX />
            </button>
          )}
        </div>

        {/* Wave SVG */}
        <div className="absolute bottom-0 left-0 right-0 leading-none pointer-events-none">
          <svg
            viewBox="0 0 1440 60"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className="w-full h-12"
          >
            <path
              d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z"
              fill="#f9fafb"
            />
          </svg>
        </div>
      </div>

      {/* KONTEN */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Kategori tabs */}
        <div className="flex gap-2 flex-wrap mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-blue-600 text-white border-blue-600 shadow-md"
                  : "bg-white text-gray-600 border-gray-200 hover:border-blue-400 hover:text-blue-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Belum ketik apapun */}
        {!hasQuery && (
          <div className="text-center py-24">
            <div className="text-7xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Cari produk frozen food favoritmu
            </h3>
            <p className="text-gray-400">
              Ketik nama produk, merek, atau kategori di kotak pencarian
            </p>
          </div>
        )}

        {/* Tidak ditemukan */}
        {hasQuery && filtered.length === 0 && (
          <div className="text-center py-24">
            <div className="text-7xl mb-4">😕</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Produk tidak ditemukan
            </h3>
            <p className="text-gray-400">
              Coba kata kunci lain atau pilih kategori yang berbeda
            </p>
            <button
              onClick={() => setQuery("")}
              className="mt-5 px-6 py-2 bg-blue-600 text-white rounded-xl text-sm hover:bg-blue-700 transition-colors"
            >
              Reset Pencarian
            </button>
          </div>
        )}

        {/* Hasil */}
        {hasQuery && filtered.length > 0 && (
          <div className="flex gap-8">
            {/* Sidebar filter harga */}
            <aside className="hidden md:block w-52 flex-shrink-0">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <h3 className="font-semibold text-gray-800 mb-4">
                  🏷 Filter Harga
                </h3>
                <div className="space-y-3">
                  {PRICE_OPTIONS.map((opt, idx) => (
                    <label
                      key={idx}
                      className="flex items-center gap-3 cursor-pointer"
                      onClick={() => setPriceFilter(idx)}
                    >
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${priceFilter === idx ? "border-blue-600 bg-blue-600" : "border-gray-300"}`}
                      >
                        {priceFilter === idx && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>
                      <span
                        className={`text-sm ${priceFilter === idx ? "text-blue-600 font-medium" : "text-gray-600"}`}
                      >
                        {opt.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </aside>

            {/* Grid produk */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  <div className="h-44 overflow-hidden bg-gray-50">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src =
                          "https://placehold.co/400x300/e2e8f0/94a3b8?text=Frozen+Food";
                      }}
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-semibold text-gray-800 text-base mb-1 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-400 mb-2">
                      {product.brand} · {product.category}
                    </p>
                    <Stars rating={product.rating} />
                    <p className="text-blue-600 font-bold text-lg mt-3">
                      RP: {product.price.toLocaleString("id-ID")}
                    </p>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="mt-3 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-2 text-sm font-medium transition-colors"
                    >
                      <FiShoppingCart size={15} /> Add to Cart
                    </button>
                    <Link
                      to={`/product/${product.id}`}
                      className="mt-2 block text-center border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl py-2 text-sm font-medium transition-all duration-200"
                    >
                      Lihat Detail
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
