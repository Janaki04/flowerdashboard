import React, { useState } from 'react';
import { 
  Plus, Inbox, Star, File, Send, AlertCircle, Trash2, 
  Search, ArrowLeft, RotateCw, ChevronLeft, ChevronRight, 
  Bookmark, Printer, Trash, Paperclip, Clock, Bold, Italic, 
  Underline, Link2, Smile, Image, List, ListOrdered, 
  AlignLeft, AlignCenter, AlignRight, AlignJustify
} from 'lucide-react';
import ComposeMailModal from './ComposeMailModal';

export default function MailPage() {
  const [selectedEmail, setSelectedEmail] = useState(1);
  const [isMobileListOpen, setIsMobileListOpen] = useState(true);
  const [isComposeOpen, setIsComposeOpen] = useState(false);

  const emails = [
    {
      id: 1,
      sender: "Regina Cooper",
      email: "regina_cooper@mail.com",
      subject: "Creative Director Resume",
      time: "10:45",
      date: "May 27, 2020",
      body: "The Arts play a large role in the expression of inner thoughts and beauty in my life...",
      fullText: "Hello, Regina Cooper!\n\nI am writing to introduce you to David Boyd. I know you've been looking hard for a candidate for that Creative Director position and I believe David Boyd fits the position.\n\nDavid Boyd and I worked together at Apple company, Where they were the senior Creative Director. They did a terrific job there. David Boyd was responsible for completely restructuring both the public-facing and internal websites. They'd be a great fit at Google company.\n\nI've attached David Boyd resume and portfolio for your review. You can contact David Boyd at regina_cooper@mail.com\n\nThanks for any help you can give. 😃",
      isBookmarked: true,
      attachments: [
        { name: "Resume.pdf", size: "570 KB", type: "pdf" },
        { name: "Portfolio.zip", size: "250 MB", type: "zip" }
      ]
    },
    {
      id: 2,
      sender: "Dustin Williamson",
      subject: "Meeting with friends",
      time: "10:40",
      body: "Hello, Mark! I am writing to introduce you to David Boyd..."
    },
    {
      id: 3,
      sender: "Jane Wilson",
      subject: "UX Conference in New York",
      time: "09:15",
      body: "We use the Arts as a means of touching that part of us that we cannot reach with..."
    },
    {
      id: 4,
      sender: "Brandon Pena",
      subject: "Muzli's weekly design #236",
      time: "09:01",
      body: "The arts allow us to be as specific or as abstract as we please. It helps us become...",
      isBookmarked: true
    }
  ];

  const currentEmail = emails.find(e => e.id === selectedEmail) || emails[0];

  return (
    <>
          <h1 className="text-start text-3xl font-semibold text-[#212529] tracking-tight">Mail</h1>

    <div className="flex h-[calc(100vh-110px)] font-sans w-full border border-gray-100 bg-white rounded-2xl overflow-hidden shadow-sm">
      
      <div className="hidden xl:flex flex-col w-64 border-r border-gray-100 p-4 shrink-0 bg-white">
        <button 
        onClick={() => setIsComposeOpen(true)}
        className="flex items-center justify-center gap-2 w-full py-3 bg-[#428a42] hover:bg-[#346e34] text-white rounded-xl font-medium transition-colors mb-6">
          <Plus size={18} />
          <span>NEW MESSAGE</span>
        </button>

        <nav className="space-y-1 flex-1">
          <div className="flex items-center justify-between px-3 py-2.5 bg-gray-50 text-gray-900 rounded-xl font-semibold text-sm">
            <div className="flex items-center gap-3 text-gray-700">
              <Inbox size={18} /> <span>Inbox</span>
            </div>
            <span className="bg-red-500 text-white text-[11px] font-bold px-1.5 py-0.5 rounded-full">5</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 rounded-xl text-sm transition-colors cursor-pointer">
            <Star size={18} /> <span>Marked</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 rounded-xl text-sm transition-colors cursor-pointer">
            <File size={18} /> <span>Drafts</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 rounded-xl text-sm transition-colors cursor-pointer">
            <Send size={18} /> <span>Sent</span>
          </div>
          <div className="flex items-center justify-between px-3 py-2.5 text-gray-600 hover:bg-gray-50 rounded-xl text-sm transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <AlertCircle size={18} /> <span>Important</span>
            </div>
            <span className="bg-red-500 text-white text-[11px] font-bold px-1.5 py-0.5 rounded-full">4</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 rounded-xl text-sm transition-colors cursor-pointer">
            <Trash2 size={18} /> <span>Deleted</span>
          </div>

          <div className="pt-6">
            <div className="flex items-center justify-between px-3 mb-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
              <span>Labels</span>
              <button className="text-gray-400 hover:text-gray-600 text-base">+</button>
            </div>
            {['Personal', 'Work', 'Friends', 'Family', 'Social'].map((label, idx) => {
              const colors = ['bg-teal-400', 'bg-blue-400', 'bg-green-400', 'bg-yellow-400', 'bg-emerald-500'];
              return (
                <div key={label} className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-xl text-sm transition-colors cursor-pointer">
                  <span className={`w-2 h-2 rounded-full ${colors[idx]}`} />
                  <span>{label}</span>
                </div>
              );
            })}
          </div>
        </nav>
      </div>

      <div className={`${isMobileListOpen ? 'flex' : 'hidden md:flex'} flex-col w-full md:w-80 lg:w-96 border-r border-gray-100 bg-white shrink-0`}>
        <div className="p-4 border-b border-gray-100 flex items-center justify-between gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full bg-[#f8fafc] pl-9 pr-4 py-2 text-sm border-0 rounded-xl focus:ring-1 focus:ring-gray-200 outline-none"
            />
          </div>
          <button className="flex items-center gap-1 text-xs text-gray-500 font-medium hover:text-gray-700 px-2 py-2">
            <span>Recent</span>
            <span className="text-[10px]">▼</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
          {emails.map((email) => (
            <div 
              key={email.id}
              onClick={() => {
                setSelectedEmail(email.id);
                setIsMobileListOpen(false); 
              }}
              className={`p-4 cursor-pointer transition-colors relative ${selectedEmail === email.id ? 'bg-[#f8fafc]' : 'hover:bg-gray-50'}`}
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-semibold text-sm shrink-0">
                  {email.sender.split(' ').map(n=>n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <h4 className="text-sm font-semibold text-gray-800 truncate">{email.sender}</h4>
                    <span className="text-xs text-gray-400 shrink-0">{email.time}</span>
                  </div>
                  <h5 className="text-xs font-medium text-gray-900 mb-1 truncate">{email.subject}</h5>
                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">{email.body}</p>
                </div>
              </div>
              {email.isBookmarked && (
                <div className="absolute bottom-4 left-4 text-red-400">
                  <span className="text-xs">🔖</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className={`${!isMobileListOpen ? 'flex' : 'hidden md:flex'} flex-col flex-1 bg-white min-w-0 h-full`}>
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileListOpen(true)}
              className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 md:hidden"
            >
              <ArrowLeft size={18} />
            </button>
            <button className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600">
              <RotateCw size={18} />
            </button>
          </div>
          
          <div className="flex items-center gap-5 text-gray-400">
            <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
              <button className="p-1 hover:bg-gray-100 rounded"><ChevronLeft size={16} /></button>
              <span>1 of 200</span>
              <button className="p-1 hover:bg-gray-100 rounded"><ChevronRight size={16} /></button>
            </div>
            <div className="h-4 w-px bg-gray-200" />
            <button className="hover:text-red-500"><Bookmark size={18} className="fill-current text-red-400" /></button>
            <button className="hover:text-gray-600"><Printer size={18} /></button>
            <button className="hover:text-gray-600"><Trash size={18} /></button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-semibold shrink-0">
                {currentEmail.sender.split(' ').map(n=>n[0]).join('')}
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-800">{currentEmail.sender}</h3>
                <span className="text-xs text-green-600 font-medium hover:underline cursor-pointer">{currentEmail.email || 'contact@mail.com'}</span>
              </div>
            </div>
            <span className="text-xs text-gray-400">{currentEmail.date || 'Today'} — {currentEmail.time}</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">{currentEmail.subject}</h2>
            <div className="text-sm text-gray-600 whitespace-pre-line leading-relaxed space-y-4">
              {currentEmail.fullText || currentEmail.body}
            </div>
          </div>
          {currentEmail.attachments && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
              {currentEmail.attachments.map((file, i) => (
                <div key={i} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl bg-white hover:shadow-sm transition-shadow">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-2xl shrink-0">{file.type === 'pdf' ? '📄' : '📦'}</span>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-gray-700 truncate">{file.name}</p>
                      <p className="text-[11px] text-gray-400">{file.size}</p>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-400 hover:text-gray-600 text-sm">
                    📥
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="border border-gray-200 rounded-xl overflow-hidden mt-6 focus-within:border-gray-300 transition-colors">
            <div className="bg-gray-50/70 px-4 py-2 border-b border-gray-200 flex flex-wrap items-center justify-between gap-y-2 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <span className="font-semibold text-gray-400 mr-1">To:</span>
                <span className="bg-white border border-gray-200 text-gray-700 px-2 py-0.5 rounded-md flex items-center gap-1 font-medium">
                  {currentEmail.sender} <button className="text-gray-400 hover:text-gray-600 text-[10px]">×</button>
                </span>
              </div>
              <div className="flex items-center gap-3 font-medium text-gray-400">
                <button className="hover:text-gray-600">Cc</button>
                <button className="hover:text-gray-600">Bcc</button>
              </div>
            </div>
            <div className="px-4 py-2 border-b border-gray-100 flex flex-wrap items-center gap-1 bg-white">
              <button className="p-1 hover:bg-gray-100 rounded text-gray-500"><Bold size={14} /></button>
              <button className="p-1 hover:bg-gray-100 rounded text-gray-500"><Italic size={14} /></button>
              <button className="p-1 hover:bg-gray-100 rounded text-gray-500"><Underline size={14} /></button>
              <div className="w-px h-4 bg-gray-200 mx-1" />
              <button className="p-1 hover:bg-gray-100 rounded text-gray-500"><Link2 size={14} /></button>
              <button className="p-1 hover:bg-gray-100 rounded text-gray-500"><Smile size={14} /></button>
              <button className="p-1 hover:bg-gray-100 rounded text-gray-500"><Image size={14} /></button>
              <div className="w-px h-4 bg-gray-200 mx-1" />
              <button className="p-1 hover:bg-gray-100 rounded text-gray-500"><List size={14} /></button>
              <button className="p-1 hover:bg-gray-100 rounded text-gray-500"><ListOrdered size={14} /></button>
              <div className="w-px h-4 bg-gray-200 mx-1" />
              <button className="p-1 hover:bg-gray-100 rounded text-gray-500"><AlignLeft size={14} /></button>
              <button className="p-1 hover:bg-gray-100 rounded text-gray-500"><AlignCenter size={14} /></button>
              <button className="p-1 hover:bg-gray-100 rounded text-gray-500"><AlignRight size={14} /></button>
              <button className="p-1 hover:bg-gray-100 rounded text-gray-500"><AlignJustify size={14} /></button>
            </div>
            <textarea 
              rows={4}
              placeholder="Type something"
              className="w-full p-4 border-0 focus:ring-0 resize-none text-sm outline-none text-gray-700 placeholder-gray-400"
            />
            <div className="px-4 py-3 bg-white border-t border-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-1 rounded-xl overflow-hidden shadow-sm">
                <button className="px-5 py-2 bg-[#428a42] hover:bg-[#346e34] text-white text-sm font-medium transition-colors">
                  Send
                </button>
                <button className="p-2 bg-[#428a42] hover:bg-[#346e34] text-white border-l border-[#4ea24e] transition-colors">
                  <Clock size={16} />
                </button>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-xl text-gray-400 hover:text-gray-600 transition-colors">
                <Paperclip size={18} />
              </button>
            </div>
          </div>

        </div>
      </div>
    <ComposeMailModal 
        isOpen={isComposeOpen} 
        onClose={() => setIsComposeOpen(false)} 
      />
    </div>
    </>

  );
}