import { useEffect, useState } from 'react';
import { Users, Eye, Download, Gauge } from 'lucide-react';
import StatCard from '../components/StatCard';
import AreaChart from '../components/AreaChart';
import RadarChart from '../components/RadarChart';
import DonutChart from '../components/DonutChart';
import { supabase, DashboardStat } from '../lib/supabase';

export default function Analytics() {
  const [stats, setStats] = useState<DashboardStat[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      const { data } = await supabase
        .from('dashboard_stats')
        .select('*');

      if (data) {
        setStats(data);
      }
    };

    fetchStats();
  }, []);

  const getStatByName = (name: string) => {
    return stats.find(s => s.metric_name === name);
  };

  const statConfigs = [
    {
      name: 'users',
      title: '用户量',
      icon: Users,
      iconBgColor: 'bg-blue-50',
      iconColor: 'text-blue-500',
      totalLabel: '总用户量',
    },
    {
      name: 'visits',
      title: '访问量',
      icon: Eye,
      iconBgColor: 'bg-red-50',
      iconColor: 'text-red-500',
      totalLabel: '总访问量',
    },
    {
      name: 'downloads',
      title: '下载量',
      icon: Download,
      iconBgColor: 'bg-amber-50',
      iconColor: 'text-amber-500',
      totalLabel: '总下载量',
    },
    {
      name: 'usage',
      title: '使用量',
      icon: Gauge,
      iconBgColor: 'bg-yellow-50',
      iconColor: 'text-yellow-500',
      totalLabel: '总使用量',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statConfigs.map((config) => {
          const stat = getStatByName(config.name);
          if (!stat) return null;

          return (
            <StatCard
              key={config.name}
              title={config.title}
              value={stat.current_value.toLocaleString()}
              total={stat.total_value.toLocaleString()}
              totalLabel={config.totalLabel}
              icon={config.icon}
              iconBgColor={config.iconBgColor}
              iconColor={config.iconColor}
            />
          );
        })}
      </div>

      <AreaChart />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RadarChart />
        <DonutChart title="访问来源" />
        <DonutChart title="访问来源" showLegendLabels />
      </div>
    </div>
  );
}
