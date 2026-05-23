import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white p-5">
        <h1 className="text-2xl font-bold mb-10">
          Dashboard
        </h1>

        <nav className="space-y-4">
          <div>Home</div>
          <div>Profile</div>
          <div>Settings</div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;