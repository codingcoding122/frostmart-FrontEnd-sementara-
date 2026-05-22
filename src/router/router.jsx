import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";

// USER PAGES
import Home from "../pages/user/Home";
import Search from "../pages/user/Search";
import ProductDetail from "../pages/user/ProductDetail";
import Cart from "../pages/user/Cart";
import Checkout from "../pages/user/Checkout";
import Login from "../pages/user/Login";
import Register from "../pages/user/Register";

import Profile from "../pages/user/Profile";
import Orders from "../pages/user/Orders";
import Settings from "../pages/user/Settings";
import Address from "../pages/user/Address";

// ADMIN PAGES
import Dashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";
import Transactions from "../pages/admin/Transactions";
import Products from "../pages/admin/Products";

const router = createBrowserRouter([

  // =========================
  // USER ROUTES
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

      // PROFILE REDIRECT
      {
        path: "/profile",
        element: <Profile />,
      },

      // PROFILE PAGES
      {
        path: "/profile/orders",
        element: <Orders />,
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
  // ADMIN ROUTES
  // =========================
  {
    path: "/admin",
    element: <AdminLayout />,

    children: [
      {
        path: "/admin",
        element: <Dashboard />,
      },

      {
        path: "/admin/users",
        element: <Users />,
      },

      {
        path: "/admin/transactions",
        element: <Transactions />,
      },

      {
        path: "/admin/products",
        element: <Products />,
      },
    ],
  },
]);

export default router;