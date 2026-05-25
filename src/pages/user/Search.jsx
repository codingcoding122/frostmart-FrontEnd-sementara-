import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { FiShoppingCart, FiStar } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/slices/cartSlice";

const DUMMY_PRODUCTS = [
  {
    id: 1,
    name: "Chicken Wings",
    subLabel: "So Good · Frozen Chicken",
    category: "Frozen Chicken",
    price: 45000,
    rating: 4.5,
    image: "/src/assets/images/products/chiken nugget fiesta.jpg",
  },
  {
    id: 2,
    name: "Vegetables Nugget",
    subLabel: "Fiesta · Frozen Chicken",
    category: "Frozen Chicken",
    price: 65000,
    rating: 4.2,
    image: "/src/assets/images/products/chiken nugget fiesta.jpg",
  },
  {
    id: 3,
    name: "Lumpia Frozen",
    subLabel: "Samijaya Jogja · Frozen Chicken",
    category: "Frozen Chicken",
    price: 85000,
    rating: 4.0,
    image: "/src/assets/images/products/karage fiesta.jpg",
  },
  {
    id: 4,
    name: "French Fries",
    subLabel: "Belfoods · Frozen Vegetables",
    category: "Frozen Vegetables",
    price: 25000,
    rating: 4.3,
    image: "/src/assets/images/products/siomay frozen.jpg",
  },
  {
    id: 5,
    name: "Mixed Vegetables",
    subLabel: "Golden Farm · Frozen Vegetables",
    category: "Frozen Vegetables",
    price: 41000,
    rating: 4.1,
    image: "/src/assets/images/products/otak otak ikan.jpg",
  },
  {
    id: 6,
    name: "Beef Patties",
    subLabel: "Yona · Frozen Beef",
    category: "Frozen Beef",
    price: 45000,
    rating: 4.4,
    image: "/src/assets/images/products/sosis sapi fiesta.jpg",
  },
  {
    id: 7,
    name: "Dimsum Frozen",
    subLabel: "Damory · Frozen Seafood",
    category: "Frozen Seafood",
    price: 28000,
    rating: 4.2,
    image: "/src/assets/images/products/otak otak ikan.jpg",
  },
  {
    id: 8,
    name: "Seafood Ebi Fry Tempura",
    subLabel: "Fiesta · Frozen Seafood",
    category: "Frozen Seafood",
    price: 36000,
    rating: 4.1,
    image: "/src/assets/images/products/bakso ikan shifudo.jpg",
  },
  {
    id: 9,
    name: "Fillet Ikan Patin",
    subLabel: "Frozen Pangasius · Frozen Seafood",
    category: "Frozen Seafood",
    price: 53000,
    rating: 4.3,
    image: "/src/assets/images/products/bakso ikan shifudo.jpg",
  },
  {
    id: 10,
    name: "Ayam Potong 1/2 Ekor",
    subLabel: "Frozen · Frozen Chicken",
    category: "Frozen Chicken",
    price: 28000,
    rating: 4.0,
    image: "/src/assets/images/products/chiken sausage.jpg",
  },
  {
    id: 11,
    name: "Frozen Mix Vegetable",
    subLabel: "Golden Farm · Frozen Vegetables",
    category: "Frozen Vegetables",
    price: 32000,
    rating: 4.1,
    image: "/src/assets/images/products/siomay frozen.jpg",
  },
  {
    id: 12,
    name: "Risol Mayo",
    subLabel: "Nisofood · Frozen Chicken",
    category: "Frozen Chicken",
    price: 20000,
    rating: 3.8,
    image: "/src/assets/images/products/karage fiesta.jpg",
  },
  {
    id: 13,
    name: "Minipou Isi Coklat",
    subLabel: "Chik Yen · Frozen Chicken",
    category: "Frozen Chicken",
    price: 35000,
    rating: 4.4,
    image: "/src/assets/images/products/nugget kenzler.jpg",
  },
  {
    id: 14,
    name: "Baso Ayam Mini",
    subLabel: "Fiesta · Frozen Chicken",
    category: "Frozen Chicken",
    price: 15000,
    rating: 4.1,
    image: "/src/assets/images/products/nugget kenzler.jpg",
  },
  {
    id: 15,
    name: "Chicken Sausage",
    subLabel: "SoGood · Frozen Chicken",
    category: "Frozen Chicken",
    price: 48000,
    rating: 4.5,
    image: "/src/assets/images/products/chiken sausage.jpg",
  },
  {
    id: 16,
    name: "Nugget Kenzler",
    subLabel: "Kenzler · Frozen Chicken",
    category: "Frozen Chicken",
    price: 47000,
    rating: 4.6,
    image: "/src/assets/images/products/nugget kenzler.jpg",
  },
  {
    id: 17,
    name: "Bakso Ikan Shifudo",
    subLabel: "Shifudo · Frozen Seafood",
    category: "Frozen Seafood",
    price: 32000,
    rating: 4.1,
    image: "/src/assets/images/products/bakso ikan shifudo.jpg",
  },
  {
    id: 18,
    name: "Siomay Frozen",
    subLabel: "Belfoods · Frozen Seafood",
    category: "Frozen Seafood",
    price: 35000,
    rating: 4.4,
    image: "/src/assets/images/products/siomay frozen.jpg",
  },
];

const CATEGORIES = [
  { label: "All Products", value: "" },
  { label: "Frozen Chicken", value: "Frozen Chicken" },
  { label: "Frozen Beef", value: "Frozen Beef" },
  { label: "Frozen Seafood", value: "Frozen Seafood" },
  { label: "Frozen Vegetables", value: "Frozen Vegetables" },
];

const PRICE_RANGES = [
  { label: "Semua harga", value: "all" },
  { label: "<Rp 30.000", value: "lt30" },
  { label: "Rp 30.000 - Rp 80.000", value: "30to80" },
  { label: "> Rp 80.000", value: "gt80" },
];

function applyFilters(products, query, category, priceRange) {
  let result = [...products];
  if (query.trim())
    result = result.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase()),
    );
  if (category) result = result.filter((p) => p.category === category);
  if (priceRange === "lt30") result = result.filter((p) => p.price < 30000);
  else if (priceRange === "30to80")
    result = result.filter((p) => p.price >= 30000 && p.price <= 80000);
  else if (priceRange === "gt80")
    result = result.filter((p) => p.price > 80000);
  return result;
}

function Stars({ rating }) {
  return (
    <div className="flex justify-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <FiStar
          key={s}
          size={12}
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

const CIRCLE_SIZE = 120;
const OVERLAP = Math.round(CIRCLE_SIZE * 0.55);

function ProductCard({ product, onAddToCart, navigate }) {
  return (
    <div
      style={{ paddingTop: `${OVERLAP}px` }}
      className="mx-auto w-full max-w-[210px]"
    >
      <div
        className="relative bg-white rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col pb-4 px-3 cursor-pointer"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        {/* Foto bulat menonjol */}
        <div
          className="absolute left-1/2 -translate-x-1/2 rounded-full overflow-hidden shadow-lg bg-gray-100 border-4 border-white"
          style={{
            width: `${CIRCLE_SIZE}px`,
            height: `${CIRCLE_SIZE}px`,
            top: `-${OVERLAP}px`,
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              e.target.src =
                "https://placehold.co/120x120/e2e8f0/94a3b8?text=F";
            }}
          />
        </div>

        <div style={{ height: `${CIRCLE_SIZE - OVERLAP + 8}px` }} />

        <div className="flex flex-col items-center text-center w-full">
          {product.rating && <Stars rating={product.rating} />}
          <h3 className="font-bold text-gray-800 mt-1 text-sm leading-tight line-clamp-1 underline">
            {product.name}
          </h3>
          {product.subLabel && (
            <p className="text-xs text-gray-400 mt-0.5">{product.subLabel}</p>
          )}
          <p className="text-blue-600 font-bold text-sm mt-2">
            RP: {product.price.toLocaleString("id-ID")}
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="mt-3 w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-lg transition"
          >
            <FiShoppingCart size={14} /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Search() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.auth.isLogin);

  const query = searchParams.get("q") || "";
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("all");

  const filtered = applyFilters(
    DUMMY_PRODUCTS,
    query,
    selectedCategory,
    selectedPrice,
  );

  const handleAddToCart = (product) => {
    if (!isLogin) {
      alert("Kamu harus login dulu untuk menambahkan produk ke keranjang!");
      navigate("/login");
      return;
    }
    dispatch(addToCart({ ...product }));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HERO */}
      <div
        className="relative text-center pt-16 pb-24"
        style={{
          background:
            "linear-gradient(180deg, #60a5fa 0%, #3b3fd8 60%, #3730c4 100%)",
        }}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-white uppercase tracking-widest mb-5">
          Always Frozen
        </h1>
        {query ? (
          <div className="text-white/90 text-base space-y-1">
            <p>
              Hasil pencarian untuk:{" "}
              <span className="font-semibold">"{query}"</span>
            </p>
            <p>{filtered.length} produk ditemukan</p>
          </div>
        ) : (
          <p className="text-white/80 text-base">
            Ketik nama produk di search bar untuk mulai mencari
          </p>
        )}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg
            viewBox="0 0 1440 100"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            style={{ height: "80px", width: "100%" }}
          >
            <path
              d="M0,60 C200,110 400,20 600,60 C800,100 1000,20 1200,55 C1320,75 1400,50 1440,60 L1440,100 L0,100 Z"
              fill="#f3f4f6"
            />
          </svg>
        </div>
      </div>

      {/* KONTEN */}
      <div className="bg-gray-100 px-6 pt-10 pb-20">
        <div className="max-w-5xl mx-auto">
          {/* KATEGORI center */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-5 py-2 rounded-full border text-sm font-medium transition ${selectedCategory === cat.value ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-600 border-gray-300 hover:border-blue-400"}`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex gap-6 items-start">
            {/* FILTER HARGA — selalu tampil */}
            <div className="w-52 shrink-0 bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-700 mb-4 text-sm">
                🏷️ Filter Harga
              </h3>
              <div className="space-y-3">
                {PRICE_RANGES.map((range) => (
                  <label
                    key={range.value}
                    className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 hover:text-blue-600 transition"
                  >
                    <input
                      type="radio"
                      name="price"
                      value={range.value}
                      checked={selectedPrice === range.value}
                      onChange={() => setSelectedPrice(range.value)}
                      className="accent-blue-600"
                    />
                    {range.label}
                  </label>
                ))}
              </div>
            </div>

            {/* GRID PRODUK */}
            <div className="flex-1">
              {filtered.length === 0 ? (
                <div className="text-center text-gray-400 py-20">
                  <p className="text-base font-medium">
                    Produk tidak ditemukan
                  </p>
                  <p className="text-sm mt-1">
                    Coba ubah filter harga atau kata kunci pencarian
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-16 justify-items-center pt-10">
                  {filtered.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={handleAddToCart}
                      navigate={navigate}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
