import { useState, useMemo, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/slices/cartSlice";
import { FiShoppingCart, FiTag, FiSearch } from "react-icons/fi";

// =====================
// DATA DUMMY PRODUK
// =====================
const dummyProducts = [
  { id: 1, name: "Chicken Wings Premium", brand: "So Good", category: "Frozen Chicken", price: 45000, image: "/src/assets/images/products/chiken nugget fiesta.jpg" },
  { id: 2, name: "Vegetables Nugget", brand: "Fiesta", category: "Frozen Chicken", price: 65000, image: "/src/assets/images/products/karage fiesta.jpg" },
  { id: 3, name: "Lumpia Frozen", brand: "Samijaya Jogja", category: "Frozen Vegetables", price: 85000, image: "/src/assets/images/products/siomay frozen.jpg" },
  { id: 4, name: "French Fries", brand: "Belfoods", category: "Frozen Vegetables", price: 25000, image: "/src/assets/images/products/siomay frozen.jpg" },
  { id: 13, name: "Minipou Isi Coklat", brand: "Chik Yen", category: "Frozen Chicken", price: 35000, image: "/src/assets/images/products/nugget kenzler.jpg" },
  { id: 14, name: "Baso Ayam Mini", brand: "Fiesta", category: "Frozen Chicken", price: 15000, image: "/src/assets/images/products/nugget kenzler.jpg" },
  { id: 16, name: "Chicken Nugget Fiesta", brand: "Fiesta", category: "Frozen Chicken", price: 45000, image: "/src/assets/images/products/nugget kenzler.jpg" },
  { id: 17, name: "Chicken Nugget Kanzler", brand: "Kanzler", category: "Frozen Chicken", price: 47000, image: "/src/assets/images/products/nugget kenzler.jpg" },
  { id: 18, name: "Siomay Frozen", brand: "Belfoods", category: "Frozen Seafood", price: 35000, image: "/src/assets/images/products/siomay frozen.jpg" }
];

const CATEGORIES = [
  "All Products",
  "Frozen Chicken",
  "Frozen Beef",
  "Frozen Seafood",
  "Frozen Vegetables",
];

function ProductCard({ product, onAddToCart }) {
  return (
    <div className="mt-12 w-full max-w-[220px] mx-auto">
      <div className="relative bg-white rounded-3xl shadow-[0_4px_20px_-5px_rgba(0,0,0,0.08)] hover:shadow-xl transition-shadow pt-14 pb-4 px-4 flex flex-col h-full border border-gray-50 items-center text-center">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-white rounded-full p-1 shadow-sm">
          <Link to={`/product/${product.id}`} className="block w-full h-full rounded-full overflow-hidden bg-gray-100">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" onError={(e) => { e.target.src = "https://placehold.co/120x120/e2e8f0/94a3b8?text=Img"; }} />
          </Link>
        </div>
        <div className="flex-1 flex flex-col w-full">
          <h3 className="font-bold text-gray-900 text-sm leading-tight line-clamp-1 mt-1">{product.name}</h3>
          <p className="text-[11px] text-gray-500 mt-1 mb-2">{product.category} By {product.brand}</p>
          <div className="mt-auto w-full">
            <p className="text-[#2453d4] font-bold text-[15px] mb-3">RP {product.price.toLocaleString("id-ID")}</p>
            <button onClick={() => onAddToCart(product)} className="w-full bg-[#1c54ff] hover:bg-blue-800 text-white rounded-full py-2 flex items-center justify-center gap-2 text-sm font-semibold shadow-md transition-transform hover:scale-105 active:scale-95">
              <FiShoppingCart size={16} /> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Search() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.auth?.isLogin || false);
  
  const [searchParams, setSearchParams] = useSearchParams();
  const queryFromUrl = searchParams.get("q") || ""; 

  const [searchInput, setSearchInput] = useState(queryFromUrl);
  const [activeCategory, setActiveCategory] = useState("All Products");
  const [priceFilter, setPriceFilter] = useState("all");

  useEffect(() => {
    setSearchInput(queryFromUrl);
  }, [queryFromUrl]);

  const filtered = useMemo(() => {
    return dummyProducts.filter((p) => {
      const matchCat = activeCategory === "All Products" || p.category === activeCategory;
      
      let matchPrice = true;
      if (priceFilter === "under30") matchPrice = p.price < 30000;
      if (priceFilter === "30to80") matchPrice = p.price >= 30000 && p.price <= 80000;
      if (priceFilter === "above80") matchPrice = p.price > 80000;
      
      // PERBAIKAN: Sekarang bisa mencari berdasarkan Nama Produk ATAU Kategori Produk
      const matchSearch = queryFromUrl === "" || 
                          p.name.toLowerCase().includes(queryFromUrl.toLowerCase()) ||
                          p.category.toLowerCase().includes(queryFromUrl.toLowerCase());
      
      return matchCat && matchPrice && matchSearch;
    });
  }, [activeCategory, priceFilter, queryFromUrl]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim() === "") {
      setSearchParams({});
    } else {
      setSearchParams({ q: searchInput });
    }
  };

  const handleResetSearch = () => {
    setSearchInput("");
    setSearchParams({});
    setActiveCategory("All Products");
    setPriceFilter("all");
  };

  const handleAddToCart = (product) => {
    if (!isLogin) {
      alert("Kamu harus login dulu untuk menambahkan produk ke keranjang!");
      navigate("/login");
      return;
    }
    dispatch(addToCart({ ...product }));
  };

  if (filtered.length === 0) {
    return (
      <div className="min-h-[75vh] bg-[#f8fafc] flex flex-col items-center justify-center px-6 py-20 text-center">
        <div className="w-20 h-20 bg-[#eef2ff] text-[#6484e5] rounded-full flex items-center justify-center mb-6">
          <svg stroke="currentColor" fill="none" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="36" width="36" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="7"></circle>
            <line x1="21" y1="21" x2="15" y2="15"></line>
            <line x1="8" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="8" y2="12"></line>
          </svg>
        </div>
        <h2 className="text-[22px] md:text-[26px] font-extrabold text-[#11327c] mb-3">
          Oops! Produk Tidak Ditemukan
        </h2>
        <p className="text-gray-500 text-[13px] md:text-sm max-w-sm mx-auto mb-6 leading-relaxed">
          Maaf, makanan beku premium yang Anda cari tidak tersedia atau mungkin ada kesalahan ketik.
        </p>
        <button onClick={handleResetSearch} className="text-[#1c54ff] text-xs md:text-sm font-bold hover:underline transition-all">
          Atau Jelajahi Katalog Produk &gt;
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] pb-24">
      <div className="bg-[#2453d4] pt-16 pb-28 px-6 text-center text-white rounded-b-[3rem] shadow-sm relative">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-widest uppercase mb-6">ALWAYS FROZEN</h1>
        <form onSubmit={handleSearchSubmit} className="max-w-xl mx-auto mb-6">
          <div className="relative flex items-center w-full h-12 rounded-full shadow-lg bg-white overflow-hidden border-2 border-transparent focus-within:border-blue-300 transition-colors">
            <div className="grid place-items-center h-full w-12 text-gray-400"><FiSearch size={20} /></div>
            <input className="peer h-full w-full outline-none text-sm text-gray-700 pr-4 bg-transparent" type="text" placeholder="Ketik produk atau kategori..." value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
            <button type="submit" className="bg-[#1c54ff] hover:bg-blue-800 text-white h-full px-6 text-sm font-semibold transition-colors">Cari</button>
          </div>
        </form>
        {queryFromUrl ? (
          <p className="text-blue-100 text-sm md:text-base font-light">Hasil pencarian untuk: <span className="font-bold">"{queryFromUrl}"</span></p>
        ) : (
          <p className="text-blue-100 text-sm md:text-base font-light">Menampilkan seluruh katalog produk</p>
        )}
        <p className="text-blue-200 text-xs mt-1">{filtered.length} produk ditemukan</p>
      </div>

      <div className="relative z-10 flex flex-wrap justify-center gap-3 px-6 -mt-6 max-w-4xl mx-auto">
        {CATEGORIES.map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-6 py-2.5 rounded-full text-xs md:text-sm font-semibold shadow-md transition-all border ${activeCategory === cat ? "bg-[#1c54ff] text-white border-[#1c54ff]" : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"}`}>
            {cat}
          </button>
        ))}
      </div>

      <div className="max-w-[1300px] mx-auto px-6 mt-16 flex flex-col lg:flex-row gap-10 items-start">
        <aside className="w-full lg:w-[240px] flex-shrink-0">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
            <h3 className="font-bold text-gray-800 text-sm mb-5 flex items-center gap-2"><FiTag className="text-[#2453d4]" size={16} /> Filter Harga</h3>
            <div className="space-y-4 text-sm text-gray-600">
              <label className="flex items-center gap-3 cursor-pointer"><input type="radio" name="price" className="accent-[#1c54ff] w-4 h-4" checked={priceFilter === "all"} onChange={() => setPriceFilter("all")} /> Semua harga</label>
              <label className="flex items-center gap-3 cursor-pointer"><input type="radio" name="price" className="accent-[#1c54ff] w-4 h-4" checked={priceFilter === "under30"} onChange={() => setPriceFilter("under30")} /> &lt; Rp 30.000</label>
              <label className="flex items-center gap-3 cursor-pointer"><input type="radio" name="price" className="accent-[#1c54ff] w-4 h-4" checked={priceFilter === "30to80"} onChange={() => setPriceFilter("30to80")} /> Rp 30.000 - Rp 80.000</label>
              <label className="flex items-center gap-3 cursor-pointer"><input type="radio" name="price" className="accent-[#1c54ff] w-4 h-4" checked={priceFilter === "above80"} onChange={() => setPriceFilter("above80")} /> &gt; Rp 80.000</label>
            </div>
          </div>
        </aside>

        <div className="flex-1 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-y-12 gap-x-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;