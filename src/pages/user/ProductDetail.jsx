import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/slices/cartSlice";
import { 
  FiStar, FiHeart, FiShoppingCart, FiChevronRight, 
  FiCheckCircle, FiShield, FiTruck, FiBox, FiClock, FiMinus, FiPlus, FiUser
} from "react-icons/fi";

// =====================
// DUMMY DATA LENGKAP (Sesuai dengan semua produk di halaman Menu)
// =====================
const defaultImages = [
  "/src/assets/images/products/chiken nugget fiesta.jpg", 
  "/src/assets/images/products/karage fiesta.jpg",
  "/src/assets/images/products/chiken sausage.jpg",
  "/src/assets/images/products/siomay frozen.jpg"
];

const allProducts = [
  { id: 1, name: "Chicken Wings Premium", brand: "So Good", category: "Frozen Chicken", price: 45000, originalPrice: 50000, rating: 5, reviews: 128, description: "Sayap ayam pilihan yang dibumbui dengan rempah-rempah berkualitas.", images: defaultImages, features: [{ icon: <FiBox />, text: "Frozen / Beku" }, { icon: <FiCheckCircle />, text: "400g / Pack" }, { icon: <FiClock />, text: "6 Bulan Simpan" }, { icon: <FiShield />, text: "Kualitas Terjamin" }], nutrition: { calories: 210, fat: "14%", satFat: "8%", sodium: "18%", carbs: "6%", protein: "15%" } },
  { id: 2, name: "Vegetables Nugget", brand: "Fiesta", category: "Frozen Chicken", price: 65000, originalPrice: 70000, rating: 5, reviews: 89, description: "Nugget ayam sehat dengan paduan sayuran segar di dalamnya.", images: defaultImages, features: [{ icon: <FiBox />, text: "Frozen / Beku" }, { icon: <FiCheckCircle />, text: "500g / Pack" }, { icon: <FiClock />, text: "6 Bulan Simpan" }, { icon: <FiShield />, text: "Tinggi Serat" }], nutrition: { calories: 180, fat: "10%", satFat: "5%", sodium: "12%", carbs: "10%", protein: "14%" } },
  { id: 3, name: "Lumpia Frozen", brand: "Samijaya Jogja", category: "Frozen Vegetables", price: 85000, originalPrice: 90000, rating: 5, reviews: 120, description: "Lumpia Semarang autentik yang dibekukan dengan sempurna.", images: defaultImages, features: [{ icon: <FiBox />, text: "Frozen / Beku" }, { icon: <FiCheckCircle />, text: "10 Pcs / Pack" }, { icon: <FiClock />, text: "3 Bulan Simpan" }, { icon: <FiShield />, text: "Resep Tradisional" }], nutrition: { calories: 250, fat: "12%", satFat: "4%", sodium: "20%", carbs: "25%", protein: "8%" } },
  { id: 4, name: "French Fries", brand: "Belfoods", category: "Frozen Vegetables", price: 25000, originalPrice: 30000, rating: 5, reviews: 300, description: "Kentang goreng renyah pilihan dengan potongan lurus.", images: defaultImages, features: [{ icon: <FiBox />, text: "Frozen / Beku" }, { icon: <FiCheckCircle />, text: "1 Kg / Pack" }, { icon: <FiClock />, text: "6 Bulan Simpan" }, { icon: <FiShield />, text: "Renyah Maksimal" }], nutrition: { calories: 160, fat: "8%", satFat: "2%", sodium: "10%", carbs: "20%", protein: "3%" } },
  { id: 5, name: "Mixed Vegetables", brand: "Golden Farm", category: "Frozen Vegetables", price: 41000, originalPrice: 45000, rating: 4, reviews: 55, description: "Kacang polong, jagung manis, dan wortel pilihan yang dibekukan.", images: defaultImages, features: [{ icon: <FiBox />, text: "Frozen / Beku" }, { icon: <FiCheckCircle />, text: "500g / Pack" }, { icon: <FiClock />, text: "12 Bulan Simpan" }, { icon: <FiShield />, text: "Sayur Segar" }], nutrition: { calories: 90, fat: "1%", satFat: "0%", sodium: "5%", carbs: "15%", protein: "4%" } },
  { id: 6, name: "Beef Patties", brand: "Yona", category: "Frozen Beef", price: 45000, originalPrice: 50000, rating: 5, reviews: 210, description: "Daging burger sapi asli dengan bumbu lezat.", images: defaultImages, features: [{ icon: <FiBox />, text: "Frozen / Beku" }, { icon: <FiCheckCircle />, text: "6 Pcs / Pack" }, { icon: <FiClock />, text: "6 Bulan Simpan" }, { icon: <FiShield />, text: "Daging Sapi Asli" }], nutrition: { calories: 250, fat: "18%", satFat: "8%", sodium: "20%", carbs: "2%", protein: "20%" } },
  { id: 7, name: "Dimsum Frozen", brand: "Damory", category: "Frozen Seafood", price: 28000, originalPrice: 32000, rating: 4, reviews: 112, description: "Dimsum ayam dan udang kualitas restoran.", images: defaultImages, features: [{ icon: <FiBox />, text: "Frozen / Beku" }, { icon: <FiCheckCircle />, text: "12 Pcs / Pack" }, { icon: <FiClock />, text: "3 Bulan Simpan" }, { icon: <FiShield />, text: "Halal" }], nutrition: { calories: 150, fat: "5%", satFat: "2%", sodium: "15%", carbs: "12%", protein: "8%" } },
  { id: 8, name: "Seafood Ebi Fry Tempura", brand: "Fiesta", category: "Frozen Seafood", price: 36000, originalPrice: 40000, rating: 5, reviews: 78, description: "Udang utuh berbalut tepung roti yang renyah.", images: defaultImages, features: [{ icon: <FiBox />, text: "Frozen / Beku" }, { icon: <FiCheckCircle />, text: "8 Pcs / Pack" }, { icon: <FiClock />, text: "6 Bulan Simpan" }, { icon: <FiShield />, text: "Udang Utuh" }], nutrition: { calories: 200, fat: "10%", satFat: "3%", sodium: "18%", carbs: "15%", protein: "12%" } },
  { id: 9, name: "Fillet Ikan Patin", brand: "Frozen Pangasius", category: "Frozen Seafood", price: 53000, originalPrice: 60000, rating: 4, reviews: 44, description: "Fillet ikan patin tanpa tulang yang lembut.", images: defaultImages, features: [{ icon: <FiBox />, text: "Frozen / Beku" }, { icon: <FiCheckCircle />, text: "1 Kg / Pack" }, { icon: <FiClock />, text: "6 Bulan Simpan" }, { icon: <FiShield />, text: "Tanpa Tulang" }], nutrition: { calories: 120, fat: "4%", satFat: "1%", sodium: "8%", carbs: "0%", protein: "18%" } },
  { id: 10, name: "Ayam Potong 1/2 Ekor", brand: "Frozen", category: "Frozen Chicken", price: 28000, originalPrice: 30000, rating: 5, reviews: 90, description: "Ayam potong segar yang langsung dibekukan.", images: defaultImages, features: [{ icon: <FiBox />, text: "Frozen / Beku" }, { icon: <FiCheckCircle />, text: "1/2 Ekor" }, { icon: <FiClock />, text: "3 Bulan Simpan" }, { icon: <FiShield />, text: "Ayam Segar" }], nutrition: { calories: 240, fat: "15%", satFat: "4%", sodium: "10%", carbs: "0%", protein: "25%" } },
  { id: 11, name: "Frozen Mix Vegetable", brand: "Golden Farm", category: "Frozen Vegetables", price: 32000, originalPrice: 35000, rating: 4, reviews: 65, description: "Campuran sayuran beku praktis.", images: defaultImages, features: [{ icon: <FiBox />, text: "Frozen / Beku" }, { icon: <FiCheckCircle />, text: "500g / Pack" }, { icon: <FiClock />, text: "12 Bulan Simpan" }, { icon: <FiShield />, text: "Sayur Pilihan" }], nutrition: { calories: 90, fat: "1%", satFat: "0%", sodium: "5%", carbs: "15%", protein: "4%" } },
  { id: 12, name: "Risol Mayo", brand: "Nisofood", category: "Frozen Chicken", price: 20000, originalPrice: 25000, rating: 5, reviews: 150, description: "Risol isi mayo lumer dengan daging asap.", images: defaultImages, features: [{ icon: <FiBox />, text: "Frozen / Beku" }, { icon: <FiCheckCircle />, text: "10 Pcs / Pack" }, { icon: <FiClock />, text: "2 Bulan Simpan" }, { icon: <FiShield />, text: "Isian Lumer" }], nutrition: { calories: 280, fat: "18%", satFat: "5%", sodium: "22%", carbs: "20%", protein: "6%" } },
  { id: 13, name: "Minipou Isi Coklat", brand: "Chik Yen", category: "Frozen Chicken", price: 35000, originalPrice: 40000, rating: 4, reviews: 88, description: "Bakpao mini isi coklat lumer.", images: defaultImages, features: [{ icon: <FiBox />, text: "Frozen / Beku" }, { icon: <FiCheckCircle />, text: "20 Pcs / Pack" }, { icon: <FiClock />, text: "3 Bulan Simpan" }, { icon: <FiShield />, text: "Cocok untuk Anak" }], nutrition: { calories: 150, fat: "5%", satFat: "2%", sodium: "10%", carbs: "22%", protein: "4%" } },
  { id: 14, name: "Baso Ayam Mini", brand: "Fiesta", category: "Frozen Chicken", price: 15000, originalPrice: 18000, rating: 4, reviews: 45, description: "Baso ayam ukuran sekali gigit yang kenyal dan gurih.", images: defaultImages, features: [{ icon: <FiBox />, text: "Frozen / Beku" }, { icon: <FiCheckCircle />, text: "250g / Pack" }, { icon: <FiClock />, text: "4 Bulan Simpan" }, { icon: <FiShield />, text: "Praktis" }], nutrition: { calories: 150, fat: "8%", satFat: "3%", sodium: "15%", carbs: "5%", protein: "10%" } },
  { id: 15, name: "Chicken Sausage", brand: "SoGood", category: "Frozen Chicken", price: 48000, originalPrice: 52000, rating: 5, reviews: 130, description: "Sosis ayam pilihan yang lezat dan bergizi.", images: defaultImages, features: [{ icon: <FiBox />, text: "Frozen / Beku" }, { icon: <FiCheckCircle />, text: "15 Pcs / Pack" }, { icon: <FiClock />, text: "4 Bulan Simpan" }, { icon: <FiShield />, text: "Sosis Premium" }], nutrition: { calories: 180, fat: "12%", satFat: "4%", sodium: "25%", carbs: "4%", protein: "10%" } },
  { id: 16, name: "Nugget Kenzler", brand: "Kanzler", category: "Frozen Chicken", price: 47000, originalPrice: 50000, rating: 5, reviews: 250, description: "Nugget ayam crispy khas Kanzler.", images: defaultImages, features: [{ icon: <FiBox />, text: "Frozen / Beku" }, { icon: <FiCheckCircle />, text: "450g / Pack" }, { icon: <FiClock />, text: "6 Bulan Simpan" }, { icon: <FiShield />, text: "Crispy di luar" }], nutrition: { calories: 200, fat: "11%", satFat: "4%", sodium: "18%", carbs: "12%", protein: "14%" } },
  { id: 17, name: "Bakso Ikan Shifudo", brand: "Shifudo", category: "Frozen Seafood", price: 32000, originalPrice: 35000, rating: 4, reviews: 60, description: "Bakso ikan berkualitas yang kenyal.", images: defaultImages, features: [{ icon: <FiBox />, text: "Frozen / Beku" }, { icon: <FiCheckCircle />, text: "500g / Pack" }, { icon: <FiClock />, text: "6 Bulan Simpan" }, { icon: <FiShield />, text: "Ikan Asli" }], nutrition: { calories: 110, fat: "2%", satFat: "0%", sodium: "20%", carbs: "8%", protein: "12%" } },
  { id: 18, name: "Siomay Frozen", brand: "Belfoods", category: "Frozen Seafood", price: 35000, originalPrice: 40000, rating: 5, reviews: 210, description: "Siomay ikan tenggiri asli dengan tekstur kenyal dan rasa gurih yang pas.", images: defaultImages, features: [{ icon: <FiBox />, text: "Frozen / Beku" }, { icon: <FiCheckCircle />, text: "10 Pcs / Pack" }, { icon: <FiClock />, text: "3 Bulan Simpan" }, { icon: <FiShield />, text: "Resep Asli" }], nutrition: { calories: 250, fat: "12%", satFat: "4%", sodium: "20%", carbs: "25%", protein: "8%" } }
];

const relatedProducts = [
  { id: 2, name: "Vegetables Nugget", price: 65000, image: "/src/assets/images/products/karage fiesta.jpg" },
  { id: 14, name: "Baso Ayam Mini", price: 15000, image: "/src/assets/images/products/nugget kenzler.jpg" },
  { id: 18, name: "Siomay Frozen", price: 35000, image: "/src/assets/images/products/siomay frozen.jpg" },
  { id: 4, name: "French Fries", price: 25000, image: "/src/assets/images/products/siomay frozen.jpg" },
];

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.auth?.isLogin || false);
  
  // Mencari produk berdasarkan ID URL. Jika tidak ada, fallback ke produk index ke-0
  const product = allProducts.find(p => p.id === parseInt(id)) || allProducts[0];

  const tabList = ["Deskripsi", "Panduan Masak", "Nutrisi", `Ulasan (${product.reviews})`];
  
  const [mainImage, setMainImage] = useState(product.images[0]);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState(tabList[0]);

  useEffect(() => {
    window.scrollTo(0, 0); 
    setMainImage(product.images[0]);
    setActiveTab(tabList[0]);
    setQty(1);
  }, [id, product]);

  const handleAddToCart = () => {
    if (!isLogin) {
      alert("Kamu harus login dulu untuk menambahkan produk ke keranjang!");
      navigate("/login");
      return;
    }
    dispatch(addToCart({ ...product, quantity: qty }));
  };

  return (
    <div className="min-h-screen bg-white pb-24 text-gray-800">
      
      {/* BREADCRUMB (Rute kategori diubah murni ke /menu) */}
      <div className="max-w-[1300px] mx-auto px-6 py-6 border-b border-gray-100 text-sm text-gray-500 flex items-center gap-2">
        <Link to="/" className="hover:text-[#1c54ff]">Home</Link>
        <FiChevronRight size={14} />
        <Link to="/menu" className="hover:text-[#1c54ff]">{product.category}</Link>
        <FiChevronRight size={14} />
        <span className="text-gray-800 font-medium">{product.name}</span>
      </div>

      <div className="max-w-[1300px] mx-auto px-6 py-10">
        {/* TOP SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Image Gallery */}
          <div className="flex flex-col gap-4">
            <div className="w-full aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden relative border border-gray-100">
              <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded shadow-sm z-10">PROMO</span>
              <img src={mainImage} alt={product.name} className="w-full h-full object-cover" onError={(e) => { e.target.src = "https://placehold.co/600x450/e2e8f0/94a3b8?text=Image+Not+Found"; }} />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, idx) => (
                <button key={idx} onClick={() => setMainImage(img)} className={`aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all ${mainImage === img ? "border-[#1c54ff] opacity-100" : "border-gray-100 opacity-60 hover:opacity-100"}`}>
                  <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" onError={(e) => { e.target.src = "https://placehold.co/150x150/e2e8f0/94a3b8?text=Img"; }} />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col pt-2">
            <h1 className="text-3xl lg:text-4xl font-bold text-[#11327c] mb-1">{product.name}</h1>
            <p className="text-sm text-gray-500 mb-4 font-medium">By {product.brand}</p>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="flex text-[#1c54ff]">{[1,2,3,4,5].map(s => <FiStar key={s} className="fill-current" size={16}/>)}</div>
              <span className="text-sm text-gray-500 font-medium">{product.reviews} ULASAN</span>
            </div>

            <div className="flex items-end gap-4 mb-6">
              <span className="text-3xl font-extrabold text-[#1c54ff]">RP {product.price.toLocaleString("id-ID")}</span>
              <span className="text-lg text-gray-400 line-through mb-1">Rp {product.originalPrice.toLocaleString("id-ID")}</span>
              <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded mb-2">HEMAT</span>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed mb-8">{product.description}</p>

            <div className="grid grid-cols-2 gap-y-4 gap-x-6 mb-8 text-sm font-medium text-gray-700 bg-gray-50 p-5 rounded-xl border border-gray-100">
              {product.features.map((feat, i) => (
                <div key={i} className="flex items-center gap-3"><span className="text-[#1c54ff]">{feat.icon}</span> {feat.text}</div>
              ))}
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center border-2 border-gray-200 rounded-lg h-12 w-32 flex-shrink-0">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-blue-600"><FiMinus /></button>
                <input type="text" readOnly value={qty} className="flex-1 h-full w-full text-center font-bold text-gray-800 outline-none" />
                <button onClick={() => setQty(q => q + 1)} className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-blue-600"><FiPlus /></button>
              </div>
              <button onClick={handleAddToCart} className="flex-1 h-12 bg-[#1c54ff] hover:bg-blue-800 text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-all shadow-md text-sm md:text-base">
                <FiShoppingCart size={18} /> ADD TO CART — RP {(product.price * qty).toLocaleString("id-ID")}
              </button>
              <button className="h-12 w-12 border-2 border-gray-200 rounded-lg flex flex-shrink-0 items-center justify-center text-gray-400 hover:text-red-500 transition-colors">
                <FiHeart size={20} />
              </button>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <div className="flex flex-col items-center gap-2"><FiShield size={20} className="text-[#1c54ff]"/> Aman & Higienis</div>
              <div className="flex flex-col items-center gap-2"><FiTruck size={20} className="text-[#1c54ff]"/> Pengiriman Cepat</div>
              <div className="flex flex-col items-center gap-2"><FiCheckCircle size={20} className="text-[#1c54ff]"/> Kualitas 100%</div>
            </div>
          </div>
        </div>

        {/* TABS SECTION */}
        <div className="mt-24 border-t border-gray-200">
          <div className="flex flex-wrap gap-8 py-4 border-b border-gray-200">
            {tabList.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`text-sm font-bold uppercase tracking-wider pb-4 -mb-[17px] transition-colors border-b-2 ${activeTab === tab ? "text-[#11327c] border-[#1c54ff]" : "text-gray-400 border-transparent hover:text-gray-800"}`}>
                {tab}
              </button>
            ))}
          </div>

          <div className="py-10">
            
            {/* KONTEN 1: DESKRIPSI */}
            {activeTab === "Deskripsi" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 animate-[fadeIn_0.3s_ease-in-out]">
                <div className="lg:col-span-2">
                  <h3 className="text-xl font-bold text-[#11327c] mb-4">Seni Menikmati Frozen Food Premium</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">FrostMart menggunakan teknologi pembekuan cepat (flash-frozen) pada titik kesegaran tertinggi untuk mengunci rasa dan nutrisi...</p>
                  <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">Komposisi Utama</h4>
                  <ul className="grid grid-cols-2 gap-y-3 text-sm text-gray-600 list-disc pl-5">
                    <li>Daging Pilihan Berkualitas</li><li>Tepung Bumbu Renyah</li><li>Rempah Alami</li><li>Minyak Nabati</li><li>Garam & Merica</li><li>Tanpa Pengawet Buatan</li>
                  </ul>
                </div>
                
                <div className="border-[3px] border-black p-4 bg-white shadow-sm">
                  <h3 className="text-2xl font-black text-black border-b-[6px] border-black pb-1 mb-2">Informasi Nilai Gizi</h3>
                  <div className="flex justify-between items-end border-b-[4px] border-black pb-1 mb-2">
                    <span className="text-sm font-bold">Jumlah per sajian<br/><span className="text-3xl font-black">Kalori</span></span>
                    <span className="text-3xl font-black">{product.nutrition.calories}</span>
                  </div>
                  <div className="space-y-1 text-sm border-b-[4px] border-black pb-2 mb-2">
                    <div className="flex justify-between border-b border-gray-300 pb-1"><b>Total Lemak</b> <span>{product.nutrition.fat}</span></div>
                    <div className="flex justify-between border-b border-gray-300 pb-1"><b>Sodium/Garam</b> <span>{product.nutrition.sodium}</span></div>
                    <div className="flex justify-between"><b>Protein</b> <span>{product.nutrition.protein}</span></div>
                  </div>
                </div>
              </div>
            )}

            {/* KONTEN 2: PANDUAN MASAK */}
            {activeTab === "Panduan Masak" && (
              <div className="max-w-3xl animate-[fadeIn_0.3s_ease-in-out]">
                <h3 className="text-xl font-bold text-[#11327c] mb-6">Cara Penyajian yang Disarankan</h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-[#1c54ff] flex items-center justify-center font-bold">1</div>
                    <div><h4 className="font-bold text-gray-900 mb-1">Penggorengan (Deep Fry)</h4><p className="text-sm text-gray-600">Panaskan minyak goreng hingga suhu 170°C. Goreng selama 4-5 menit hingga keemasan.</p></div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-[#1c54ff] flex items-center justify-center font-bold">2</div>
                    <div><h4 className="font-bold text-gray-900 mb-1">Air Fryer</h4><p className="text-sm text-gray-600">Panaskan suhu 180°C. Masak selama 10-12 menit, balik pada menit ke-6.</p></div>
                  </div>
                </div>
              </div>
            )}

            {/* KONTEN 3: NUTRISI */}
            {activeTab === "Nutrisi" && (
              <div className="max-w-3xl animate-[fadeIn_0.3s_ease-in-out]">
                <h3 className="text-xl font-bold text-[#11327c] mb-4">Detail Kandungan Nutrisi & Alergen</h3>
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex justify-between border-b border-gray-200 pb-2"><span>Kalori Total</span> <span className="font-bold">{product.nutrition.calories} kkal</span></li>
                    <li className="flex justify-between border-b border-gray-200 pb-2"><span>Protein</span> <span className="font-bold">{product.nutrition.protein}</span></li>
                  </ul>
                  <div className="mt-6 p-4 bg-yellow-50 text-yellow-800 rounded-lg text-xs font-medium flex gap-2">
                    <span className="text-lg">⚠️</span><p><strong>Alergen:</strong> Mengandung gluten dan kedelai.</p>
                  </div>
                </div>
              </div>
            )}

            {/* KONTEN 4: ULASAN */}
            {activeTab === tabList[3] && (
              <div className="max-w-4xl animate-[fadeIn_0.3s_ease-in-out]">
                <h3 className="text-xl font-bold text-[#11327c] mb-8">Ulasan Pembeli</h3>
                <div className="border-b border-gray-100 pb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-[#1c54ff] flex items-center justify-center"><FiUser /></div>
                    <div><h5 className="font-bold text-gray-900 text-sm">Budi Santoso</h5><div className="flex text-[#1c54ff]"><FiStar size={12} className="fill-current"/><FiStar size={12} className="fill-current"/><FiStar size={12} className="fill-current"/><FiStar size={12} className="fill-current"/><FiStar size={12} className="fill-current"/></div></div>
                  </div>
                  <p className="text-sm text-gray-600 pl-13">"Produk {product.name} ini rasanya enak banget, kualitasnya terjamin!"</p>
                </div>
              </div>
            )}
            
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        <div className="mt-16 pt-10 border-t border-gray-100">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-[#11327c] uppercase tracking-wider">Mungkin Anda Suka</h2>
            <Link to="/menu" className="text-[#1c54ff] text-sm font-bold hover:underline flex items-center gap-1">Lihat Semua <FiChevronRight/></Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(rp => (
              <div key={rp.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full cursor-pointer" onClick={() => navigate(`/product/${rp.id}`)}>
                <div className="aspect-square bg-gray-50 overflow-hidden relative p-4 flex items-center justify-center">
                  <img src={rp.image} alt={rp.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" onError={(e) => { e.target.src = "https://placehold.co/150x150"; }} />
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-bold text-gray-900 text-sm line-clamp-1 mb-2 group-hover:text-[#1c54ff] transition-colors">{rp.name}</h3>
                  <div className="mt-auto flex justify-between items-center pt-2">
                    <span className="text-[#1c54ff] font-bold text-sm">RP {rp.price.toLocaleString("id-ID")}</span>
                    <button className="bg-[#1c54ff] text-white p-2 rounded-lg hover:bg-blue-800 transition-colors" onClick={(e) => { e.stopPropagation(); alert(`${rp.name} siap ditambahkan ke keranjang!`); }}>
                      <FiShoppingCart size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default ProductDetail;