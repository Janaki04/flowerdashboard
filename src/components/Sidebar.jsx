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
  Menu,
  X,
  Search,
  ChevronDown,
  Contact,
  ChevronRight,
} from 'lucide-react';
import imagelogo from "../assets/Frame 3473231.png";
import flower from "../assets/flower.png";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  
  // 1. Check if the current route is Mail, File Manager, or Chat
  const collapsedRoutes = ['/mail', '/file-manager', '/chat'];
  const isMailScreen = collapsedRoutes.includes(location.pathname);

  const [openSubmenus, setOpenSubmenus] = useState({
    'E-Commerce': true 
  });

  const toggleSubmenu = (name) => {
    if (isMailScreen) return;
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
    { name: 'Mail', icon: Mail, path: '/mail'}, 
    { name: 'Chat', icon: MessageSquare, path: '/chat' },
    { name: 'File Manager', icon: FileText, path: '/file-manager' },
    { name: 'Notes', icon: Notebook, path: '/notes' },
    { name: 'Contact', icon: Contact, path: '/contact' }
  ];

  const activeClass = `flex items-center ${isMailScreen ? 'lg:justify-center px-4 lg:px-0' : 'justify-between px-4'} py-3 text-gray-900 bg-[#c2e799] rounded-xl font-semibold transition-all duration-200 cursor-pointer w-full text-left`;
  const inactiveClass = `flex items-center ${isMailScreen ? 'lg:justify-center px-4 lg:px-0' : 'justify-between px-4'} py-3 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-all duration-200 cursor-pointer w-full text-left`;

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
        ${isMailScreen ? 'w-[260px] lg:w-[76px] p-5 lg:p-3 lg:items-center' : 'w-[260px] p-5'} bg-white border-r border-gray-100
        flex flex-col h-screen overflow-y-auto
        transform transition-all duration-300 ease-in-out
        lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        
        <div className={`flex items-center mb-6 mt-12 lg:mt-0 ${isMailScreen ? 'justify-start lg:justify-center px-2 lg:px-0' : 'px-2'}`}>
          {isMailScreen ? (
            <>
              <div className="hidden lg:flex w-9 h-9 rounded-xl  items-center justify-center font-bold text-gray-900 text-sm shadow-sm">
              <img src={flower} alt="Logo" className="w-8 h-8 " />
              </div>
              <img src={imagelogo} alt="Logo" className="w-28 h-8 lg:hidden" />
            </>
          ) : (
            <img src={imagelogo} alt="Logo" className="w-28 h-8" />
          )}
        </div>

        <div className={`relative mb-6 w-full ${isMailScreen ? 'block lg:hidden' : 'block'}`}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search anything" 
            className="w-full pl-10 pr-4 py-2.5 bg-[#f7f8fa] text-sm text-gray-600 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-300 placeholder-gray-400"
          />
        </div>

        <div className="flex flex-col flex-1 w-full">
          <p className={`px-3 mb-3 text-xs font-bold tracking-wider text-gray-400 uppercase ${isMailScreen ? 'block lg:hidden' : 'block'}`}>
            Main Menu
          </p>
          
          <nav className="space-y-1 w-full">
            {menuItems.map((item) => {
              const hasSubmenu = item.hasSubmenu;
              const isSubmenuOpen = !!openSubmenus[item.name];
              const isParentActive = hasSubmenu && item.submenuItems.some(sub => location.pathname === sub.path);

              return (
                <div key={item.name} className="flex flex-col space-y-1 w-full relative">
                  {hasSubmenu ? (
                    <button
                      onClick={() => toggleSubmenu(item.name)}
                      className={isParentActive ? activeClass : inactiveClass}
                      aria-expanded={isSubmenuOpen}
                      title={isMailScreen ? item.name : undefined}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon size={20} className="stroke-[1.8] shrink-0" />
                        <span className={`text-[15px] ${isMailScreen ? 'block lg:hidden' : 'block'}`}>{item.name}</span>
                      </div>
                      <span className={isMailScreen ? 'block lg:hidden' : 'block'}>
                        {isSubmenuOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                      </span>
                    </button>
                  ) : (
                    <NavLink
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) => isActive ? activeClass : inactiveClass}
                      title={isMailScreen ? item.name : undefined}
                    >
                      <div className="flex items-center gap-3 relative w-full lg:justify-inherit">
                        <item.icon size={20} className="stroke-[1.8] shrink-0" />
                        <span className={`text-[15px] ${isMailScreen ? 'block lg:hidden' : 'block'}`}>{item.name}</span>
                        
                        {item.badge !== undefined && item.badge > 0 && (
                          <span className={`flex items-center justify-center font-bold text-white bg-red-500 rounded-full
                            ${isMailScreen 
                              ? 'absolute -top-1 right-0 lg:-top-1 lg:-right-1 min-w-4 h-4 text-[9px] px-1 lg:px-0' 
                              : 'ml-auto min-w-5 h-5 px-1.5 text-[11px]'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>
                    </NavLink>
                  )}

                  {hasSubmenu && isSubmenuOpen && (
                    <div className={`flex flex-col space-y-1 mt-1 transition-all duration-200 ${isMailScreen ? 'block lg:hidden' : 'block'}`}>
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