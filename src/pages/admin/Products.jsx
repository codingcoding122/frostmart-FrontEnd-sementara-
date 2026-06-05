import React, { useState, useEffect } from 'react';
import { FiPlus, FiChevronLeft, FiChevronRight, FiEdit2, FiTrash2, FiX, FiUploadCloud, FiLoader } from 'react-icons/fi';
import axiosInstance from '../../api/axiosInstance'; 
import { formatRupiah } from '../../utils/formatCurrency'; // Baris Baru: Import helper rupiah

const getStatusStyle = (stock) => {
  if (stock > 20) return 'bg-green-100 text-green-700 border border-green-200';
  if (stock > 0 && stock <= 20) return 'bg-yellow-100 text-yellow-700 border border-yellow-200';
  return 'bg-red-100 text-red-700 border border-red-200';
};

const getStatusText = (stock) => {
  if (stock > 20) return 'Tersedia';
  if (stock > 0 && stock <= 20) return 'Menipis';
  return 'Habis';
};

export default function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: 'Frozen Chicken',
    price: '',
    stock: '',
    description: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get('/products');
      const data = response.data?.data || response.data || [];
      setProducts(data);
    } catch (error) {
      console.error("Gagal mengambil data produk:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file)); 
    }
  };

  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const productPayload = {
        name: formData.name,
        brand: formData.brand,
        category: formData.category,
        price: Number(formData.price),
        stock: Number(formData.stock),
        description: formData.description
      };

      const resProduct = await axiosInstance.post('/products', productPayload);
      const newProductId = resProduct.data?.data?.id || resProduct.data?.id;

      if (imageFile && newProductId) {
        const imageFormData = new FormData();
        imageFormData.append('file', imageFile); 
        
        await axiosInstance.post(`/products/${newProductId}/photo`, imageFormData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      alert('✅ Produk berhasil ditambahkan ke database!');
      setIsModalOpen(false); 
      setFormData({ name: '', brand: '', category: 'Frozen Chicken', price: '', stock: '', description: '' });
      setImageFile(null);
      setImagePreview(null);
      fetchProducts(); 
      
    } catch (error) {
      const detailError = error.response?.data?.message || error.message;
      console.error("❌ Gagal menambah produk:", detailError);
      alert(`Gagal menyimpan produk:\n${detailError}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm('Yakin ingin menghapus produk ini?')) {
      try {
        await axiosInstance.delete(`/products/${id}`);
        fetchProducts();
      } catch(error) {
        alert('Gagal menghapus produk!');
      }
    }
  };

  return (
    <div className="p-6 md:p-8 w-full max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Produk</h1> {/* Diubah dari 'Products' */}
          <p className="text-sm text-gray-500 mt-1 font-medium">Manajemen Produk dan Stok Frostmart</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-[#1c54ff] hover:bg-blue-800 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm">
          <FiPlus size={18} /> Tambah Produk Baru {/* Diubah dari 'Add New Product' */}
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="py-4 px-6 font-semibold text-xs text-gray-500 uppercase tracking-wider">Info Produk</th> {/* Diubah dari 'Product Info' */}
                <th className="py-4 px-6 font-semibold text-xs text-gray-500 uppercase tracking-wider">Kategori</th> {/* Diubah dari 'Category' */}
                <th className="py-4 px-6 font-semibold text-xs text-gray-500 uppercase tracking-wider">Harga</th> {/* Diubah dari 'Price' */}
                <th className="py-4 px-6 font-semibold text-xs text-gray-500 uppercase tracking-wider">Stok</th> {/* Diubah dari 'Stock' */}
                <th className="py-4 px-6 font-semibold text-xs text-gray-500 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 font-semibold text-xs text-gray-500 uppercase tracking-wider text-right">Aksi</th> {/* Diubah dari 'Actions' */}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr><td colSpan="6" className="text-center py-10 text-gray-500"><FiLoader className="animate-spin inline mr-2"/> Memuat data...</td></tr>
              ) : products.length === 0 ? (
                <tr><td colSpan="6" className="text-center py-10 text-gray-500">Belum ada produk di database.</td></tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img 
                          src={product.image_url || product.imageUrl || "https://placehold.co/40x40/e2e8f0/94a3b8?text=Img"} 
                          alt={product.name} 
                          className="w-12 h-12 rounded-lg object-cover bg-gray-100 border border-gray-200"
                        />
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">{product.name}</p>
                          <p className="text-xs text-gray-500">{product.brand}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-700 text-sm">{product.category}</td>
                    <td className="py-4 px-6 font-semibold text-gray-900 text-sm">{formatRupiah(product.price)}</td> {/* Diubah pakai fungsi formatRupiah */}
                    <td className="py-4 px-6 text-gray-700 text-sm">{product.stock} buah</td> {/* Diubah dari 'pcs' ke 'buah' */}
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1.5 rounded-lg text-xs font-bold ${getStatusStyle(product.stock)}`}>
                        {getStatusText(product.stock)}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button onClick={() => handleDelete(product.id)} className="text-red-500 hover:text-red-700 transition-colors">
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-gray-800">Tambah Produk Baru</h2> {/* Diubah dari 'Add New Product' */}
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-red-500 transition-colors"><FiX size={24} /></button>
            </div>
            
            <form onSubmit={handleSubmitProduct} className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama Produk</label> {/* Diubah dari 'Product Name' */}
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-[#1c54ff] outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Merek (Brand)</label> {/* Diubah dari 'Brand' */}
                  <input type="text" name="brand" value={formData.brand} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-[#1c54ff] outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label> {/* Diubah dari 'Category' */}
                  <select name="category" value={formData.category} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-[#1c54ff] outline-none">
                    <option value="Frozen Chicken">Frozen Chicken</option>
                    <option value="Frozen Beef">Frozen Beef</option>
                    <option value="Frozen Seafood">Frozen Seafood</option>
                    <option value="Frozen Vegetables">Frozen Vegetables</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Harga (Rp)</label> {/* Diubah dari 'Price' */}
                  <input type="number" name="price" value={formData.price} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-[#1c54ff] outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stok</label> {/* Diubah dari 'Stock' */}
                  <input type="number" name="stock" value={formData.stock} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-[#1c54ff] outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label> {/* Diubah dari 'Description' */}
                <textarea name="description" value={formData.description} onChange={handleInputChange} rows="3" className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-[#1c54ff] outline-none resize-none"></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gambar Produk</label> {/* Diubah dari 'Product Image' */}
                <div className="flex items-center gap-6">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-24 h-24 object-cover rounded-xl border border-gray-200" />
                  ) : (
                    <div className="w-24 h-24 bg-gray-100 rounded-xl border border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                      <FiUploadCloud size={32} />
                    </div>
                  )}
                  <div className="flex-1">
                    <input type="file" accept="image/*" onChange={handleImageChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-[#1c54ff] cursor-pointer" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl font-medium text-gray-700 hover:bg-gray-100">Batal</button> {/* Diubah dari 'Cancel' */}
                <button type="submit" disabled={isSubmitting} className={`px-5 py-2.5 rounded-xl font-bold text-white shadow-sm ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-[#1c54ff] hover:bg-blue-800'}`}>
                  {isSubmitting ? 'Menyimpan...' : 'Simpan Produk'} {/* Diubah dari 'Save Product' */}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}