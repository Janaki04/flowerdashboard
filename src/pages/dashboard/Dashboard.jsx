import React, {useState,useRef} from 'react';
import { 
  Download, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Users, 
  MoreHorizontal,
  ChevronDown,
  Printer,
  ArrowUpRight,
  ArrowDownRight,
  FileSpreadsheet, FileText, FileCode,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const metricsData = [
  { title: "Total Income", value: "$8,500", change: "+50.8%", isPositive: true, icon: DollarSign, bg: "bg-[#e6f7f4]", color: "text-[#22c55e]" },
  { title: "Total Sales", value: "3.500K", change: "-10.5%", isPositive: false, icon: TrendingUp, bg: "bg-[#eef2f6]", color: "text-[#3b82f6]" },
  { title: "New Clients", value: "2.500K", change: "+24.9%", isPositive: true, icon: Users, bg: "bg-[#e6f7f4]", color: "text-[#10b981]" },
];

const weeklyStats = [
  { name: 'Mon', Income: 190, Expense: 130 },
  { name: 'Tue', Income: 110, Expense: 150 },
  { name: 'Wed', Income: 250, Expense: 140 },
  { name: 'Thu', Income: 190, Expense: 70 },
  { name: 'Fri', Income: 210, Expense: 130 },
  { name: 'Sat', Income: 180, Expense: 140 },
  { name: 'Sun', Income: 150, Expense: 70 },
];

const analyticsData = [
  { name: 'Mon', Line1: 40, Line2: 40 },
  { name: 'Tue', Line1: 110, Line2: 90 },
  { name: 'Wed', Line1: 150, Line2: 170 },
  { name: 'Thu', Line1: 240, Line2: 90 },
  { name: 'Fri', Line1: 160, Line2: 200 },
  { name: 'Sat', Line1: 270, Line2: 110 },
  { name: 'Sun', Line1: 350, Line2: 90 },
];

const horizontalStats = [
  { name: '25', Income: 80, Expense: -80 },
  { name: '24', Income: 160, Expense: -210 },
  { name: '23', Income: 210, Expense: -240 },
  { name: '22', Income: 320, Expense: -180 },
  { name: '21', Income: 130, Expense: -280 },
  { name: '20', Income: 230, Expense: -190 },
  { name: '19', Income: 60, Expense: -130 },
];

const salesPieData = [
  { name: 'Current Week', value: 2500, color: '#38a169' },
  { name: 'Last Week', value: 1000, color: '#4fd1c5' },
];

const orders = [
  { name: "Regina Cooper", id: "#790841", amount: "$2,500", type: "Credit Card", date: "12.09.2019", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" },
  { name: "Robert Edwards", id: "#799894", amount: "$1,500", type: "PayPal", date: "12.09.2019", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150" },
  { name: "Gloria Mckinney", id: "#790857", amount: "$5,600", type: "Credit Card", date: "12.09.2019", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150" },
  { name: "Randall Fisher", id: "#790687", amount: "$2,850", type: "PayPal", date: "12.09.2019", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150" },
];

const transactions = [
  { name: "Devon Williamson", time: "08:00 AM — 19 August", amount: "+$1,400", sub: "Payment", type: "pos", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150" },
  { name: "Debra Wilson", time: "09:45 AM — 19 August", amount: "-$850", sub: "Refund", type: "neg", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150" },
  { name: "Judith Black", time: "10:15 AM — 20 August", amount: "+$2,050", sub: "Payment", type: "pos", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" },
  { name: "Philip Henry", time: "10:50 AM — 23 August", amount: "+$650", sub: "Payment", type: "pos", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" },
  { name: "Mitchell Cooper", time: "12:45 AM — 25 August", amount: "+$900", sub: "Payment", type: "pos", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150" },
];

export default function Dashboard() {
    const [isExportOpen, setIsExportOpen] = useState(false);
      const exportRef = useRef(null);
    
  
  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Overview</h1>
        <div className="flex items-center gap-3 w-full sm:w-auto">
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
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metricsData.map((m, i) => (
          <div key={i} className="bg-white border border-gray-100/80 rounded-2xl p-6 flex justify-between items-center shadow-sm">
            <div>
              <p className="text-sm font-medium text-gray-400">{m.title}</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-1">{m.value}</h3>
              <span className={`inline-flex items-center text-xs font-semibold mt-2 ${m.isPositive ? 'text-green-500' : 'text-red-400'}`}>
                {m.isPositive ? '↑' : '↓'} {m.change}
              </span>
            </div>
            <div className={`w-14 h-14 rounded-2xl ${m.bg} flex items-center justify-center`}>
              <m.icon size={26} className={m.color} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h4 className="font-bold text-gray-800">Statistics</h4>
            <div className="flex items-center gap-2 text-xs font-medium text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
              <Calendar size={14} /> <span>19 Aug – 25 Aug</span>
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyStats} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="Income" fill="#2e7d32" radius={[4, 4, 0, 0]} maxBarSize={14} stacked />
                <Bar dataKey="Expense" fill="#81c784" radius={[4, 4, 0, 0]} maxBarSize={14} stacked />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4 text-xs font-medium">
            <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#2e7d32]" /> <span className="text-gray-500">Income</span></div>
            <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#81c784]" /> <span className="text-gray-500">Expense</span></div>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h4 className="font-bold text-gray-800">Analytics</h4>
            <div className="flex items-center gap-2 text-xs font-medium text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
              <Calendar size={14} /> <span>19 Aug – 25 Aug</span>
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analyticsData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="Line1" stroke="#2e7d32" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="Line2" stroke="#81c784" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-bold text-gray-800">Sales</h4>
            <MoreHorizontal size={18} className="text-gray-400 cursor-pointer" />
          </div>
          <div className="relative h-44 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={salesPieData} cx="50%" cy="50%" innerRadius={60} outerRadius={72} paddingAngle={3} dataKey="value">
                  {salesPieData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute text-center">
              <span className="text-2xl font-bold text-gray-800">3.500</span>
              <p className="text-xs font-medium text-gray-400 mt-0.5">Total</p>
            </div>
          </div>
          <div className="space-y-3 mt-4 text-sm font-medium border-t border-gray-50 pt-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#38a169]" /> <span className="text-gray-500">Current Week</span></div>
              <div className="flex items-center gap-3"><span className="text-gray-700 font-semibold">2.500</span> <span className="text-green-500 text-xs">↑ 8.8%</span></div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#4fd1c5]" /> <span className="text-gray-500">Last Week</span></div>
              <div className="flex items-center gap-3"><span className="text-gray-700 font-semibold">1.000</span> <span className="text-red-400 text-xs">↓ 5.6%</span></div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h4 className="font-bold text-gray-800">Statistics</h4>
            <div className="flex items-center gap-2 text-xs font-medium text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
              <Calendar size={14} /> <span>19 Aug – 25 Aug</span>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={horizontalStats} margin={{ top: 0, right: 10, left: -25, bottom: 0 }} stackOffset="sign">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="Income" fill="#2e7d32" stackId="stack" radius={[0, 4, 4, 0]} maxBarSize={10} />
                <Bar dataKey="Expense" fill="#81c784" stackId="stack" radius={[4, 0, 0, 4]} maxBarSize={10} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm xl:col-span-2 overflow-hidden">
          <div className="flex justify-between items-center mb-6">
            <h4 className="font-bold text-gray-800">Last Orders</h4>
            <div className="flex items-center gap-2 text-xs font-medium text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
              <Calendar size={14} /> <span>19 Aug – 25 Aug</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="border-b border-gray-50 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  <th className="pb-3 font-medium">Customer Name</th>
                  <th className="pb-3 font-medium">Order No.</th>
                  <th className="pb-3 font-medium">Amount</th>
                  <th className="pb-3 font-medium">Payment Type</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm font-medium text-gray-700">
                {orders.map((order, i) => (
                  <tr key={i} className="hover:bg-gray-50/40 transition-colors">
                    <td className="py-3.5 flex items-center gap-3">
                      <img src={order.img} alt={order.name} className="w-8 h-8 rounded-full object-cover border" />
                      <span className="text-gray-800 font-semibold">{order.name}</span>
                    </td>
                    <td className="py-3.5 text-gray-400">{order.id}</td>
                    <td className="py-3.5 text-gray-800 font-semibold">{order.amount}</td>
                    <td className="py-3.5 text-gray-500">{order.type}</td>
                    <td className="py-3.5 text-gray-400">{order.date}</td>
                    <td className="py-3.5 text-right"><MoreHorizontal size={16} className="text-gray-400 inline cursor-pointer" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h4 className="font-bold text-gray-800">Transactions</h4>
            <MoreHorizontal size={18} className="text-gray-400 cursor-pointer" />
          </div>
          <div className="space-y-4 flex-1 overflow-y-auto max-h-[340px] pr-1">
            {transactions.map((t, i) => (
              <div key={i} className="flex justify-between items-center p-1 rounded-xl hover:bg-gray-50/50 transition-colors">
                <div className="flex items-center gap-3">
                  <img src={t.img} alt={t.name} className="w-9 h-9 rounded-full object-cover border" />
                  <div>
                    <h5 className="text-sm font-bold text-gray-800 leading-tight">{t.name}</h5>
                    <span className="text-xs font-medium text-gray-400">{t.time}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-sm font-bold block ${t.type === 'pos' ? 'text-green-500' : 'text-red-400'}`}>
                    {t.amount}
                  </span>
                  <span className="text-xs font-medium text-gray-400">{t.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}