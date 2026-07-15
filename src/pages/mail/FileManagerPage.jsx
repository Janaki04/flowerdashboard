import React, { useState } from 'react';
import { 
  Folder, FolderMinus, FileText, ChevronRight, ChevronDown, 
  Upload, Search, Plus, Trash2, Shield, Info, Image as ImageIcon,
  Music, Film, ArrowLeft
} from 'lucide-react';

export default function FileManagerPage() {
  const [selectedItem, setSelectedItem] = useState({ name: 'Projects', size: '3.2 GB', type: 'Folder' });
  const [isMobilePanelOpen, setIsMobilePanelOpen] = useState(false);
  const [openSubFolders, setOpenSubFolders] = useState({ 'Projects': true });

  const toggleSubFolder = (name) => {
    setOpenSubFolders(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const folders = [
    { name: 'Design', size: '5.8 GB', count: '12 items' },
    { name: 'Projects', size: '3.2 GB', count: '4 project folders', hasSub: true,
      subs: ['Projects_01', 'Projects_02', 'Projects_03', 'Projects_04'] 
    },
    { name: 'Music', size: '1.5 GB', count: '45 tracks' },
    { name: 'Pictures', size: '1.7 GB', count: '180 photos' },
    { name: 'Documents', size: '440 MB', count: '32 docs' },
    { name: 'Downloads', size: '10.1 GB', count: '8 items' },
  ];

  const files = [
    { name: 'Rocket – Admin...', size: '1.8 MB', format: 'Figma' },
    { name: 'Rocket – Admin...', size: '1.5 MB', format: 'Sketch' },
    { name: 'Arion – Admin...', size: '1.2 MB', format: 'Sketch' },
    { name: 'Project Brief', size: '1.4 MB', format: 'Word' },
    { name: 'Design', size: '1.9 MB', format: 'Zip' },
    { name: 'vCard – Resume...', size: '2.5 MB', format: 'Photoshop' },
    { name: 'Project Brief', size: '1.2 MB', format: 'Word' },
    { name: 'Brand Styles Guide', size: '4.5 MB', format: 'PDF' },
  ];

  return (
    <>
          <h1 className="text-start text-3xl font-semibold text-[#212529] tracking-tight">File Manager</h1>

    <div className="flex h-[calc(100vh-110px)]font-sans w-full border border-gray-100 bg-white rounded-2xl overflow-hidden shadow-sm">
      <div className="hidden xl:flex flex-col w-64 border-r border-gray-100 p-4 shrink-0 bg-white justify-between">
        <div className="space-y-4">
          <p className="px-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Folders</p>
          <nav className="space-y-1">
            {folders.map((folder) => {
              const isOpen = !!openSubFolders[folder.name];
              return (
                <div key={folder.name} className="flex flex-col">
                  <div 
                    onClick={() => folder.hasSub ? toggleSubFolder(folder.name) : setSelectedItem({ ...folder, type: 'Folder' })}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-colors cursor-pointer ${selectedItem.name === folder.name ? 'bg-gray-50 text-gray-900 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <div className="flex items-center gap-3">
                      <Folder size={18} className={selectedItem.name === folder.name ? 'text-amber-400 fill-amber-400' : 'text-gray-400'} />
                      <span>{folder.name}</span>
                    </div>
                    {folder.hasSub ? (isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />) : <ChevronRight size={14} className="text-gray-300" />}
                  </div>
                  {folder.hasSub && isOpen && (
                    <div className="pl-6 pr-2 py-1 space-y-1 border-l border-dashed border-gray-200 ml-5 mt-1">
                      {folder.subs.map(sub => (
                        <div 
                          key={sub}
                          onClick={() => setSelectedItem({ name: sub, size: 'Variable', type: 'Sub-Folder' })}
                          className={`flex items-center gap-2 px-3 py-1.5 text-xs rounded-lg cursor-pointer transition-colors ${selectedItem.name === sub ? 'bg-amber-50 text-amber-800 font-medium' : 'text-gray-500 hover:bg-gray-50'}`}
                        >
                          <Folder size={14} className="text-amber-300" />
                          <span>{sub}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            <div className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 rounded-xl text-sm transition-colors cursor-pointer pt-4 border-t border-gray-50">
              <Trash2 size={18} className="text-gray-400" /> <span>Trash</span>
            </div>
          </nav>
        </div>
        <div className="p-3 bg-gray-50/50 rounded-2xl border border-gray-100">
          <div className="flex justify-between text-xs font-semibold text-gray-600 mb-2">
            <span>Storage</span>
            <span>70%</span>
          </div>
          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full w-[70%] rounded-full" />
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col min-w-0 bg-white">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between gap-4">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full bg-[#f8fafc] pl-9 pr-4 py-2 text-sm border-0 rounded-xl focus:ring-1 focus:ring-gray-200 outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-[#428a42] hover:bg-[#346e34] text-white text-sm font-medium rounded-xl transition-colors">
              <Upload size={16} /> <span className="hidden sm:inline">Upload</span>
            </button>
            <button 
              onClick={() => setIsMobilePanelOpen(true)}
              className="lg:hidden p-2 border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-500"
            >
              <Info size={18} />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Folders</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {folders.map((f) => (
                <div 
                  key={f.name}
                  onClick={() => setSelectedItem({ ...f, type: 'Folder' })}
                  className={`p-4 border border-gray-100 rounded-2xl flex flex-col items-center text-center cursor-pointer transition-all hover:shadow-sm ${selectedItem.name === f.name ? 'bg-gray-50/80 border-gray-200 scale-[0.98]' : 'bg-white'}`}
                >
                  <div className="w-16 h-16 bg-[#fef3c7] rounded-2xl flex items-center justify-center mb-3 text-amber-500">
                    <Folder size={32} className="fill-current" />
                  </div>
                  <p className="text-sm font-bold text-gray-800 truncate w-full">{f.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{f.size}</p>
                </div>
              ))}
              <div className="p-4 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50/50 transition-colors group">
                <div className="w-10 h-10 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center mb-2 text-gray-400 group-hover:text-gray-600">
                  <Plus size={18} />
                </div>
                <p className="text-xs font-semibold text-gray-500">Add Folder</p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Files</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {files.map((file, i) => (
                <div 
                  key={i}
                  onClick={() => setSelectedItem({ ...file, type: 'File' })}
                  className={`p-4 border border-gray-100 rounded-2xl flex flex-col items-center text-center cursor-pointer transition-all hover:shadow-sm ${selectedItem.name === file.name ? 'bg-gray-50/80 border-gray-200' : 'bg-white'}`}
                >
                  <div className="w-16 h-16 bg-blue-50/50 border border-blue-100/30 rounded-2xl flex items-center justify-center mb-3 text-blue-500 text-xl font-bold font-mono">
                    {file.format === 'Figma' && '❖'}
                    {file.format === 'Sketch' && '💎'}
                    {file.format === 'Word' && 'W'}
                    {file.format === 'Zip' && 'Zi'}
                    {file.format === 'Photoshop' && 'Ps'}
                    {file.format === 'PDF' && 'PDF'}
                  </div>
                  <p className="text-xs font-bold text-gray-700 truncate w-full px-1">{file.name}</p>
                  <p className="text-[11px] text-gray-400 mt-1">{file.size}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={`
        fixed inset-y-0 right-0 z-40 w-72 bg-white border-l border-gray-100 p-6 flex flex-col h-full transform transition-transform duration-300 ease-in-out
        lg:static lg:translate-x-0 ${isMobilePanelOpen ? 'translate-x-0' : 'translate-x-full'} shrink-0
      `}>
        <div className="flex items-center gap-3 lg:hidden mb-6">
          <button onClick={() => setIsMobilePanelOpen(false)} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500">
            <ArrowLeft size={18} />
          </button>
          <span className="text-sm font-bold text-gray-700">File Details</span>
        </div>

        <div className="flex flex-col items-center text-center pb-6 border-b border-gray-100">
          <div className="w-24 h-24 bg-[#fef3c7] rounded-3xl flex items-center justify-center mb-4 text-amber-500">
            {selectedItem.type === 'File' ? <FileText size={44} /> : <Folder size={44} className="fill-current" />}
          </div>
          <h4 className="text-base font-bold text-gray-800 truncate w-full px-2">{selectedItem.name}</h4>
          <p className="text-xs text-gray-400 mt-1">{selectedItem.type || 'Folder'}</p>
        </div>
        <div className="py-6 border-b border-gray-100 space-y-4">
          <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Info</h5>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between"><span className="text-gray-400">Type</span><span className="font-semibold text-gray-700">{selectedItem.type || 'Folder'}</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Size</span><span className="font-semibold text-gray-700">{selectedItem.size}</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Owner</span><span className="font-semibold text-gray-700">ArtTemplate</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Location</span><span className="font-semibold text-green-600 hover:underline cursor-pointer">My Files</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Modified</span><span className="font-semibold text-gray-700">Sep 17, 2020 4:25</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Created</span><span className="font-semibold text-gray-700">Sep 10, 2020 2:25</span></div>
          </div>
        </div>
        <div className="py-6 space-y-4">
          <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Settings</h5>
          <div className="space-y-4">
            {['File Sharing', 'Backup', 'Sync'].map((label, idx) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-xs text-gray-600 font-medium">{label}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked={idx === 0} className="sr-only peer" />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
    </>

  );
}