
import React, { useState } from 'react';
import { Plus, Copy, Edit2, Archive, Calendar, X, Save } from 'lucide-react';
import { MOCK_STRATEGIES, MOCK_DRAMAS, MOCK_EPISODES } from '../mockData';
import { Strategy } from '../types';

const PricingStrategies: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [strategies, setStrategies] = useState(MOCK_STRATEGIES);
  const [editingStrategy, setEditingStrategy] = useState<Partial<Strategy>>({
    type: 'Single',
    status: 'Active'
  });

  const handleOpenModal = (strategy?: Strategy) => {
    if (strategy) {
      setEditingStrategy({ ...strategy });
    } else {
      setEditingStrategy({
        type: 'Single',
        status: 'Active',
        name: '',
        target: '',
        dramaId: '',
        episodeId: '',
        originalPrice: 0,
        promoPrice: 0,
        startTime: '',
        endTime: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = () => {
    // Basic mock save logic
    const newStrategies = editingStrategy.id 
      ? strategies.map(s => s.id === editingStrategy.id ? editingStrategy as Strategy : s)
      : [...strategies, { ...editingStrategy, id: `s${Date.now()}` } as Strategy];
      
    setStrategies(newStrategies);
    setIsModalOpen(false);
  };

  // Helper to filter episodes based on selected drama
  const availableEpisodes = MOCK_EPISODES.filter(e => e.dramaId === editingStrategy.dramaId);

  // Helper to update target string based on ids
  const updateTargetString = (dramaId?: string, episodeId?: string, type?: string) => {
     const drama = MOCK_DRAMAS.find(d => d.id === dramaId);
     const episode = MOCK_EPISODES.find(e => e.id === episodeId);
     
     let text = '';
     if (drama) {
        text += `《${drama.title}》`;
        if (type !== 'Full' && episode) {
            text += `${episode.title}`;
        }
     }
     return text;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">定价与活动策略</h2>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover shadow-sm transition-colors"
        >
          <Plus size={16} />
          新增策略
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-gray-50 text-gray-600 border-b border-gray-200">
              <th className="p-4 font-semibold">策略名称</th>
              <th className="p-4 font-semibold">类型</th>
              <th className="p-4 font-semibold">目标</th>
              <th className="p-4 font-semibold">原价</th>
              <th className="p-4 font-semibold">活动价</th>
              <th className="p-4 font-semibold">有效期</th>
              <th className="p-4 font-semibold">状态</th>
              <th className="p-4 font-semibold text-right">操作</th>
            </tr>
          </thead>
          <tbody>
            {strategies.map((strategy) => (
              <tr key={strategy.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="p-4 font-medium text-gray-800">{strategy.name}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${
                    strategy.type === 'Free' ? 'bg-green-50 text-green-700 border-green-200' :
                    strategy.type === 'Full' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                    'bg-blue-50 text-blue-700 border-blue-200'
                  }`}>
                    {strategy.type === 'Free' ? '单集免费' : strategy.type === 'Full' ? '整部特惠' : '单集折扣'}
                  </span>
                </td>
                <td className="p-4 text-gray-600 max-w-xs truncate" title={strategy.target}>{strategy.target}</td>
                <td className="p-4 text-gray-500">
                   {strategy.originalPrice > 0 ? `$${strategy.originalPrice.toFixed(2)}` : '-'}
                </td>
                <td className="p-4 font-bold text-red-500">
                  {strategy.promoPrice > 0 ? `$${strategy.promoPrice.toFixed(2)}` : '免费'}
                </td>
                <td className="p-4 text-gray-500 text-xs">
                   <div className="flex items-center gap-1"><Calendar size={12}/> {strategy.startTime}</div>
                   <div className="flex items-center gap-1 mt-1 ml-4"> ~ {strategy.endTime}</div>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                    strategy.status === 'Active' ? 'bg-green-100 text-green-800' : 
                    strategy.status === 'Ended' ? 'bg-gray-100 text-gray-500' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {strategy.status === 'Active' ? '进行中' : strategy.status === 'Ended' ? '已结束' : '未开始'}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1.5 text-gray-500 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors" title="复制策略"><Copy size={16}/></button>
                    <button 
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors" 
                      title="编辑"
                      onClick={() => handleOpenModal(strategy)}
                    >
                      <Edit2 size={16}/>
                    </button>
                    <button className="p-1.5 text-red-400 hover:bg-red-50 rounded transition-colors" title="失效/删除"><Archive size={16}/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal/Drawer Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden transform transition-all scale-100">
            <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-gray-50">
              <h3 className="text-lg font-bold text-gray-800">
                {editingStrategy.id ? '编辑策略' : '新增策略'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">策略名称</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500" 
                  placeholder="如：双11限时特惠"
                  value={editingStrategy.name}
                  onChange={e => setEditingStrategy({...editingStrategy, name: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">活动类型</label>
                <div className="flex bg-gray-100 p-1 rounded-lg">
                  {[
                    { id: 'Single', label: '单集折扣' },
                    { id: 'Full', label: '整部特惠' },
                    { id: 'Free', label: '限时免费' }
                  ].map(t => (
                    <button
                      key={t.id}
                      onClick={() => {
                        // When switching type, clear episode if going to Full, update target string
                        const newType = t.id as any;
                        setEditingStrategy({
                            ...editingStrategy, 
                            type: newType,
                            episodeId: newType === 'Full' ? undefined : editingStrategy.episodeId,
                            target: updateTargetString(editingStrategy.dramaId, newType === 'Full' ? undefined : editingStrategy.episodeId, newType)
                        });
                      }}
                      className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${
                        editingStrategy.type === t.id ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cascade Selectors for Target */}
              <div className="space-y-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
                 <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">选择短剧</label>
                    <select 
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500 bg-white"
                        value={editingStrategy.dramaId || ''}
                        onChange={e => {
                            const newDramaId = e.target.value;
                            setEditingStrategy({
                                ...editingStrategy,
                                dramaId: newDramaId,
                                episodeId: '', // reset episode
                                target: updateTargetString(newDramaId, '', editingStrategy.type)
                            });
                        }}
                    >
                        <option value="">-- 请选择短剧 --</option>
                        {MOCK_DRAMAS.map(d => (
                            <option key={d.id} value={d.id}>{d.title}</option>
                        ))}
                    </select>
                 </div>

                 {editingStrategy.type !== 'Full' && (
                     <div className="animate-fadeIn">
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">选择剧集</label>
                        <select 
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500 bg-white disabled:bg-gray-100 disabled:text-gray-400"
                            value={editingStrategy.episodeId || ''}
                            disabled={!editingStrategy.dramaId}
                            onChange={e => {
                                const newEpId = e.target.value;
                                setEditingStrategy({
                                    ...editingStrategy,
                                    episodeId: newEpId,
                                    target: updateTargetString(editingStrategy.dramaId, newEpId, editingStrategy.type)
                                });
                            }}
                        >
                            <option value="">-- 请选择剧集 --</option>
                            {availableEpisodes.length > 0 ? (
                                availableEpisodes.map(ep => (
                                    <option key={ep.id} value={ep.id}>{ep.order} - {ep.title}</option>
                                ))
                            ) : (
                                <option disabled>该短剧暂无剧集数据</option>
                            )}
                        </select>
                     </div>
                 )}
                 <div className="text-xs text-gray-400 pt-1">
                    当前选中: {editingStrategy.target || '未选择'}
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">原价 ($)</label>
                    <input type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none" value={editingStrategy.originalPrice} onChange={e => setEditingStrategy({...editingStrategy, originalPrice: Number(e.target.value)})}/>
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">活动价 ($)</label>
                    <input 
                      type="number" 
                      className={`w-full border rounded-lg px-3 py-2 outline-none ${editingStrategy.type === 'Free' ? 'bg-gray-100 text-gray-400' : 'border-gray-300'}`} 
                      value={editingStrategy.type === 'Free' ? 0 : editingStrategy.promoPrice}
                      disabled={editingStrategy.type === 'Free'}
                      onChange={e => setEditingStrategy({...editingStrategy, promoPrice: Number(e.target.value)})}
                    />
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">开始时间</label>
                    <input type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none text-sm text-gray-600" value={editingStrategy.startTime} onChange={e => setEditingStrategy({...editingStrategy, startTime: e.target.value})}/>
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">结束时间</label>
                    <input type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none text-sm text-gray-600" value={editingStrategy.endTime} onChange={e => setEditingStrategy({...editingStrategy, endTime: e.target.value})}/>
                 </div>
              </div>
            </div>

            <div className="p-5 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
               <button onClick={() => setIsModalOpen(false)} className="px-5 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">取消</button>
               <button onClick={handleSave} className="px-5 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary-hover shadow-sm flex items-center gap-2">
                 <Save size={16} /> 保存策略
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingStrategies;
