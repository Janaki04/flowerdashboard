import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import AddEventModal from './AddEventModal';

export default function Calendar() {
  const [currentView, setCurrentView] = useState('Month'); 
  const [currentDate, setCurrentDate] = useState(new Date(2020, 8, 8)); 
  const [currentTimePos, setCurrentTimePos] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const events = [
    { id: 1, title: 'Meeting with Judith', date: '2020-09-07', startTime: '01:00', endTime: '02:30', bgColor: 'bg-[#cfeaf7] text-[#2c6d91] border-[#bcdef2] border-l-4' },
    { id: 2, title: 'New Event', date: '2020-09-07', startTime: '02:00', endTime: '06:00', bgColor: 'bg-[#cfeaf7] text-[#2c6d91] border-[#bcdef2] border-l-4' },
    { id: 3, title: 'Project "Rocket"', date: '2020-09-08', startTime: '04:00', endTime: '06:00', bgColor: 'bg-[#fef0cd] text-[#937119] border-[#fde7af] border-l-4' },
    { id: 4, title: 'Call Back Priscilla', date: '2020-09-09', startTime: '07:00', endTime: '11:30', bgColor: 'bg-[#d2f2ea] text-[#348674] border-[#bfece2] border-l-4' },
    { id: 5, title: 'Presentation', date: '2020-09-10', startTime: '03:30', endTime: '08:00', bgColor: 'bg-[#d8f0db] text-[#3b7c43] border-[#c4ebcb] border-l-4' },
    { id: 6, title: 'Presentation', date: '2020-09-10', startTime: '08:30', endTime: '10:00', bgColor: 'bg-[#d8f0db] text-[#3b7c43] border-[#c4ebcb] border-l-4' },
  ];

  const weekdays = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];
  const weekDates = [
    { label: '6', fullDate: '2020-09-06' },
    { label: '7', fullDate: '2020-09-07' },
    { label: '8', fullDate: '2020-09-08', isToday: true },
    { label: '9', fullDate: '2020-09-09' },
    { label: '10', fullDate: '2020-09-10' },
    { label: '11', fullDate: '2020-09-11' },
    { label: '12', fullDate: '2020-09-12' }
  ];

  const hours = Array.from({ length: 12 }, (_, i) => {
    const hourNum = i + 1;
    return `${hourNum < 10 ? '0' : ''}${hourNum}:00`;
  });

  const monthGridCells = [
    { type: 'prev', label: '30' }, { type: 'prev', label: '31' },
    { type: 'current', label: '1', fullDate: '2020-09-01' }, { type: 'current', label: '2', fullDate: '2020-09-02' }, { type: 'current', label: '3', fullDate: '2020-09-03' }, { type: 'current', label: '4', fullDate: '2020-09-04' }, { type: 'current', label: '5', fullDate: '2020-09-05' },
    { type: 'current', label: '6', fullDate: '2020-09-06' }, { type: 'current', label: '7', fullDate: '2020-09-07' }, { type: 'current', label: '8', fullDate: '2020-09-08', isToday: true }, { type: 'current', label: '9', fullDate: '2020-09-09' }, { type: 'current', label: '10', fullDate: '2020-09-10' }, { type: 'current', label: '11', fullDate: '2020-09-11' }, { type: 'current', label: '12', fullDate: '2020-09-12' },
    { type: 'current', label: '13', fullDate: '2020-09-13' }, { type: 'current', label: '14', fullDate: '2020-09-14' }, { type: 'current', label: '15', fullDate: '2020-09-15' }, { type: 'current', label: '16', fullDate: '2020-09-16', hasMore: true }, { type: 'current', label: '17', fullDate: '2020-09-17' }, { type: 'current', label: '18', fullDate: '2020-09-18' }, { type: 'current', label: '19', fullDate: '2020-09-19' },
    { type: 'current', label: '20', fullDate: '2020-09-20' }, { type: 'current', label: '21', fullDate: '2020-09-21' }, { type: 'current', label: '22', fullDate: '2020-09-22' }, { type: 'current', label: '23', fullDate: '2020-09-23' }, { type: 'current', label: '24', fullDate: '2020-09-24' }, { type: 'current', label: '25', fullDate: '2020-09-25' }, { type: 'current', label: '26', fullDate: '2020-09-26' },
    { type: 'current', label: '27', fullDate: '2020-09-27' }, { type: 'current', label: '28', fullDate: '2020-09-28' }, { type: 'current', label: '29', fullDate: '2020-09-29' }, { type: 'current', label: '30', fullDate: '2020-09-30' },
    { type: 'next', label: '1' }, { type: 'next', label: '2' }, { type: 'next', label: '3' }
  ];

  const calculateEventStyles = (startTime, endTime) => {
    const parseTimeToMinutes = (tStr) => {
      const [h, m] = tStr.split(':').map(Number);
      return (h - 1) * 60 + m; 
    };
    const startMins = parseTimeToMinutes(startTime);
    const endMins = parseTimeToMinutes(endTime);
    
    const topPosition = (startMins / 60) * 80; 
    const blockHeight = ((endMins - startMins) / 60) * 80;
    
    return {
      top: `${topPosition}px`,
      height: `${blockHeight}px`,
    };
  };

  useEffect(() => {
    const indicatorMins = (6 - 1) * 60 + 30;
    setCurrentTimePos((indicatorMins / 60) * 80);
  }, []);

  return (
    <div className="bg-[#f8f9fa] min-h-screen font-sans antialiased text-[#6c757d]">
      <div className="mx-auto space-y-6 max-w-[1400px]">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold text-[#212529] tracking-tight">Calendar</h1>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-[#449352] hover:bg-[#387a43] text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors shadow-sm"
          >
            <Plus size={16} className="stroke-[3]" />
            <span>Add Event</span>
          </button>
        </div>
        <div className="bg-white border border-[#e9ecef] rounded-2xl shadow-sm p-6 space-y-6">
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

          <div className="border border-[#e9ecef] rounded-xl overflow-hidden bg-white">
            {currentView === 'Month' && (
              <>
                <div className="grid grid-cols-7 border-b border-[#e9ecef] bg-[#f8f9fa] text-center">
                  {['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'].map((day) => (
                    <div key={day} className="py-3 text-[10px] font-bold text-[#adb5bd] tracking-widest uppercase">{day}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 auto-rows-[minmax(120px,1fr)] bg-[#e9ecef] gap-px">
                  {monthGridCells.map((cell, idx) => (
                    <div key={idx} className={`bg-white p-3 relative flex flex-col justify-between ${cell.type !== 'current' ? 'bg-[#f8f9fa]' : ''}`}>
                      <div className="flex justify-end">
                        <span className={cell.isToday ? "w-7 h-7 flex items-center justify-center bg-[#449352] text-white font-bold text-sm rounded-full" : "text-sm font-semibold text-[#495057]"}>{cell.label}</span>
                      </div>
                      <div className="mt-2 space-y-1">
                        {events.filter(e => e.date === cell.fullDate).map(evt => (
                          <div key={evt.id} className={`text-[11px] font-bold py-1 px-2 rounded-lg truncate ${evt.bgColor}`}>
                            {evt.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
            {currentView === 'Week' && (
              <div className="flex flex-col min-w-[800px] overflow-x-auto">
                <div className="grid grid-cols-[80px_1fr] border-b border-[#e9ecef] bg-white">
                  <div className="border-r border-[#e9ecef]" />
                  <div className="grid grid-cols-7 text-center">
                    {weekDates.map((date, idx) => (
                      <div key={idx} className="py-4 flex flex-col items-center justify-center border-r border-[#e9ecef] last:border-0">
                        <span className="text-[11px] font-bold text-[#adb5bd] uppercase tracking-wide">{weekdays[idx]}</span>
                        <span className={`text-xl font-bold mt-1 w-8 h-8 flex items-center justify-center rounded-full ${date.isToday ? 'bg-[#449352] text-white shadow-sm' : 'text-[#212529]'}`}>
                          {date.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-[80px_1fr] relative max-h-[700px] overflow-y-auto">
                  <div className="bg-white border-r border-[#e9ecef] text-center">
                    {hours.map((hour) => (
                      <div key={hour} className="h-[80px] text-[12px] text-[#adb5bd] font-medium pt-2 border-b border-[#f1f3f5]/60 last:border-0">
                        {hour}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 relative bg-white divide-x divide-[#e9ecef]">
                    {weekDates.map((dayDate) => (
                      <div key={dayDate.fullDate} className="h-full relative min-h-[960px]">
                        {hours.map((_, i) => (
                          <div key={i} className="absolute left-0 right-0 border-b border-[#e9ecef]/40" style={{ top: `${(i + 1) * 80}px` }} />
                        ))}
                        {events.filter(e => e.date === dayDate.fullDate).map((evt) => (
                          <div 
                            key={evt.id}
                            className={`absolute left-2 right-2 p-3 rounded-xl border flex flex-col justify-start overflow-hidden shadow-sm transition-all text-xs font-semibold ${evt.bgColor}`}
                            style={calculateEventStyles(evt.startTime, evt.endTime)}
                          >
                            <span className="opacity-75 text-[10px] block mb-0.5">{evt.startTime} - {evt.endTime}</span>
                            <span className="text-[#212529] font-bold truncate">{evt.title}</span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>

                  <div className="absolute left-[80px] right-0 flex items-center z-30 pointer-events-none" style={{ top: `${currentTimePos}px` }}>
                    <div className="w-2.5 h-2.5 bg-[#ff6b6b] rounded-full -ml-[5px]" />
                    <div className="flex-1 h-px bg-[#ff6b6b]" />
                  </div>
                </div>
              </div>
            )}
            {currentView === 'Day' && (
              <div className="flex flex-col">
                <div className="border-b border-[#e9ecef] bg-[#f8f9fa] text-center py-3 text-[11px] font-bold tracking-widest text-[#adb5bd] uppercase">
                  TUESDAY 7
                </div>
                <div className="grid grid-cols-[80px_1fr] relative max-h-[700px] overflow-y-auto">
                  <div className="bg-white border-r border-[#e9ecef] text-center">
                    {hours.map((hour) => (
                      <div key={hour} className="h-[80px] text-[12px] text-[#adb5bd] font-medium pt-2 border-b border-[#f1f3f5]/50">
                        {hour}
                      </div>
                    ))}
                  </div>
                  <div className="relative bg-white h-full min-h-[960px] px-4">
                    {hours.map((_, i) => (
                      <div key={i} className="absolute left-0 right-0 border-b border-[#e9ecef]/40" style={{ top: `${(i + 1) * 80}px` }} />
                    ))}
                    {events.filter(e => e.date === '2020-09-07').map((evt) => (
                      <div 
                        key={evt.id}
                        className={`absolute left-4 right-4 p-3 rounded-xl border text-xs font-semibold shadow-sm ${evt.bgColor}`}
                        style={calculateEventStyles(evt.startTime, evt.endTime)}
                      >
                        <span className="opacity-75 text-[10px] block mb-0.5">{evt.startTime} - {evt.endTime}</span>
                        <span className="text-[#212529] font-bold">{evt.title}</span>
                      </div>
                    ))}
                    <div className="absolute left-0 right-0 flex items-center z-30 pointer-events-none" style={{ top: `${currentTimePos}px` }}>
                      <div className="w-2.5 h-2.5 bg-[#ff6b6b] rounded-full -ml-[5px]" />
                      <div className="flex-1 h-px bg-[#ff6b6b]" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
      <AddEventModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}