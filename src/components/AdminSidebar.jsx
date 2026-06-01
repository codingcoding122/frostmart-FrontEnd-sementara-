import { NavLink } from "react-router-dom";

function AdminSidebar() {
  return (
    <div className="w-60 bg-blue-900 text-white min-h-screen p-6">

      <p className="text-gray-300 text-sm mb-4">
        Overview
      </p>

      <div className="flex flex-col gap-2">

        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            isActive
              ? "bg-white text-blue-900 px-4 py-2 rounded-lg font-semibold"
              : "px-4 py-2 hover:bg-blue-800 rounded-lg"
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/analytics"
          className={({ isActive }) =>
            isActive
              ? "bg-white text-blue-900 px-4 py-2 rounded-lg font-semibold"
              : "px-4 py-2 hover:bg-blue-800 rounded-lg"
          }
        >
          Analytics
        </NavLink>

      </div>

      <p className="text-gray-300 text-sm mt-10 mb-4">
        Commerce
      </p>

      <div className="flex flex-col gap-2">

        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            isActive
              ? "bg-white text-blue-900 px-4 py-2 rounded-lg font-semibold"
              : "px-4 py-2 hover:bg-blue-800 rounded-lg"
          }
        >
          Orders
        </NavLink>

        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            isActive
              ? "bg-white text-blue-900 px-4 py-2 rounded-lg font-semibold"
              : "px-4 py-2 hover:bg-blue-800 rounded-lg"
          }
        >
          Products
        </NavLink>

        <NavLink
          to="/admin/customers"
          className={({ isActive }) =>
            isActive
              ? "bg-white text-blue-900 px-4 py-2 rounded-lg font-semibold"
              : "px-4 py-2 hover:bg-blue-800 rounded-lg"
          }
        >
          Customers
        </NavLink>

        <NavLink
          to="/admin/invoice"
          className={({ isActive }) =>
            isActive
              ? "bg-white text-blue-900 px-4 py-2 rounded-lg font-semibold"
              : "px-4 py-2 hover:bg-blue-800 rounded-lg"
          }
        >
          Invoice
        </NavLink>

      </div>

    </div>
  );
}

export default AdminSidebar;