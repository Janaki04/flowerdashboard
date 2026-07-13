import React, { useState } from 'react';
import { X, Heart, Minus, Plus, Image as ImageIcon } from 'lucide-react';

export default function ProductDetailModal({ isOpen, onClose, product }) {
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !product) return null;

  const specs = [
    { label: 'Display', value: '6.1-inch' },
    { label: 'Chip', value: 'A13 Bionic chip' },
    { label: 'Camera', value: 'Dual 12MP Ultra Wide' },
    { label: 'OS', value: 'iOS 13' },
    { label: 'Capacity', value: '64GB' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative p-8 sm:p-12 flex flex-col md:flex-row gap-8 sm:gap-12 animate-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute right-6 top-6 text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 p-2 rounded-full transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex-1 flex flex-col gap-4">
          <div className="w-full aspect-square bg-[#f7f8fa] rounded-2xl flex items-center justify-center border border-gray-100 text-gray-300">
            <div className="flex flex-col items-center gap-2">
              <ImageIcon size={64} className="stroke-[1.2]" />
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-[#f7f8fa] rounded-xl flex items-center justify-center border border-gray-100 text-gray-300 cursor-pointer hover:border-gray-300 transition-colors">
                <ImageIcon size={20} className="stroke-[1.5]" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-between space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 pr-8">{product.name}</h2>
            <p className="text-xs font-semibold text-gray-400 mt-1">SKU: {product.productNo?.replace('#', '') || '0547081'}</p>
            
            <p className="text-sm text-gray-500 mt-4 leading-relaxed">
              A new dual-camera system captures more of what you see and love. The fastest chip ever in a smartphone and all-day battery life let you do more and charge less. And the highest-quality video in a smartphone, so your memories look better than ever.
            </p>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center border border-gray-200 rounded-xl bg-white px-2 py-1.5 shadow-sm">
              <button 
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Minus size={14} />
              </button>
              <span className="w-8 text-center text-sm font-bold text-gray-800">{quantity}</span>
              <button 
                onClick={() => setQuantity(q => q + 1)}
                className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Plus size={14} />
              </button>
            </div>
            
            <span className="text-3xl font-black text-gray-900">${(product.price || 699).toLocaleString()}</span>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={() => alert('Added to cart')}
              className="flex-1 bg-[#478e4d] hover:bg-[#3d7a42] text-white font-bold text-sm py-3.5 rounded-xl shadow-md transition-colors active:scale-[0.99]"
            >
              Add to Cart
            </button>
            <button className="p-3.5 bg-[#6cc3b0] hover:bg-[#5bb29f] text-white rounded-xl shadow-md transition-colors active:scale-[0.99] flex items-center justify-center">
              <Heart size={20} className="fill-current" />
            </button>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <h3 className="text-sm font-bold text-gray-900 mb-3">Specifications</h3>
            <div className="divide-y divide-gray-100 text-sm">
              {specs.map((spec) => (
                <div key={spec.label} className="flex justify-between py-3">
                  <span className="text-gray-400 font-medium">{spec.label}</span>
                  <span className="text-gray-800 font-semibold">{spec.label === 'Capacity' && product.category === 'Notebook' ? '256GB' : spec.value}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}