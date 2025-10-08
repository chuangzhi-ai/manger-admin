import { LayoutDashboard, Briefcase, BarChart3, FolderKanban, Menu, X, Home } from 'lucide-react';
import { useState } from 'react';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const menuItems = [
  { icon: Home, label: '概览', page: 'overview' },
  { icon: LayoutDashboard, label: '分析页', page: 'analytics' },
  { icon: Briefcase, label: '工作台', page: 'workspace' },
  { icon: BarChart3, label: '资讯', page: 'news' },
  { icon: FolderKanban, label: '项目', page: 'projects' },
];

export default function Sidebar({ currentPage, onPageChange }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`bg-white h-screen border-r border-gray-200 transition-all duration-300 ${collapsed ? 'w-16' : 'w-56'}`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg"></div>
            <span className="font-semibold text-gray-800">Vben Admin</span>
          </div>
        )}
        <button onClick={() => setCollapsed(!collapsed)} className="p-1 hover:bg-gray-100 rounded">
          {collapsed ? <Menu size={20} className="text-gray-600" /> : <X size={20} className="text-gray-600" />}
        </button>
      </div>

      <nav className="p-2 space-y-1">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => onPageChange(item.page)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
              currentPage === item.page
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <item.icon size={20} />
            {!collapsed && <span className="text-sm">{item.label}</span>}
          </button>
        ))}
      </nav>
    </div>
  );
}
