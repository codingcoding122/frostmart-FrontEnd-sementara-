import { useState } from "react";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";

function Address() {
  // DUMMY DATA
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      label: "Rumah",
      address: "Jl. Sudirman No.43, Jakarta Selatan, DKI Jakarta 12190",
      primary: true,
    },
    {
      id: 2,
      label: "Kantor",
      address: "Jl. Mawar No.12, Jakarta Pusat, DKI Jakarta 15320",
      primary: false,
    },
  ]);

  // TAMBAH ALAMAT
  const handleAddAddress = () => {
    const newAddress = {
      id: addresses.length + 1,
      label: "Alamat Baru",
      address: "Masukkan alamat baru...",
      primary: false,
    };
    setAddresses([...addresses, newAddress]);
  };

  // HAPUS ALAMAT
  const handleDelete = (id) => {
    setAddresses(addresses.filter((item) => item.id !== id));
  };

  // EDIT ALAMAT (dummy)
  const handleEdit = (id) => {
    alert(`Edit alamat ID: ${id}`);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Alamat Tersimpan
      </h1>

      {/* LIST ADDRESS */}
      <div className="space-y-4">
        {addresses.map((item) => (
          <div
            key={item.id}
            className="border border-gray-200 rounded-2xl p-6 hover:border-[#1c54ff] transition-colors bg-white shadow-sm"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  {item.label}
                </h2>
                <p className="text-gray-600 mt-2 leading-relaxed">
                  {item.address}
                </p>
              </div>

              {item.primary && (
                <span className="bg-[#1c54ff] text-white text-xs px-3 py-1.5 rounded-full font-semibold tracking-wide">
                  Utama
                </span>
              )}
            </div>

            {/* ACTION */}
            <div className="flex gap-6 mt-6 text-sm font-semibold">
              <button
                onClick={() => handleEdit(item.id)}
                className="flex items-center gap-2 text-[#1c54ff] hover:text-blue-800 transition"
              >
                <FiEdit2 />
                Edit
              </button>

              <button
                onClick={() => handleDelete(item.id)}
                className="flex items-center gap-2 text-red-500 hover:text-red-700 transition"
              >
                <FiTrash2 />
                Hapus
              </button>
            </div>
          </div>
        ))}

        {/* TAMBAH ALAMAT (Desain Disesuaikan Untuk Background Putih) */}
        <button
          onClick={handleAddAddress}
          className="w-full mt-4 border-2 border-dashed border-gray-300 text-gray-500 py-5 rounded-2xl text-base font-medium hover:border-[#1c54ff] hover:text-[#1c54ff] hover:bg-blue-50 transition-all flex items-center justify-center gap-3"
        >
          <FiPlus className="text-lg" />
          Tambah Alamat Baru
        </button>
      </div>
    </div>
  );
}

export default Address;