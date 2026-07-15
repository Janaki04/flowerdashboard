import React, { useState } from 'react';
import { Plus, SlidersHorizontal, Calendar, Pin, X } from 'lucide-react';

export default function NotesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "The title of a note",
      date: "12 June, 2020",
      description: "Lorem ipsum dolor sit amet, ullamcous cididunt consectetur adipiscing elit, seds do et eiusmod tempor incididunt ut laborels dolore magnarels aliqua. Ut enim ad nesid utminim veniam, quis nostrud eiusmo exercitation ullamco labori is amco commodo consequat seds eiusmod.",
      isPinned: true
    },
    {
      id: 2,
      title: "The title of a note",
      date: "12 June, 2020",
      description: "Lorem ipsum dolor sit amet, ullamcous cididunt consectetur adipiscing elit, seds do et eiusmod tempor incididunt ut laborels dolore magnarels aliqua. Ut enim ad nesid utminim veniam, quis nostrud eiusmo exercitation ullamco labori is amco commodo consequat seds eiusmod.",
      isPinned: true
    },
    {
      id: 3,
      title: "The title of a note",
      date: "12 June, 2020",
      description: "Lorem ipsum dolor sit amet, ullamcous cididunt consectetur adipiscing elit, seds do et eiusmod tempor incididunt ut laborels dolore magnarels aliqua. Ut enim ad nesid utminim veniam, quis nostrud eiusmo exercitation ullamco labori is amco commodo consequat seds eiusmod.",
      isPinned: true
    },
    {
      id: 4,
      title: "The title of a note",
      date: "12 June, 2020",
      description: "Lorem ipsum dolor sit amet, ullamcous cididunt consectetur adipiscing elit, seds do et eiusmod tempor incididunt ut laborels dolore magnarels aliqua. Ut enim ad nesid utminim veniam, quis nostrud eiusmo exercitation ullamco labori is amco commodo consequat seds eiusmod.",
      isPinned: false
    },
    {
      id: 5,
      title: "The title of a note",
      date: "12 June, 2020",
      description: "Lorem ipsum dolor sit amet, ullamcous cididunt consectetur adipiscing elit, seds do et eiusmod tempor incididunt ut laborels dolore magnarels aliqua. Ut enim ad nesid utminim veniam, quis nostrud eiusmo exercitation ullamco labori is amco commodo consequat seds eiusmod.",
      isPinned: false
    },
    {
      id: 6,
      title: "The title of a note",
      date: "12 June, 2020",
      description: "Lorem ipsum dolor sit amet, ullamcous cididunt consectetur adipiscing elit, seds do et eiusmod tempor incididunt ut laborels dolore magnarels aliqua. Ut enim ad nesid utminim veniam, quis nostrud eiusmo exercitation ullamco labori is amco commodo consequat seds eiusmod.",
      isPinned: false
    }
  ]);

  const togglePin = (id) => {
    setNotes(notes.map(note => note.id === id ? { ...note, isPinned: !note.isPinned } : note));
  };

  const handleCreateNote = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newNoteItem = {
      id: Date.now(),
      title: newTitle,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      description: newDescription || "No additional text description details supplied.",
      isPinned: false
    };

    setNotes([newNoteItem, ...notes]);
    setNewTitle('');
    setNewDescription('');
    setIsModalOpen(false);
  };

  return (
    <div className="w-full min-h-[calc(100vh-110px)] bg-[#f8fafc] p-4 sm:p-6 lg:p-8 rounded-2xl relative">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Notes</h1>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#1b873a] hover:bg-[#14662b] text-white text-sm font-semibold rounded-xl transition-colors shadow-xs"
          >
            <Plus size={18} />
            <span>Add Note</span>
          </button>
        </div>
      </div>

      {/* RESPONSIBLE GRID BOARD TRACK LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <div 
            key={note.id}
            className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden flex flex-col relative transition-all duration-200 hover:shadow-md"
          >
            {/* Corner visual flag element for pinned structural items */}
            {note.isPinned && (
              <div className="absolute top-0 left-0 w-12 h-12 overflow-hidden pointer-events-none">
                <div className="bg-[#fcc419] absolute transform -rotate-45 text-center w-[60px] h-[24px] -top-[4px] -left-[18px]" />
              </div>
            )}

            {/* Top Info Card Row Bar */}
            <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-dashed border-gray-100">
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 pl-4">
                <Calendar size={14} className="stroke-[2.2]" />
                <span>{note.date}</span>
              </div>
              <button 
                onClick={() => togglePin(note.id)}
                className={`p-1.5 rounded-lg transition-colors ${note.isPinned ? 'text-gray-700 bg-gray-50' : 'text-gray-300 hover:text-gray-500 hover:bg-gray-50'}`}
              >
                <Pin size={16} className={note.isPinned ? 'fill-current' : ''} />
              </button>
            </div>

            {/* Interior Main Content Typography */}
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-1">{note.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed font-normal flex-1">
                {note.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL WINDOW DIALOG FOR ADDING NEW NOTES */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Blur Mask overlay */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-xs" onClick={() => setIsModalOpen(false)} />
          
          {/* Form wrapper viewport */}
          <div className="relative bg-white w-full max-w-[480px] rounded-3xl p-6 shadow-2xl border border-gray-50 animate-in fade-in zoom-in-95 duration-150">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-full transition-all"
            >
              <X size={16} />
            </button>

            <h2 className="text-2xl font-bold text-gray-800 mb-6">Add Note</h2>
            
            <form onSubmit={handleCreateNote} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Title</label>
                <input 
                  type="text"
                  required
                  placeholder="The title of a note"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 outline-none focus:border-gray-300 transition-colors bg-white font-medium"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Description</label>
                <textarea 
                  rows={4}
                  placeholder="Type something"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full p-4 border border-gray-200 rounded-xl text-sm text-gray-700 outline-none resize-none focus:border-gray-300 transition-colors bg-white leading-relaxed"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button 
                  type="submit"
                  className="px-6 py-2.5 bg-[#1b873a] hover:bg-[#14662b] text-white text-sm font-semibold rounded-xl transition-colors shadow-xs"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}