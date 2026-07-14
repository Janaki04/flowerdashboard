import React, { useState, useMemo } from 'react';
import { 
  Download, 
  Search, 
  SlidersHorizontal, 
  ChevronDown, 
  MoreVertical, 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight 
} from 'lucide-react';
import OrderDetailModal from './OrderDetailModal';

const initialOrders = [
  { id: 1, orderNo: "#790841", customer: "Claire Warren", date: "12.09.20", total: 145.85, payment: "PayPal", status: "Pending" },
  { id: 2, orderNo: "#790841", customer: "Theresa Robertson", date: "12.09.20", total: 225.15, payment: "Credit Card", status: "Pending" },
  { id: 3, orderNo: "#790841", customer: "Nathan Hawkins", date: "12.09.20", total: 45.55, payment: "PayPal", status: "Shipped" },
  { id: 4, orderNo: "#790841", customer: "Lily Williamson", date: "12.09.20", total: 305.25, payment: "Credit Card", status: "Processing" },
  { id: 5, orderNo: "#790841", customer: "Brooklyn Steward", date: "12.09.20", total: 483.80, payment: "Credit Card", status: "Shipped" },
  { id: 6, orderNo: "#790841", customer: "Norma Flores", date: "12.09.20", total: 128.79, payment: "Payoneer", status: "Processing" },
  { id: 7, orderNo: "#790841", customer: "Leslie Mckinney", date: "12.09.20", total: 105.05, payment: "Credit Card", status: "Cancelled" },
  { id: 8, orderNo: "#790841", customer: "Gregory Black", date: "12.09.20", total: 1028.15, payment: "PayPal", status: "Refunded" },
];

export default function Orders() {
  const [ordersList] = useState(initialOrders);
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState([2, 3, 4]); 
  
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredOrders = useMemo(() => {
    return ordersList.filter(order => {
      const matchesSearch = order.customer.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            order.orderNo.includes(searchQuery);
      let matchesTab = true;
      if (activeTab !== 'All') {
        matchesTab = order.status.toLowerCase() === activeTab.toLowerCase();
      }
      return matchesSearch && matchesTab;
    });
  }, [ordersList, activeTab, searchQuery]);

  const toggleSelectRow = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredOrders.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredOrders.map(o => o.id));
    }
  };

  const openPreviewModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case 'Shipped':
        return 'bg-[#eaf7f0] text-[#3cae68] border border-[#d6f2e2]';
      case 'Processing':
        return 'bg-[#fff5eb] text-[#e2873c] border border-[#ffe6cc]';
          case 'Pending':
        return 'bg-[#fff5eb] text-[#e2873c] border border-[#ffe6cc]';
      case 'Cancelled':
        return 'bg-[#fff0f0] text-[#ea5454] border border-[#ffd6d6]';
      default:
        return 'bg-gray-50 text-gray-500';
    }
  };

  return (
    <div className="bg-[#f8f9fa] min-h-screen text-[#6c757d] font-sans antialiased selection:bg-green-100">
      <div className="mx-auto space-y-7">

        <div className="flex justify-between items-center px-1">
          <h1 className="text-3xl font-semibold text-[#212529] tracking-tight">Orders</h1>
          
          <div className="relative">
            <button 
              onClick={() => setIsExportOpen(!isExportOpen)}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#e9ecef] rounded-xl hover:bg-gray-50 text-sm font-medium text-[#495057] shadow-sm transition-all"
            >
              <Download size={15} className="text-[#adb5bd]" />
              <span>Export</span>
              <ChevronDown size={14} className={`text-[#adb5bd] transition-transform duration-200 ${isExportOpen ? 'rotate-180' : ''}`} />
            </button>
            {isExportOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white border border-[#e9ecef] rounded-xl shadow-xl p-1.5 z-40 text-sm">
                <button onClick={() => setIsExportOpen(false)} className="w-full text-left px-3.5 py-2 hover:bg-gray-50 rounded-lg">CSV File</button>
                <button onClick={() => setIsExportOpen(false)} className="w-full text-left px-3.5 py-2 hover:bg-gray-50 rounded-lg">Excel Spreadsheet</button>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-7 border-b border-[#e9ecef] text-sm font-medium overflow-x-auto scrollbar-none px-1">
          {[
            { id: 'All', label: 'All', count: 983 },
            { id: 'Pending', label: 'Pending', count: 128 },
            { id: 'Processing', label: 'Processing', count: 15 },
            { id: 'Refunded', label: 'Refunded', count: 8 }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 pb-3.5 transition-all relative whitespace-nowrap ${
                activeTab === tab.id ? 'text-[#212529] font-semibold' : 'text-[#adb5bd] hover:text-[#6c757d]'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[11px] px-2 py-0.5 rounded-md font-bold tracking-wide ${
                activeTab === tab.id ? 'bg-[#eaf7f0] text-[#3cae68]' : 'bg-[#e9ecef] text-[#6c757d]'
              }`}>
                {tab.count}
              </span>
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#3cae68] rounded-full" />
              )}
            </button>
          ))}
        </div>

        <div className="bg-white border border-[#e9ecef] rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.02)] overflow-hidden">
          
          <div className="p-5 flex flex-col sm:flex-row gap-4 justify-between items-center bg-white border-b border-[#f8f9fa]">
            <div className="relative w-full sm:max-w-2xl flex items-center">
              <Search className="absolute left-4 text-[#adb5bd] pointer-events-none" size={17} />
              <input 
                type="text" 
                placeholder="Search order..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-12 py-2.5 bg-white border border-[#e9ecef] text-sm text-[#212529] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#3cae68] focus:border-[#3cae68] placeholder-[#adb5bd] shadow-sm"
              />
            </div>
            
            <div className="relative w-full sm:w-auto self-stretch sm:self-auto">
              <button 
                onClick={() => setIsActionsOpen(!isActionsOpen)}
                className="flex items-center justify-between sm:justify-center gap-2 px-5 py-2.5 bg-white border border-[#e9ecef] rounded-xl hover:bg-gray-50 text-sm font-medium text-[#495057] shadow-sm w-full transition-all"
              >
                <span>Actions</span>
                <ChevronDown size={14} className={`text-[#adb5bd] transition-transform duration-200 ${isActionsOpen ? 'rotate-180' : ''}`} />
              </button>
              {isActionsOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-[#e9ecef] rounded-xl shadow-xl p-1.5 z-40 text-sm">
                  <button onClick={() => setIsActionsOpen(false)} className="w-full text-left px-4 py-2 text-[#3cae68] hover:bg-[#eaf7f0] rounded-lg font-medium">Bulk Ship Orders</button>
                  <button onClick={() => setIsActionsOpen(false)} className="w-full text-left px-4 py-2 text-[#ea5454] hover:bg-[#fff0f0] rounded-lg font-medium">Cancel Selection</button>
                </div>
              )}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1050px]">
              <thead>
                <tr className="border-b border-[#f8f9fa] bg-white text-[11px] font-bold text-[#adb5bd] uppercase tracking-wider">
                  <th className="py-4.5 pl-6 w-12">
                    <input 
                      type="checkbox" 
                      checked={filteredOrders.length > 0 && selectedIds.length === filteredOrders.length} 
                      onChange={toggleSelectAll} 
                      className="w-4 h-4 rounded border-[#ced4da] text-[#3cae68] focus:ring-[#3cae68] focus:ring-offset-0 cursor-pointer transition-all accent-[#3cae68]" 
                    />
                  </th>
                  <th className="py-4.5 cursor-pointer hover:text-[#6c757d] select-none transition-colors">Order No. <span className="inline-block text-[8px] ml-0.5 align-middle">▼</span></th>
                  <th className="py-4.5 cursor-pointer hover:text-[#6c757d] select-none transition-colors">Customer <span className="inline-block text-[8px] ml-0.5 align-middle">▼</span></th>
                  <th className="py-4.5 cursor-pointer hover:text-[#6c757d] select-none transition-colors">Date <span className="inline-block text-[8px] ml-0.5 align-middle">▼</span></th>
                  <th className="py-4.5 cursor-pointer hover:text-[#6c757d] select-none transition-colors">Total <span className="inline-block text-[8px] ml-0.5 align-middle">▼</span></th>
                  <th className="py-4.5 cursor-pointer hover:text-[#6c757d] select-none transition-colors">Payment <span className="inline-block text-[8px] ml-0.5 align-middle">▼</span></th>
                  <th className="py-4.5 cursor-pointer hover:text-[#6c757d] select-none transition-colors">Status <span className="inline-block text-[8px] ml-0.5 align-middle">▼</span></th>
                  <th className="py-4.5 pr-6 w-12"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f8f9fa] text-[14px] font-medium text-[#495057]">
                {filteredOrders.map((order) => {
                  const isChecked = selectedIds.includes(order.id);
                  return (
                    <tr 
                      key={order.id} 
                      className={`transition-colors duration-100 ${isChecked ? 'bg-[#f8f9fa]/80' : 'hover:bg-[#f8f9fa]/30'}`}
                    >
                      <td className="py-4 pl-6">
                        <input 
                          type="checkbox" 
                          checked={isChecked} 
                          onChange={() => toggleSelectRow(order.id)} 
                          className="w-4 h-4 rounded border-[#ced4da] text-[#3cae68] focus:ring-[#3cae68] focus:ring-offset-0 cursor-pointer transition-all accent-[#3cae68]" 
                        />
                      </td>
                      <td className="py-4 text-[#adb5bd] font-normal tracking-wide">{order.orderNo}</td>
                      <td className="py-4 text-[#212529] font-semibold">{order.customer}</td>
                      <td className="py-4 text-[#868e96] font-normal">{order.date}</td>
                      <td className="py-4 text-[#212529] font-semibold">${order.total.toFixed(2)}</td>
                      <td className="py-4 text-[#495057] font-normal">{order.payment}</td>
                      <td className="py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-bold rounded-md tracking-wide ${getStatusStyles(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 pr-6 text-right">
                        <button 
                          onClick={() => openPreviewModal(order)}
                          className="text-[#adb5bd] hover:text-[#495057] p-1 rounded-lg transition-colors"
                        >
                          <MoreVertical size={17} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="p-5 flex flex-col sm:flex-row gap-4 items-center justify-between bg-white border-t border-[#e9ecef] text-sm font-medium text-[#adb5bd]">
            <div className="flex items-center gap-3.5">
              <div className="relative">
                <select 
                  value={itemsPerPage} 
                  onChange={(e) => setItemsPerPage(Number(e.target.value))} 
                  className="appearance-none bg-white border border-[#e9ecef] pl-4 pr-9 py-2 rounded-xl text-[#495057] focus:outline-none focus:ring-1 focus:ring-[#3cae68] shadow-sm cursor-pointer font-semibold text-xs"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
                <ChevronDown size={13} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#adb5bd] pointer-events-none" />
              </div>
              <span className="text-[#868e96] text-xs font-semibold">Showing 1 - 10 of 100</span>
            </div>

            <div className="flex items-center gap-1.5">
              <button disabled className="p-2 text-[#dee2e6] bg-[#f8f9fa] rounded-xl cursor-not-allowed"><ChevronsLeft size={15} /></button>
              <button disabled className="p-2 text-[#dee2e6] bg-[#f8f9fa] rounded-xl cursor-not-allowed"><ChevronLeft size={15} /></button>
              
              <button className="w-8 h-8 flex items-center justify-center text-xs font-bold rounded-xl bg-[#3cae68] text-white shadow-sm shadow-[#3cae68]/15">1</button>
              <button className="w-8 h-8 flex items-center justify-center text-xs font-bold rounded-xl text-[#495057] hover:bg-[#f8f9fa] transition-colors">2</button>
              <button className="w-8 h-8 flex items-center justify-center text-xs font-bold rounded-xl text-[#495057] hover:bg-[#f8f9fa] transition-colors">3</button>
              <span className="px-1 text-[#dee2e6] text-xs">...</span>
              <button className="w-8 h-8 flex items-center justify-center text-xs font-bold rounded-xl text-[#495057] hover:bg-[#f8f9fa] transition-colors">5</button>
              
              <button className="p-2 text-[#6c757d] bg-[#f8f9fa] hover:bg-[#e9ecef] rounded-xl transition-colors"><ChevronRight size={15} /></button>
              <button className="p-2 text-[#6c757d] bg-[#f8f9fa] hover:bg-[#e9ecef] rounded-xl transition-colors"><ChevronsRight size={15} /></button>
            </div>
          </div>

        </div>
      </div>

      <OrderDetailModal 
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setSelectedOrder(null); }}
        order={selectedOrder}
      />

    </div>
  );
}