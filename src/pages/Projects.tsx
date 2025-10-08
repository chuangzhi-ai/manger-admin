import { useEffect, useState } from 'react';
import { Users, Calendar, DollarSign, TrendingUp, Clock, CheckCircle2, PauseCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
  progress: number;
  team_size: number;
  budget: number;
  start_date: string;
  end_date: string;
  created_at: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (data) {
        setProjects(data);
      }
    };

    fetchProjects();
  }, []);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'active':
        return {
          icon: Clock,
          text: '进行中',
          color: 'bg-blue-100 text-blue-700 border-blue-200',
          iconColor: 'text-blue-600',
        };
      case 'completed':
        return {
          icon: CheckCircle2,
          text: '已完成',
          color: 'bg-green-100 text-green-700 border-green-200',
          iconColor: 'text-green-600',
        };
      case 'on_hold':
        return {
          icon: PauseCircle,
          text: '暂停',
          color: 'bg-amber-100 text-amber-700 border-amber-200',
          iconColor: 'text-amber-600',
        };
      default:
        return {
          icon: Clock,
          text: '未知',
          color: 'bg-gray-100 text-gray-700 border-gray-200',
          iconColor: 'text-gray-600',
        };
    }
  };

  const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.status === filter);

  const stats = {
    total: projects.length,
    active: projects.filter(p => p.status === 'active').length,
    completed: projects.filter(p => p.status === 'completed').length,
    on_hold: projects.filter(p => p.status === 'on_hold').length,
    totalBudget: projects.reduce((sum, p) => sum + Number(p.budget), 0),
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">项目</h2>
        <p className="text-gray-600">管理和跟踪所有项目</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">总项目</p>
            <TrendingUp size={20} className="text-gray-600" />
          </div>
          <h3 className="text-3xl font-bold text-gray-800">{stats.total}</h3>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">进行中</p>
            <Clock size={20} className="text-blue-600" />
          </div>
          <h3 className="text-3xl font-bold text-blue-600">{stats.active}</h3>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">已完成</p>
            <CheckCircle2 size={20} className="text-green-600" />
          </div>
          <h3 className="text-3xl font-bold text-green-600">{stats.completed}</h3>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">暂停</p>
            <PauseCircle size={20} className="text-amber-600" />
          </div>
          <h3 className="text-3xl font-bold text-amber-600">{stats.on_hold}</h3>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">总预算</p>
            <DollarSign size={20} className="text-purple-600" />
          </div>
          <h3 className="text-2xl font-bold text-purple-600">¥{(stats.totalBudget / 10000).toFixed(1)}万</h3>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              全部
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'active' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              进行中
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              已完成
            </button>
            <button
              onClick={() => setFilter('on_hold')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'on_hold' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              暂停
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
          {filteredProjects.map((project) => {
            const statusConfig = getStatusConfig(project.status);
            const StatusIcon = statusConfig.icon;

            return (
              <div
                key={project.id}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow bg-white"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{project.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full border text-xs font-medium flex items-center gap-1 ${statusConfig.color}`}>
                    <StatusIcon size={14} />
                    {statusConfig.text}
                  </span>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">进度</span>
                    <span className="font-semibold text-gray-800">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-500"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users size={16} className={statusConfig.iconColor} />
                    <span>{project.team_size} 成员</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <DollarSign size={16} className={statusConfig.iconColor} />
                    <span>¥{(Number(project.budget) / 10000).toFixed(1)}万</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 col-span-2">
                    <Calendar size={16} className={statusConfig.iconColor} />
                    <span>
                      {new Date(project.start_date).toLocaleDateString('zh-CN')} -{' '}
                      {project.end_date ? new Date(project.end_date).toLocaleDateString('zh-CN') : '进行中'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {filteredProjects.length === 0 && (
        <div className="bg-white rounded-lg p-12 text-center border border-gray-200">
          <div className="text-6xl mb-4">📋</div>
          <p className="text-gray-600">暂无相关项目</p>
        </div>
      )}
    </div>
  );
}
