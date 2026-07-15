import React, { useState } from 'react';
import { X, ChevronDown, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, AlignJustify, Upload, ImageIcon, Trash2 } from 'lucide-react';

export default function AddProductDrawer({ isOpen, onClose, onSave }) {
  const [productName, setProductName] = useState('Apple iPhone 11 Pro Max 64GB Midnight Green');
  const [productDesc, setProductDesc] = useState('');
  const [productCategory, setProductCategory] = useState('Phone');
  const [productPrice, setProductPrice] = useState('2.500');
  const [productDiscount, setProductDiscount] = useState('15');
  const [productTags, setProductTags] = useState(['Apple', 'iPhone', '64GB']);

  const removeTag = (tagToRemove) => {
    setProductTags(productTags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productName.trim()) return;

    const parsedPrice = parseFloat(productPrice.replace(/[^\d.-]/g, '')) || 0;

    const newProductData = {
      name: productName,
      category: productCategory,
      price: parsedPrice,
    };

    onSave(newProductData);
    
    setProductDesc('');
  };

  return (
    <div className={`fixed font-sans inset-0 z-50 overflow-hidden transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-[2px] transition-opacity" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className={`w-screen max-w-lg bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Add Product</h2>
            <button onClick={onClose} className="p-1 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 text-left">
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-400">Product Name</label>
                <input 
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl font-medium text-sm text-gray-700 focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-300 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-400">Description</label>
                <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                  <div className="flex flex-wrap items-center gap-1 p-2 bg-[#fcfdfe] border-b border-gray-100 text-gray-400">
                    <button type="button" className="p-1.5 hover:bg-gray-50 hover:text-gray-700 rounded-lg font-bold flex items-center text-xs gap-1">A <ChevronDown size={11} /></button>
                    <div className="h-4 w-px bg-gray-200 mx-1" />
                    <button type="button" className="p-1.5 hover:bg-gray-50 hover:text-gray-700 rounded-lg"><Bold size={14} /></button>
                    <button type="button" className="p-1.5 hover:bg-gray-50 hover:text-gray-700 rounded-lg"><Italic size={14} /></button>
                    <button type="button" className="p-1.5 hover:bg-gray-50 hover:text-gray-700 rounded-lg"><Underline size={14} /></button>
                    <div className="h-4 w-px bg-gray-200 mx-1" />
                    <button type="button" className="p-1.5 hover:bg-gray-50 hover:text-gray-700 rounded-lg"><AlignLeft size={14} /></button>
                    <button type="button" className="p-1.5 hover:bg-gray-50 hover:text-gray-700 rounded-lg"><AlignCenter size={14} /></button>
                    <button type="button" className="p-1.5 hover:bg-gray-50 hover:text-gray-700 rounded-lg"><AlignRight size={14} /></button>
                    <button type="button" className="p-1.5 hover:bg-gray-50 hover:text-gray-700 rounded-lg"><AlignJustify size={14} /></button>
                  </div>
                  <textarea 
                    rows={4}
                    value={productDesc}
                    onChange={(e) => setProductDesc(e.target.value)}
                    placeholder="Type something"
                    className="w-full px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none resize-none bg-white font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-400">Category</label>
                <div className="relative">
                  <select 
                    value={productCategory}
                    onChange={(e) => setProductCategory(e.target.value)}
                    className="w-full bg-white border border-gray-200 text-sm text-gray-700 font-semibold px-4 py-3 rounded-xl appearance-none focus:outline-none focus:border-gray-300 transition-all cursor-pointer"
                  >
                    <option value="Phone">Phone</option>
                    <option value="Notebook">Notebook</option>
                    <option value="Watch">Watch</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-400">Price</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500">$</span>
                    <input 
                      type="text"
                      value={productPrice}
                      onChange={(e) => setProductPrice(e.target.value)}
                      className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl font-semibold text-sm text-gray-700 focus:outline-none focus:border-gray-300"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-400">Discount</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500">%</span>
                    <input 
                      type="text"
                      value={productDiscount}
                      onChange={(e) => setProductDiscount(e.target.value)}
                      className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl font-semibold text-sm text-gray-700 focus:outline-none focus:border-gray-300"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2.5">
                <label className="text-sm font-semibold text-gray-400">Product Images</label>
                <div className="w-full py-6 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center bg-[#fbfcfd] cursor-pointer hover:bg-gray-50/50 transition-colors">
                  <Upload size={22} className="text-gray-400 mb-1" />
                  <span className="text-xs font-semibold text-gray-500">
                    Drag and Drop or <span className="text-[#22c55e] hover:underline">Browse</span> to upload
                  </span>
                </div>

                <div className="grid grid-cols-5 gap-2 pt-1">
                  <div className="aspect-square bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center text-gray-300"><ImageIcon size={20} /></div>
                  <div className="aspect-square bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center text-gray-300"><ImageIcon size={20} /></div>
                  <div className="aspect-square bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center text-gray-300"><ImageIcon size={20} /></div>
                  <div className="aspect-square bg-gray-100 border border-transparent rounded-xl flex items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-200 transition-colors">
                    <Trash2 size={18} />
                  </div>
                  <div className="aspect-square bg-white border border-gray-100 rounded-xl flex items-center justify-center relative">
                    <div className="w-7 h-7 rounded-full border-2 border-gray-100 border-t-[#22c55e] border-r-[#22c55e] animate-spin" />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-400">Tags</label>
                <div className="w-full p-2 border border-gray-200 rounded-xl flex flex-wrap gap-2 items-center bg-white min-h-[46px]">
                  {productTags.map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-1.5 pl-3 pr-1.5 py-1 bg-gray-50 text-xs font-bold text-gray-600 rounded-lg border border-gray-100">
                      <span>{tag}</span>
                      <button type="button" onClick={() => removeTag(tag)} className="p-0.5 hover:bg-gray-200/60 rounded-md text-gray-400 hover:text-gray-600">
                        <X size={10} className="stroke-[3]" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                <button 
                  type="submit"
                  className="flex-1 bg-[#22c55e] hover:bg-green-600 text-white font-bold text-sm py-3 rounded-xl transition-colors active:scale-[0.99] shadow-md shadow-green-500/10"
                >
                  Save
                </button>
                <button 
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-white border border-gray-200 hover:bg-gray-50 text-gray-500 font-bold text-sm py-3 rounded-xl transition-colors text-center"
                >
                  Cancel
                </button>
              </div>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
}