import { useState } from "react";

function Settings() {
  const [tab, setTab] = useState("profile");

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Pengaturan
      </h1>

      {/* TAB NAVIGATION */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setTab("profile")}
          className={`px-5 py-2.5 rounded-xl font-medium transition-all ${
            tab === "profile"
              ? "bg-[#1c54ff] text-white shadow-md"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Edit Profile
        </button>

        <button
          onClick={() => setTab("password")}
          className={`px-5 py-2.5 rounded-xl font-medium transition-all ${
            tab === "password"
              ? "bg-[#1c54ff] text-white shadow-md"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Edit Password
        </button>
      </div>

      {/* CONTENT AREA */}
      <div>
        {tab === "profile" ? (
          <div className="space-y-5 max-w-2xl">
            <div>
              <label className="font-semibold text-gray-700 text-sm">Nama Lengkap</label>
              <input
                type="text"
                defaultValue="Aditya Hakim"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 mt-1.5 focus:outline-none focus:border-[#1c54ff] focus:ring-1 focus:ring-[#1c54ff] transition-all"
              />
            </div>
            <div>
              <label className="font-semibold text-gray-700 text-sm">Email</label>
              <input
                type="email"
                defaultValue="aditya@example.com"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 mt-1.5 focus:outline-none focus:border-[#1c54ff] focus:ring-1 focus:ring-[#1c54ff] transition-all"
              />
            </div>
            <div>
              <label className="font-semibold text-gray-700 text-sm">Nomor Telepon</label>
              <input
                type="text"
                defaultValue="+628111222333"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 mt-1.5 focus:outline-none focus:border-[#1c54ff] focus:ring-1 focus:ring-[#1c54ff] transition-all"
              />
            </div>
            <div className="pt-4">
              <button className="bg-[#1c54ff] hover:bg-blue-700 transition-colors text-white px-8 py-3 rounded-xl font-semibold shadow-md">
                Simpan Perubahan
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-5 max-w-2xl">
            <div>
              <label className="font-semibold text-gray-700 text-sm">Password Lama</label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 mt-1.5 focus:outline-none focus:border-[#1c54ff] focus:ring-1 focus:ring-[#1c54ff] transition-all"
              />
            </div>
            <div>
              <label className="font-semibold text-gray-700 text-sm">Password Baru</label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 mt-1.5 focus:outline-none focus:border-[#1c54ff] focus:ring-1 focus:ring-[#1c54ff] transition-all"
              />
            </div>
            <div>
              <label className="font-semibold text-gray-700 text-sm">Konfirmasi Password</label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 mt-1.5 focus:outline-none focus:border-[#1c54ff] focus:ring-1 focus:ring-[#1c54ff] transition-all"
              />
            </div>
            <div className="pt-4">
              <button className="bg-[#1c54ff] hover:bg-blue-700 transition-colors text-white px-8 py-3 rounded-xl font-semibold shadow-md">
                Simpan Password
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Settings;