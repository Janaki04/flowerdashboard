import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom'
import DashboardLayout from './pages/DashboardLayout' 
import Dashboard from './pages/dashboard/Dashboard'
import Products from "./pages/products/Products"
import Login from "./pages/auth/Login" 
import SignUp from "./pages/auth/SignUp" 
import Orders from './pages/orders/Orders'
import Customers from './pages/customers/Customers'
import Calendar from './pages/calender/Calendar'
import TasksPage from './pages/tasks/TasksPage'
import ProjectsPage from './pages/projects/ProjectsPage'


const EmptyView = ({ name }) => (
  <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
    <h2 className="text-xl font-bold text-gray-800">{name} Screen</h2>
    <p className="text-gray-500 mt-1">Screen is in still progress</p>
  </div>
);

const ProtectedRoute = () => {
  const session = localStorage.getItem('userSession');
  const location = useLocation();

  if (!session) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
};

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

        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/task" element={<TasksPage />} />
          
          <Route path="/ecommerce">
            <Route index element={<Navigate to="/ecommerce/products" replace />} />
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<Orders name="Orders" />} />
            <Route path="customers" element={<Customers name="Customers" />} />
          </Route>

          <Route path="/calendar" element={<Calendar name="Calendar" />} />
          <Route path="/projects" element={<ProjectsPage name="Projects" />} />
          <Route path="/file-manager" element={<EmptyView name="File Manager" />} />
          <Route path="/mail" element={<EmptyView name="Mail" />} />
          <Route path="/chat" element={<EmptyView name="Chat" />} />
          <Route path="/notes" element={<EmptyView name="Notes" />} />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;