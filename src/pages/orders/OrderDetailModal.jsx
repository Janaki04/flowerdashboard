import React, { useState } from 'react';
import { X, Heart, Minus, Plus, Image as ImageIcon } from 'lucide-react';

export default function OrderDetailModal({ isOpen, onClose, order }) {
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !order) return null;

  const specifications = [
    { label: 'Display', value: '6.1-inch' },
    { label: 'Chip', value: 'A13 Bionic chip' },
    { label: 'Camera', value: 'Dual 12MP Ultra Wide' },
    { label: 'OS', value: 'iOS 13' },
    { label: 'Capacity', value: '64GB' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000]/30 backdrop-blur-[2px] p-4 animate-in fade-in duration-200">
       
      <div className="bg-white rounded-3xl w-full max-w-[940px] max-h-[90vh] overflow-y-auto shadow-[0_20px_60px_rgba(0,0,0,0.08)] relative p-8 sm:p-12 flex flex-col md:flex-row gap-10 sm:gap-14 animate-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute right-6 top-6 text-[#adb5bd] hover:text-[#495057] bg-[#f8f9fa] hover:bg-[#e9ecef] p-2 rounded-full transition-colors duration-150"
        >
          <X size={16} className="stroke-[2.5]" />
        </button>

        <div className="flex-1 flex flex-col gap-4">
          <div className="w-full aspect-[0.92] bg-[#f8f9fa] rounded-2xl flex items-center justify-center text-[#adb5bd]">
            <ImageIcon size={72} className="stroke-[1.0]" />
          </div>
          
          <div className="grid grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((index) => (
              <div key={index} className="aspect-square bg-[#f8f9fa] rounded-xl flex items-center justify-center text-[#adb5bd] border border-transparent hover:border-[#ced4da] cursor-pointer transition-colors duration-150">
                <ImageIcon size={20} className="stroke-[1.2]" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-between pt-2">
          <div className="space-y-3.5">
            <h1 className="text-[23px] font-semibold text-[#212529] tracking-tight leading-tight">
             Invoice
            </h1>
            <h2 className="text-[23px] font-semibold text-[#212529] tracking-tight leading-tight">
              Apple iPhone 11 64GB Purple
            </h2>
            <p className="text-xs font-semibold text-[#adb5bd] tracking-wide">
              SKU: {order.orderNo ? order.orderNo.replace('#', '') : '0547081'}
            </p>
            <p className="text-[13px] font-medium text-[#868e96] leading-relaxed pt-1">
              A new dual-camera system captures more of what you see and love. The fastest chip ever in a smartphone and all-day battery life let you do more and charge less. And the highest-quality video in a smartphone, so your memories look better than ever.
            </p>
          </div>

          <div className="flex items-center justify-between mt-6 mb-5">
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] font-bold text-[#adb5bd] uppercase tracking-wider">Quantity</span>
              <div className="flex items-center border border-[#e9ecef] rounded-xl bg-white p-1 shadow-sm">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="p-2 text-[#adb5bd] hover:text-[#495057] transition-colors"
                >
                  <Minus size={13} className="stroke-[2.5]" />
                </button>
                <span className="w-9 text-center text-sm font-bold text-[#212529]">{quantity}</span>
                <button 
                  onClick={() => setQuantity(q => q + 1)}
                  className="p-2 text-[#adb5bd] hover:text-[#495057] transition-colors"
                >
                  <Plus size={13} className="stroke-[2.5]" />
                </button>
              </div>
            </div>
            
            <div className="text-right self-end">
              <span className="text-3xl font-bold text-[#212529] tracking-tight">
                ${(order.total || 699.00).toFixed(0)}
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-[#f8f9fa]">
            <h3 className="text-[13px] font-bold text-[#212529] tracking-wide mb-2.5">Specifications</h3>
            <div className="divide-y divide-[#f8f9fa] text-xs">
              {specifications.map((spec) => (
                <div key={spec.label} className="flex justify-between py-3 font-medium">
                  <span className="text-[#adb5bd]">{spec.label}</span>
                  <span className="text-[#495057] font-semibold">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}