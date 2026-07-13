import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

export default function Calendar() {
  const [currentView, setCurrentView] = useState('Month'); 
  const [currentDate, setCurrentDate] = useState(new Date(2020, 8, 1)); 

  const events = [
    { id: 1, title: 'Call Back Priscilla', startDay: 1, endDay: 3, time: '10:00', bgColor: 'bg-[#d2f2ea] text-[#348674] border-[#bfece2]' },
    { id: 2, title: 'Meeting with Judith', startDay: 9, endDay: 10, time: '10:00', bgColor: 'bg-[#cfeaf7] text-[#2c6d91] border-[#bcdef2]' },
    { id: 3, title: 'Meeting...', startDay: 9, endDay: 9, time: '10:00', bgColor: 'bg-[#cfeaf7] text-[#2c6d91] border-[#bcdef2]' },
    { id: 4, title: 'Project "Rocket"', startDay: 14, endDay: 16, time: '10:00', bgColor: 'bg-[#fef0cd] text-[#937119] border-[#fde7af]' },
    { id: 5, title: 'Presentation', startDay: 23, endDay: 25, time: '10:00', bgColor: 'bg-[#d8f0db] text-[#3b7c43] border-[#c4ebcb]' },
    { id: 6, title: 'Presentation', startDay: 23, endDay: 23, time: '10:00', bgColor: 'bg-[#d8f0db] text-[#3b7c43] border-[#c4ebcb]' },
  ];

  const weekdays = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
  
  const gridCells = [
    { type: 'prev', label: '30' }, { type: 'prev', label: '31' },
    { type: 'current', label: '1' }, { type: 'current', label: '2' }, { type: 'current', label: '3' }, { type: 'current', label: '4' }, { type: 'current', label: '5' },
    { type: 'current', label: '6' }, { type: 'current', label: '7' }, { type: 'current', label: '8', isToday: true }, { type: 'current', label: '9' }, { type: 'current', label: '10' }, { type: 'current', label: '11' }, { type: 'current', label: '12' },
    { type: 'current', label: '13' }, { type: 'current', label: '14' }, { type: 'current', label: '15' }, { type: 'current', label: '16', hasMore: true }, { type: 'current', label: '17' }, { type: 'current', label: '18' }, { type: 'current', label: '19' },
    { type: 'current', label: '20' }, { type: 'current', label: '21' }, { type: 'current', label: '22' }, { type: 'current', label: '23' }, { type: 'current', label: '24' }, { type: 'current', label: '25' }, { type: 'current', label: '26' },
    { type: 'current', label: '27' }, { type: 'current', label: '28' }, { type: 'current', label: '29' }, { type: 'current', label: '30' },
    { type: 'next', label: '1' }, { type: 'next', label: '2' }, { type: 'next', label: '3' }
  ];

  return (
    <div className="p-6 md:p-10 bg-[#f8f9fa] min-h-screen font-sans antialiased text-[#6c757d]">
      <div className="max-w-[1440px] mx-auto space-y-6">
        
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold text-[#212529] tracking-tight">Calendar</h1>
          <button 
            onClick={() => alert('Add Event Dialog Triggered')}
            className="flex items-center gap-2 bg-[#449352] hover:bg-[#387a43] text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors shadow-sm"
          >
            <Plus size={16} className="stroke-[3]" />
            <span>Add Event</span>
          </button>
        </div>

        <div className="bg-white border border-[#e9ecef] rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.01)] overflow-hidden p-6 space-y-6">
          
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-[#e9ecef] rounded-xl bg-white p-1 shadow-sm">
                <button className="p-2 text-[#adb5bd] hover:text-[#495057] transition-colors"><ChevronLeft size={15} className="stroke-[2.5]" /></button>
                <div className="w-px h-4 bg-[#e9ecef]" />
                <button className="p-2 text-[#adb5bd] hover:text-[#495057] transition-colors"><ChevronRight size={15} className="stroke-[2.5]" /></button>
              </div>
              <button className="px-5 py-2.5 bg-[#f8f9fa] border border-[#e9ecef] hover:bg-[#e9ecef] text-[#495057] font-semibold text-xs rounded-xl shadow-sm transition-colors">
                Today
              </button>
            </div>

            <h2 className="text-[20px] font-semibold text-[#212529] tracking-tight">
              September <span className="text-[#adb5bd] font-normal">2020</span>
            </h2>

            <div className="flex border border-[#e9ecef] rounded-xl p-1 bg-[#f8f9fa] shadow-inner text-xs font-semibold">
              {['Month', 'Week', 'Day'].map((view) => (
                <button
                  key={view}
                  onClick={() => setCurrentView(view)}
                  className={`px-5 py-2 rounded-lg transition-all ${
                    currentView === view 
                      ? 'bg-[#449352] text-white shadow-sm' 
                      : 'text-[#6c757d] hover:text-[#212529]'
                  }`}
                >
                  {view}
                </button>
              ))}
            </div>
          </div>

          <div className="border border-[#e9ecef] rounded-xl overflow-hidden">
            
            <div className="grid grid-cols-7 border-b border-[#e9ecef] bg-[#f8f9fa] text-center">
              {weekdays.map((day) => (
                <div key={day} className="py-3 text-[10px] font-bold text-[#adb5bd] tracking-widest uppercase">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 auto-rows-[minmax(120px,1fr)] bg-[#e9ecef] gap-px">
              {gridCells.map((cell, idx) => (
                <div 
                  key={idx} 
                  className={`bg-white p-3 relative flex flex-col justify-between group transition-colors ${
                    cell.type !== 'current' ? 'bg-[linear-gradient(45deg,#fdfdfd_25%,#f8f9fa_25%,#f8f9fa_50%,#fdfdfd_50%,#fdfdfd_75%,#f8f9fa_75%)] bg-[size:16px_16px]' : ''
                  }`}
                >
                  <div className="flex justify-end items-center">
                    {cell.isToday ? (
                      <span className="w-7 h-7 flex items-center justify-center bg-[#449352] text-white font-bold text-sm rounded-full shadow-sm">
                        {cell.label}
                      </span>
                    ) : (
                      <span className={`text-sm font-semibold ${cell.type === 'current' ? 'text-[#495057]' : 'text-[#dee2e6]'}`}>
                        {cell.label}
                      </span>
                    )}
                  </div>

                  <div className="mt-2 space-y-1 z-10">
                    {cell.type === 'current' && cell.label === '1' && (
                      <div className={`text-[11px] font-bold py-1 px-2.5 rounded-lg border-l-4 shadow-sm truncate ${events[0].bgColor}`}>
                        <div className="flex justify-between items-center">
                          <span>{events[0].title}</span>
                          <span className="opacity-60 text-[10px]">{events[0].time}</span>
                        </div>
                      </div>
                    )}
                    {cell.type === 'current' && cell.label === '9' && (
                      <>
                        <div className={`text-[11px] font-bold py-1 px-2.5 rounded-lg border-l-4 shadow-sm truncate ${events[1].bgColor}`}>
                          <div className="flex justify-between items-center">
                            <span>{events[1].title}</span>
                            <span className="opacity-60 text-[10px]">{events[1].time}</span>
                          </div>
                        </div>
                        <div className={`text-[11px] font-bold py-1 px-2.5 rounded-lg border-l-4 shadow-sm truncate ${events[2].bgColor}`}>
                          <div className="flex justify-between items-center">
                            <span>{events[2].title}</span>
                            <span className="opacity-60 text-[10px]">{events[2].time}</span>
                          </div>
                        </div>
                      </>
                    )}
                    {cell.type === 'current' && cell.label === '14' && (
                      <div className={`text-[11px] font-bold py-1 px-2.5 rounded-lg border-l-4 shadow-sm truncate ${events[3].bgColor}`}>
                        <div className="flex justify-between items-center">
                          <span>{events[3].title}</span>
                          <span className="opacity-60 text-[10px]">{events[3].time}</span>
                        </div>
                      </div>
                    )}
                    {cell.type === 'current' && cell.label === '23' && (
                      <>
                        <div className={`text-[11px] font-bold py-1 px-2.5 rounded-lg border-l-4 shadow-sm truncate ${events[4].bgColor}`}>
                          <div className="flex justify-between items-center">
                            <span>{events[4].title}</span>
                            <span className="opacity-60 text-[10px]">{events[4].time}</span>
                          </div>
                        </div>
                        <div className={`text-[11px] font-bold py-1 px-2.5 rounded-lg border-l-4 shadow-sm truncate ${events[5].bgColor}`}>
                          <div className="flex justify-between items-center">
                            <span>{events[5].title}</span>
                            <span className="opacity-60 text-[10px]">{events[5].time}</span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {cell.hasMore && (
                    <div className="flex justify-end mt-auto pt-1">
                      <span className="bg-[#fef0cd] text-[#937119] border border-[#fde7af] text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                        +5
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}