import { useEffect, useState } from 'react';
import { Eye, Calendar, User, TrendingUp } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  author: string;
  views: number;
  published_at: string;
  created_at: string;
}

export default function News() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const fetchArticles = async () => {
      const { data } = await supabase
        .from('news_articles')
        .select('*')
        .order('published_at', { ascending: false });

      if (data) {
        setArticles(data);
      }
    };

    fetchArticles();
  }, []);

  const categories = ['all', ...Array.from(new Set(articles.map(a => a.category)))];
  const filteredArticles = selectedCategory === 'all'
    ? articles
    : articles.filter(a => a.category === selectedCategory);

  const totalViews = articles.reduce((sum, article) => sum + article.views, 0);
  const avgViews = articles.length > 0 ? Math.round(totalViews / articles.length) : 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">资讯</h2>
        <p className="text-gray-600">最新的新闻和公告</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">文章总数</p>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp size={20} className="text-blue-600" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-gray-800">{articles.length}</h3>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">总浏览量</p>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Eye size={20} className="text-green-600" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-gray-800">{totalViews.toLocaleString()}</h3>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">平均浏览</p>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Eye size={20} className="text-purple-600" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-gray-800">{avgViews.toLocaleString()}</h3>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category === 'all' ? '全部' : category}
              </button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredArticles.map((article) => (
            <div key={article.id} className="p-6 hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                      {article.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 hover:text-blue-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{article.summary}</p>
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <User size={16} />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      <span>{new Date(article.published_at).toLocaleDateString('zh-CN')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye size={16} />
                      <span>{article.views.toLocaleString()} 浏览</span>
                    </div>
                  </div>
                </div>
                <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg flex-shrink-0 flex items-center justify-center text-white text-4xl">
                  📰
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {filteredArticles.length === 0 && (
        <div className="bg-white rounded-lg p-12 text-center border border-gray-200">
          <div className="text-6xl mb-4">📭</div>
          <p className="text-gray-600">暂无相关资讯</p>
        </div>
      )}
    </div>
  );
}
