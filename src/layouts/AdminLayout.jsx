import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div>
      <h1>Sidebar Admin</h1>

      <Outlet />
    </div>
  );
}

export default AdminLayout;