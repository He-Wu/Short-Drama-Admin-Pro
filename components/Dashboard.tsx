import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, DollarSign, Film, Users, PlayCircle } from 'lucide-react';

const data = [
  { name: '11-01', uv: 4000, amt: 2400 },
  { name: '11-05', uv: 3000, amt: 1398 },
  { name: '11-10', uv: 2000, amt: 9800 },
  { name: '11-15', uv: 2780, amt: 3908 },
  { name: '11-20', uv: 1890, amt: 4800 },
  { name: '11-25', uv: 2390, amt: 3800 },
  { name: '11-30', uv: 3490, amt: 4300 },
];

const topDramas = [
  { name: '《闪婚后我成了首富》', amount: 42103, plays: 48921, rate: '67.3%' },
  { name: '《总裁是个傻子》', amount: 38774, plays: 42108, rate: '71.2%' },
  { name: '《重生之我是女王》', amount: 25400, plays: 31000, rate: '55.1%' },
  { name: '《离婚冷静期》', amount: 12300, plays: 15000, rate: '42.8%' },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">数据统计看板</h2>
        <div className="flex gap-2">
          {['近7天', '近30天', '自定义'].map((range) => (
            <button key={range} className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50 text-sm">
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {[
          { title: '总短剧数', value: '128', icon: <Film className="text-blue-500" />, trend: '+12%' },
          { title: '总集数', value: '12,847', icon: <PlayCircle className="text-purple-500" />, trend: '+5%' },
          { title: '日活跃短剧', value: '87', icon: <Users className="text-green-500" />, trend: '+2%' },
          { title: '日解锁金额', value: '$18,421', icon: <DollarSign className="text-yellow-500" />, trend: '+23%' },
          { title: '日解锁订单数', value: '21,304', icon: <ArrowUpRight className="text-cyan-500" />, trend: '+8%' },
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-xs uppercase font-medium">{item.title}</p>
                <h3 className="text-2xl font-bold mt-1 text-gray-800">{item.value}</h3>
              </div>
              <div className="p-2 bg-gray-50 rounded-full">{item.icon}</div>
            </div>
            <div className="mt-2 text-xs text-green-600 font-semibold">{item.trend} <span className="text-gray-400 font-normal">较上月</span></div>
          </div>
        ))}
      </div>

      {/* Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">解锁金额趋势 / 新增观看UV</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Line name="解锁金额" type="monotone" dataKey="amt" stroke="#1677ff" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line name="观看UV" type="monotone" dataKey="uv" stroke="#52c41a" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Ranking */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">热力排行 TOP10</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-12 text-xs text-gray-400 font-medium pb-2 border-b">
              <div className="col-span-1">#</div>
              <div className="col-span-6">短剧名称</div>
              <div className="col-span-3 text-right">解锁金额</div>
              <div className="col-span-2 text-right">完看率</div>
            </div>
            {topDramas.map((item, idx) => (
              <div key={idx} className="grid grid-cols-12 text-sm items-center py-1.5 hover:bg-gray-50 rounded px-1">
                <div className={`col-span-1 font-bold ${idx < 3 ? 'text-red-500' : 'text-gray-500'}`}>{idx + 1}</div>
                <div className="col-span-6 truncate font-medium text-gray-700" title={item.name}>{item.name}</div>
                <div className="col-span-3 text-right text-gray-600">${item.amount.toLocaleString()}</div>
                <div className="col-span-2 text-right text-green-600">{item.rate}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;