
export interface Drama {
  id: string;
  title: string;
  coverVertical: string;
  coverHorizontal: string;
  intro: string;
  totalEpisodes: number;
  freeEpisodes: number;
  pricingModes: ('Free' | 'PayPerEpisode' | 'FullPurchase' | 'Subscription' | 'AdUnlock')[]; // Changed to array
  defaultPrice?: number; // 单集价格
  fullPrice?: number; // 整部价格
  adDuration?: number; // 广告时长 (秒)
  status: 'Online' | 'Offline';
  isRecommended: boolean;
  recommendOrder: number;
  isHot: boolean;
  tags: string[];
  heat: number;
  createdAt: string;
}

export interface Episode {
  id: string;
  dramaId: string; // Linked Drama ID
  order: number;
  title: string;
  duration: string;
  thumbnail: string;
  isFree: boolean;
  price?: number;
  views: number;
  unlocks: number;
}

export interface Strategy {
  id: string;
  name: string;
  type: 'Single' | 'Full' | 'Free'; // 单集 | 整部 | 单集免费
  target: string; // Display string (e.g. "《Title》Ep 1")
  dramaId?: string; // For selector state
  episodeId?: string; // For selector state
  originalPrice: number;
  promoPrice: number;
  startTime: string;
  endTime: string;
  status: 'Active' | 'Ended' | 'Scheduled';
}

export interface UnlockRecord {
  id: string;
  orderTime: string;
  userId: string;
  nickname: string;
  type: 'Single' | 'Full' | 'Ad';
  dramaName: string;
  content: string; 
  amount: number;
  orderNo: string;
  status: 'Paid' | 'Pending';
}

export interface WatchRecord {
  userId: string;
  nickname: string;
  dramaName: string;
  progress: string; // e.g. "78/100"
  lastEpisode: string;
  lastWatchedTime: string;
  totalDuration: string;
  isFullUnlocked: boolean;
}

export interface TagCategory {
  id: string;
  name: string;
  usageCount: number;
  status: 'Active' | 'Hidden';
}

export interface SiteTag {
  id: string;
  name: string;
  categoryId: string; // Reference to TagCategory
  usageCount: number;
  status: 'Active' | 'Hidden';
}

export enum PageView {
  DASHBOARD = 'dashboard',
  DRAMA_LIST = 'drama_list', // 直播间列表
  SERIES_LIST = 'series_list', // 系列管理 (Placeholder for now)
  DRAMA_EDIT = 'drama_edit',
  EPISODE_MANAGE = 'episode_manage',
  PRICING = 'pricing',
  UNLOCK_RECORDS = 'unlock_records',
  WATCH_RECORDS = 'watch_records',
  TAGS = 'tags',
}
