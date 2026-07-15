import React, { useState, useRef, useEffect, useMemo } from 'react';
import {Plus,ChevronDown,ChevronUp,Paperclip,MessageSquare,Calendar,MoreHorizontal,SlidersHorizontal,CheckCircle2,Search,Layers,FileText,Trash2,Archive,CheckSquare,ArrowUpDown,Move,FolderPlus,UserPlus,Check,X} from 'lucide-react';
import { toast } from 'react-toastify';

export default function TasksPage() {
  const [subtasksExpanded, setSubtasksExpanded] = useState(true);
  const [projectMenuOpen, setProjectMenuOpen] = useState(false);
  const [activeColumnMenu, setActiveColumnMenu] = useState(null); 
  const [addMenuOpen, setAddMenuOpen] = useState(false);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState('Design Plans');
  const [projectSearchQuery, setProjectSearchQuery] = useState('');
  const [taskSearchQuery, setTaskSearchQuery] = useState('');
  const [selectedLabels, setSelectedLabels] = useState(['Frontend']);
  const [selectedMembers, setSelectedMembers] = useState(['Shane Black']); 
  const [selectedDueDate, setSelectedDueDate] = useState('anytime');
  const [selectedStatus, setSelectedStatus] = useState('all'); 
  const [appliedFilters, setAppliedFilters] = useState({
    search: '',
    labels: ['Frontend'],
    members: ['Shane Black'],
    dueDate: 'anytime',
    status: 'all'
  });

  const projectRef = useRef(null);
  const columnMenuRef = useRef(null);
  const addMenuRef = useRef(null);
  const drawerRef = useRef(null);
  const projectsList = [
    'Design Plans',
    'Wireframe UI Kit',
    'Admin Dashboard',
    'Sochi - Hotel Booking'
  ];
  const columnColors = [
    'bg-rose-400', 'bg-teal-400', 'bg-amber-400', 'bg-emerald-500', 'bg-sky-400',
    'bg-emerald-400', 'bg-lime-400', 'bg-purple-400', 'bg-pink-400', 'bg-gray-200'
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (projectRef.current && !projectRef.current.contains(event.target)) {
        setProjectMenuOpen(false);
      }
      if (columnMenuRef.current && !columnMenuRef.current.contains(event.target)) {
        setActiveColumnMenu(null);
      }
      if (addMenuRef.current && !addMenuRef.current.contains(event.target)) {
        setAddMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const initialColumns = {
    todo: {
      title: "TODO",
      count: 8,
      color: "bg-amber-400",
      cards: [
        {
          id: 'card-1',
          tags: ['bg-emerald-400', 'bg-emerald-600'],
          tagNames: ['Design', 'Frontend'],
          date: 'Jun 17',
          title: 'Brand Logo Design',
          desc: 'Make a redesign of the logo in corporate colors.',
          attachments: 2,
          comments: 5,
          avatars: ['https://i.pravatar.cc/150?img=33', 'https://i.pravatar.cc/150?img=68'],
          members: ['Shane Black', 'Alex River']
        },
        {
          id: 'card-2',
          tags: ['bg-emerald-500'],
          tagNames: ['Design'],
          date: 'Jun 17',
          title: 'New Header Image',
          desc: '',
          coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
          attachments: 1,
          comments: 3,
          avatars: ['https://i.pravatar.cc/150?img=68'],
          members: ['Alex River']
        }
      ]
    },
    inProgress: {
      title: "IN PROGRESS",
      count: 5,
      color: "bg-cyan-400",
      cards: [
        {
          id: 'card-4',
          tags: ['bg-emerald-400', 'bg-emerald-600'],
          tagNames: ['Frontend', 'Backend'],
          date: 'Jun 17',
          title: 'Updating Modules',
          desc: 'Step-by-step update of modules.',
          progress: 50,
          subtaskCount: 4,
          attachments: 2,
          comments: 5,
          avatars: ['https://i.pravatar.cc/150?img=33', 'https://i.pravatar.cc/150?img=68'],
          members: ['Shane Black', 'Alex River']
        },
        {
          id: 'card-5',
          tags: ['bg-emerald-400', 'bg-emerald-600'],
          tagNames: ['Frontend'],
          date: 'Jun 17',
          title: 'Template Progress',
          desc: 'Designing cool UI design templates.',
          progress: 75,
          subtaskCount: 4,
          hasSubtasksList: true,
          subtasks: [
            { id: 'st-1', name: 'Inbox Template', done: true },
            { id: 'st-2', name: 'Chat Template', done: true },
            { id: 'st-3', name: 'Tasks Template', done: true },
            { id: 'st-4', name: 'Projects Template', done: false }
          ],
          attachments: 2,
          comments: 5,
          avatars: ['https://i.pravatar.cc/150?img=33', 'https://i.pravatar.cc/150?img=68'],
          members: ['Shane Black']
        }
      ]
    },
    completed: {
      title: "COMPLETED",
      count: 9,
      color: "bg-emerald-400",
      cards: [
        {
          id: 'card-6',
          tags: ['bg-emerald-400', 'bg-emerald-600'],
          tagNames: ['Frontend', 'Design'],
          date: 'Jun 17',
          title: 'Refresh Photo Slider',
          desc: '',
          sliderImages: [
            'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=150&q=80',
            'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=150&q=80',
            'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=150&q=80'
          ],
          attachments: 3,
          comments: 2,
          avatars: ['https://i.pravatar.cc/150?img=33', 'https://i.pravatar.cc/150?img=68'],
          members: ['Shane Black']
        }
      ]
    }
  };
  const filteredColumns = useMemo(() => {
    const updated = {};
    Object.entries(initialColumns).forEach(([colKey, col]) => {
      if (appliedFilters.status !== 'all' && appliedFilters.status !== colKey) {
        updated[colKey] = { ...col, cards: [] };
        return;
      }
      const filteredCards = col.cards.filter(card => {
        const matchesSearch = card.title.toLowerCase().includes(appliedFilters.search.toLowerCase()) || 
                              card.desc.toLowerCase().includes(appliedFilters.search.toLowerCase());
        const matchesLabels = appliedFilters.labels.length === 0 || 
                              card.tagNames?.some(t => appliedFilters.labels.includes(t));
        const matchesMembers = appliedFilters.members.length === 0 || 
                               card.members?.some(m => appliedFilters.members.includes(m));
        return matchesSearch && matchesLabels && matchesMembers;
      });
      updated[colKey] = { ...col, cards: filteredCards };
    });
    return updated;
  }, [appliedFilters]);
  const toggleLabel = (labelName) => {
    setSelectedLabels(prev => 
      prev.includes(labelName) ? prev.filter(l => l !== labelName) : [...prev, labelName]
    );
  };
  const handleApplyFilters = () => {
    setAppliedFilters({
      search: taskSearchQuery,
      labels: selectedLabels,
      members: selectedMembers,
      dueDate: selectedDueDate,
      status: selectedStatus
    });
    setFilterDrawerOpen(false);
  };
  const handleResetFilters = () => {
    setTaskSearchQuery('');
    setSelectedLabels([]);
    setSelectedMembers([]);
    setSelectedDueDate('anytime');
    setSelectedStatus('all');
    setAppliedFilters({
      search: '',
      labels: [],
      members: [],
      dueDate: 'anytime',
      status: 'all'
    });
  };
  const filteredProjects = projectsList.filter(project =>
    project.toLowerCase().includes(projectSearchQuery.toLowerCase())
  );

  return (
    <div className="bg-[#f8f9fa] min-h-screen font-sans antialiased text-gray-600 overflow-x-hidden relative">
      <div className="mx-auto space-y-6">
        <div className="flex justify-between items-center relative">
          <div className="relative" ref={projectRef}>
            <div 
              onClick={() => setProjectMenuOpen(!projectMenuOpen)}
              className="flex items-center gap-1.5 cursor-pointer group select-none"
            >
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">{selectedProject}</h1>
              <ChevronDown size={22} className="text-gray-400 group-hover:text-gray-600 transition-colors mt-1" />
            </div>

            {projectMenuOpen && (
              <div className="absolute left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 z-40 p-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-150">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider px-1">Projects</p>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
                  <input 
                    type="text" 
                    placeholder="Search Project..." 
                    value={projectSearchQuery}
                    onChange={(e) => setProjectSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-[#f7f8fa] text-xs text-gray-700 rounded-xl border-none focus:outline-none focus:ring-1 focus:ring-gray-200 placeholder-gray-400"
                  />
                </div>
                <div className="space-y-0.5 max-h-60 overflow-y-auto">
                  {filteredProjects.map((projectName) => (
                    <div 
                      key={projectName}
                      onClick={() => {
                        setSelectedProject(projectName);
                        setProjectMenuOpen(false);
                      }}
                      className="flex items-center justify-between px-3 py-2.5 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <Layers size={15} className="text-gray-400" />
                        <span className={`text-xs font-bold ${selectedProject === projectName ? 'text-gray-900' : 'text-gray-600'}`}>{projectName}</span>
                      </div>
                      {selectedProject === projectName && <Check size={14} className="text-emerald-500 stroke-[3]" />}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2.5 relative">
            <button 
              onClick={() => setFilterDrawerOpen(true)}
              className="p-2.5 bg-white border border-gray-200 text-gray-500 hover:text-gray-800 rounded-xl transition-colors shadow-sm relative group"
            >
              <SlidersHorizontal size={16} className="stroke-[2.5]" />
              {(appliedFilters.search || appliedFilters.labels.length > 0 || appliedFilters.members.length > 0 || appliedFilters.status !== 'all') && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />
              )}
            </button>
            <div className="relative" ref={addMenuRef}>
              <button 
                onClick={() => setAddMenuOpen(!addMenuOpen)}
                className="flex items-center gap-1.5 bg-[#449352] hover:bg-[#387a43] text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors shadow-sm select-none"
              >
                <span>Add</span>
                <ChevronDown size={14} className="stroke-[3]" />
              </button>

              {addMenuOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-2xl shadow-xl border border-gray-100 z-40 py-2 p-1 animate-in fade-in slide-in-from-top-2 duration-150">
                  <button onClick={() => setAddMenuOpen(false)} className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-gray-600 hover:bg-gray-50 rounded-xl transition-colors text-left">
                    <FileText size={15} className="text-gray-400" />
                    <span>Task</span>
                  </button>
                  <button onClick={() => setAddMenuOpen(false)} className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-gray-600 hover:bg-gray-50 rounded-xl transition-colors text-left">
                    <Layers size={15} className="text-gray-400" />
                    <span>Board</span>
                  </button>
                  <button onClick={() => setAddMenuOpen(false)} className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-gray-600 hover:bg-gray-50 rounded-xl transition-colors text-left">
                    <FolderPlus size={15} className="text-gray-400" />
                    <span>Project</span>
                  </button>
                  <div className="h-px bg-gray-100 my-1 mx-2" />
                  <button onClick={() => setAddMenuOpen(false)} className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-gray-600 hover:bg-gray-50 rounded-xl transition-colors text-left">
                    <UserPlus size={15} className="text-gray-400" />
                    <span>Invite</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-5 overflow-x-auto pb-4 snap-x lg:grid lg:grid-cols-3 lg:overflow-visible scrollbar-thin">
          {Object.entries(filteredColumns).map(([colKey, col]) => (
            <div key={colKey} className="flex-1 min-w-[310px] max-w-[420px] lg:max-w-none snap-center flex flex-col space-y-4 relative">
              <div className="flex items-center justify-between px-1 relative">
                <div className="flex items-center gap-2.5">
                  <span className={`w-3 h-1.5 rounded-full ${col.color}`} />
                  <h2 className="text-sm font-bold text-gray-700 tracking-wide uppercase">{col.title}</h2>
                  <span className="text-[11px] font-bold text-gray-400 bg-gray-200/60 w-5 h-5 flex items-center justify-center rounded-full mt-0.5">
                    {col.cards.length}
                  </span>
                </div>
                
                <button 
                  onClick={() => setActiveColumnMenu(activeColumnMenu === colKey ? null : colKey)}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                >
                  <MoreHorizontal size={18} />
                </button>

                {activeColumnMenu === colKey && (
                  <div 
                    ref={columnMenuRef}
                    className="absolute right-0 top-8 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 z-40 p-2 space-y-1 animate-in fade-in zoom-in-95 duration-100"
                  >
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-xs font-bold text-gray-600 hover:bg-gray-50 rounded-xl text-left">
                      <Move size={14} className="text-gray-400" />
                      <span>Move</span>
                    </button>
                    <button className="w-full flex items-center justify-between px-3 py-2 text-xs font-bold text-gray-600 hover:bg-gray-50 rounded-xl text-left">
                      <div className="flex items-center gap-3">
                        <ArrowUpDown size={14} className="text-gray-400" />
                        <span>Sort Tasks</span>
                      </div>
                      <span className="text-[10px] text-gray-300">❯</span>
                    </button>
                    <div className="h-px bg-gray-100 my-1 mx-2" />
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-xs font-bold text-gray-600 hover:bg-gray-50 rounded-xl text-left">
                      <CheckSquare size={14} className="text-gray-400" />
                      <span>Complete Tasks</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-xs font-bold text-gray-600 hover:bg-gray-50 rounded-xl text-left">
                      <Archive size={14} className="text-gray-400" />
                      <span>Archive Tasks</span>
                    </button>
                    <div className="h-px bg-gray-100 my-1 mx-2" />
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-xs font-bold text-rose-500 hover:bg-rose-50/50 rounded-xl text-left">
                      <Trash2 size={14} className="text-rose-400" />
                      <span>Delete Tasks</span>
                    </button>

                    <div className="grid grid-cols-5 gap-1.5 p-2 pt-3 border-t border-gray-100 mt-2">
                      {columnColors.map((colorBg, index) => (
                        <div 
                          key={index} 
                          className={`w-6 h-6 rounded-full cursor-pointer hover:scale-110 transition-transform flex items-center justify-center relative ${colorBg}`}
                        >
                          {col.color === colorBg && <div className="w-2 h-2 bg-white rounded-full" />}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="space-y-4 flex-1">
                {col.cards.map((card) => (
                  <div 
                    key={card.id} 
                    className="bg-white border border-gray-100 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.02)] p-4 space-y-3.5 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {card.tags.map((tagClass, idx) => (
                          <span key={idx} className={`w-4 h-1 rounded-full ${tagClass}`} />
                        ))}
                      </div>
                      <div className="flex items-center gap-1 text-[11px] font-bold text-gray-400">
                        <Calendar size={13} className="stroke-[2.5]" />
                        <span>{card.date}</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-[15px] font-bold text-gray-800 leading-snug tracking-tight">{card.title}</h3>
                      {card.desc && <p className="text-xs text-gray-400 font-medium leading-relaxed">{card.desc}</p>}
                    </div>

                    {card.coverImage && (
                      <div className="w-full h-36 rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
                        <img src={card.coverImage} alt="Card Cover" className="w-full h-full object-cover" />
                      </div>
                    )}
                    {card.sliderImages && (
                      <div className="flex items-center gap-2 pt-0.5">
                        {card.sliderImages.map((srcUrl, i) => (
                          <div key={i} className="w-[74px] h-[52px] rounded-lg overflow-hidden bg-gray-100 border border-gray-100">
                            <img src={srcUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    )}
                    {card.progress !== undefined && (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-[11px] font-bold tracking-wide text-gray-400">
                          <span className="uppercase">Sub-tasks: {card.subtaskCount}</span>
                          <span>{card.progress}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${card.progress}%` }} />
                        </div>

                        {card.hasSubtasksList && (
                          <div className="pt-1 flex flex-col items-center">
                            <button 
                              onClick={() => setSubtasksExpanded(!subtasksExpanded)}
                              className="p-1 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                            >
                              {subtasksExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </button>

                            {subtasksExpanded && (
                              <div className="w-full space-y-1.5 pt-2">
                                {card.subtasks.map((st) => (
                                  <div key={st.id} className="flex items-center justify-between bg-[#f7f8fa] px-3 py-2 rounded-xl border border-gray-100/60">
                                    <span className={`text-[12px] font-semibold ${st.done ? 'text-gray-500' : 'text-gray-400'}`}>
                                      {st.name}
                                    </span>
                                    <CheckCircle2 size={15} className={st.done ? 'text-emerald-500 fill-emerald-50' : 'text-gray-200'} />
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                    <div className="flex items-center justify-between pt-1 border-t border-gray-50 mt-2">
                      <div className="flex items-center gap-3 text-gray-400 text-[11px] font-bold">
                        <div className="flex items-center gap-1">
                          <Paperclip size={13} className="stroke-[2.5]" />
                          <span>{card.attachments}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare size={13} className="stroke-[2.5]" />
                          <span>{card.comments}</span>
                        </div>
                      </div>

                      <div className="flex -space-x-1.5 overflow-hidden">
                        {card.avatars.map((url, index) => (
                          <img 
                            key={index} 
                            className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover" 
                            src={url} 
                            alt="Team Member" 
                          />
                        ))}
                      </div>
                    </div>

                  </div>
                ))}
                <button 
                  onClick={() => toast.info(`Add item directly to ${col.title}`)}
                  className="w-full py-2 flex items-center justify-center bg-white hover:bg-gray-50 border border-gray-200/60 rounded-xl text-gray-500 hover:text-gray-700 transition-all shadow-sm group"
                >
                  <div className="w-6 h-6 flex items-center justify-center bg-[#f1fcf4] text-[#449352] group-hover:bg-[#449352] group-hover:text-white rounded-full transition-colors">
                    <Plus size={14} className="stroke-[3]" />
                  </div>
                </button>

              </div>
            </div>
          ))}
        </div>

      </div>
      {filterDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          <div 
            onClick={() => setFilterDrawerOpen(false)}
            className="absolute inset-0 bg-black/25 backdrop-blur-[2px] transition-opacity"
          />
          <div 
            ref={drawerRef}
            className="relative w-full max-w-md bg-white h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Filter</h2>
                <button 
                  onClick={() => setFilterDrawerOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search Tasks..." 
                    value={taskSearchQuery}
                    onChange={(e) => setTaskSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[#f7f8fa] border border-transparent rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-gray-200 text-gray-800 placeholder-gray-400 font-medium"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Labels</label>
                <div className="flex flex-wrap gap-2 pt-1">
                  {[
                    { name: 'Design', bg: 'bg-[#43cd66] hover:bg-[#3bb358]' },
                    { name: 'Frontend', bg: 'bg-[#40c3b1] hover:bg-[#349e90]' },
                    { name: 'Backend', bg: 'bg-[#ff7973] hover:bg-[#e66c67]' }
                  ].map((label) => {
                    const isSelected = selectedLabels.includes(label.name);
                    return (
                      <button
                        key={label.name}
                        onClick={() => toggleLabel(label.name)}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold text-white transition-all flex items-center gap-1 shadow-sm ${label.bg} ${isSelected ? 'ring-2 ring-offset-2 ring-gray-400 scale-105' : 'opacity-80'}`}
                      >
                        <span>{label.name}</span>
                        {isSelected && <Check size={12} className="stroke-[3]" />}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Members</label>
                <div className="relative flex items-center bg-white border border-gray-200 rounded-xl px-3 py-2.5">
                  <div className="flex flex-wrap gap-1.5 flex-1 items-center">
                    {selectedMembers.includes('Shane Black') ? (
                      <span className="inline-flex items-center gap-1.5 bg-[#f3f4f6] px-2.5 py-1 rounded-lg text-xs font-bold text-gray-700">
                        <img src="https://i.pravatar.cc/150?img=33" className="w-4.5 h-4.5 rounded-full object-cover" alt="Shane" />
                        <span>Shane Black</span>
                        <button 
                          onClick={() => setSelectedMembers([])}
                          className="text-gray-400 hover:text-gray-600 font-bold ml-1"
                        >
                          ×
                        </button>
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400">Select assignee...</span>
                    )}
                  </div>
                  <button 
                    onClick={() => {
                      if (selectedMembers.includes('Shane Black')) setSelectedMembers([]);
                      else setSelectedMembers(['Shane Black']);
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Search size={16} />
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Due Date</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                    <Calendar size={15} />
                  </span>
                  <select 
                    value={selectedDueDate}
                    onChange={(e) => setSelectedDueDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-600 focus:outline-none appearance-none cursor-pointer"
                  >
                    <option value="anytime">Due anytime</option>
                    <option value="today">Due Today</option>
                    <option value="week">Due This Week</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Status</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                    <Check size={14} className="stroke-[3]" />
                  </span>
                  <select 
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-600 focus:outline-none appearance-none cursor-pointer"
                  >
                    <option value="all">All Statuses</option>
                    <option value="todo">Todo</option>
                    <option value="inProgress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-6 pt-6 border-t border-gray-100 mt-6">
              <button 
                onClick={handleApplyFilters}
                className="bg-[#1f9343] hover:bg-[#197a36] text-white px-6 py-3 rounded-xl font-bold text-xs shadow-sm transition-colors"
              >
                Apply Filters
              </button>
              <button 
                onClick={handleResetFilters}
                className="text-[#1f9343] hover:underline font-bold text-xs"
              >
                Reset all Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}