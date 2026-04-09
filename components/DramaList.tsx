import React, { useState } from 'react';
import { Search, Plus, Download, Edit, Trash2, BarChart2, Layers, Tag } from 'lucide-react';
import { Drama, PageView } from '../types';
import { MOCK_DRAMAS } from '../mockData';

interface DramaListProps {
  onNavigate: (view: PageView, data?: any) => void;
}

const DramaList: React.FC<DramaListProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDramas = MOCK_DRAMAS.filter(d => 
    d.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPricingLabel = (modes: string[]) => {
    if (!modes || modes.length === 0) return '未设置';
    
    const labels: Record<string, string> = {
      'Free': '免费',
      'PayPerEpisode': '按集',
      'FullPurchase': '整部',
      'Subscription': '订阅',
      'AdUnlock': '广告'
    };

    return modes.map(m => labels[m] || m).join(' / ');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header & Filters */}
      <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between gap-4">
        <div className="flex gap-4 flex-1 items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="直播间ID / 活动名称"
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-700 outline-none focus:border-blue-500 text-sm">
            <option>状态：全部</option>
            <option>上线中</option>
            <option>已下架</option>
          </select>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors text-sm">
            <Download size={16} />
            导出Excel
          </button>
          <button 
            onClick={() => onNavigate(PageView.DRAMA_EDIT)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover shadow-sm transition-colors text-sm"
          >
            <Plus size={16} />
            新增短剧直播间
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-600 text-sm border-b border-gray-200">
              <th className="p-4 font-semibold whitespace-nowrap">直播间ID</th>
              <th className="p-4 font-semibold">封面</th>
              <th className="p-4 font-semibold">短剧标题 (ActivityName)</th>
              <th className="p-4 font-semibold text-center">总集数</th>
              <th className="p-4 font-semibold">定价模式</th>
              <th className="p-4 font-semibold">状态</th>
              <th className="p-4 font-semibold">推荐</th>
              <th className="p-4 font-semibold">热度</th>
              <th className="p-4 font-semibold">创建时间</th>
              <th className="p-4 font-semibold text-right">操作</th>
            </tr>
          </thead>
          <tbody>
            {filteredDramas.map((drama) => (
              <tr key={drama.id} className="border-b border-gray-100 hover:bg-blue-50/30 transition-colors text-sm">
                <td className="p-4 text-gray-500">{drama.id}</td>
                <td className="p-4">
                  <img src={drama.coverVertical} alt="cover" className="w-8 h-12 object-cover rounded shadow-sm bg-gray-200" />
                </td>
                <td className="p-4 font-medium text-gray-800">{drama.title}</td>
                <td className="p-4 text-center">{drama.totalEpisodes}</td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs whitespace-nowrap">
                    {getPricingLabel(drama.pricingModes)}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center w-fit gap-1 ${
                    drama.status === 'Online' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${drama.status === 'Online' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    {drama.status === 'Online' ? '上线中' : '已下架'}
                  </span>
                </td>
                <td className="p-4">
                  <div className={`w-8 h-4 rounded-full p-0.5 transition-colors duration-300 ${drama.isRecommended ? 'bg-blue-500' : 'bg-gray-300'}`}>
                    <div className={`w-3 h-3 bg-white rounded-full shadow-sm transform transition-transform duration-300 ${drama.isRecommended ? 'translate-x-4' : 'translate-x-0'}`}></div>
                  </div>
                </td>
                <td className="p-4 font-mono text-orange-500">{drama.heat}</td>
                <td className="p-4 text-gray-500 text-xs">{drama.createdAt}</td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded" title="编辑" onClick={() => onNavigate(PageView.DRAMA_EDIT, drama)}>
                      <Edit size={16} />
                    </button>
                    <button className="p-1.5 text-purple-600 hover:bg-purple-50 rounded" title="剧集管理" onClick={() => onNavigate(PageView.EPISODE_MANAGE, drama)}>
                      <Layers size={16} />
                    </button>
                    <button className="p-1.5 text-cyan-600 hover:bg-cyan-50 rounded" title="打标签">
                      <Tag size={16} />
                    </button>
                    <button className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded" title="数据统计">
                      <BarChart2 size={16} />
                    </button>
                    <button className="p-1.5 text-red-400 hover:bg-red-50 rounded" title="下架/删除">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination (Simple Visual) */}
      <div className="p-4 border-t border-gray-200 flex justify-between items-center text-sm text-gray-500">
        <span>显示 1-3 共 3 条</span>
        <div className="flex gap-1">
          <button className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50">上一页</button>
          <button className="px-3 py-1 border rounded bg-blue-50 border-blue-200 text-blue-600">1</button>
          <button className="px-3 py-1 border rounded hover:bg-gray-50">下一页</button>
        </div>
      </div>
    </div>
  );
};

export default DramaList;