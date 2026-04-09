import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Clapperboard, 
  Film, 
  Tag, 
  Unlock, 
  Eye, 
  Settings, 
  Bell, 
  User,
  Menu,
  Tv,
  Layers
} from 'lucide-react';
import { PageView, Drama } from './types';

// Import Views
import Dashboard from './components/Dashboard';
import DramaList from './components/DramaList';
import DramaEditor from './components/DramaEditor';
import EpisodeManager from './components/EpisodeManager';
import PricingStrategies from './components/PricingStrategies';
import UnlockRecords from './components/UnlockRecords';
import WatchRecords from './components/WatchRecords';
import TagManager from './components/TagManager';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<PageView>(PageView.DRAMA_LIST);
  const [selectedDrama, setSelectedDrama] = useState<Drama | undefined>(undefined);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Navigation Handler
  const handleNavigate = (view: PageView, data?: any) => {
    if (view === PageView.DRAMA_EDIT) {
       setSelectedDrama(data); // Data is undefined for new, or Drama object for edit
    }
    if (view === PageView.EPISODE_MANAGE && data) {
      // If coming from list, we might set a context, but for this mock we just navigate
    }
    setCurrentView(view);
  };

  // Sidebar Menu Items matching the prompt structure
  const menuItems = [
    // Consolidated "Live Room" and "Series Management" into one "Short Drama Management"
    { id: PageView.DRAMA_LIST, label: '短剧管理', icon: <Clapperboard size={20} /> }, 
    // Episode Management removed from menu, accessed via flow
    { id: PageView.PRICING, label: '定价与活动策略', icon: <Tag size={20} /> }, // DramaPricingStrategies
    { id: PageView.UNLOCK_RECORDS, label: '用户解锁记录', icon: <Unlock size={20} /> }, // UserUnlockRecords
    { id: PageView.WATCH_RECORDS, label: '用户观看记录', icon: <Eye size={20} /> }, // CustomerWatchRecords
    { id: PageView.TAGS, label: '标签管理', icon: <Layers size={20} /> }, // SiteTag
    { id: PageView.DASHBOARD, label: '数据统计看板', icon: <LayoutDashboard size={20} /> }, // Stats
  ];

  const renderContent = () => {
    switch (currentView) {
      case PageView.DASHBOARD: return <Dashboard />;
      case PageView.DRAMA_LIST: return <DramaList onNavigate={handleNavigate} />;
      case PageView.SERIES_LIST: return <DramaList onNavigate={handleNavigate} />; // Reuse for mock
      case PageView.DRAMA_EDIT: return <DramaEditor onNavigate={handleNavigate} initialData={selectedDrama} />;
      case PageView.EPISODE_MANAGE: return <EpisodeManager onNavigate={handleNavigate} />;
      case PageView.PRICING: return <PricingStrategies />;
      case PageView.UNLOCK_RECORDS: return <UnlockRecords />;
      case PageView.WATCH_RECORDS: return <WatchRecords />;
      case PageView.TAGS: return <TagManager />;
      default: return <div className="p-10 text-center text-gray-500">功能开发中...</div>;
    }
  };

  return (
    <div className="flex h-screen bg-graybg font-sans">
      {/* Sidebar */}
      <aside 
        className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-[#001529] text-white transition-all duration-300 flex flex-col flex-shrink-0 shadow-xl z-20`}
      >
        <div className="h-16 flex items-center justify-center border-b border-gray-700 bg-[#002140]">
           {sidebarOpen ? <span className="text-lg font-bold tracking-wide text-white">短剧管理后台 Pro</span> : <span className="font-bold text-xl">Pro</span>}
        </div>
        
        <div className="px-6 py-4 text-xs text-gray-500 font-semibold uppercase tracking-wider">
          {sidebarOpen ? '业务管理' : '...'}
        </div>

        <nav className="flex-1 overflow-y-auto space-y-1 px-2">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.id)}
              className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                currentView === item.id || 
                // Keep parent highlighted when entering sub-pages (Edit or Episode Manage)
                (item.id === PageView.DRAMA_LIST && (currentView === PageView.DRAMA_EDIT || currentView === PageView.EPISODE_MANAGE || currentView === PageView.SERIES_LIST))
                ? 'bg-primary text-white shadow-md' 
                : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <div className="flex-shrink-0">{item.icon}</div>
              {sidebarOpen && <span className="ml-3 text-sm font-medium whitespace-nowrap">{item.label}</span>}
            </button>
          ))}
        </nav>
        
        <div className="p-4 border-t border-gray-700/50 bg-[#001529]">
           <div className={`flex items-center ${!sidebarOpen && 'justify-center'}`}>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-xs font-bold shadow-lg">AD</div>
              {sidebarOpen && (
                <div className="ml-3">
                  <div className="text-sm text-white font-medium">管理员</div>
                  <div className="text-xs text-gray-400">admin@drama.com</div>
                </div>
              )}
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6 z-10 flex-shrink-0 border-b border-gray-200">
          <div className="flex items-center gap-4">
             <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Menu className="text-gray-600" />
             </button>
             <div className="h-6 w-px bg-gray-300"></div>
             <h1 className="text-gray-800 font-medium text-lg">运营管理控制台</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full relative transition-colors">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Settings size={20} className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <User size={20} className="text-gray-600" />
            </button>
          </div>
        </header>

        {/* Scrollable Area */}
        <main className="flex-1 overflow-auto p-6 relative scroll-smooth">
           <div className="max-w-[1600px] mx-auto animate-fadeIn">
             {renderContent()}
           </div>
        </main>
      </div>
    </div>
  );
};

export default App;