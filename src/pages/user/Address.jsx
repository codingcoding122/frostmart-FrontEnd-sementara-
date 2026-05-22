import { useState } from "react";
import {
  FiMapPin,
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiPackage,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

function Address() {
  const navigate = useNavigate();

  // DUMMY DATA
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      label: "Rumah",
      address:
        "Jl. Sudirman No.43, Jakarta Selatan, DKI Jakarta 12190",
      primary: true,
    },
    {
      id: 2,
      label: "Kantor",
      address:
        "Jl. Mawar No.12, Jakarta Pusat, DKI Jakarta 15320",
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

  // LOGOUT
  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-sky-400 to-indigo-600 px-10 py-12">

      <div className="max-w-7xl mx-auto flex gap-10">

        {/* SIDEBAR */}
        <div className="w-[280px] bg-white rounded-3xl shadow-xl p-8 h-fit">

          <div className="flex flex-col items-center">
            <div className="w-28 h-28 rounded-full bg-gray-300 mb-4"></div>

            <h2 className="text-3xl font-bold text-gray-800">
              Name
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              email@gmail.com
            </p>
          </div>

          {/* MENU */}
          <div className="mt-10 space-y-3">

            <Link
              to="/profile/orders"
              className="flex items-center gap-3 bg-gray-100 hover:bg-blue-100 transition px-5 py-4 rounded-xl font-medium"
            >
              <FiPackage />
              Pesanan Saya
            </Link>

            <Link
              to="/profile/settings"
              className="flex items-center gap-3 bg-gray-100 hover:bg-blue-100 transition px-5 py-4 rounded-xl font-medium"
            >
              <FiSettings />
              Pengaturan
            </Link>

            <Link
              to="/profile/address"
              className="flex items-center gap-3 bg-blue-900 text-white px-5 py-4 rounded-xl font-medium"
            >
              <FiMapPin />
              Alamat
            </Link>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 bg-gray-100 hover:bg-red-100 hover:text-red-500 transition px-5 py-4 rounded-xl font-medium"
            >
              <FiLogOut />
              Keluar
            </button>

          </div>
        </div>

        {/* CONTENT */}
        <div className="flex-1">

          <h1 className="text-4xl font-bold text-black mb-8">
            Alamat Tersimpan
          </h1>

          {/* LIST ADDRESS */}
          <div className="space-y-6">

            {addresses.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex justify-between items-start">

                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {item.label}
                    </h2>

                    <p className="text-gray-600 mt-2">
                      {item.address}
                    </p>
                  </div>

                  {item.primary && (
                    <span className="bg-blue-900 text-white text-sm px-4 py-1 rounded-lg">
                      Utama
                    </span>
                  )}
                </div>

                {/* ACTION */}
                <div className="flex gap-6 mt-6 text-sm font-medium">

                  <button
                    onClick={() => handleEdit(item.id)}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
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

            {/* TAMBAH ALAMAT */}
            <button
              onClick={handleAddAddress}
              className="w-full border-2 border-dashed border-white/70 text-white py-6 rounded-2xl text-lg font-medium hover:bg-white/10 transition flex items-center justify-center gap-3"
            >
              <FiPlus />
              Tambah Alamat Baru
            </button>

          </div>
        </div>
      </div>
    </section>
  );
}

export default Address;