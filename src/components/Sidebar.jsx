import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ClipboardList, 
  ShoppingCart, 
  Calendar, 
  Mail, 
  MessageSquare, 
  FileText, 
  Notebook, 
  Contact,
  Menu,
  X,
  Search,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import imagelogo from "../assets/Frame 3473231.png";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  
  const [openSubmenus, setOpenSubmenus] = useState({
    'E-Commerce': true 
  });

  const toggleSubmenu = (name) => {
    setOpenSubmenus(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'E-Commerce', icon: ShoppingCart, hasSubmenu: true, 
      submenuItems: [
        { name: 'Products', path: '/ecommerce/products' },
        { name: 'Orders', path: '/ecommerce/orders' },
        { name: 'Customers', path: '/ecommerce/customers' }
      ]
    },
    { name: 'Calendar', icon: Calendar, path: '/calendar' },
    { name: 'Task', icon: ClipboardList, path: '/task' },
    { name: 'Projects', icon: Notebook, path: '/projects' },
      { name: 'Mail', icon: Mail, path: '/mail', badge: 0 },
    { name: 'Chat', icon: MessageSquare, path: '/chat' },
    { name: 'File Manager', icon: FileText, path: '/file-manager' },
  ];

  const activeClass = "flex items-center justify-between px-4 py-3 text-gray-900 bg-[#c2e799] rounded-xl font-semibold transition-all duration-200 cursor-pointer w-full text-left";
  const inactiveClass = "flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-all duration-200 cursor-pointer w-full text-left";

  const activeSubClass = "flex items-center gap-3 px-10 py-3 text-gray-900 bg-[#eef7e2] rounded-xl font-semibold transition-all duration-200";
  const inactiveSubClass = "flex items-center gap-3 px-10 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-medium transition-all duration-200";

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 text-gray-700 bg-white border border-gray-200 rounded-md shadow-sm lg:hidden hover:bg-gray-50 focus:outline-none"
        aria-label="Toggle Menu"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/20 lg:hidden"
        />
      )}

      <aside className={`
        fixed top-0 left-0 bottom-0 z-40
        w-[260px] bg-white border-r border-gray-100 p-5
        flex flex-col h-screen overflow-y-auto
        transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        
        <div className="flex items-center gap-3 px-2 mb-6 mt-12 lg:mt-0">
          <img src={imagelogo} alt="Logo" className="w-28 h-8" />
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search anything" 
            className="w-full pl-10 pr-4 py-2.5 bg-[#f7f8fa] text-sm text-gray-600 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-300 placeholder-gray-400"
          />
        </div>

        <div className="flex flex-col flex-1">
          <p className="px-3 mb-3 text-xs font-bold tracking-wider text-gray-400 uppercase">
            Main Menu
          </p>
          
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const hasSubmenu = item.hasSubmenu;
              const isSubmenuOpen = !!openSubmenus[item.name];
              const isParentActive = hasSubmenu && item.submenuItems.some(sub => location.pathname === sub.path);

              return (
                <div key={item.name} className="flex flex-col space-y-1">
                  {hasSubmenu ? (
                    <button
                      onClick={() => toggleSubmenu(item.name)}
                      className={isParentActive ? activeClass : inactiveClass}
                      aria-expanded={isSubmenuOpen}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon size={20} className="stroke-[1.8]" />
                        <span className="text-[15px]">{item.name}</span>
                      </div>
                      {isSubmenuOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                    </button>
                  ) : (
                    <NavLink
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) => isActive ? activeClass : inactiveClass}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon size={20} className="stroke-[1.8]" />
                        <span className="text-[15px]">{item.name}</span>
                      </div>

                      {item.badge && (
                        <span className="flex items-center justify-center min-w-5 h-5 px-1.5 text-[11px] font-bold text-white bg-red-500 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </NavLink>
                  )}

                  {hasSubmenu && isSubmenuOpen && (
                    <div className="flex flex-col space-y-1 mt-1 transition-all duration-200">
                      {item.submenuItems.map((subItem) => (
                        <NavLink
                          key={subItem.name}
                          to={subItem.path}
                          onClick={() => setIsOpen(false)}
                          className={({ isActive }) => isActive ? activeSubClass : inactiveSubClass}
                        >
                          {({ isActive }) => (
                            <>
                              <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${isActive ? 'bg-gray-900' : 'bg-gray-400'}`} />
                              <span className="text-[14px]">{subItem.name}</span>
                            </>
                          )}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;