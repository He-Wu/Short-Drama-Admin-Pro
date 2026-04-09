import React from 'react';
import { Search, Download } from 'lucide-react';
import { MOCK_UNLOCKS } from '../mockData';

const UnlockRecords: React.FC = () => {
  return (
    <div className="space-y-6">
       <h2 className="text-2xl font-bold text-gray-800">用户解锁记录</h2>
       
       <div className="bg-white rounded-lg shadow-sm border border-gray-200">
         {/* Filter Bar */}
         <div className="p-4 border-b border-gray-100 flex flex-wrap gap-4 items-center justify-between">
           <div className="flex flex-wrap gap-4 flex-1">
             <div className="relative w-80">
               <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
               <input
                type="text"
                placeholder="用户ID / 手机号 / 订单号 / 短剧名称"
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 outline-none transition-all"
               />
             </div>
             <div className="flex items-center gap-2">
               <input type="date" className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-600 outline-none" />
               <span className="text-gray-400">-</span>
               <input type="date" className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-600 outline-none" />
             </div>
           </div>
           <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 text-sm transition-colors">
              <Download size={14} /> 导出Excel
           </button>
         </div>

         {/* Table */}
         <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-gray-50 text-gray-600 border-b border-gray-200">
                   <th className="p-4 font-semibold">订单时间</th>
                   <th className="p-4 font-semibold">用户ID</th>
                   <th className="p-4 font-semibold">昵称</th>
                   <th className="p-4 font-semibold">解锁类型</th>
                   <th className="p-4 font-semibold">短剧名称</th>
                   <th className="p-4 font-semibold">解锁内容</th>
                   <th className="p-4 font-semibold">支付金额</th>
                   <th className="p-4 font-semibold">订单号</th>
                   <th className="p-4 font-semibold">状态</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_UNLOCKS.map(record => (
                  <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                     <td className="p-4 text-gray-500">{record.orderTime}</td>
                     <td className="p-4 font-mono text-gray-600">{record.userId}</td>
                     <td className="p-4 text-gray-800">{record.nickname}</td>
                     <td className="p-4">
                       <span className={`px-2 py-0.5 rounded text-xs ${record.type === 'Full' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                         {record.type === 'Full' ? '整部解锁' : '单集解锁'}
                       </span>
                     </td>
                     <td className="p-4 font-medium">{record.dramaName}</td>
                     <td className="p-4 text-gray-600">{record.content}</td>
                     <td className="p-4 font-bold text-gray-800">${record.amount}</td>
                     <td className="p-4 text-gray-400 font-mono text-xs">{record.orderNo}</td>
                     <td className="p-4">
                        <span className="text-green-600 font-medium text-xs flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded-full w-fit">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                          {record.status === 'Paid' ? '已支付' : '待支付'}
                        </span>
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

export default UnlockRecords;