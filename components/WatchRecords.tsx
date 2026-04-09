import React from 'react';
import { Search, CheckCircle } from 'lucide-react';
import { MOCK_WATCHES } from '../mockData';

const WatchRecords: React.FC = () => {
  return (
    <div className="space-y-6">
       <h2 className="text-2xl font-bold text-gray-800">用户观看记录</h2>

       <div className="bg-white rounded-lg shadow-sm border border-gray-200">
         <div className="p-4 border-b border-gray-100 flex gap-4">
            <div className="relative w-80">
               <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
               <input
                type="text"
                placeholder="搜索用户ID / 短剧名称 / 剧集"
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 outline-none transition-all"
               />
             </div>
         </div>

         <div className="overflow-x-auto">
           <table className="w-full text-left text-sm">
             <thead>
               <tr className="bg-gray-50 text-gray-600 border-b border-gray-200">
                  <th className="p-4 font-semibold">用户ID</th>
                  <th className="p-4 font-semibold">昵称</th>
                  <th className="p-4 font-semibold">短剧名称</th>
                  <th className="p-4 font-semibold">已看集数</th>
                  <th className="p-4 font-semibold">最近观看</th>
                  <th className="p-4 font-semibold">最后观看时间</th>
                  <th className="p-4 font-semibold">观看总时长</th>
                  <th className="p-4 font-semibold">是否全部解锁</th>
               </tr>
             </thead>
             <tbody>
               {MOCK_WATCHES.map((record, idx) => (
                 <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-mono text-gray-600">{record.userId}</td>
                    <td className="p-4 font-medium text-gray-800">{record.nickname}</td>
                    <td className="p-4 font-medium text-blue-600 cursor-pointer hover:underline">{record.dramaName}</td>
                    <td className="p-4">
                       <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold w-12">{record.progress}</span>
                          <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                             <div className="h-full bg-blue-500" style={{ width: parseFloat(eval(record.progress) * 100 + '') + '%' }}></div>
                          </div>
                       </div>
                    </td>
                    <td className="p-4 text-gray-700">{record.lastEpisode}</td>
                    <td className="p-4 text-gray-500 text-xs">{record.lastWatchedTime}</td>
                    <td className="p-4 text-gray-600">{record.totalDuration}</td>
                    <td className="p-4">
                       {record.isFullUnlocked ? (
                         <span className="flex items-center gap-1 text-green-600 text-xs font-medium bg-green-50 px-2 py-0.5 rounded-full w-fit"><CheckCircle size={12}/> 是 (整部购买)</span>
                       ) : (
                         <span className="text-gray-400 text-xs ml-2">否</span>
                       )}
                    </td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
       </div>
    </div>
  );
};

export default WatchRecords;