import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import logo from "../assets/images/logo frostmart.png";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isSearchPage = location.pathname === "/search";

  const isLogin = useSelector((state) => state.auth.isLogin);
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);

  return (
    <nav className="flex items-center justify-between px-10 py-3 bg-white shadow-sm gap-6">
      
      {/* LOGO */}
      <NavLink to="/" className="flex items-center gap-2 shrink-0">
        <img
          src={logo}
          alt="Logo FrostMart"
          className="w-10 h-10 object-contain"
        />
        <h1 className="text-xl font-bold text-blue-600">FrostMart</h1>
      </NavLink>

      {/* TENGAH (NAVIGASI) */}
      <div className="flex-1 flex justify-center">
        <ul className="flex gap-10 text-lg font-medium">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 border-b-4 border-blue-600 pb-1"
                  : "text-gray-500 hover:text-blue-600 transition"
              }
            >
              Beranda {/* Diubah dari 'Home' */}
            </NavLink>
          </li>
          
          <li>
            <NavLink
              to="/menu"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 border-b-4 border-blue-600 pb-1"
                  : "text-gray-500 hover:text-blue-600 transition"
              }
            >
              Menu
            </NavLink>
          </li>

          <li>
            <a
              href="#about"
              className="text-gray-500 hover:text-blue-600 transition"
            >
              Tentang Kami {/* Diubah dari 'About' */}
            </a>
          </li>
        </ul>
      </div>

      {/* KANAN */}
      <div className="flex items-center gap-5 shrink-0">
        
        {!isSearchPage && (
          <button
            onClick={() => navigate("/search")}
            className="text-gray-500 text-2xl hover:text-blue-600 transition"
          >
            <FiSearch />
          </button>
        )}

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 text-2xl relative"
              : "text-gray-500 text-2xl relative hover:text-blue-600 transition"
          }
        >
          <FiShoppingCart />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
              {cartCount}
            </span>
          )}
        </NavLink>

        {isLogin ? (
          <button
            onClick={() => navigate("/profile")}
            className="text-gray-500 text-2xl hover:text-blue-600 transition"
          >
            <FaUserCircle />
          </button>
        ) : (
          /* Penyesuaian Tombol Masuk: text-base, rounded-lg, px-6 py-2.5 sesuai standarisasi */
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg text-base font-medium hover:bg-blue-700 transition shadow-sm"
          >
            Masuk {/* Diubah dari 'Sign in' */}
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;