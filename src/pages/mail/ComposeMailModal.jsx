import React, { useState } from 'react';
import { 
  X, Bold, Italic, Underline, Link2, Smile, Image, List, 
  ListOrdered, AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Clock, Paperclip, Trash2, FileText, Type
} from 'lucide-react';

export default function ComposeMailModal({ isOpen, onClose }) {
  const [toTags, setToTags] = useState(['Regina Cooper']);
  const [inputTag, setInputTag] = useState('');
  const [subject, setSubject] = useState('Order Status #24197118');
  const [message, setMessage] = useState('');
  const [showCcBcc, setShowCcBcc] = useState(false);

  if (!isOpen) return null;

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && inputTag.trim() !== '') {
      setToTags([...toTags, inputTag.trim()]);
      setInputTag('');
    }
  };

  const handleRemoveTag = (indexToRemove) => {
    setToTags(toTags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-xs" onClick={onClose} />
      <div className="relative bg-white w-full max-w-[620px] rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-6 pt-6 pb-4 bg-white">
          <h2 className="text-2xl font-bold text-gray-800">New Message</h2>
          <button 
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 pb-4 space-y-4">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-sm">
              <label className="font-semibold text-gray-500">To</label>
              <div className="space-x-2 font-medium text-gray-400 text-xs">
                <button type="button" onClick={() => setShowCcBcc(!showCcBcc)} className="hover:text-gray-600">Cc</button>
                <button type="button" onClick={() => setShowCcBcc(!showCcBcc)} className="hover:text-gray-600">Bcc</button>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-2 p-2 border border-gray-200 rounded-2xl min-h-[50px] focus-within:border-gray-300 transition-colors bg-white">
              {toTags.map((tag, idx) => (
                <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-50 text-gray-700 font-medium text-sm rounded-xl border border-gray-100">
                  {tag}
                  <button 
                    type="button" 
                    onClick={() => handleRemoveTag(idx)}
                    className="text-gray-400 hover:text-gray-600 text-xs font-bold font-sans"
                  >
                    ×
                  </button>
                </span>
              ))}
              <input 
                type="text"
                value={inputTag}
                onChange={(e) => setInputTag(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder={toTags.length === 0 ? "Type name and press Enter" : ""}
                className="flex-1 min-w-[120px] border-0 p-1 text-sm text-gray-700 outline-none focus:ring-0 placeholder-gray-400"
              />
            </div>
          </div>
          {showCcBcc && (
            <div className="grid grid-cols-2 gap-3 animate-in fade-in slide-in-from-top-2 duration-150">
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">Cc</label>
                <input type="text" className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-gray-300" placeholder="cc@mail.com" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">Bcc</label>
                <input type="text" className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-gray-300" placeholder="bcc@mail.com" />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-500">Subject</label>
            <input 
              type="text" 
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm font-medium text-gray-700 placeholder-gray-400 outline-none focus:border-gray-300 transition-colors"
              placeholder="Enter subject line"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-500">Message</label>
            <div className="border border-gray-200 rounded-2xl overflow-hidden focus-within:border-gray-300 transition-colors">
              <div className="px-3 py-2 bg-gray-50/70 border-b border-gray-200 flex flex-wrap items-center gap-0.5">
                <button type="button" className="p-1.5 hover:bg-white rounded-lg text-gray-500 hover:text-gray-700 transition-all"><Type size={15} /></button>
                <div className="w-px h-4 bg-gray-300 mx-1" />
                <button type="button" className="p-1.5 hover:bg-white rounded-lg text-gray-500 hover:text-gray-700 transition-all"><Bold size={15} /></button>
                <button type="button" className="p-1.5 hover:bg-white rounded-lg text-gray-500 hover:text-gray-700 transition-all"><Italic size={15} /></button>
                <button type="button" className="p-1.5 hover:bg-white rounded-lg text-gray-500 hover:text-gray-700 transition-all"><Underline size={15} /></button>
                <div className="w-px h-4 bg-gray-300 mx-1" />
                <button type="button" className="p-1.5 hover:bg-white rounded-lg text-gray-500 hover:text-gray-700 transition-all"><Link2 size={15} /></button>
                <button type="button" className="p-1.5 hover:bg-white rounded-lg text-gray-500 hover:text-gray-700 transition-all"><Smile size={15} /></button>
                <button type="button" className="p-1.5 hover:bg-white rounded-lg text-gray-500 hover:text-gray-700 transition-all"><Image size={15} /></button>
                <div className="w-px h-4 bg-gray-300 mx-1" />
                <button type="button" className="p-1.5 hover:bg-white rounded-lg text-gray-500 hover:text-gray-700 transition-all"><List size={15} /></button>
                <button type="button" className="p-1.5 hover:bg-white rounded-lg text-gray-500 hover:text-gray-700 transition-all"><ListOrdered size={15} /></button>
                <div className="w-px h-4 bg-gray-300 mx-1" />
                <button type="button" className="p-1.5 hover:bg-white rounded-lg text-gray-500 hover:text-gray-700 transition-all"><AlignLeft size={15} /></button>
                <button type="button" className="p-1.5 hover:bg-white rounded-lg text-gray-500 hover:text-gray-700 transition-all"><AlignCenter size={15} /></button>
                <button type="button" className="p-1.5 hover:bg-white rounded-lg text-gray-500 hover:text-gray-700 transition-all"><AlignRight size={15} /></button>
                <button type="button" className="p-1.5 hover:bg-white rounded-lg text-gray-500 hover:text-gray-700 transition-all"><AlignJustify size={15} /></button>
              </div>
              <textarea 
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type something"
                className="w-full p-4 border-0 text-sm text-gray-700 outline-none resize-none focus:ring-0 placeholder-gray-400"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="flex items-center justify-between p-3 border border-gray-100 rounded-2xl bg-[#fafafa]">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 bg-red-50 text-red-500 rounded-xl flex items-center justify-center font-bold text-xs shrink-0">
                  PDF
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-gray-700 truncate">Resume.pdf</p>
                  <p className="text-[10px] text-gray-400 font-medium">570 KB</p>
                </div>
              </div>
              <button type="button" className="p-1.5 hover:bg-white text-gray-400 hover:text-red-500 rounded-lg transition-colors">
                <Trash2 size={14} />
              </button>
            </div>
            <div className="flex items-center justify-between p-3 border border-gray-100 rounded-2xl bg-white">
              <div className="flex flex-col flex-1 min-w-0 pr-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-gray-600 mb-1">
                  <span className="truncate">Uploading File...</span>
                  <span className="shrink-0 text-gray-400">40%</span>
                </div>
                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#428a42] h-full w-[40%] rounded-full transition-all duration-300" />
                </div>
              </div>
              <button type="button" className="p-1 text-gray-400 hover:text-gray-600 rounded-full transition-colors shrink-0">
                <X size={14} />
              </button>
            </div>
          </div>

        </div>

        <div className="px-6 py-4 bg-white border-t border-gray-100 flex items-center justify-between mt-auto">
          <div className="flex items-center gap-1 rounded-xl overflow-hidden shadow-sm">
            <button 
              type="button" 
              onClick={onClose}
              className="px-6 py-2.5 bg-[#428a42] hover:bg-[#346e34] text-white text-sm font-semibold transition-colors"
            >
              Send
            </button>
            <button type="button" className="p-2.5 bg-[#428a42] hover:bg-[#346e34] text-white border-l border-[#4ea24e] transition-colors" title="Schedule dispatch">
              <Clock size={16} />
            </button>
          </div>
          
          <button type="button" className="p-2.5 hover:bg-gray-50 rounded-xl text-gray-400 hover:text-gray-600 transition-colors">
            <Paperclip size={18} />
          </button>
        </div>

      </div>
    </div>
  );
}