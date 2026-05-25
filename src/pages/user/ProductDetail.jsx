import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiShoppingCart } from "react-icons/fi";

// Import dummyProducts agar kita bisa cari data berdasarkan ID
// Sesuaikan path import-nya jika perlu
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

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mencari produk yang sesuai ID dari URL
  const product = dummyProducts.find((p) => p.id === parseInt(id));

  // Kalau produk nggak ketemu, arahkan balik ke menu
  if (!product) {
    return <div className="p-10 text-center">Produk tidak ditemukan!</div>;
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] p-6 md:p-10">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-[#1c54ff] font-bold mb-8 hover:underline"
      >
        <FiArrowLeft /> Kembali ke Menu
      </button>

      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm flex flex-col md:flex-row gap-10">
        {/* Gambar Produk Dinamis */}
        <div className="w-full md:w-1/2 h-[300px] rounded-3xl overflow-hidden bg-gray-50 border border-gray-100">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info Produk */}
        <div className="flex-1 flex flex-col justify-center">
          <p className="text-gray-400 text-sm font-medium mb-1">{product.brand}</p>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{product.name}</h1>
          <p className="text-2xl font-bold text-[#1c54ff] mb-6">
            RP: {product.price.toLocaleString("id-ID")}
          </p>
          
          <p className="text-gray-600 mb-8 leading-relaxed">
            Produk premium dari <strong>{product.brand}</strong>. Kualitas terjamin, higienis, dan siap untuk diolah menjadi sajian lezat di rumah.
          </p>
          
          <button className="w-full md:w-auto bg-[#1c54ff] hover:bg-blue-800 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-200 transition-transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3">
            <FiShoppingCart /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}