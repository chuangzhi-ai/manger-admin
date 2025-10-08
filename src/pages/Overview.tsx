import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, ShoppingCart, Users, DollarSign, Award } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface OverviewMetric {
  id: string;
  metric_type: string;
  value: number;
  change_percentage: number;
}

export default function Overview() {
  const [metrics, setMetrics] = useState<OverviewMetric[]>([]);

  useEffect(() => {
    const fetchMetrics = async () => {
      const { data } = await supabase
        .from('overview_metrics')
        .select('*');

      if (data) {
        setMetrics(data);
      }
    };

    fetchMetrics();
  }, []);

  const metricConfigs = [
    { type: 'revenue', label: '总收入', icon: DollarSign, color: 'bg-blue-500', prefix: '¥' },
    { type: 'orders', label: '订单数', icon: ShoppingCart, color: 'bg-green-500', prefix: '' },
    { type: 'customers', label: '客户数', icon: Users, color: 'bg-purple-500', prefix: '' },
    { type: 'satisfaction', label: '满意度', icon: Award, color: 'bg-amber-500', prefix: '', suffix: '%' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">概览</h2>
        <p className="text-gray-600">欢迎回来，这是您的业务概览</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricConfigs.map((config) => {
          const metric = metrics.find(m => m.metric_type === config.type);
          if (!metric) return null;

          const isPositive = metric.change_percentage >= 0;

          return (
            <div key={config.type} className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{config.label}</p>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {config.prefix}{metric.value.toLocaleString()}{config.suffix || ''}
                  </h3>
                </div>
                <div className={`${config.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                  <config.icon size={24} className="text-white" />
                </div>
              </div>

              <div className="flex items-center gap-2">
                {isPositive ? (
                  <TrendingUp size={16} className="text-green-500" />
                ) : (
                  <TrendingDown size={16} className="text-red-500" />
                )}
                <span className={`text-sm font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                  {isPositive ? '+' : ''}{metric.change_percentage}%
                </span>
                <span className="text-sm text-gray-500">较上期</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">快速操作</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-center">
              <div className="text-2xl mb-2">📝</div>
              <div className="text-sm font-medium text-gray-700">创建任务</div>
            </button>
            <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-center">
              <div className="text-2xl mb-2">📊</div>
              <div className="text-sm font-medium text-gray-700">查看报表</div>
            </button>
            <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-center">
              <div className="text-2xl mb-2">👥</div>
              <div className="text-sm font-medium text-gray-700">团队管理</div>
            </button>
            <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-center">
              <div className="text-2xl mb-2">⚙️</div>
              <div className="text-sm font-medium text-gray-700">系统设置</div>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">最近活动</h3>
          <div className="space-y-4">
            {[
              { icon: '✅', text: '张明完成了项目审核', time: '2分钟前', color: 'bg-green-100' },
              { icon: '📢', text: '发布了新的系统公告', time: '1小时前', color: 'bg-blue-100' },
              { icon: '🎉', text: '项目里程碑达成', time: '3小时前', color: 'bg-purple-100' },
              { icon: '💼', text: '新客户签约成功', time: '5小时前', color: 'bg-amber-100' },
            ].map((activity, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className={`${activity.color} w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <span>{activity.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-800">{activity.text}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">欢迎使用管理系统</h3>
            <p className="text-blue-100 mb-4">探索强大的功能，提升工作效率</p>
            <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
              开始使用
            </button>
          </div>
          <div className="text-8xl opacity-20">🚀</div>
        </div>
      </div>
    </div>
  );
}
