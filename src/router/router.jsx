import { createBrowserRouter, Navigate } from "react-router-dom";

// =========================
// LAYOUTS
// =========================
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";

// =========================
// USER PAGES (Customer)
// =========================
import Home from "../pages/user/Home";
import Menu from "../pages/user/Menu";
import Search from "../pages/user/Search";
import ProductDetail from "../pages/user/ProductDetail";
import Cart from "../pages/user/Cart";
import Checkout from "../pages/user/Checkout";
import Login from "../pages/user/Login";
import Register from "../pages/user/Register";
import Profile from "../pages/user/Profile";
import UserOrders from "../pages/user/Orders"; // Menggunakan UserOrders untuk membedakan dengan Admin
import Settings from "../pages/user/Settings";
import Address from "../pages/user/Address";

// =========================
// ADMIN PAGES (Dashboard)
// =========================
import Dashboard from "../pages/admin/Dashboard";
import Analytics from "../pages/admin/Analytics";
import AdminOrders from "../pages/admin/Orders"; // Alias untuk mencegah bentrok nama
import Products from "../pages/admin/Products";
import Customers from "../pages/admin/Customers";
import Invoice from "../pages/admin/Invoice";

const router = createBrowserRouter([
  // =========================
  // USER ROUTES (Punya Aditya)
  // =========================
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />, // Rute Menu yang sempat hilang sudah ditambahkan
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/product/:id",
        element: <ProductDetail />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      // PROFILE REDIRECT & PAGES
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/profile/orders",
        element: <UserOrders />, // Menggunakan komponen khusus User
      },
      {
        path: "/profile/settings",
        element: <Settings />,
      },
      {
        path: "/profile/address",
        element: <Address />,
      },
    ],
  },

  // =========================
  // ADMIN ROUTES (Punya Zahra)
  // =========================
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true, // Menandakan ini adalah halaman default saat mengakses /admin
        element: <Dashboard />,
      },
      {
        path: "customers", // <--- INI SUDAH DIPERBARUI DARI "users" MENJADI "customers"
        element: <Customers />, // Menyesuaikan dengan nama import dari Zahra
      },
      {
        path: "orders", // <--- INI SUDAH DIPERBARUI DARI "transactions" MENJADI "orders"
        element: <AdminOrders />, // Menggunakan komponen khusus Admin
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "analytics",
        element: <Analytics />,
      },
      {
        path: "invoice",
        element: <Invoice />,
      },
    ],
  },
]);

export default router;