import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  SlidersHorizontal, 
  Grid, 
  List, 
  MoreHorizontal, 
  Clock,
  Search,
  Calendar,
  Check,
  X,
  Filter
} from 'lucide-react';
import AddProjectModal from './AddProjectModal';

const CustomProjectIcon = ({ title }) => {
  const letters = title ? title.substring(0, 2).toUpperCase() : 'PR';
  return (
    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm uppercase shrink-0">
      {letters}
    </div>
  );
};

const DropboxIcon = () => (
  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M6 2l6 4-6 4-6-4 6-4zm12 0l6 4-6 4-6-4 6-4zM6 14l6 4-6 4-6-4 6-4zm12 0l6 4-6 4-6-4 6-4zM12 6.5l6 4-6 4-6-4 6-4z" /></svg>
  </div>
);

const GitLabIcon = () => (
  <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 shrink-0">
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M23.95 12.43l-2.31-7.1a1 1 0 00-.33-.45 1 1 0 00-.54-.15.93.93 0 00-.53.16.9.9 0 00-.31.4l-1.9 5.86H5.97L4.07 5.29a.9.9 0 00-.31-.4.93.93 0 00-.53-.16 1 1 0 00-.54.15 1 1 0 00-.33.45L.05 12.43a1 1 0 00.36 1.15l11.04 8a1 1 0 001.1 0l11.04-8a1 1 0 00.36-1.15z" /></svg>
  </div>
);

const BitbucketIcon = () => (
  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 shrink-0">
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M22.34 2.5a1.22 1.22 0 00-1.22 1.05L18.3 20a1.23 1.23 0 001.21 1.43h10a1.23 1.23 0 001.21-1.43l-2.82-16.4A1.22 1.22 0 0016.66 2.5h5.68zm-3.6 13h-4.48L13 7.84h6.5l-.76 7.66z" /></svg>
  </div>
);

const PythonIcon = () => (
  <div className="w-10 h-10 rounded-xl bg-yellow-50/70 flex items-center justify-center shrink-0">
    <svg viewBox="0 0 24 24" className="w-5 h-5">
      <path fill="#3776AB" d="M11.9 2C6.9 2 7.1 4.1 7.1 4.1l.1 2.1h9.4s2 0 2 1.9V13s1.9.1 3.2-1.2c1.3-1.3 1.2-3.8 1.2-3.8l-.1-2.1c-.2-1.9-2.2-3.9-6-3.9H11.9z" />
      <path fill="#FFD343" d="M12.1 22c5 0 4.8-2.1 4.8-2.1l-.1-2.1H7.4s-2 0-2-1.9V9S3.5 8.9 2.2 10.2C.9 11.5 1 14 1 14l.1 2.1c.2 1.9 2.2 3.9 6 3.9h5z" />
    </svg>
  </div>
);

const SlackIcon = () => (
  <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center shrink-0">
    <svg viewBox="0 0 24 24" className="w-5 h-5">
      <path fill="#e01e5a" d="M5.04 15.17a2.52 2.52 0 11-2.52-2.52h2.52zM6.3 15.17a2.52 2.52 0 015.04 0v5.04a2.52 2.52 0 11-5.04 0z" />
      <path fill="#36c5f0" d="M8.83 5.04a2.52 2.52 0 112.52-2.52v2.52zM8.83 6.3a2.52 2.52 0 010 5.04H3.79a2.52 2.52 0 110-5.04z" />
      <path fill="#2eb67d" d="M18.96 8.83a2.52 2.52 0 112.52 2.52h-2.52zM17.7 8.83a2.52 2.52 0 01-5.04 0V3.79a2.52 2.52 0 115.04 0z" />
      <path fill="#ecb22e" d="M15.17 18.96a2.52 2.52 0 11-2.52 2.52v-2.52zM15.17 17.7a2.52 2.52 0 010-5.04h5.04a2.52 2.52 0 110 5.04z" />
    </svg>
  </div>
);

const FirebaseIcon = () => (
  <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
    <svg viewBox="0 0 24 24" className="w-4 h-4">
      <path fill="#FFCA28" d="M3.89 15.4L8.13 2.15c.12-.37.64-.37.76 0l2.21 6.91-7.21 6.34z" />
      <path fill="#F57C00" d="M11.1 9.06l1.98-3.79a.4.4 0 01.7 0l6.33 11.94-9.01-8.15z" />
      <path fill="#FF3D00" d="M3.3 16.4l8.36-7.56 8.44 7.6a.4.4 0 01-.15.68l-8.03 2.5a.8.8 0 01-.48 0L3.45 17.08a.4.4 0 01-.15-.68z" />
    </svg>
  </div>
);

const AngularIcon = () => (
  <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600 shrink-0">
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M12 2L1.87 5.61l1.55 12.87L12 22l8.58-3.52 1.55-12.87zM12 4.16l6.83 2.41-1.12 9.27L12 18.43l-5.71-2.59-1.12-9.27zM12 5.8l-4.5 10.1h1.9l.9-2.3h3.4l.9 2.3h1.9zM12 8.5l1.2 3h-2.4z" /></svg>
  </div>
);

const VueIcon = () => (
  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
    <svg viewBox="0 0 24 24" className="w-4 h-4"><path fill="#41B883" d="M12.01 20.56L22 3.32h-4.37L12.01 13.1 6.37 3.32H2l10.01 17.24z" /><path fill="#35495E" d="M12.01 13.1l3.41-5.91h-6.82l3.41 5.91z" /></svg>
  </div>
);

const MessengerIcon = () => (
  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M12 2C6.48 2 2 6.14 2 11.25c0 2.9 1.45 5.5 3.73 7.15.19.14.31.36.31.6l-.04 2.1c-.02.76.77 1.3 1.46.96l2.36-1.17c.18-.09.39-.11.59-.05 1.15.34 2.37.51 3.59.51 5.52 0 10-4.14 10-9.25S17.52 2 12 2zm1.09 11.95l-2.22-2.36-4.34 2.36 4.77-5.07 2.22 2.36 4.34-2.36-4.77 5.07z" /></svg>
  </div>
);

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('all'); 
  const [viewMode, setViewMode] = useState('grid'); 
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false); 

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLabels, setSelectedLabels] = useState(['Mobile']); 
  const [selectedMembers, setSelectedMembers] = useState(['Shane Black']);
  const [selectedTimeframe, setSelectedTimeframe] = useState('anytime');

  const [appliedFilters, setAppliedFilters] = useState({
    search: '',
    labels: ['Mobile'],
    members: ['Shane Black'],
    timeframe: 'anytime'
  });

  const [projectsDataset, setProjectsDataset] = useState([
    { id: 1, title: 'App Development', company: 'Dropbox, Inc.', desc: 'Create a mobile application on iOS and Android devices.', progress: 50, timeLeft: '1 week left', isHot: false, status: 'started', label: 'Mobile', icon: <DropboxIcon />, avatars: ['https://i.pravatar.cc/150?img=33', 'https://i.pravatar.cc/150?img=68', 'https://i.pravatar.cc/150?img=12'], staff: ['Shane Black', 'Alex River'] },
    { id: 2, title: 'Website Redesign', company: 'GitLab Inc.', desc: 'It is necessary to develop a website redesign in a corporate style.', progress: 75, timeLeft: '1 week left', isHot: false, status: 'started', label: 'Web UI', icon: <GitLabIcon />, avatars: ['https://i.pravatar.cc/150?img=33', 'https://i.pravatar.cc/150?img=68', 'https://i.pravatar.cc/150?img=12'], staff: ['Shane Black'] },
    { id: 3, title: 'Landing Page', company: 'Bitbucket, Inc.', desc: 'It is necessary to create a landing together with the development of design.', progress: 100, timeLeft: '1 week left', isHot: false, status: 'completed', label: 'Web UI', icon: <BitbucketIcon />, avatars: ['https://i.pravatar.cc/150?img=33', 'https://i.pravatar.cc/150?img=68'], staff: ['Alex River'] },
    { id: 4, title: 'Parser Development', company: 'Driveway, Inc.', desc: 'It is necessary to develop a ticket site parser in python.', progress: 50, timeLeft: '5 days left', isHot: true, status: 'started', label: 'Backend', icon: <PythonIcon />, avatars: ['https://i.pravatar.cc/150?img=33', 'https://i.pravatar.cc/150?img=68', 'https://i.pravatar.cc/150?img=12'], staff: ['Shane Black'] },
    { id: 5, title: 'App Development', company: 'Slack Technologies, Inc.', desc: 'Create a mobile application on iOS and Android devices.', progress: 50, timeLeft: '5 days left', isHot: true, status: 'started', label: 'Mobile', icon: <SlackIcon />, avatars: ['https://i.pravatar.cc/150?img=33', 'https://i.pravatar.cc/150?img=68'], staff: ['Shane Black'] },
    { id: 6, title: 'App Development', company: 'Google, Inc.', desc: 'Create a mobile application on iOS and Android devices.', progress: 25, timeLeft: '1 week left', isHot: false, status: 'on-hold', label: 'Mobile', icon: <FirebaseIcon />, avatars: ['https://i.pravatar.cc/150?img=33', 'https://i.pravatar.cc/150?img=68'], staff: ['Shane Black'] },
    { id: 7, title: 'Admin Dashboard', company: 'ArtTemplate, Inc.', desc: 'Necessary to create Admin Dashboard on Angular 8.', progress: 30, timeLeft: '1 week left', isHot: false, status: 'on-hold', label: 'Web UI', icon: <AngularIcon />, avatars: ['https://i.pravatar.cc/150?img=33', 'https://i.pravatar.cc/150?img=68'], staff: ['Alex River'] },
    { id: 8, title: 'Web App on Vue.js', company: 'ArtTemplate, Inc.', desc: 'It is necessary to develop a web app on the framework Vue.js', progress: 100, timeLeft: '1 week left', isHot: false, status: 'completed', label: 'Web UI', icon: <VueIcon />, avatars: ['https://i.pravatar.cc/150?img=33', 'https://i.pravatar.cc/150?img=68'], staff: ['Alex River'] },
    { id: 9, title: 'App Development', company: 'Facebook, Inc.', desc: 'Create a mobile application on iOS and Android devices.', progress: 50, timeLeft: '1 week left', isHot: false, status: 'started', label: 'Mobile', icon: <MessengerIcon />, avatars: ['https://i.pravatar.cc/150?img=33', 'https://i.pravatar.cc/150?img=68'], staff: ['Shane Black'] }
  ]);

  const handleCreateProject = (projectData) => {
    const newProjectItem = {
      id: Date.now(),
      title: projectData.title,
      company: projectData.company,
      desc: projectData.desc || 'No description provided.',
      progress: 0, // Freshly deployed initial percentage state
      timeLeft: '7 days left',
      isHot: false,
      status: 'started', // Automatically logs into the active 'started' pool pipeline
      label: 'Mobile',
      icon: <CustomProjectIcon title={projectData.title} />,
      avatars: ['https://i.pravatar.cc/150?img=33'],
      staff: projectData.staff
    };

    setProjectsDataset(prev => [newProjectItem, ...prev]);
  };

  const processedData = useMemo(() => {
    return projectsDataset.filter(item => {
      if (activeCategory !== 'all' && item.status !== activeCategory) return false;

      const query = appliedFilters.search.toLowerCase();
      if (query && !(item.title.toLowerCase().includes(query) || item.desc.toLowerCase().includes(query) || item.company.toLowerCase().includes(query))) return false;

      if (appliedFilters.labels.length > 0 && !appliedFilters.labels.includes(item.label)) return false;
      if (appliedFilters.members.length > 0 && !item.staff.some(s => appliedFilters.members.includes(s))) return false;
      if (appliedFilters.timeframe === 'urgent' && !item.isHot) return false;

      return true;
    });
  }, [activeCategory, appliedFilters, projectsDataset]);

  const categoriesMetric = useMemo(() => {
    return {
      all: projectsDataset.length,
      started: projectsDataset.filter(p => p.status === 'started').length,
      'on-hold': projectsDataset.filter(p => p.status === 'on-hold').length,
      completed: projectsDataset.filter(p => p.status === 'completed').length,
    };
  }, [projectsDataset]);

  const toggleLabel = (labelName) => {
    setSelectedLabels(prev => prev.includes(labelName) ? prev.filter(l => l !== labelName) : [...prev, labelName]);
  };

  const handleApply = () => {
    setAppliedFilters({ search: searchQuery, labels: selectedLabels, members: selectedMembers, timeframe: selectedTimeframe });
    setFilterDrawerOpen(false);
  };

  const handleClear = () => {
    setSearchQuery(''); setSelectedLabels([]); setSelectedMembers([]); setSelectedTimeframe('anytime');
    setAppliedFilters({ search: '', labels: [], members: [], timeframe: 'anytime' });
  };

  return (
    <>
    <div className="bg-[#f8f9fa] font-sans min-h-screen text-gray-600 font-sans antialiased p-4 sm:p-8 relative overflow-x-hidden">
      <div className="max-w-[1400px] mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Projects</h1>
          
          <div className="flex items-center gap-2.5">
            <button 
              onClick={() => setFilterDrawerOpen(true)}
              className={`p-2.5 bg-white border border-gray-200 rounded-xl transition-all shadow-sm relative hover:text-gray-900 ${
                (appliedFilters.search || appliedFilters.labels.length > 0 || appliedFilters.members.length > 0 || appliedFilters.timeframe !== 'anytime') ? 'text-[#1f9343] border-emerald-200 bg-emerald-50/20' : 'text-gray-500'
              }`}
            >
              <SlidersHorizontal size={16} className="stroke-[2.5]" />
              {(appliedFilters.search || appliedFilters.labels.length > 0 || appliedFilters.members.length > 0 || appliedFilters.timeframe !== 'anytime') && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />
              )}
            </button>
            <button 
              onClick={() => setAddModalOpen(true)}
              className="flex items-center gap-1.5 bg-[#1f9343] hover:bg-[#197a36] text-white px-4 py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm"
            >
              <Plus size={16} className="stroke-[3]" />
              <span className="hidden sm:inline">Add Project</span>
            </button>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200/70 pb-0.5">
          <div className="flex items-center gap-1 overflow-x-auto -mb-px scrollbar-none">
            {[
              { id: 'all', label: 'All', count: categoriesMetric.all },
              { id: 'started', label: 'Started', count: categoriesMetric.started },
              { id: 'on-hold', label: 'On Hold', count: categoriesMetric['on-hold'] },
              { id: 'completed', label: 'Completed', count: categoriesMetric.completed }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`flex items-center gap-2 px-3 py-3 border-b-2 font-bold text-sm transition-all whitespace-nowrap ${
                  activeCategory === tab.id ? 'border-[#1f9343] text-[#1f9343]' : 'border-transparent text-gray-400 hover:text-gray-600'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold ${
                  activeCategory === tab.id ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-400'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 pb-2 sm:pb-0">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'text-[#1f9343] bg-emerald-50' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <List size={18} />
            </button>
            <div className="w-px h-5 bg-gray-200 mx-1" />
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'text-[#1f9343] bg-emerald-50' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Grid size={18} />
            </button>
          </div>
        </div>
        {processedData.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center max-w-xl mx-auto space-y-3">
            <Filter size={32} className="mx-auto text-gray-300" />
            <h3 className="text-base font-bold text-gray-700">No projects found matching filters</h3>
            <button onClick={handleClear} className="text-xs font-bold text-[#1f9343] bg-emerald-50 px-4 py-2 rounded-xl hover:bg-emerald-100 transition-colors mt-2">
              Clear All Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-200">
            {processedData.map((project) => (
              <div key={project.id} className="bg-white border border-gray-100 rounded-2xl p-5 space-y-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3.5">
                      {project.icon}
                      <div>
                        <h3 className="text-base font-bold text-gray-800 leading-tight tracking-tight">{project.title}</h3>
                        <p className="text-xs font-semibold text-gray-400">{project.company}</p>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600 p-1"><MoreHorizontal size={18} /></button>
                  </div>
                  <p className="text-xs text-gray-400 font-medium leading-relaxed min-h-[36px]">{project.desc}</p>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="flex justify-between items-center text-[11px] font-bold text-gray-400">
                    <span className="uppercase tracking-wider">Progress</span>
                    <span className="text-gray-600">{project.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-emerald-500 transition-all duration-500" style={{ width: `${project.progress}%` }} />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-50 mt-1">
                  <div className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold ${project.isHot ? 'bg-amber-50 text-amber-600' : 'bg-gray-100 text-gray-400/90'}`}>
                    <Clock size={13} className="stroke-[2.5]" />
                    <span>{project.timeLeft}</span>
                  </div>
                  <div className="flex -space-x-1.5 overflow-hidden">
                    {project.avatars.map((url, i) => (
                      <img key={i} className="inline-block h-6.5 w-6.5 rounded-full ring-2 ring-white object-cover" src={url} alt="Staff" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-gray-100 rounded-2xl divide-y divide-gray-50 shadow-[0_2px_8px_rgba(0,0,0,0.02)] animate-in fade-in duration-200">
            {processedData.map((project) => (
              <div key={project.id} className="p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors">
                <div className="flex items-center gap-4 min-w-[260px]">
                  {project.icon}
                  <div>
                    <h3 className="text-sm font-bold text-gray-800 tracking-tight">{project.title}</h3>
                    <p className="text-[11px] font-semibold text-gray-400">{project.company}</p>
                  </div>
                </div>
                <div className="flex-1"><p className="text-xs text-gray-400 font-medium truncate max-w-sm">{project.desc}</p></div>
                <div className="flex items-center justify-between lg:justify-end gap-6">
                  <div className="w-24 space-y-1">
                    <div className="flex justify-between text-[10px] font-bold text-gray-400"><span>{project.progress}%</span></div>
                    <div className="w-full h-1 bg-gray-100 rounded-full"><div className="h-full bg-emerald-500 rounded-full" style={{ width: `${project.progress}%` }} /></div>
                  </div>
                  <span className={`px-2 py-1 rounded-md text-[10px] font-bold whitespace-nowrap ${project.isHot ? 'bg-amber-50 text-amber-600' : 'bg-gray-100 text-gray-400'}`}>{project.timeLeft}</span>
                  <div className="flex -space-x-1">{project.avatars.map((url, i) => <img key={i} className="h-6 w-6 rounded-full ring-2 ring-white" src={url} alt="Staff" />)}</div>
                  <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
      {filterDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          <div onClick={() => setFilterDrawerOpen(false)} className="absolute inset-0 bg-black/25 backdrop-blur-[2px] transition-opacity" />
          
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200">
            <div className="space-y-6">
              
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Filter Projects</h2>
                <button onClick={() => setFilterDrawerOpen(false)} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors"><X size={20} /></button>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Keywords</label>
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search titles, descriptions, clients..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[#f7f8fa] border border-transparent rounded-xl text-sm focus:outline-none text-gray-800 placeholder-gray-400 font-medium"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Classification Tags</label>
                <div className="flex flex-wrap gap-2 pt-1">
                  {[
                    { name: 'Mobile', bg: 'bg-[#40c3b1] hover:bg-[#349e90]' },
                    { name: 'Web UI', bg: 'bg-[#43cd66] hover:bg-[#3bb358]' },
                    { name: 'Backend', bg: 'bg-[#ff7973] hover:bg-[#e66c67]' }
                  ].map((label) => {
                    const isSelected = selectedLabels.includes(label.name);
                    return (
                      <button
                        key={label.name}
                        onClick={() => toggleLabel(label.name)}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold text-white transition-all flex items-center gap-1 shadow-sm ${label.bg} ${isSelected ? 'ring-2 ring-offset-2 ring-gray-400 scale-105' : 'opacity-75'}`}
                      >
                        <span>{label.name}</span>
                        {isSelected && <Check size={12} className="stroke-[3]" />}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Assigned Leads</label>
                <div className="relative flex items-center bg-white border border-gray-200 rounded-xl px-3 py-2.5">
                  <div className="flex flex-wrap gap-1.5 flex-1 items-center">
                    {selectedMembers.includes('Shane Black') ? (
                      <span className="inline-flex items-center gap-1.5 bg-[#f3f4f6] px-2.5 py-1 rounded-lg text-xs font-bold text-gray-700">
                        <img src="https://i.pravatar.cc/150?img=33" className="w-4.5 h-4.5 rounded-full object-cover" alt="Shane" />
                        <span>Shane Black</span>
                        <button onClick={() => setSelectedMembers([])} className="text-gray-400 hover:text-gray-600 font-bold ml-1">×</button>
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400">All Project Assignees</span>
                    )}
                  </div>
                  <button 
                    onClick={() => setSelectedMembers(prev => prev.includes('Shane Black') ? [] : ['Shane Black'])}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Search size={16} />
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Time Priorities</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"><Calendar size={15} /></span>
                  <select 
                    value={selectedTimeframe}
                    onChange={(e) => setSelectedTimeframe(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-600 focus:outline-none appearance-none cursor-pointer"
                  >
                    <option value="anytime">Show all schedules</option>
                    <option value="urgent">Urgent priority (&lt; 6 days left)</option>
                  </select>
                </div>
              </div>

            </div>
            <div className="flex items-center gap-6 pt-6 border-t border-gray-100 mt-6">
              <button onClick={handleApply} className="bg-[#1f9343] hover:bg-[#197a36] text-white px-6 py-3 rounded-xl font-bold text-xs shadow-sm transition-colors">
                Apply Filters
              </button>
              <button onClick={handleClear} className="text-[#1f9343] hover:underline font-bold text-xs">
                Reset all Filters
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
       <AddProjectModal 
        isOpen={addModalOpen} 
        onClose={() => setAddModalOpen(false)} 
        onSubmit={handleCreateProject} 
      />
    </>
  );
}