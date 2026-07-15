import React, { useState } from 'react';
import { 
  Search, Plus, MoreHorizontal, Paperclip, Smile, Send, 
  ArrowLeft, Download, Eye, Edit2, Trash2
} from 'lucide-react';

export default function ChatPage() {
  const [activeChat, setActiveChat] = useState('Jane Wilson');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(true);
  const [messageText, setMessageText] = useState('');

  const teams = [
    { name: '#Managers', snippet: 'Hello, Mark! I am writing to introduce...', unread: 0 },
    { name: '#Designers', snippet: 'Hello. Can you drop the photos...', unread: 4 }
  ];

  const people = [
    { name: 'Dustin Williamson', snippet: 'Hello, Mark! I am writing to introduce...', online: true },
    { name: 'Jane Wilson', snippet: 'We use the Arts as a means of touc...', online: true, unread: 4 },
    { name: 'Regina Cooper', snippet: 'The Arts play a large role in the expr...', online: true },
    { name: 'Brandon Pena', snippet: 'The arts allow us to be as specific or...', online: false },
    { name: 'Jacob Hawkins', snippet: 'From dance and music to abstract...', online: true },
    { name: 'Shane Black', snippet: 'The arts teach us how to communic...', online: true },
    { name: 'Priscilla Edwards', snippet: 'Concept of life is shown through the...', online: true },
    { name: 'Kristin Mccoy', snippet: 'Inner thoughts and beauty in my life...', online: false },
  ];

  // Conversation Mock Log mirroring the image visual flow
  const chatMessages = [
    {
      id: 1,
      sender: 'Jane Wilson',
      isMe: false,
      type: 'text',
      text: 'Hi Cody, any progress on the project? 🤨',
      time: '1 day ago'
    },
    {
      id: 2,
      sender: 'Me',
      isMe: true,
      type: 'text',
      text: 'Hi Jane!\nYes. I just finished developing the "Chat" template.',
      time: '1 day ago',
      images: [
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=150&auto=format&fit=crop&q=60',
        'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=150&auto=format&fit=crop&q=60',
        'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=150&auto=format&fit=crop&q=60'
      ],
      extraImages: 3
    },
    {
      id: 3,
      sender: 'Jane Wilson',
      isMe: false,
      type: 'text',
      text: 'It looks amazing. 🤩\nThe customer will be very satisfied.',
      time: '1 day ago'
    },
    {
      id: 4,
      sender: 'Me',
      isMe: true,
      type: 'text',
      text: 'Thank you, glad you liked it. Send me Styles Guide.',
      time: '1 day ago',
      actions: true 
    },
    {
      id: 5,
      sender: 'Jane Wilson',
      isMe: false,
      type: 'file',
      fileName: 'Brand Styles Guide.pdf',
      fileSize: '487 KB',
      time: '2 min ago'
    },
    {
      id: 6,
      sender: 'Me',
      isMe: true,
      type: 'text',
      text: "I'll see later",
      time: '1 min ago'
    }
  ];

  return (
    <>
          <h1 className="text-start text-3xl font-semibold text-[#212529] tracking-tight">Chat</h1>

    <div className="flex h-[calc(100vh-110px)] w-full font-sans border border-gray-100 bg-white rounded-2xl overflow-hidden shadow-sm">
      <div className={`${isMobileSidebarOpen ? 'flex' : 'hidden md:flex'} flex-col w-full md:w-80 border-r border-gray-100 bg-white shrink-0`}>
        {/* Search Header */}
        <div className="p-4 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full bg-[#f8fafc] pl-9 pr-4 py-2 text-sm border-0 rounded-xl focus:ring-1 focus:ring-gray-200 outline-none"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-1">
              <span>Teams</span>
              <button className="hover:text-gray-600"><Plus size={16} /></button>
            </div>
            <div className="space-y-1">
              {teams.map((team) => (
                <div 
                  key={team.name}
                  onClick={() => { setActiveChat(team.name); setIsMobileSidebarOpen(false); }}
                  className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${activeChat === team.name ? 'bg-gray-50' : 'hover:bg-gray-50/50'}`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 ${team.name === '#Managers' ? 'bg-cyan-50 text-cyan-600' : 'bg-emerald-50 text-emerald-600'}`}>
                    {team.name[1]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-gray-800 truncate">{team.name}</h4>
                      {team.unread > 0 && <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{team.unread}</span>}
                    </div>
                    <p className="text-[11px] text-gray-400 truncate mt-0.5">{team.snippet}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 pt-0">
            <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-1">
              <span>People</span>
              <button className="hover:text-gray-600"><Plus size={16} /></button>
            </div>
            <div className="space-y-1">
              {people.map((person) => (
                <div 
                  key={person.name}
                  onClick={() => { setActiveChat(person.name); setIsMobileSidebarOpen(false); }}
                  className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${activeChat === person.name ? 'bg-gray-50' : 'hover:bg-gray-50/50'}`}
                >
                  <div className="relative shrink-0">
                    <div className="w-9 h-9 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-semibold text-xs">
                      {person.name.split(' ').map(n=>n[0]).join('')}
                    </div>
                    {person.online && (
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-gray-800 truncate">{person.name}</h4>
                      {person.unread > 0 && <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{person.unread}</span>}
                    </div>
                    <p className="text-[11px] text-gray-400 truncate mt-0.5">{person.snippet}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={`${!isMobileSidebarOpen ? 'flex' : 'hidden md:flex'} flex-col flex-1 bg-white min-w-0 h-full`}>
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <button 
              onClick={() => setIsMobileSidebarOpen(true)}
              className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 md:hidden mr-1"
            >
              <ArrowLeft size={18} />
            </button>
            <div className="relative shrink-0">
              <div className="w-9 h-9 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-semibold text-xs">
                {activeChat.replace('#','').split(' ').map(n=>n[0]).join('')}
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />
            </div>
            <h3 className="text-sm font-bold text-gray-800 truncate">{activeChat}</h3>
          </div>
          <div className="flex items-center gap-3 text-gray-400">
            <button className="p-1 hover:bg-gray-50 rounded text-gray-600 font-bold text-sm">+</button>
            <button className="p-1 hover:bg-gray-50 rounded text-gray-500"><MoreHorizontal size={18} /></button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white flex flex-col">
          {chatMessages.map((msg, index) => {
            const showTimeline = index === 4;

            return (
              <React.Fragment key={msg.id}>
                {showTimeline && (
                  <div className="flex items-center my-6">
                    <div className="flex-1 h-px bg-gray-100" />
                    <span className="px-4 text-[11px] font-medium text-gray-400 tracking-wide">Today</span>
                    <div className="flex-1 h-px bg-gray-100" />
                  </div>
                )}

                <div className={`flex items-start gap-3 w-full group ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                  {!msg.isMe && (
                    <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-semibold text-[11px] shrink-0 mt-0.5">
                      {msg.sender.split(' ').map(n=>n[0]).join('')}
                    </div>
                  )}

                  <div className={`flex flex-col max-w-[70%] space-y-1 relative ${msg.isMe ? 'items-end' : 'items-start'}`}>
                    {msg.actions && (
                      <div className="absolute left-0 -translate-x-14 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center gap-1 bg-white border border-gray-100 rounded-lg p-1 shadow-sm transition-all z-10">
                        <button className="p-1 hover:bg-gray-50 rounded text-gray-400 hover:text-gray-600"><Edit2 size={12} /></button>
                        <button className="p-1 hover:bg-gray-50 rounded text-gray-400 hover:text-red-500"><Trash2 size={12} /></button>
                      </div>
                    )}
                    {msg.type === 'text' ? (
                      <div className={`px-4 py-3 rounded-2xl text-sm whitespace-pre-line leading-relaxed shadow-sm
                        ${msg.isMe 
                          ? 'bg-white border border-gray-100 text-gray-800 rounded-tr-none' 
                          : 'bg-[#2e8b2e] text-white rounded-tl-none font-medium'
                        }`}
                      >
                        {msg.text}
                      </div>
                    ) : (
                      <div className="w-64 border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                        <div className="p-4 bg-emerald-50/40 text-left">
                          <p className="text-xs font-bold text-gray-700 truncate">{msg.fileName}</p>
                          <p className="text-[10px] text-gray-400 mt-0.5">{msg.fileSize}</p>
                        </div>
                        <button className="w-full py-2.5 bg-[#2e8b2e] hover:bg-[#226622] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors">
                          <Download size={14} /> <span>Download</span>
                        </button>
                      </div>
                    )}
                    {msg.images && (
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        {msg.images.map((imgUrl, i) => (
                          <div key={i} className="relative w-16 h-16 rounded-xl overflow-hidden border border-gray-100 cursor-pointer hover:opacity-90 transition-opacity">
                            <img src={imgUrl} alt="Attachment" className="w-full h-full object-cover" />
                            {i === 2 && msg.extraImages > 0 && (
                              <div className="absolute inset-0 bg-emerald-50/90 flex items-center justify-center text-xs font-bold text-emerald-800">
                                +{msg.extraImages}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    <span className="text-[10px] text-gray-400 pt-0.5 px-1 block">
                      {msg.time}
                    </span>
                  </div>
                  {msg.isMe && (
                    <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center font-semibold text-[11px] shrink-0 mt-0.5">
                      Me
                    </div>
                  )}

                </div>
              </React.Fragment>
            );
          })}
        </div>
        <div className="p-4 bg-white border-t border-gray-100 shrink-0">
          <form 
            onSubmit={(e) => { e.preventDefault(); setMessageText(''); }}
            className="flex items-center gap-3 bg-white w-full"
          >
            <button type="button" className="p-2 hover:bg-gray-50 rounded-xl text-gray-400 hover:text-gray-600 transition-colors">
              <Paperclip size={18} />
            </button>
            <button type="button" className="p-2 hover:bg-gray-50 rounded-xl text-gray-400 hover:text-gray-600 transition-colors">
              <Smile size={18} />
            </button>
            <input 
              type="text" 
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Type a message here..."
              className="flex-1 py-2 text-sm text-gray-700 border-0 outline-none placeholder-gray-400 focus:ring-0"
            />
            <button 
              type="submit" 
              className="p-2.5 bg-[#2e8b2e] hover:bg-[#226622] text-white rounded-full transition-colors shadow-sm"
            >
              <Send size={16} className="fill-current" />
            </button>
          </form>
        </div>

      </div>
    </div>
    </>

  );
}