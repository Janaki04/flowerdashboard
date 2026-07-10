import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Download, Plus, List, Grid, Search, SlidersHorizontal, ChevronDown, MoreVertical, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Image as ImageIcon, Check, Calendar as CalendarIcon, Printer, FileSpreadsheet, FileText, FileCode, X } from 'lucide-react';
import AddProductDrawer from './AddProductDrawer';

const initialProducts = [
  { id: 1, name: "MacBook Pro 15 Retina Touch Bar MV902", productNo: "#790841", category: "Notebook", date: "12.09.20", price: 2500, status: "Available" },
  { id: 2, name: "Apple Watch Series 5 Edition GPS + Cellular", productNo: "#790841", category: "Watch", date: "12.09.20", price: 2500, status: "Available" },
  { id: 3, name: "Apple iPhone 11 Pro Max 256GB Space Gray", productNo: "#790841", category: "Phone", date: "12.09.20", price: 2500, status: "Available" },
  { id: 4, name: "Apple Watch Series 5 Edition GPS + Cellular", productNo: "#790841", category: "Watch", date: "12.09.20", price: 2500, status: "Available" },
  { id: 5, name: "MacBook Pro 15 Retina Touch Bar MV902", productNo: "#790841", category: "Notebook", date: "12.09.20", price: 2500, status: "Disabled" },
  { id: 6, name: "Apple iPhone 11 Pro Max 64GB Midnight Green", productNo: "#790841", category: "Phone", date: "12.09.20", price: 2500, status: "Disabled" },
  { id: 7, name: "MacBook Pro 15 Retina Touch Bar MV902", productNo: "#790841", category: "Notebook", date: "12.09.20", price: 2500, status: "Available" },
  { id: 8, name: "Apple Watch Series 5 Edition GPS + Cellular", productNo: "#790841", category: "Watch", date: "12.09.20", price: 2500, status: "Available" },
];

export default function Products() {
  const [productsList, setProductsList] = useState(initialProducts);
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState([2, 3, 4]); 
  const [viewMode, setViewMode] = useState('grid'); 
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [alertNotification, setAlertNotification] = useState(null);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  const filterRef = useRef(null);
  const exportRef = useRef(null);

  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [minPrice, setMinPrice] = useState(500);
  const [maxPrice, setMaxPrice] = useState(5500);

  const [appliedFilters, setAppliedFilters] = useState({
    category: 'All', status: 'All', minPrice: 500, maxPrice: 5500
  });

  useEffect(() => {
    function handleClickOutside(event) {
      if (filterRef.current && !filterRef.current.contains(event.target)) setIsFilterOpen(false);
      if (exportRef.current && !exportRef.current.contains(event.target)) setIsExportOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (alertNotification) {
      const timer = setTimeout(() => setAlertNotification(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [alertNotification]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeTab, appliedFilters, itemsPerPage]);

  const filteredProducts = useMemo(() => {
    return productsList.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            product.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = appliedFilters.category === 'All' || product.category === appliedFilters.category;
      let matchesStatus = true;
      if (activeTab !== 'All') {
        matchesStatus = product.status === activeTab;
      } else if (appliedFilters.status !== 'All') {
        matchesStatus = product.status === appliedFilters.status;
      }
      const matchesPrice = product.price >= appliedFilters.minPrice && product.price <= appliedFilters.maxPrice;
      return matchesSearch && matchesCategory && matchesStatus && matchesPrice;
    });
  }, [productsList, activeTab, searchQuery, appliedFilters]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const showingStart = filteredProducts.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const showingEnd = Math.min(currentPage * itemsPerPage, filteredProducts.length);

  const counts = useMemo(() => {
    return {
      All: productsList.length,
      Available: productsList.filter(p => p.status === 'Available').length,
      Disabled: productsList.filter(p => p.status === 'Disabled').length,
    };
  }, [productsList]);

  const toggleSelectRow = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === paginatedProducts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedProducts.map(p => p.id));
    }
  };

  const handleApplyFilters = (e) => {
    e.preventDefault();
    setAppliedFilters({
      category: filterCategory, status: filterStatus, minPrice: Number(minPrice), maxPrice: Number(maxPrice)
    });
    if (filterStatus !== 'All') setActiveTab(filterStatus);
    setIsFilterOpen(false);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setActiveTab('All');
    setFilterCategory('All');
    setFilterStatus('All');
    setMinPrice(500);
    setMaxPrice(5500);
    setAppliedFilters({ category: 'All', status: 'All', minPrice: 500, maxPrice: 5500 });
  };

  const handleAddNewProductSave = (productData) => {
    const freshCreatedProduct = {
      id: Date.now(),
      name: productData.name,
      productNo: `#${Math.floor(100000 + Math.random() * 900000)}`,
      category: productData.category,
      date: new Date().toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: '2-digit' }),
      price: productData.price,
      status: "Available"
    };

    setProductsList([freshCreatedProduct, ...productsList]);
    setIsDrawerOpen(false);
    
    setAlertNotification(`Created Successfully! "${productData.name}" has been appended.`);
  };

  return (
    <div className="space-y-6 pb-12 select-none text-gray-700 relative min-h-screen">
      
      {alertNotification && (
        <div className="fixed top-5 right-5 z-[100] bg-gray-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-gray-800 animate-in fade-in slide-in-from-top-4 duration-300 text-sm font-semibold">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{alertNotification}</span>
          <button onClick={() => setAlertNotification(null)} className="ml-2 text-gray-400 hover:text-white transition-colors">
            <X size={14} />
          </button>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <div className="flex items-center gap-3 w-full sm:w-auto z-30">
          
          <div className="relative w-full sm:w-auto" ref={exportRef}>
            <button 
              onClick={() => setIsExportOpen(!isExportOpen)}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200/80 rounded-xl hover:bg-gray-50 text-sm font-semibold text-gray-600 shadow-sm w-full sm:w-auto"
            >
              <Download size={16} />
              <span>Export</span>
              <ChevronDown size={14} className={`text-gray-400 transition-transform duration-200 ${isExportOpen ? 'rotate-180' : ''}`} />
            </button>

            {isExportOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl p-2 space-y-0.5 z-50">
                {[
                  { name: 'Print', icon: <Printer size={16} /> },
                  { name: 'Excel', icon: <FileSpreadsheet size={16} /> },
                  { name: 'PDF', icon: <FileText size={16} /> },
                  { name: 'CSV', icon: <FileCode size={16} /> },
                ].map((option) => (
                  <button key={option.name} onClick={() => setIsExportOpen(false)} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-600 rounded-xl hover:bg-gray-50 text-left">
                    <span className="text-gray-400">{option.icon}</span>
                    <span>{option.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Plus Open Control Action Handle Toggle Button */}
          <button 
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center justify-center w-10 h-10 bg-[#22c55e] hover:bg-green-600 text-white rounded-xl shadow-sm flex-shrink-0 active:scale-[0.97] transition-all"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between border-b border-gray-100 pb-px">
        <div className="flex gap-6 text-sm font-semibold text-gray-400">
          {[
            { id: 'All', label: 'All', count: counts.All },
            { id: 'Available', label: 'Available', count: counts.Available },
            { id: 'Disabled', label: 'Disabled', count: counts.Disabled }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setFilterStatus(tab.id); }}
              className={`flex items-center gap-2 pb-3 transition-all border-b-2 relative ${
                activeTab === tab.id ? 'text-gray-900 border-[#22c55e] font-bold' : 'border-transparent hover:text-gray-600'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[11px] px-1.5 py-0.5 rounded-md font-semibold ${activeTab === tab.id ? 'bg-[#e6f7f4] text-[#22c55e]' : 'bg-gray-100 text-gray-400'}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3.5 text-gray-400 pb-2">
          <button onClick={() => setViewMode('list')} className={`p-1 rounded-md ${viewMode === 'list' ? 'text-[#22c55e] bg-green-50/50' : 'hover:text-gray-600'}`}><List size={20} /></button>
          <button onClick={() => setViewMode('grid')} className={`p-1 rounded-md ${viewMode === 'grid' ? 'text-[#22c55e] bg-green-50/50' : 'hover:text-gray-600'}`}><Grid size={18} /></button>
        </div>
      </div>

      <div className={`${viewMode === 'list' ? 'bg-white border border-gray-100/90 rounded-2xl shadow-sm overflow-hidden' : ''}`}>
        
        <div className={`flex flex-col sm:flex-row gap-4 justify-between items-center relative z-20 ${viewMode === 'list' ? 'p-5 border-b border-gray-50' : 'mb-6 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm'}`}>
          <div className="relative w-full sm:max-w-md" ref={filterRef}>
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-12 py-2.5 bg-[#f7f8fa] text-sm text-gray-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-200 font-medium"
            />
            
            <button 
              type="button"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-md transition-colors ${isFilterOpen ? 'text-[#22c55e] bg-green-50' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <SlidersHorizontal size={16} />
            </button>

            {isFilterOpen && (
              <div className="absolute left-0 mt-3 w-[330px] sm:w-[370px] bg-white rounded-3xl border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.12)] p-6 z-50 text-left space-y-5 animate-in fade-in slide-in-from-top-3 duration-200">
                <h3 className="text-2xl font-bold text-gray-800 tracking-tight">Filter</h3>
                <form onSubmit={handleApplyFilters} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Category</label>
                    <div className="relative">
                      <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="w-full bg-[#f7f8fa] border border-transparent text-sm text-gray-700 font-medium px-4 py-3 rounded-xl appearance-none focus:outline-none cursor-pointer">
                        <option value="All">All</option>
                        <option value="Notebook">Notebook</option>
                        <option value="Watch">Watch</option>
                        <option value="Phone">Phone</option>
                      </select>
                      <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Status</label>
                    <div className="relative">
                      <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="w-full bg-[#f7f8fa] border border-transparent text-sm text-gray-700 font-medium px-4 py-3 rounded-xl appearance-none focus:outline-none cursor-pointer">
                        <option value="All">All Statuses</option>
                        <option value="Available">Available</option>
                        <option value="Disabled">Disabled</option>
                      </select>
                      <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Price</label>
                    <div className="relative pt-2 px-1">
                      <input type="range" min="500" max="5500" step="100" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none accent-[#22c55e]" />
                    </div>
                    <div className="flex items-center justify-between text-xs font-bold text-gray-600 pt-1">
                      <span>$500</span>
                      <span className="text-[#22c55e] bg-green-50 px-2 py-0.5 rounded-md border border-green-100/40">${minPrice} - ${maxPrice}</span>
                      <span>$5,500</span>
                    </div>
                  </div>

                  <button type="submit" className="w-full bg-[#22c55e] text-white font-bold text-sm py-3.5 rounded-xl shadow-lg shadow-green-500/10">Save</button>
                </form>
              </div>
            )}
          </div>
          
          <button onClick={handleClearFilters} className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-red-100 hover:bg-red-50/50 rounded-xl text-sm font-semibold text-red-500 shadow-sm w-full sm:w-auto">
            <X size={15} />
            <span>Clear Filters</span>
          </button>
        </div>

        {viewMode === 'list' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="border-b border-gray-100 bg-white text-[12px] font-bold text-gray-400 uppercase tracking-wider">
                  <th className="py-4 pl-6 w-12">
                    <input type="checkbox" checked={paginatedProducts.length > 0 && selectedIds.length === paginatedProducts.length} onChange={toggleSelectAll} className="w-4 h-4 rounded border-gray-300 text-[#22c55e] accent-[#22c55e]" />
                  </th>
                  <th className="py-4">Product Name</th>
                  <th className="py-4">Product No.</th>
                  <th className="py-4">Category</th>
                  <th className="py-4">Date</th>
                  <th className="py-4">Price</th>
                  <th className="py-4">Status</th>
                  <th className="py-4 pr-6 w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-[14px] font-medium text-gray-700">
                {paginatedProducts.map((product) => (
                  <tr key={product.id} className={`transition-colors duration-150 ${selectedIds.includes(product.id) ? 'bg-gray-50/50' : 'hover:bg-gray-50/30'}`}>
                    <td className="py-4 pl-6">
                      <input type="checkbox" checked={selectedIds.includes(product.id)} onChange={() => toggleSelectRow(product.id)} className="w-4 h-4 rounded border-gray-300 text-[#22c55e] accent-[#22c55e]" />
                    </td>
                    <td className="py-4 text-gray-900 font-semibold">{product.name}</td>
                    <td className="py-4 text-gray-400">{product.productNo}</td>
                    <td className="py-4 text-gray-500">{product.category}</td>
                    <td className="py-4 text-gray-400">{product.date}</td>
                    <td className="py-4 text-gray-900 font-bold">${product.price.toLocaleString()}</td>
                    <td className="py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 text-xs font-bold rounded-lg ${product.status === 'Available' ? 'bg-[#e6f7f4] text-[#22c55e]' : 'bg-orange-50 text-orange-500'}`}>{product.status}</span>
                    </td>
                    <td className="py-4 pr-6 text-right">
                      <button className="text-gray-400 hover:text-gray-600"><MoreVertical size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-6">
            {paginatedProducts.map((product) => {
              const isChecked = selectedIds.includes(product.id);
              return (
                <div key={product.id} className={`bg-white rounded-2xl border p-4 flex flex-col justify-between relative shadow-sm ${isChecked ? 'border-[#22c55e] ring-2 ring-[#22c55e]/10' : 'border-gray-100/90 hover:shadow-md'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-bold rounded-md ${product.status === 'Available' ? 'bg-[#e6f7f4] text-[#22c55e]' : 'bg-orange-50 text-orange-500'}`}>{product.status}</span>
                    <button onClick={() => toggleSelectRow(product.id)} className={`w-5 h-5 rounded-full flex items-center justify-center border ${isChecked ? 'bg-[#22c55e] border-[#22c55e] text-white' : 'border-gray-200 bg-white'}`}>
                      {isChecked && <Check size={11} className="stroke-[3]" />}
                    </button>
                  </div>
                  <div className="w-full aspect-[4/3] bg-[#f7f8fa] rounded-xl flex items-center justify-center text-gray-300 mb-4">
                    <ImageIcon size={38} />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-[14px] font-bold text-gray-800 line-clamp-2 leading-snug">{product.name}</h3>
                    <div className="flex items-center justify-between text-xs font-semibold text-gray-400 pt-1">
                      <span>{product.date}</span>
                      <span className="text-gray-900 font-bold text-[14px]">${product.price.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className={`p-5 flex flex-col sm:flex-row gap-4 items-center justify-between bg-white text-sm font-semibold text-gray-500 ${viewMode === 'list' ? 'border-t border-gray-50' : 'rounded-2xl border border-gray-100 shadow-sm'}`}>
          <div className="flex items-center gap-3">
            <div className="relative">
              <select value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))} className="appearance-none bg-[#f7f8fa] border border-gray-100 pl-4 pr-8 py-2 rounded-xl text-gray-700">
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            <span>Showing {showingStart} - {showingEnd} of {filteredProducts.length}</span>
          </div>

          {filteredProducts.length > 0 && (
            <div className="flex items-center gap-1">
              <button disabled={currentPage === 1} onClick={() => setCurrentPage(1)} className="p-2 text-gray-400 bg-gray-50 rounded-xl disabled:opacity-40"><ChevronsLeft size={16} /></button>
              <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} className="p-2 text-gray-400 bg-gray-50 rounded-xl disabled:opacity-40"><ChevronLeft size={16} /></button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button key={page} onClick={() => setCurrentPage(page)} className={`w-8 h-8 flex items-center justify-center text-xs font-bold rounded-xl ${currentPage === page ? 'bg-[#22c55e] text-white' : 'text-gray-600 hover:bg-gray-50'}`}>{page}</button>
              ))}
              <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} className="p-2 text-gray-400 bg-gray-50 rounded-xl disabled:opacity-40"><ChevronRight size={16} /></button>
              <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(totalPages)} className="p-2 text-gray-400 bg-gray-50 rounded-xl disabled:opacity-40"><ChevronsRight size={16} /></button>
            </div>
          )}
        </div>
      </div>

      <AddProductDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        onSave={handleAddNewProductSave} 
      />

    </div>
  );
}