import { useEffect, useState } from 'react';
import { Clock, CheckCircle2, AlertCircle, Circle } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  due_date: string;
  created_at: string;
}

export default function Workspace() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    const fetchTasks = async () => {
      const { data } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false });

      if (data) {
        setTasks(data);
      }
    };

    fetchTasks();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 size={20} className="text-green-500" />;
      case 'in_progress':
        return <Clock size={20} className="text-blue-500" />;
      default:
        return <Circle size={20} className="text-gray-400" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return '已完成';
      case 'in_progress':
        return '进行中';
      default:
        return '待处理';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'medium':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high':
        return '高';
      case 'medium':
        return '中';
      default:
        return '低';
    }
  };

  const filteredTasks = filter === 'all' ? tasks : tasks.filter(t => t.status === filter);

  const stats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    in_progress: tasks.filter(t => t.status === 'in_progress').length,
    completed: tasks.filter(t => t.status === 'completed').length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">工作台</h2>
        <p className="text-gray-600">管理您的任务和工作流程</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">全部任务</p>
              <h3 className="text-3xl font-bold text-gray-800">{stats.total}</h3>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <Circle size={24} className="text-gray-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">待处理</p>
              <h3 className="text-3xl font-bold text-gray-800">{stats.pending}</h3>
            </div>
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
              <AlertCircle size={24} className="text-amber-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">进行中</p>
              <h3 className="text-3xl font-bold text-gray-800">{stats.in_progress}</h3>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Clock size={24} className="text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">已完成</p>
              <h3 className="text-3xl font-bold text-gray-800">{stats.completed}</h3>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle2 size={24} className="text-green-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">任务列表</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                全部
              </button>
              <button
                onClick={() => setFilter('pending')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'pending' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                待处理
              </button>
              <button
                onClick={() => setFilter('in_progress')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'in_progress' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredTasks.map((task) => (
            <div key={task.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  {getStatusIcon(task.status)}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-base font-semibold text-gray-800 mb-1">{task.title}</h4>
                    <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-500">
                        状态: <span className="text-gray-700 font-medium">{getStatusText(task.status)}</span>
                      </span>
                      <span className={`px-2 py-1 rounded border text-xs font-medium ${getPriorityColor(task.priority)}`}>
                        优先级: {getPriorityText(task.priority)}
                      </span>
                      {task.due_date && (
                        <span className="text-gray-500">
                          截止: {new Date(task.due_date).toLocaleDateString('zh-CN')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
