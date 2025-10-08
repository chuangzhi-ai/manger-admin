import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  total: string;
  totalLabel: string;
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
}

export default function StatCard({ title, value, total, totalLabel, icon: Icon, iconBgColor, iconColor }: StatCardProps) {
  const percentage = (parseInt(value.replace(/,/g, '')) / parseInt(total.replace(/,/g, ''))) * 100;

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="text-gray-500 text-sm mb-1">{title}</div>
          <div className="text-3xl font-semibold text-gray-800">{value}</div>
        </div>
        <div className={`w-12 h-12 ${iconBgColor} rounded-lg flex items-center justify-center`}>
          <Icon size={24} className={iconColor} />
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500">{totalLabel}</span>
        <span className="text-gray-700 font-medium">{total}</span>
      </div>

      <div className="mt-3 w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
