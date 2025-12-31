import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { Folder, LogOut, LayoutDashboard, Menu, X } from 'lucide-react';
import { useState } from 'react';

const AdminLayout = () => {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const navItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/folders', label: 'Folders', icon: Folder },
  ];

  return (
    <div className="min-h-screen bg-black flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white/5 border-b-2 border-white/10">
        <h1 className="font-display text-xl font-black text-white">
          Admin Panel
        </h1>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {(isMobileMenuOpen || window.innerWidth >= 768) && (
          <Motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed md:relative inset-0 z-50 md:z-auto w-64 bg-black md:bg-white/5 border-r-2 border-white/10 flex flex-col md:translate-x-0"
          >
        {/* Logo - Hidden on mobile */}
        <div className="hidden md:block p-6 border-b-2 border-white/10">
          <h1 className="font-display text-2xl font-black text-white">
            Admin Panel
          </h1>
          <p className="text-gray-400 text-sm mt-1">Portfolio Manager</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 mt-4 md:mt-0">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-2xl mb-2 transition-all ${
                    isActive
                      ? 'bg-white text-black'
                      : 'text-white hover:bg-white/10'
                  }`
                }
              >
                <Icon size={20} />
                <span className="font-semibold">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t-2 border-white/10">
          <div className="mb-3 px-4">
            <p className="text-white text-sm font-semibold">Logged in as:</p>
            <p className="text-gray-400 text-xs truncate">{currentUser?.email}</p>
          </div>
          <Motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
          >
            <LogOut size={20} />
            <span className="font-semibold">Logout</span>
          </Motion.button>
        </div>
          </Motion.aside>
        )}
      </AnimatePresence>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
