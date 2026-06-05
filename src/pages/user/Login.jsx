import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../store/slices/authSlice";
import axiosInstance from "../../api/axiosInstance";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setIsLoading(true);

    try {
      const response = await axiosInstance.post("/auth/local/signin", {
        email,
        password,
      });

      // Backend cuma ngirim user, jadi kita tangkap user-nya aja
      const validUser = response.data.user;

      // Nggak perlu nyimpen Token di localStorage karena udah otomatis masuk ke Cookie!
      localStorage.setItem("user", JSON.stringify(validUser));
      dispatch(loginSuccess(validUser));

      if (validUser.role && validUser.role.toLowerCase() === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
      
    } catch (error) {
      const detailError = error.response?.data?.message || error.message;
      setErrorMsg(detailError || "Koneksi ke backend gagal.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-500 flex justify-center items-center relative overflow-hidden">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-sm p-6 z-10">
        <h1 className="text-4xl font-bold mb-3 text-gray-700">
          Login to your Account
        </h1>
        <p className="text-gray-500 mb-6">Welcome back to FrostMart</p>

        {errorMsg && (
          <div className="bg-red-100 text-red-600 p-3 rounded-xl mb-4 text-sm font-medium text-center border border-red-200">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block mb-2 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="mail@example.com"
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#1c54ff] transition-all"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#1c54ff] transition-all"
            />
          </div>

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" /> Remember me
            </label>
            <button
              type="button"
              className="text-[#1c54ff] hover:text-blue-800 transition"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full transition text-white py-4 rounded-xl text-lg font-semibold shadow-md ${
              isLoading ? "bg-blue-400 cursor-not-allowed" : "bg-[#1c54ff] hover:bg-blue-700"
            }`}
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;