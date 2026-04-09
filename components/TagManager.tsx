import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Tag as TagIcon, Search, X, Check, Settings } from 'lucide-react';
import { MOCK_TAGS, MOCK_TAG_CATEGORIES } from '../mockData';
import { SiteTag, TagCategory } from '../types';

const TagManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tags' | 'categories'>('tags');
  const [tags, setTags] = useState(MOCK_TAGS);
  const [categories, setCategories] = useState(MOCK_TAG_CATEGORIES);
  
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<Partial<SiteTag>>({ status: 'Active' });

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Partial<TagCategory>>({ status: 'Active' });

  // Tag Handlers
  const handleOpenTagModal = (tag?: SiteTag) => {
    if (tag) {
      setEditingTag(tag);
    } else {
      setEditingTag({
        name: '',
        categoryId: categories[0]?.id || '',
        usageCount: 0,
        status: 'Active'
      });
    }
    setIsTagModalOpen(true);
  };

  const handleDeleteTag = (id: string) => {
    if (confirm('确定要删除这个标签吗？')) {
      setTags(tags.filter(t => t.id !== id));
    }
  };

  const handleSaveTag = () => {
    if (!editingTag.id) {
      const newTag = { ...editingTag, id: `t${Date.now()}` } as SiteTag;
      setTags([...tags, newTag]);
    } else {
      setTags(tags.map(t => t.id === editingTag.id ? { ...t, ...editingTag } as SiteTag : t));
    }
    setIsTagModalOpen(false);
  };

  // Category Handlers
  const handleOpenCategoryModal = (category?: TagCategory) => {
    if (category) {
      setEditingCategory(category);
    } else {
      setEditingCategory({
        name: '',
        usageCount: 0,
        status: 'Active'
      });
    }
    setIsCategoryModalOpen(true);
  };

  const handleDeleteCategory = (id: string) => {
    if (tags.some(t => t.categoryId === id)) {
      alert('该分类下仍有标签，无法删除。');
      return;
    }
    if (confirm('确定要删除这个分类吗？')) {
      setCategories(categories.filter(c => c.id !== id));
    }
  };

  const handleSaveCategory = () => {
    if (!editingCategory.id) {
      const newCategory = { ...editingCategory, id: `cat${Date.now()}` } as TagCategory;
      setCategories([...categories, newCategory]);
    } else {
      setCategories(categories.map(c => c.id === editingCategory.id ? { ...c, ...editingCategory } as TagCategory : c));
    }
    setIsCategoryModalOpen(false);
  };

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-800">标签管理</h2>
          <div className="flex bg-gray-100 p-1 rounded-lg">
            <button 
              onClick={() => setActiveTab('tags')}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${activeTab === 'tags' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              标签列表
            </button>
            <button 
              onClick={() => setActiveTab('categories')}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${activeTab === 'categories' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              分类管理
            </button>
          </div>
        </div>
        <button 
          onClick={() => activeTab === 'tags' ? handleOpenTagModal() : handleOpenCategoryModal()}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover shadow-sm transition-colors"
        >
          <Plus size={16} />
          {activeTab === 'tags' ? '新增标签' : '新增分类'}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {activeTab === 'tags' ? (
          <>
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
               <div className="relative w-64">
                 <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                 <input type="text" placeholder="搜索标签名称..." className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 outline-none" />
               </div>
               <div className="flex gap-2">
                 <button className="px-3 py-1 text-sm border border-blue-500 bg-blue-50 text-blue-600 rounded-full">全部</button>
                 {categories.map(cat => (
                   <button key={cat.id} className="px-3 py-1 text-sm border border-gray-200 rounded-full hover:bg-gray-50 text-gray-600">{cat.name}</button>
                 ))}
               </div>
            </div>
            
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-gray-50 text-gray-600 border-b border-gray-200">
                  <th className="p-4 font-semibold">标签名称</th>
                  <th className="p-4 font-semibold">分类</th>
                  <th className="p-4 font-semibold">使用次数</th>
                  <th className="p-4 font-semibold">状态</th>
                  <th className="p-4 font-semibold text-right">操作</th>
                </tr>
              </thead>
              <tbody>
                {tags.map(tag => {
                  const category = categories.find(c => c.id === tag.categoryId);
                  return (
                    <tr key={tag.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                       <td className="p-4">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-medium border border-blue-100">
                             <TagIcon size={12} /> {tag.name}
                          </span>
                       </td>
                       <td className="p-4 text-gray-600">
                         {category?.name || '未知分类'}
                       </td>
                       <td className="p-4 font-mono text-gray-500">{tag.usageCount}</td>
                       <td className="p-4">
                          <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium ${tag.status === 'Active' ? 'text-green-700 bg-green-50' : 'text-gray-500 bg-gray-100'}`}>
                             <span className={`w-1.5 h-1.5 rounded-full ${tag.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                             {tag.status === 'Active' ? '启用' : '隐藏'}
                          </span>
                       </td>
                       <td className="p-4 text-right">
                          <div className="flex justify-end gap-2">
                             <button onClick={() => handleOpenTagModal(tag)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"><Edit2 size={16}/></button>
                             <button onClick={() => handleDeleteTag(tag.id)} className="p-1.5 text-red-400 hover:bg-red-50 rounded"><Trash2 size={16}/></button>
                          </div>
                       </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-600 border-b border-gray-200">
                <th className="p-4 font-semibold">分类名称</th>
                <th className="p-4 font-semibold">包含标签数</th>
                <th className="p-4 font-semibold">状态</th>
                <th className="p-4 font-semibold text-right">操作</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(cat => {
                const tagCount = tags.filter(t => t.categoryId === cat.id).length;
                return (
                  <tr key={cat.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-medium text-gray-800">{cat.name}</td>
                    <td className="p-4 text-gray-600">{tagCount} 个标签</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium ${cat.status === 'Active' ? 'text-green-700 bg-green-50' : 'text-gray-500 bg-gray-100'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${cat.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                        {cat.status === 'Active' ? '启用' : '隐藏'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => handleOpenCategoryModal(cat)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"><Edit2 size={16}/></button>
                        <button onClick={() => handleDeleteCategory(cat.id)} className="p-1.5 text-red-400 hover:bg-red-50 rounded"><Trash2 size={16}/></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Tag Modal */}
      {isTagModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
           <div className="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden p-6 space-y-4">
              <div className="flex justify-between items-center mb-2">
                 <h3 className="text-lg font-bold text-gray-800">{editingTag.id ? '编辑标签' : '新增标签'}</h3>
                 <button onClick={() => setIsTagModalOpen(false)}><X size={20} className="text-gray-400 hover:text-gray-600" /></button>
              </div>
              
              <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">标签名称</label>
                 <input 
                   type="text" 
                   value={editingTag.name}
                   onChange={e => setEditingTag({...editingTag, name: e.target.value})}
                   className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500" 
                 />
              </div>

              <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">分类</label>
                 <select 
                   value={editingTag.categoryId}
                   onChange={e => setEditingTag({...editingTag, categoryId: e.target.value})}
                   className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500 bg-white"
                 >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                 </select>
              </div>

              <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">状态</label>
                 <div className="flex gap-4 mt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                       <input 
                         type="radio" 
                         checked={editingTag.status === 'Active'} 
                         onChange={() => setEditingTag({...editingTag, status: 'Active'})}
                         className="text-blue-600 focus:ring-blue-500"
                        />
                       <span className="text-sm text-gray-700">启用</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                       <input 
                         type="radio" 
                         checked={editingTag.status === 'Hidden'} 
                         onChange={() => setEditingTag({...editingTag, status: 'Hidden'})}
                         className="text-gray-600 focus:ring-gray-500"
                        />
                       <span className="text-sm text-gray-700">隐藏</span>
                    </label>
                 </div>
              </div>

              <div className="pt-4">
                 <button onClick={handleSaveTag} className="w-full py-2 bg-primary text-white rounded-lg hover:bg-primary-hover shadow-sm font-medium">
                    保存
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* Category Modal */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
           <div className="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden p-6 space-y-4">
              <div className="flex justify-between items-center mb-2">
                 <h3 className="text-lg font-bold text-gray-800">{editingCategory.id ? '编辑分类' : '新增分类'}</h3>
                 <button onClick={() => setIsCategoryModalOpen(false)}><X size={20} className="text-gray-400 hover:text-gray-600" /></button>
              </div>
              
              <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">分类名称</label>
                 <input 
                   type="text" 
                   value={editingCategory.name}
                   onChange={e => setEditingCategory({...editingCategory, name: e.target.value})}
                   className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500" 
                 />
              </div>

              <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">状态</label>
                 <div className="flex gap-4 mt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                       <input 
                         type="radio" 
                         checked={editingCategory.status === 'Active'} 
                         onChange={() => setEditingCategory({...editingCategory, status: 'Active'})}
                         className="text-blue-600 focus:ring-blue-500"
                        />
                       <span className="text-sm text-gray-700">启用</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                       <input 
                         type="radio" 
                         checked={editingCategory.status === 'Hidden'} 
                         onChange={() => setEditingCategory({...editingCategory, status: 'Hidden'})}
                         className="text-gray-600 focus:ring-gray-500"
                        />
                       <span className="text-sm text-gray-700">隐藏</span>
                    </label>
                 </div>
              </div>

              <div className="pt-4">
                 <button onClick={handleSaveCategory} className="w-full py-2 bg-primary text-white rounded-lg hover:bg-primary-hover shadow-sm font-medium">
                    保存
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default TagManager;