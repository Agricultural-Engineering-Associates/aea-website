import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Users,
  FolderKanban,
  Settings,
  Mail,
  LogOut,
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const navItems = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/admin/pages', icon: FileText, label: 'Page Content', end: false },
  { to: '/admin/staff', icon: Users, label: 'Staff', end: false },
  { to: '/admin/projects', icon: FolderKanban, label: 'Projects', end: false },
  { to: '/admin/settings', icon: Settings, label: 'Settings', end: false },
  { to: '/admin/contacts', icon: Mail, label: 'Messages', end: false },
];

export default function AdminSidebar() {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <aside className="w-64 bg-earth text-white min-h-screen flex flex-col flex-shrink-0">
      <div className="p-6 border-b border-gray-600">
        <h1 className="text-lg font-heading font-bold text-gold">AEA Admin</h1>
        <p className="text-sm text-gray-400 mt-1">Content Management</p>
      </div>

      <nav className="flex-1 py-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-6 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-white bg-opacity-10 text-gold border-r-4 border-gold'
                  : 'text-gray-300 hover:bg-white hover:bg-opacity-5 hover:text-white'
              }`
            }
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-600">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 px-2 py-2 text-sm text-gray-300 hover:text-white transition-colors w-full"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
