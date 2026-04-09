import React, { useState, useRef } from 'react';
import { ArrowLeft, GripVertical, Upload, Trash2, Edit2, Play, Eye, Unlock, Plus, X, FileVideo, Loader2 } from 'lucide-react';
import { PageView, Episode } from '../types';
import { MOCK_EPISODES } from '../mockData';

interface EpisodeManagerProps {
  onNavigate: (view: PageView) => void;
}

const EpisodeManager: React.FC<EpisodeManagerProps> = ({ onNavigate }) => {
  // State for episodes list (initialized with mock data)
  const [episodes, setEpisodes] = useState<Episode[]>(MOCK_EPISODES);
  const [selectedEp, setSelectedEp] = useState<Episode | null>(MOCK_EPISODES[0]);

  // Modals State
  const [isGenModalOpen, setIsGenModalOpen] = useState(false);
  const [genCount, setGenCount] = useState<number>(10);
  
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Handlers ---

  // Generate Empty Episodes
  const handleGenerateEmpty = () => {
    if (genCount <= 0) return;

    const currentMaxOrder = Math.max(...episodes.map(e => e.order), 0);
    const newEpisodes: Episode[] = [];

    for (let i = 1; i <= genCount; i++) {
      const order = currentMaxOrder + i;
      newEpisodes.push({
        id: `gen_${Date.now()}_${i}`,
        dramaId: '1001', // Mocking current drama context
        order: order,
        title: `第${order}集：(待补充标题)`,
        duration: '0s',
        thumbnail: 'https://via.placeholder.com/160x90/e5e7eb/9ca3af?text=Pending', // Placeholder
        isFree: false,
        price: 0.99, // Default
        views: 0,
        unlocks: 0
      });
    }

    setEpisodes([...episodes, ...newEpisodes]);
    setIsGenModalOpen(false);
  };

  // File Selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadFiles(Array.from(e.target.files));
    }
  };

  // Simulate Upload Process
  const handleStartUpload = () => {
    if (uploadFiles.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulation
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          finalizeUpload();
          return 100;
        }
        return prev + 10; // Speed of upload
      });
    }, 200);
  };

  const finalizeUpload = () => {
    const currentMaxOrder = Math.max(...episodes.map(e => e.order), 0);
    
    const newEpisodesFromFiles: Episode[] = uploadFiles.map((file, idx) => {
      const order = currentMaxOrder + idx + 1;
      return {
        id: `up_${Date.now()}_${idx}`,
        dramaId: '1001',
        order: order,
        title: `第${order}集：${file.name.replace(/\.[^/.]+$/, "")}`, // Remove extension
        duration: '120s', // Mock duration
        thumbnail: `https://picsum.photos/160/90?random=${Date.now() + idx}`,
        isFree: false,
        price: 0.99,
        views: 0,
        unlocks: 0
      };
    });

    setEpisodes([...episodes, ...newEpisodesFromFiles]);
    setIsUploading(false);
    setIsUploadModalOpen(false);
    setUploadFiles([]);
    setUploadProgress(0);
  };

  const handleDeleteEpisode = (id: string) => {
    if (window.confirm('确定要删除这一集吗？')) {
      const newCtx = episodes.filter(e => e.id !== id);
      setEpisodes(newCtx);
      if (selectedEp?.id === id) setSelectedEp(null);
    }
  };

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col relative">
       {/* Header */}
       <div className="flex items-center gap-4 mb-6 flex-shrink-0">
        <button onClick={() => onNavigate(PageView.DRAMA_LIST)} className="p-2 hover:bg-white rounded-full transition-colors">
          <ArrowLeft className="text-gray-600" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">剧集管理</h2>
          <p className="text-sm text-gray-500">短剧标题 &gt; 剧集列表 ({episodes.length} 集)</p>
        </div>
        <div className="ml-auto flex gap-3">
          <button 
            onClick={() => setIsGenModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 shadow-sm transition-colors"
          >
             <Plus size={16} /> 一键生成空集
          </button>
          <button 
            onClick={() => setIsUploadModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover shadow-sm transition-colors"
          >
            <Upload size={16} />
            批量上传视频
          </button>
        </div>
      </div>

      <div className="flex flex-1 gap-6 min-h-0">
        {/* Left: Episode List */}
        <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col">
           <div className="p-3 border-b border-gray-100 bg-gray-50 text-xs font-bold text-gray-600 grid grid-cols-12 gap-2 items-center">
              <div className="col-span-1 text-center">排序</div>
              <div className="col-span-1 text-center">集数</div>
              <div className="col-span-4">标题</div>
              <div className="col-span-2 text-center">定价(覆盖默认)</div>
              <div className="col-span-2 text-center">数据 (观/解)</div>
              <div className="col-span-2 text-right pr-2">操作</div>
           </div>
           
           <div className="overflow-y-auto flex-1 p-2 space-y-2">
              {episodes.map((ep, idx) => (
                <div 
                  key={ep.id} 
                  onClick={() => setSelectedEp(ep)}
                  className={`grid grid-cols-12 gap-2 items-center p-3 rounded-lg border transition-all cursor-pointer group animate-fadeIn ${
                    selectedEp?.id === ep.id ? 'border-blue-500 bg-blue-50' : 'border-gray-100 hover:border-blue-300 bg-white'
                  }`}
                >
                  <div className="col-span-1 text-gray-400 cursor-move flex justify-center"><GripVertical size={16} /></div>
                  <div className="col-span-1 font-bold text-gray-600 text-center">{ep.order}</div>
                  <div className="col-span-4 flex gap-3 items-center">
                     <div className="w-16 h-9 bg-gray-200 rounded overflow-hidden flex-shrink-0 relative border border-gray-200">
                        <img src={ep.thumbnail} alt="" className="w-full h-full object-cover" />
                        <div className="absolute bottom-0 right-0 bg-black/70 text-white text-[9px] px-1 rounded-tl">{ep.duration}</div>
                     </div>
                     <div className="truncate text-sm font-medium text-gray-800 flex-1" title={ep.title}>{ep.title}</div>
                  </div>
                  <div className="col-span-2 text-center">
                     {ep.isFree ? (
                       <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded border border-green-200">免费</span>
                     ) : (
                       <div className="text-xs font-semibold text-gray-800">${ep.price}</div>
                     )}
                  </div>
                  <div className="col-span-2 text-xs text-gray-500 flex flex-col items-center justify-center gap-1">
                    <div className="flex items-center gap-1"><Eye size={12} /> {ep.views}</div>
                    <div className="flex items-center gap-1 text-orange-500"><Unlock size={12} /> {ep.unlocks}</div>
                  </div>
                  <div className="col-span-2 flex justify-end gap-2 pr-2">
                    <button className="p-1.5 text-blue-600 hover:bg-blue-100 rounded opacity-0 group-hover:opacity-100 transition-opacity"><Edit2 size={16}/></button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleDeleteEpisode(ep.id); }}
                      className="p-1.5 text-red-500 hover:bg-red-100 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={16}/>
                    </button>
                  </div>
                </div>
              ))}
           </div>
        </div>

        {/* Right: Preview & Details */}
        <div className="w-80 flex-shrink-0 flex flex-col gap-4">
           {selectedEp ? (
             <>
               <div className="bg-black rounded-lg overflow-hidden aspect-[9/16] relative shadow-lg group border border-gray-800">
                  <img src={selectedEp.thumbnail} className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
                  <div className="absolute inset-0 flex items-center justify-center">
                     <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform cursor-pointer border border-white/30">
                        <Play fill="white" size={28} className="ml-1" />
                     </div>
                  </div>
                  {/* Fake UI Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                     <div className="text-sm font-bold mb-1 drop-shadow-md">{selectedEp.title}</div>
                     <div className="text-xs opacity-80">热度: {selectedEp.views * 3} 🔥</div>
                  </div>
               </div>
               
               <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="font-bold text-gray-800 mb-3 text-sm">单集快速设置</h3>
                  <div className="space-y-4">
                     <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-700 font-medium">是否免费</span>
                        <div className={`w-10 h-5 rounded-full p-0.5 cursor-pointer transition-colors ${selectedEp.isFree ? 'bg-green-500' : 'bg-gray-300'}`}>
                           <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${selectedEp.isFree ? 'translate-x-5' : 'translate-x-0'}`}></div>
                        </div>
                     </div>
                     {!selectedEp.isFree && (
                        <div>
                           <label className="text-xs text-gray-500 block mb-1">解锁价格 ($)</label>
                           <input type="number" className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm outline-none focus:border-blue-500" value={selectedEp.price} />
                        </div>
                     )}
                     <button className="w-full py-2 bg-blue-50 text-blue-600 text-sm font-medium rounded-lg hover:bg-blue-100 transition-colors">保存修改</button>
                  </div>
               </div>
             </>
           ) : (
             <div className="flex-1 bg-gray-50 border-2 border-dashed rounded-lg flex items-center justify-center text-gray-400 text-sm">
               请选择一集预览
             </div>
           )}
        </div>
      </div>

      {/* --- Modal: Generate Empty Episodes --- */}
      {isGenModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-xl shadow-xl p-6 w-96 transform scale-100 transition-all">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800">一键生成空集</h3>
              <button onClick={() => setIsGenModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={20}/></button>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              将根据当前最大集数自动向后顺延生成空集占位。
            </p>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">生成数量</label>
              <input 
                type="number" 
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                value={genCount}
                onChange={(e) => setGenCount(parseInt(e.target.value) || 0)}
                min={1}
              />
            </div>
            <div className="flex justify-end gap-3">
              <button onClick={() => setIsGenModalOpen(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">取消</button>
              <button onClick={handleGenerateEmpty} className="px-4 py-2 text-sm bg-primary text-white hover:bg-primary-hover rounded-lg">确认生成</button>
            </div>
          </div>
        </div>
      )}

      {/* --- Modal: Batch Upload --- */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[80vh]">
            <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-gray-50">
              <h3 className="text-lg font-bold text-gray-800">批量上传视频</h3>
              <button onClick={() => !isUploading && setIsUploadModalOpen(false)} disabled={isUploading} className="text-gray-400 hover:text-gray-600 disabled:opacity-50"><X size={20}/></button>
            </div>
            
            <div className="p-6 flex-1 overflow-y-auto">
              {/* Upload Zone */}
              {!isUploading && (
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-lg h-32 flex flex-col items-center justify-center bg-gray-50 hover:bg-blue-50 hover:border-blue-300 transition-colors cursor-pointer mb-4"
                  onClick={() => fileInputRef.current?.click()}
                >
                   <Upload className="text-gray-400 mb-2" size={24} />
                   <span className="text-sm text-gray-600 font-medium">点击选择或拖拽视频文件</span>
                   <span className="text-xs text-gray-400 mt-1">支持 MP4, MOV 格式</span>
                   <input 
                      type="file" 
                      multiple 
                      accept="video/*" 
                      className="hidden" 
                      ref={fileInputRef}
                      onChange={handleFileSelect}
                   />
                </div>
              )}

              {/* File List */}
              {uploadFiles.length > 0 && (
                <div className="space-y-3">
                   <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                      <span>已选择 {uploadFiles.length} 个文件</span>
                      {!isUploading && <button onClick={() => setUploadFiles([])} className="text-red-400 hover:text-red-500 text-xs">清空</button>}
                   </div>
                   <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                     {uploadFiles.map((file, idx) => (
                       <div key={idx} className="flex items-center gap-3 p-2 bg-gray-50 rounded border border-gray-100 text-sm">
                          <FileVideo size={16} className="text-blue-500" />
                          <span className="truncate flex-1 text-gray-700">{file.name}</span>
                          <span className="text-xs text-gray-400">{(file.size / 1024 / 1024).toFixed(1)}MB</span>
                       </div>
                     ))}
                   </div>
                </div>
              )}
              
              {/* Progress UI */}
              {isUploading && (
                <div className="mt-6 text-center space-y-3">
                   <Loader2 className="animate-spin mx-auto text-primary" size={32} />
                   <div className="text-sm font-medium text-gray-700">正在上传中... {uploadProgress}%</div>
                   <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div className="bg-primary h-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                   </div>
                   <p className="text-xs text-gray-400">请勿关闭窗口，上传完成后将自动生成剧集</p>
                </div>
              )}
            </div>

            <div className="p-5 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
               {!isUploading && (
                 <>
                   <button onClick={() => setIsUploadModalOpen(false)} className="px-5 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">取消</button>
                   <button 
                    onClick={handleStartUpload} 
                    disabled={uploadFiles.length === 0}
                    className="px-5 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary-hover shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                   >
                     开始上传
                   </button>
                 </>
               )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EpisodeManager;
