import { useState } from "react";
import ProfileSidebar from "../../components/ProfileSidebar";

function Settings() {
  const [tab, setTab] = useState("profile");

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 to-blue-700 p-10">
      <div className="max-w-7xl mx-auto flex gap-8">

        <ProfileSidebar />

        <div className="flex-1">

          <h1 className="text-4xl font-bold text-white mb-6">
            Pengaturan
          </h1>

          {/* TAB */}
          <div className="flex gap-4 mb-6">

            <button
              onClick={() => setTab("profile")}
              className={`px-5 py-2 rounded-lg font-medium transition ${
                tab === "profile"
                  ? "bg-blue-700 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              Edit Profile
            </button>

            <button
              onClick={() => setTab("password")}
              className={`px-5 py-2 rounded-lg font-medium transition ${
                tab === "password"
                  ? "bg-blue-700 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              Edit Password
            </button>

          </div>

          {/* CONTENT */}
          <div className="bg-white rounded-3xl shadow-lg p-8">

            {tab === "profile" ? (
              <div className="space-y-6">

                <div>
                  <label className="font-medium">
                    Nama Lengkap
                  </label>

                  <input
                    type="text"
                    defaultValue="Nama Saya"
                    className="w-full border rounded-xl px-4 py-3 mt-2"
                  />
                </div>

                <div>
                  <label className="font-medium">
                    Email
                  </label>

                  <input
                    type="email"
                    defaultValue="email@gmail.com"
                    className="w-full border rounded-xl px-4 py-3 mt-2"
                  />
                </div>

                <div>
                  <label className="font-medium">
                    Nomor Telepon
                  </label>

                  <input
                    type="text"
                    defaultValue="+628111222333"
                    className="w-full border rounded-xl px-4 py-3 mt-2"
                  />
                </div>

                <button className="bg-blue-700 hover:bg-blue-800 transition text-white px-6 py-3 rounded-xl font-semibold">
                  Simpan Perubahan
                </button>

              </div>
            ) : (
              <div className="space-y-6">

                <div>
                  <label className="font-medium">
                    Password Lama
                  </label>

                  <input
                    type="password"
                    className="w-full border rounded-xl px-4 py-3 mt-2"
                  />
                </div>

                <div>
                  <label className="font-medium">
                    Password Baru
                  </label>

                  <input
                    type="password"
                    className="w-full border rounded-xl px-4 py-3 mt-2"
                  />
                </div>

                <div>
                  <label className="font-medium">
                    Konfirmasi Password
                  </label>

                  <input
                    type="password"
                    className="w-full border rounded-xl px-4 py-3 mt-2"
                  />
                </div>

                <button className="bg-blue-700 hover:bg-blue-800 transition text-white px-6 py-3 rounded-xl font-semibold">
                  Simpan Password
                </button>

              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}

export default Settings;