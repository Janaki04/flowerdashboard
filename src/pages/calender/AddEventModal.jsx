import { X } from 'lucide-react';

export default function AddEventModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Event Created Successfully!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="bg-white w-full max-w-[520px] rounded-2xl shadow-xl border border-[#e9ecef] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#e9ecef]">
          <h3 className="text-xl font-bold text-[#212529]">New Event</h3>
          <button 
            onClick={onClose} 
            className="p-1.5 text-[#adb5bd] hover:text-[#495057] hover:bg-[#f8f9fa] rounded-lg transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto max-h-[80vh]">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#adb5bd] tracking-wide uppercase">Title</label>
            <input 
              type="text" 
              placeholder="Sending order" 
              className="w-full px-4 py-3 bg-white border border-[#e9ecef] text-sm text-[#495057] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#449352] focus:border-[#449352] placeholder-[#adb5bd] transition-all"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#adb5bd] tracking-wide uppercase">Description</label>
            <textarea 
              rows={3}
              placeholder="Sending order #25789 Felecia Burke at 5:30" 
              className="w-full px-4 py-3 bg-white border border-[#e9ecef] text-sm text-[#495057] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#449352] focus:border-[#449352] placeholder-[#adb5bd] transition-all resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#adb5bd] tracking-wide uppercase">Time and Date</label>
            <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
              <div className="flex items-center border border-[#e9ecef] rounded-xl w-full bg-white px-3 py-2.5 shadow-sm">
                <input type="text" defaultValue="00:00" className="w-12 text-sm text-[#495057] font-semibold text-center focus:outline-none" />
                <div className="w-px h-4 bg-[#e9ecef] mx-2" />
                <input type="text" defaultValue="12.07.2020" className="w-full text-sm text-[#495057] font-semibold focus:outline-none" />
              </div>

              <span className="text-[#adb5bd] px-1">—</span>

              <div className="flex items-center border border-[#e9ecef] rounded-xl w-full bg-white px-3 py-2.5 shadow-sm">
                <input type="text" defaultValue="00:00" className="w-12 text-sm text-[#495057] font-semibold text-center focus:outline-none" />
                <div className="w-px h-4 bg-[#e9ecef] mx-2" />
                <input type="text" defaultValue="12.07.2020" className="w-full text-sm text-[#495057] font-semibold focus:outline-none" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 pt-1 text-sm font-semibold text-[#495057]">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input 
                type="checkbox" 
                defaultChecked 
                className="w-4 h-4 rounded border-[#e9ecef] text-[#449352] focus:ring-[#449352] accent-[#449352]" 
              />
              <span>All Day</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input 
                type="checkbox" 
                className="w-4 h-4 rounded border-[#e9ecef] text-[#449352] focus:ring-[#449352] accent-[#449352]" 
              />
              <span>Repeat</span>
            </label>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#adb5bd] tracking-wide uppercase">Calendar</label>
            <div className="relative">
              <div className="w-full flex items-center justify-between px-4 py-3 bg-white border border-[#e9ecef] rounded-xl cursor-pointer shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#ff6b6b]" />
                  <span className="text-sm font-semibold text-[#495057]">Important</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="bg-[#449352] hover:bg-[#387a43] text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors shadow-sm w-full sm:w-auto"
            >
              Create
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}