import { Search, Bell, Settings, Moon, Bookmark, Github, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>概览</span>
            <span className="text-gray-400">/</span>
            <span>分析页</span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
            <Search size={18} className="text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
            <Github size={18} className="text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
            <Bell size={18} className="text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
            <Moon size={18} className="text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
            <Bookmark size={18} className="text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
            <Settings size={18} className="text-gray-600" />
          </button>
          <div className="ml-2 w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center">
            <User size={16} className="text-white" />
          </div>
        </div>
      </div>
    </header>
  );
}
