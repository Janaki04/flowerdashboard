import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom'
import DashboardLayout from './pages/DashboardLayout' 
import Dashboard from './pages/dashboard/Dashboard'
import Products from "./pages/products/Products"
import Login from "./pages/auth/Login" // Assuming Login.jsx is in pages directory
import SignUp from "./pages/auth/SignUp" // Assuming SignUp.jsx is in pages directory

const TasksPage = () => <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm"><h2 className="text-xl font-bold text-gray-800">Task Management</h2><p className="text-gray-500 mt-1">Track and organize your day-to-day operations.</p></div>;
const EmptyView = ({ name }) => <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm"><h2 className="text-xl font-bold text-gray-800">{name} Screen</h2><p className="text-gray-500 mt-1">This layout placeholder serves the /{name.toLowerCase().replace(/\s+/g, '-')} view.</p></div>;

// Component wrapper that protects internal app pages
const ProtectedRoute = () => {
  const session = localStorage.getItem('userSession');
  const location = useLocation();

  if (!session) {
    // Redirect unauthenticated users to login, keeping track of where they tried to go
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
};

// Component wrapper that keeps logged-in users away from authentication pages
const PublicRoute = ({ children }) => {
  const session = localStorage.getItem('userSession');
  
  if (session) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="/signup" element={
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        } />

        {/* Base redirect */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Private Protected Dashboard System Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/task" element={<TasksPage />} />
          
          <Route path="/ecommerce">
            <Route index element={<Navigate to="/ecommerce/products" replace />} />
            <Route path="products" element={<Products name="Products" />} />
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

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;