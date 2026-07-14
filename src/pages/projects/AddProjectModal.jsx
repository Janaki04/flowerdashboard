import React, { useState } from 'react';
import { X, Calendar, Search, Plus } from 'lucide-react';

export default function AddProjectModal({ isOpen, onClose, onSubmit }) {
  const [projectName, setProjectName] = useState('App Development');
  const [clientName, setClientName] = useState('Dropbox, Inc.');
  const [description, setDescription] = useState(
    'Create a mobile application on iOS and Android devices.'
  );
  const [startTime, setStartTime] = useState('00:00');
  const [startDate, setStartDate] = useState('12.07.2020');
  const [endTime, setEndTime] = useState('00:00');
  const [endDate, setEndDate] = useState('12.07.2020');
  const [members, setMembers] = useState(['Shane Black']);
  const [budget, setBudget] = useState('2.500.000');

  if (!isOpen) return null;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const projectPayload = {
      title: projectName,
      company: clientName,
      desc: description,
      timeDetails: { startTime, startDate, endTime, endDate },
      staff: members,
      budget: budget,
    };

    onSubmit(projectPayload);
    onClose(); 
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px]">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative w-full max-w-[500px] bg-white rounded-3xl p-6 shadow-2xl space-y-5 z-10 animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Add Project</h2>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400">Project Name</label>
            <input 
              type="text" 
              value={projectName} 
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-gray-700 focus:outline-none focus:border-gray-300 placeholder-gray-300"
              placeholder="Project Title" 
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400">Client Name</label>
            <input 
              type="text" 
              value={clientName} 
              onChange={(e) => setClientName(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-gray-700 focus:outline-none focus:border-gray-300 placeholder-gray-300"
              placeholder="Enterprise Client" 
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400">Description</label>
            <textarea 
              rows={3}
              value={description} 
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-gray-700 focus:outline-none focus:border-gray-300 placeholder-gray-300 resize-none"
              placeholder="Add summary details..."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400">Start Date</label>
              <div className="flex gap-1.5">
                <input 
                  type="text" 
                  value={startTime} 
                  onChange={(e) => setStartTime(e.target.value)} 
                  className="w-16 text-center border border-gray-200 rounded-xl py-2 text-xs font-bold text-gray-600 focus:outline-none" 
                />
                <div className="relative flex-1">
                  <input 
                    type="text" 
                    value={startDate} 
                    onChange={(e) => setStartDate(e.target.value)} 
                    className="w-full pl-3 pr-7 border border-gray-200 rounded-xl py-2 text-xs font-bold text-gray-600 focus:outline-none" 
                  />
                  <Calendar size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400">End Date</label>
              <div className="flex gap-1.5">
                <input 
                  type="text" 
                  value={endTime} 
                  onChange={(e) => setEndTime(e.target.value)} 
                  className="w-16 text-center border border-gray-200 rounded-xl py-2 text-xs font-bold text-gray-600 focus:outline-none" 
                />
                <div className="relative flex-1">
                  <input 
                    type="text" 
                    value={endDate} 
                    onChange={(e) => setEndDate(e.target.value)} 
                    className="w-full pl-3 pr-7 border border-gray-200 rounded-xl py-2 text-xs font-bold text-gray-600 focus:outline-none" 
                  />
                  <Calendar size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400">Members</label>
            <div className="relative flex items-center bg-white border border-gray-200 rounded-xl px-3 py-2">
              <div className="flex flex-wrap gap-1.5 flex-1 items-center">
                {members.map((m) => (
                  <span key={m} className="inline-flex items-center gap-1 bg-gray-100 px-2.5 py-0.5 rounded-lg text-xs font-bold text-gray-600">
                    <span>{m}</span>
                    <button 
                      type="button" 
                      onClick={() => setMembers(prev => prev.filter(name => name !== m))} 
                      className="text-gray-400 hover:text-gray-600 font-bold ml-1"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <Search size={14} className="text-gray-400" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400">Budget</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-semibold">$</span>
              <input 
                type="text" 
                value={budget} 
                onChange={(e) => setBudget(e.target.value)}
                className="w-full border border-gray-200 rounded-xl pl-8 pr-4 py-2.5 text-sm font-semibold text-gray-700 focus:outline-none focus:border-gray-300"
              />
            </div>
          </div>
          <div className="pt-2 flex justify-start">
            <button 
              type="submit" 
              className="bg-[#1f9343] hover:bg-[#197a36] text-white px-7 py-2.5 rounded-xl font-bold text-xs shadow-sm transition-colors"
            >
              Create
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}