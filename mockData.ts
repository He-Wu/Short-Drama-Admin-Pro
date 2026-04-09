
import { Drama, Episode, Strategy, UnlockRecord, WatchRecord, SiteTag, TagCategory } from './types';

export const MOCK_DRAMAS: Drama[] = [
  { 
    id: '1001', 
    title: '总裁是个傻子', 
    coverVertical: 'https://picsum.photos/200/300?random=1', 
    coverHorizontal: 'https://picsum.photos/300/200?random=1',
    intro: '一场意外，他变成了傻子，而她却...',
    totalEpisodes: 100, 
    freeEpisodes: 5,
    pricingModes: ['PayPerEpisode', 'Subscription', 'AdUnlock'], 
    defaultPrice: 0.99,
    adDuration: 30,
    status: 'Online', 
    isRecommended: true, 
    recommendOrder: 1,
    isHot: true,
    tags: ['现代', '虐恋'],
    heat: 9850, 
    createdAt: '2023-10-15' 
  },
  { 
    id: '1002', 
    title: '闪婚后我成了首富', 
    coverVertical: 'https://picsum.photos/200/300?random=2', 
    coverHorizontal: 'https://picsum.photos/300/200?random=2',
    intro: '本以为嫁了个普通人，没想到...',
    totalEpisodes: 80, 
    freeEpisodes: 10,
    pricingModes: ['FullPurchase', 'PayPerEpisode'], 
    fullPrice: 19.99,
    defaultPrice: 0.99,
    status: 'Online', 
    isRecommended: true, 
    recommendOrder: 2,
    isHot: true,
    tags: ['爽文', '逆袭'],
    heat: 12400, 
    createdAt: '2023-11-01' 
  },
  { 
    id: '1003', 
    title: '离婚冷静期', 
    coverVertical: 'https://picsum.photos/200/300?random=3', 
    coverHorizontal: 'https://picsum.photos/300/200?random=3',
    intro: '三十天，足以改变一切。',
    totalEpisodes: 120, 
    freeEpisodes: 0,
    pricingModes: ['PayPerEpisode'], 
    status: 'Offline', 
    isRecommended: false, 
    recommendOrder: 99,
    isHot: false,
    tags: ['都市', '情感'],
    heat: 4500, 
    createdAt: '2023-09-20' 
  },
];

export const MOCK_EPISODES: Episode[] = [
  { id: 'e1', dramaId: '1001', order: 1, title: '第1集：总裁是个傻子', duration: '92s', thumbnail: 'https://picsum.photos/160/90?random=10', isFree: true, views: 12843, unlocks: 12843 },
  { id: 'e2', dramaId: '1003', order: 2, title: '第2集：离婚冷静期', duration: '105s', thumbnail: 'https://picsum.photos/160/90?random=11', isFree: true, views: 10234, unlocks: 10234 },
  { id: 'e3', dramaId: '1001', order: 3, title: '第3集：渣男跪着求我', duration: '88s', thumbnail: 'https://picsum.photos/160/90?random=12', isFree: false, price: 0.99, views: 8921, unlocks: 5321 },
  { id: 'e4', dramaId: '1001', order: 4, title: '第4集：真相大白', duration: '95s', thumbnail: 'https://picsum.photos/160/90?random=13', isFree: false, price: 0.99, views: 7600, unlocks: 4100 },
  { id: 'e10', dramaId: '1001', order: 10, title: '第10集：冲突升级', duration: '100s', thumbnail: 'https://picsum.photos/160/90?random=14', isFree: false, price: 3.00, views: 5000, unlocks: 2000 },
];

export const MOCK_STRATEGIES: Strategy[] = [
  { 
    id: 's1', 
    name: '第10集限时1元', 
    type: 'Single', 
    target: '《总裁是个傻子》第10集：冲突升级', 
    dramaId: '1001',
    episodeId: 'e10',
    originalPrice: 3.00, 
    promoPrice: 1.00, 
    startTime: '2025-11-20', 
    endTime: '2025-11-30', 
    status: 'Active' 
  },
  { 
    id: 's2', 
    name: '双11全场6.8元', 
    type: 'Full', 
    target: '《闪婚后我成了首富》', 
    dramaId: '1002',
    originalPrice: 19.99, 
    promoPrice: 6.80, 
    startTime: '2025-11-11', 
    endTime: '2025-11-12', 
    status: 'Ended' 
  },
  { 
    id: 's3', 
    name: '前10集免费活动', 
    type: 'Free', 
    target: '《离婚冷静期》前10集', 
    dramaId: '1003',
    originalPrice: 0, 
    promoPrice: 0, 
    startTime: '2025-11-15', 
    endTime: '2025-11-22', 
    status: 'Active' 
  },
];

export const MOCK_UNLOCKS: UnlockRecord[] = [
  { id: 'u1', orderTime: '2025-11-20 14:30', userId: '883821', nickname: '张**', type: 'Full', dramaName: '《总裁是个傻子》', content: '全集100集', amount: 9.99, orderNo: 'ord_123abc', status: 'Paid' },
  { id: 'u2', orderTime: '2025-11-20 15:15', userId: '774512', nickname: '李**', type: 'Single', dramaName: '《总裁是个傻子》', content: '第57集', amount: 0.99, orderNo: 'ord_124def', status: 'Paid' },
];

export const MOCK_WATCHES: WatchRecord[] = [
  { userId: '883821', nickname: '张**', dramaName: '《总裁是个傻子》', progress: '78/100', lastEpisode: '第78集', lastWatchedTime: '2025-11-24 14:32', totalDuration: '2小时17分', isFullUnlocked: true },
  { userId: '992134', nickname: '王**', dramaName: '《离婚冷静期》', progress: '12/120', lastEpisode: '第12集', lastWatchedTime: '2025-11-23 09:11', totalDuration: '48分钟', isFullUnlocked: false },
];

export const MOCK_TAG_CATEGORIES: TagCategory[] = [
  { id: 'cat1', name: '题材', usageCount: 5, status: 'Active' },
  { id: 'cat2', name: '风格', usageCount: 2, status: 'Active' },
  { id: 'cat3', name: '受众', usageCount: 1, status: 'Active' },
];

export const MOCK_TAGS: SiteTag[] = [
  { id: 't1', name: '古装', categoryId: 'cat1', usageCount: 45, status: 'Active' },
  { id: 't2', name: '现代', categoryId: 'cat1', usageCount: 128, status: 'Active' },
  { id: 't3', name: '爽文', categoryId: 'cat2', usageCount: 210, status: 'Active' },
  { id: 't4', name: '逆袭', categoryId: 'cat2', usageCount: 180, status: 'Active' },
  { id: 't5', name: '言情', categoryId: 'cat1', usageCount: 300, status: 'Active' },
  { id: 't6', name: '悬疑', categoryId: 'cat1', usageCount: 20, status: 'Active' },
  { id: 't7', name: '豪门', categoryId: 'cat1', usageCount: 85, status: 'Active' },
  { id: 't8', name: '测试标签', categoryId: 'cat3', usageCount: 0, status: 'Hidden' },
];
