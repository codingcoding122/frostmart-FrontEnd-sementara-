import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/slices/cartSlice";
import { FiStar, FiShoppingCart, FiTag } from "react-icons/fi";

// =====================
// DATA DUMMY PRODUK
// =====================
const dummyProducts = [
  { id: 1, name: "Chicken Wings", brand: "So Good", category: "Frozen Chicken", price: 45000, rating: 5, image: "/src/assets/images/products/chiken nugget fiesta.jpg" },
  { id: 2, name: "Vegetables Nugget", brand: "Fiesta", category: "Frozen Chicken", price: 65000, rating: 5, image: "/src/assets/images/products/chiken nugget fiesta.jpg" },
  { id: 3, name: "Lumpia Frozen", brand: "Samijaya Jogja", category: "Frozen Chicken", price: 85000, rating: 4, image: "/src/assets/images/products/karage fiesta.jpg" },
  { id: 4, name: "French Fries", brand: "Belfoods", category: "Frozen Vegetables", price: 25000, rating: 4, image: "/src/assets/images/products/siomay frozen.jpg" },
  { id: 5, name: "Mixed Vegetables", brand: "Golden Farm", category: "Frozen Vegetables", price: 41000, rating: 4, image: "/src/assets/images/products/otak otak ikan.jpg" },
  { id: 6, name: "Beef Patties", brand: "Yona", category: "Frozen Beef", price: 45000, rating: 5, image: "/src/assets/images/products/sosis sapi fiesta.jpg" },
  { id: 7, name: "Dimsum Frozen", brand: "Damory", category: "Frozen Seafood", price: 28000, rating: 4, image: "/src/assets/images/products/otak otak ikan.jpg" },
  { id: 8, name: "Seafood Ebi Fry Tempura", brand: "Fiesta", category: "Frozen Seafood", price: 36000, rating: 4, image: "/src/assets/images/products/bakso ikan shifudo.jpg" },
  { id: 9, name: "Fillet Ikan Patin", brand: "Frozen Pangasius", category: "Frozen Seafood", price: 53000, rating: 4, image: "/src/assets/images/products/bakso ikan shifudo.jpg" },
  { id: 10, name: "Ayam Potong 1/2 Ekor", brand: "Frozen", category: "Frozen Chicken", price: 28000, rating: 4, image: "/src/assets/images/products/chiken sausage.jpg" },
  { id: 11, name: "Frozen Mix Vegetable", brand: "Golden Farm", category: "Frozen Vegetables", price: 32000, rating: 4, image: "/src/assets/images/products/siomay frozen.jpg" },
  { id: 12, name: "Risol Mayo", brand: "Nisofood", category: "Frozen Chicken", price: 20000, rating: 4, image: "/src/assets/images/products/karage fiesta.jpg" },
  { id: 13, name: "Minipou Isi Coklat", brand: "Chik Yen", category: "Frozen Chicken", price: 35000, rating: 4, image: "/src/assets/images/products/nugget kenzler.jpg" },
  { id: 14, name: "Baso Ayam Mini", brand: "Fiesta", category: "Frozen Chicken", price: 15000, rating: 5, image: "/src/assets/images/products/nugget kenzler.jpg" },
  { id: 15, name: "Chicken Sausage", brand: "SoGood", category: "Frozen Chicken", price: 48000, rating: 5, image: "/src/assets/images/products/chiken sausage.jpg" },
  { id: 16, name: "Nugget Kenzler", brand: "Kenzler", category: "Frozen Chicken", price: 47000, rating: 5, image: "/src/assets/images/products/nugget kenzler.jpg" },
  { id: 17, name: "Bakso Ikan Shifudo", brand: "Shifudo", category: "Frozen Seafood", price: 32000, rating: 5, image: "/src/assets/images/products/bakso ikan shifudo.jpg" },
  { id: 18, name: "Siomay Frozen", brand: "Belfoods", category: "Frozen Seafood", price: 35000, rating: 5, image: "/src/assets/images/products/siomay frozen.jpg" },
];

const CATEGORIES = [
  "All Products",
  "Frozen Chicken",
  "Frozen Beef",
  "Frozen Seafood",
  "Frozen Vegetables",
];

function Stars({ rating }) {
  return (
    <div className="flex gap-0.5 justify-center mt-2 mb-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <FiStar
          key={s}
          size={12}
          className={
            s <= Math.round(rating)
              ? "fill-[#facc15] text-[#facc15]"
              : "text-gray-200 fill-gray-200"
          }
        />
      ))}
    </div>
  );
}

// =====================
// CARD PRODUK (Link ke detail sudah aktif)
// =====================
function ProductCard({ product, onAddToCart }) {
  return (
    <div className="mt-14 w-full max-w-[220px] mx-auto">
      <div className="relative bg-white rounded-3xl shadow-[0_4px_20px_-5px_rgba(0,0,0,0.08)] hover:shadow-xl transition-shadow pt-14 pb-4 px-4 flex flex-col h-full border border-gray-50 items-center text-center">
        
        {/* Foto Bulat Menonjol (Sudah ditambah Link ke detail) */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-white rounded-full p-1 shadow-sm">
          <Link to={`/product/${product.id}`} className="block w-full h-full rounded-full overflow-hidden bg-gray-100">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "https://placehold.co/120x120/e2e8f0/94a3b8?text=Img";
              }}
            />
          </Link>
        </div>

        <div className="flex-1 flex flex-col w-full">
          <Stars rating={product.rating} />
          
          <h3 className="font-bold text-gray-900 text-sm leading-tight line-clamp-1 underline decoration-gray-300 underline-offset-2">
            {product.name}
          </h3>
          <p className="text-[11px] text-gray-500 mt-1 mb-2">
            {product.brand} - {product.category}
          </p>

          <div className="mt-auto w-full">
            <p className="text-blue-700 font-bold text-[15px] mb-3">
              RP: {product.price.toLocaleString("id-ID")}
            </p>
            <button
              onClick={() => onAddToCart(product)}
              className="w-full bg-[#1c54ff] hover:bg-blue-800 text-white rounded-lg py-2 flex items-center justify-center gap-2 text-sm font-semibold shadow-md transition-transform hover:scale-105 active:scale-95"
            >
              <FiShoppingCart size={16} /> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Menu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.auth.isLogin);

  const [activeCategory, setActiveCategory] = useState("All Products");
  const [priceFilter, setPriceFilter] = useState("all");

  const filtered = useMemo(() => {
    return dummyProducts.filter((p) => {
      const matchCat = activeCategory === "All Products" || p.category === activeCategory;
      let matchPrice = true;
      if (priceFilter === "under30") matchPrice = p.price < 30000;
      if (priceFilter === "30to80") matchPrice = p.price >= 30000 && p.price <= 80000;
      if (priceFilter === "above80") matchPrice = p.price > 80000;
      return matchCat && matchPrice;
    });
  }, [activeCategory, priceFilter]);

  const handleAddToCart = (product) => {
    if (!isLogin) {
      alert("Kamu harus login dulu untuk menambahkan produk ke keranjang!");
      navigate("/login");
      return;
    }
    dispatch(addToCart({ ...product }));
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <div className="relative bg-gradient-to-br from-[#1c54ff] to-[#4c7cff] pt-20 pb-28 text-center text-white flex flex-col items-center justify-center overflow-hidden">
        <h1 className="font-extrabold uppercase tracking-widest drop-shadow-md text-5xl md:text-6xl mb-3">
          ALWAYS FROZEN
        </h1>
        <p className="text-sm md:text-base font-light text-blue-100 mb-6">
          Ketik nama produk di search bar untuk mulai mencari
        </p>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[50px] md:h-[70px]">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118,130.42,109.84,196.2,88.75Z" className="fill-[#f5f5f5]"></path>
          </svg>
        </div>
      </div>

      <div className="relative z-10 flex flex-wrap justify-center gap-3 md:gap-4 px-6 -mt-8 max-w-4xl mx-auto">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-sm border ${
              activeCategory === cat
                ? "bg-[#1c54ff] text-white border-[#1c54ff]"
                : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="max-w-[1300px] mx-auto px-6 py-12 flex flex-col lg:flex-row gap-10 items-start">
        <aside className="w-full lg:w-[240px] flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-gray-800 text-sm mb-5 flex items-center gap-2">
              <FiTag className="text-yellow-500" size={16} /> Filter Harga
            </h3>
            <div className="space-y-4 text-sm text-gray-600">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="radio" name="price" className="accent-[#1c54ff] w-4 h-4" checked={priceFilter === "all"} onChange={() => setPriceFilter("all")} /> Semua harga
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="radio" name="price" className="accent-[#1c54ff] w-4 h-4" checked={priceFilter === "under30"} onChange={() => setPriceFilter("under30")} /> &lt; Rp 30.000
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="radio" name="price" className="accent-[#1c54ff] w-4 h-4" checked={priceFilter === "30to80"} onChange={() => setPriceFilter("30to80")} /> Rp 30.000 - Rp 80.000
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="radio" name="price" className="accent-[#1c54ff] w-4 h-4" checked={priceFilter === "above80"} onChange={() => setPriceFilter("above80")} /> &gt; Rp 80.000
              </label>
            </div>
          </div>
        </aside>

        <div className="flex-1 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;