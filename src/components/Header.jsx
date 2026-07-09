import React, { useState } from 'react';
import { 
  Menu, 
  Search, 
  Bell, 
  ChevronDown, 
  User, 
  Mail, 
  CheckSquare, 
  Settings, 
  Lock, 
  LogOut,
  X 
} from 'lucide-react';

export default function Header({ onMenuClick }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const [notifications, setNotifications] = useState([
    { id: 1, name: "Regina Cooper", time: "1 min ago", active: true, img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" },
    { id: 2, name: "Judith Black", time: "5 min ago", active: true, img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" },
    { id: 3, name: "Ronald Robertson", time: "3 hour ago", active: true, img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150" },
    { id: 4, name: "Dustin Williamson", time: "15 hour ago", active: true, img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150" },
    { id: 5, name: "Calvin Flores", time: "Yesterday", active: true, img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150" },
    { id: 6, name: "Robert Edwards", time: "Yesterday", active: true, img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150" }
  ]);

  const removeNotification = (id, e) => {
    e.stopPropagation(); 
    setNotifications(prev => prev.filter(item => item.id !== id));
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    setIsProfileOpen(false); 
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsNotificationsOpen(false); 
  };

  return (
    <header className="w-full h-16 bg-white border-b border-gray-100 px-6 flex items-center justify-between select-none relative">
      
      <div className="flex items-center">
        <button 
          onClick={onMenuClick}
          className="text-gray-600 hover:bg-gray-50 p-2 rounded-lg transition-colors focus:outline-none lg:hidden"
        >
          <Menu size={22} className="stroke-[2]" />
        </button>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 ml-auto">
        
        <div className="flex items-center gap-1 sm:gap-2">
          <button className="text-gray-700 hover:bg-gray-50 p-2.5 rounded-full transition-colors focus:outline-none">
            <Search size={21} className="stroke-[1.8]" />
          </button>
          
          <div className="relative">
            <button 
              onClick={toggleNotifications}
              className={`p-2.5 rounded-full transition-colors focus:outline-none relative ${isNotificationsOpen ? 'bg-gray-50 text-gray-900' : 'text-gray-700 hover:bg-gray-50'}`}
            >
              <Bell size={21} className="stroke-[1.8]" />
              {notifications.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-400 text-[9px] font-bold text-white flex items-center justify-center rounded-full scale-90">
                  {notifications.length}
                </span>
              )}
            </button>

            {isNotificationsOpen && (
              <>
                <div onClick={() => setIsNotificationsOpen(false)} className="fixed inset-0 z-40" />
                <div className="absolute right-[-70px] sm:right-0 mt-3 w-[320px] bg-white rounded-2xl border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.08)] py-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center justify-between px-5 pb-3">
                    <h3 className="font-bold text-gray-800 text-[15px]">Notifications</h3>
                    <span className="bg-red-100 text-red-500 font-bold text-xs px-2 py-0.5 rounded-full">
                      {notifications.length}
                    </span>
                  </div>
                  
                  <div className="max-h-[380px] overflow-y-auto divide-y divide-gray-50">
                    {notifications.length === 0 ? (
                      <p className="text-center text-sm text-gray-400 py-6 font-medium">No new notifications</p>
                    ) : (
                      notifications.map(item => (
                        <div key={item.id} className="group relative flex items-center gap-3 px-5 py-3 hover:bg-gray-50/70 transition-colors cursor-pointer">
                          <div className="relative flex-shrink-0">
                            <img src={item.img} alt="" className="w-10 h-10 rounded-full object-cover" />
                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />
                          </div>
                          <div className="flex-1 min-w-0 pr-4">
                            <h4 className="text-[13.5px] font-bold text-gray-800 truncate">{item.name}</h4>
                            <p className="text-xs text-gray-400 font-medium mt-0.5">{item.time}</p>
                          </div>
                          <button 
                            onClick={(e) => removeNotification(item.id, e)}
                            className="opacity-0 group-hover:opacity-100 p-1 bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-md transition-all absolute right-4 focus:outline-none"
                          >
                            <X size={12} className="stroke-[2.5]" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="h-6 w-[1px] bg-gray-200 mx-1"></div>

        <div className="relative">
          <button 
            onClick={toggleProfile}
            className="flex items-center gap-2.5 pl-2 pr-1 py-1.5 hover:bg-gray-50 rounded-xl transition-colors focus:outline-none"
          >
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" 
              alt="ArtTemplate Profile" 
              className="w-9 h-9 rounded-full object-cover" 
            />
            <span className="text-gray-700 font-semibold text-[14px] hidden sm:block">
              ArtTemplate
            </span>
            <ChevronDown size={14} className={`text-gray-400 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
          </button>

          {isProfileOpen && (
            <>
              <div onClick={() => setIsProfileOpen(false)} className="fixed inset-0 z-40" />
              <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.08)] py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex items-center gap-3 px-4 py-2.5 mb-2">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" alt="" className="w-11 h-11 rounded-full object-cover" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[14px] font-bold text-gray-800 truncate">ArtTemplate</h4>
                    <p className="text-xs text-gray-400 font-medium mt-0.5">Manager</p>
                  </div>
                  <span className="flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-red-400 rounded-full">8</span>
                </div>
                <hr className="border-gray-100/70 my-1 mx-4" />
                <div className="px-2 py-1 space-y-0.5">
                  <a href="#profile" className="flex items-center gap-3 px-3 py-2 text-[13.5px] font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50/80 rounded-xl transition-all"><User size={17} className="text-gray-400" /><span>My Profile</span></a>
                  <a href="#messages" className="flex items-center gap-3 px-3 py-2 text-[13.5px] font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50/80 rounded-xl transition-all"><Mail size={17} className="text-gray-400" /><span>My Messages</span></a>
                  <a href="#tasks" className="flex items-center gap-3 px-3 py-2 text-[13.5px] font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50/80 rounded-xl transition-all"><CheckSquare size={17} className="text-gray-400" /><span>My Tasks</span></a>
                </div>
                <hr className="border-gray-100/70 my-1 mx-4" />
                <div className="px-2 py-1 space-y-0.5">
                  <a href="#settings" className="flex items-center gap-3 px-3 py-2 text-[13.5px] font-medium text-gray-700 bg-gray-50/60 font-semibold rounded-xl transition-all"><Settings size={17} className="text-gray-500" /><span>Settings</span></a>
                  <a href="#lock" className="flex items-center gap-3 px-3 py-2 text-[13.5px] font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50/80 rounded-xl transition-all"><Lock size={17} className="text-gray-400" /><span>Lock Screen</span></a>
                </div>
                <hr className="border-gray-100/70 my-1 mx-4" />
                <div className="px-2 pt-1">
                  <a href="#logout" className="flex items-center gap-3 px-3 py-2 text-[13.5px] font-medium text-gray-500 hover:text-red-500 hover:bg-red-50/40 rounded-xl transition-all"><LogOut size={17} /><span>Logout</span></a>
                </div>
              </div>
            </>
          )}
        </div>

      </div>
    </header>
  );
}