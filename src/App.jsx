import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import DashboardLayout from './pages/DashboardLayout' 
import Dashboard from './pages/dashboard/Dashboard'

const TasksPage = () => <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm"><h2 className="text-xl font-bold text-gray-800">Task Management</h2><p className="text-gray-500 mt-1">Track and organize your day-to-day operations.</p></div>;
const EmptyView = ({ name }) => <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm"><h2 className="text-xl font-bold text-gray-800">{name} Screen</h2><p className="text-gray-500 mt-1">This layout placeholder serves the /{name.toLowerCase().replace(/\s+/g, '-')} view.</p></div>;

const AppLayout = () => (
  <DashboardLayout>
    <Outlet />
  </DashboardLayout>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/task" element={<TasksPage />} />
          
          <Route path="/ecommerce">
            <Route index element={<Navigate to="/ecommerce/products" replace />} />
            <Route path="products" element={<EmptyView name="Products" />} />
            <Route path="orders" element={<EmptyView name="Orders" />} />
            <Route path="customers" element={<EmptyView name="Customers" />} />
          </Route>

          <Route path="/calendar" element={<EmptyView name="Calendar" />} />
          <Route path="/mail" element={<EmptyView name="Mail" />} />
          <Route path="/chat" element={<EmptyView name="Chat" />} />
          <Route path="/projects" element={<EmptyView name="Projects" />} />
          <Route path="/file-manager" element={<EmptyView name="File Manager" />} />
          <Route path="/notes" element={<EmptyView name="Notes" />} />
          <Route path="/contacts" element={<EmptyView name="Contacts" />} />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App