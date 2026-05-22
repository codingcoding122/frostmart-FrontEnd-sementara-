import { NavLink } from "react-router-dom";

import { FiSearch, FiShoppingCart, FiUser } from "react-icons/fi";

import logo from "../assets/images/logo frostmart.png";

function Navbar() {
  return (
    <nav className="flex items-center justify-between px-10 py-3 bg-white shadow-sm">
      {/* LOGO */}
      <NavLink to="/" className="flex items-center gap-3">
        <img
          src={logo}
          alt="FrostMart Logo"
          className="w-12 h-12 object-contain"
        />

        <h1 className="text-2xl font-bold text-blue-600">FrostMart</h1>
      </NavLink>

      {/* MENU */}
      <ul className="flex gap-10 text-lg font-medium">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 border-b-4 border-blue-600 pb-1"
                : "text-gray-500"
            }
          >
            Home
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/menu"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 border-b-4 border-blue-600 pb-1"
                : "text-gray-500"
            }
          >
            Menu
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 border-b-4 border-blue-600 pb-1"
                : "text-gray-500"
            }
          >
            About
          </NavLink>
        </li>
      </ul>

      {/* ICONS */}
      <div className="flex items-center gap-6 text-2xl">
        <NavLink
          to="/search"
          className={({ isActive }) =>
            isActive ? "text-blue-600" : "text-gray-500"
          }
        >
          <FiSearch />
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            isActive ? "text-blue-600" : "text-gray-500"
          }
        >
          <FiShoppingCart />
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? "text-blue-600" : "text-gray-500"
          }
        >
          <FiUser />
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
