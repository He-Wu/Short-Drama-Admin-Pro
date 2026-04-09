import React, { useState } from 'react';
import { ArrowLeft, Upload, Image as ImageIcon, Save, ArrowRight, Check } from 'lucide-react';
import { PageView, Drama } from '../types';

interface DramaEditorProps {
  onNavigate: (view: PageView) => void;
  initialData?: Drama;
}

type PricingModeType = 'Free' | 'PayPerEpisode' | 'FullPurchase' | 'Subscription' | 'AdUnlock';

const DramaEditor: React.FC<DramaEditorProps> = ({ onNavigate, initialData }) => {
  const [formData, setFormData] = useState<Partial<Drama>>(initialData || {
    title: '',
    totalEpisodes: 0,
    freeEpisodes: 0,
    // Default multi-select values
    pricingModes: ['PayPerEpisode', 'FullPurchase', 'Subscription'],
    isRecommended: false,
    isHot: false,
    status: 'Offline',
    adDuration: 30,
    tags: []
  });

  const toggleTag = (tag: string) => {
    const tags = formData.tags || [];
    if (tags.includes(tag)) {
      setFormData({ ...formData, tags: tags.filter(t => t !== tag) });
    } else {
      setFormData({ ...formData, tags: [...tags, tag] });
    }
  };

  const togglePricingMode = (mode: PricingModeType) => {
    const modes = formData.pricingModes || [];
    if (modes.includes(mode)) {
      setFormData({ ...formData, pricingModes: modes.filter(m => m !== mode) });
    } else {
      setFormData({ ...formData, pricingModes: [...modes, mode] });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => onNavigate(PageView.DRAMA_LIST)} className="p-2 hover:bg-white rounded-full transition-colors">
          <ArrowLeft className="text-gray-600" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800">
          {initialData ? '编辑短剧系列' : '新增短剧系列'}
        </h2>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 max-w-4xl">
        <div className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">短剧标题 (ActivityName) <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none"
              placeholder="请输入短剧名称"
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
            />
          </div>

          {/* Covers */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">封面图（竖版）</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg h-48 flex flex-col items-center justify-center text-gray-400 hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer relative overflow-hidden group">
                 {formData.coverVertical ? (
                   <>
                     <img src={formData.coverVertical} className="w-full h-full object-cover" alt="Cover"/>
                     <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">点击更换</div>
                   </>
                 ) : (
                    <>
                      <Upload className="mb-2" />
                      <span className="text-xs">点击上传</span>
                    </>
                 )}
              </div>
            </div>
             <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">封面图（横版）</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg h-48 flex flex-col items-center justify-center text-gray-400 hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer relative overflow-hidden group">
                 {formData.coverHorizontal ? (
                   <>
                     <img src={formData.coverHorizontal} className="w-full h-full object-cover" alt="Cover"/>
                     <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">点击更换</div>
                   </>
                 ) : (
                  <>
                  <ImageIcon className="mb-2" />
                  <span className="text-xs">点击上传</span>
                </>
                 )}
              </div>
            </div>
          </div>

          {/* Intro */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">短剧简介</label>
            <textarea 
              className="w-full border border-gray-300 rounded-lg px-4 py-2 h-24 resize-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none"
              placeholder="请输入短剧简介..."
              value={formData.intro}
              onChange={e => setFormData({...formData, intro: e.target.value})}
            ></textarea>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">总集数 [数字]</label>
              <input type="number" className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500" value={formData.totalEpisodes} onChange={e => setFormData({...formData, totalEpisodes: Number(e.target.value)})} />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">免费集数 [默认0]</label>
              <input type="number" className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500" value={formData.freeEpisodes} onChange={e => setFormData({...formData, freeEpisodes: Number(e.target.value)})} />
            </div>
          </div>

          {/* Pricing Strategy */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <label className="block text-sm font-bold text-gray-700 mb-3">定价策略 (支持多选)</label>
            <div className="flex gap-3 mb-4">
              {[
                { id: 'Free', label: '1 免费' },
                { id: 'PayPerEpisode', label: '2 按集付费' },
                { id: 'FullPurchase', label: '3 整部购买' },
                { id: 'Subscription', label: '4 订阅' },
                { id: 'AdUnlock', label: '5 广告解锁' }
              ].map(mode => {
                const isSelected = formData.pricingModes?.includes(mode.id as PricingModeType);
                return (
                  <button
                    key={mode.id}
                    onClick={() => togglePricingMode(mode.id as PricingModeType)}
                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all flex items-center gap-2 ${
                      isSelected
                        ? 'border-blue-500 bg-white text-blue-700 shadow-sm ring-2 ring-blue-100' 
                        : 'border-gray-300 bg-white text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {isSelected && <Check size={14} />}
                    {mode.label}
                  </button>
                );
              })}
            </div>
            
            <div className="space-y-4">
              {formData.pricingModes?.includes('PayPerEpisode') && (
                 <div className="animate-fadeIn bg-white p-4 rounded border border-blue-100">
                    <div className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-3">按集付费设置</div>
                    <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">单集默认价格 ($)</label>
                    <input type="number" className="w-1/2 border border-gray-300 rounded px-3 py-2 outline-none" placeholder="0.99" value={formData.defaultPrice} onChange={e => setFormData({...formData, defaultPrice: Number(e.target.value)})}/>
                 </div>
              )}
              {formData.pricingModes?.includes('FullPurchase') && (
                 <div className="animate-fadeIn bg-white p-4 rounded border border-purple-100">
                    <div className="text-xs font-bold text-purple-600 uppercase tracking-wide mb-3">整部购买设置</div>
                    <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">整部价格 ($)</label>
                    <input type="number" className="w-1/2 border border-gray-300 rounded px-3 py-2 outline-none" placeholder="19.99" value={formData.fullPrice} onChange={e => setFormData({...formData, fullPrice: Number(e.target.value)})}/>
                 </div>
              )}
              {formData.pricingModes?.includes('AdUnlock') && (
                 <div className="animate-fadeIn bg-white p-4 rounded border border-orange-100">
                    <div className="text-xs font-bold text-orange-600 uppercase tracking-wide mb-3">广告解锁设置</div>
                    <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">观看广告时长 (秒)</label>
                    <input type="number" className="w-1/2 border border-gray-300 rounded px-3 py-2 outline-none" placeholder="30" value={formData.adDuration} onChange={e => setFormData({...formData, adDuration: Number(e.target.value)})}/>
                 </div>
              )}
            </div>
          </div>

           {/* Toggles */}
           <div className="flex items-center gap-12 py-2">
             <div className="flex items-center gap-4">
               <label className="text-sm font-bold text-gray-700">是否推荐到首页</label>
               <button 
                  onClick={() => setFormData({...formData, isRecommended: !formData.isRecommended})}
                  className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${formData.isRecommended ? 'bg-primary' : 'bg-gray-300'}`}
               >
                 <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${formData.isRecommended ? 'translate-x-6' : 'translate-x-0'}`} />
               </button>
               {formData.isRecommended && (
                 <div className="flex items-center gap-2 text-sm animate-fadeIn">
                   <span className="text-gray-500">排序:</span>
                   <input type="number" className="w-16 border rounded px-2 py-1 text-center" defaultValue={1} />
                 </div>
               )}
             </div>
             
              <div className="flex items-center gap-4">
               <label className="text-sm font-bold text-gray-700">是否标记热门</label>
               <button 
                 onClick={() => setFormData({...formData, isHot: !formData.isHot})}
                 className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${formData.isHot ? 'bg-red-500' : 'bg-gray-300'}`}>
                 <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${formData.isHot ? 'translate-x-6' : 'translate-x-0'}`} />
               </button>
             </div>
           </div>
           
           {/* Tags */}
           <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">标签多选</label>
              <div className="flex flex-wrap gap-2">
                {['古装', '现代', '爽文', '逆袭', '言情', '悬疑', '都市', '豪门'].map(tag => (
                  <div 
                    key={tag} 
                    onClick={() => toggleTag(tag)}
                    className={`px-4 py-1.5 rounded-full border text-sm cursor-pointer select-none transition-colors ${
                      formData.tags?.includes(tag) 
                        ? 'bg-blue-50 border-blue-500 text-blue-600 font-medium' 
                        : 'border-gray-300 text-gray-600 hover:border-blue-300'
                    }`}
                  >
                    {tag}
                  </div>
                ))}
              </div>
           </div>

        </div>

        {/* Footer Actions */}
        <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end gap-3">
           <button onClick={() => onNavigate(PageView.DRAMA_LIST)} className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">取消</button>
           <button 
              onClick={() => onNavigate(PageView.EPISODE_MANAGE)}
              className="px-6 py-2 rounded-lg bg-primary text-white hover:bg-primary-hover shadow-sm flex items-center gap-2"
            >
              <Save size={18} />
              保存并进入剧集管理
              <ArrowRight size={16} />
           </button>
        </div>
      </div>
    </div>
  );
};

export default DramaEditor;