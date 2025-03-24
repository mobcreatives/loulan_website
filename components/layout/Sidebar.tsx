
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Menu, 
  FileText, 
  Star, 
  Calendar, 
  MessageSquare, 
  Mail, 
  Settings, 
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Image
} from 'lucide-react';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if the screen width is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024 && !collapsed) {
        setCollapsed(true);
      }
    };

    // Check on initial load
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup event listener on component unmount
    return () => window.removeEventListener('resize', checkIfMobile);
  }, [collapsed]);

  const navItems = [
    { name: 'Dashboard', icon: Home, path: '/' },
    { name: 'Menu Categories', icon: Menu, path: '/menu-categories' },
    { name: 'Food Items', icon: FileText, path: '/food-items' },
    { name: 'Featured Products', icon: Star, path: '/featured-products' },
    { name: 'Popup Products', icon: Sparkles, path: '/popup-products' },
    { name: 'Gallery', icon: Image, path: '/gallery' },
    { name: 'Reservations', icon: Calendar, path: '/reservations' },
    { name: 'Reviews', icon: MessageSquare, path: '/reviews' },
    { name: 'Contact Requests', icon: Mail, path: '/contact-requests' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <div 
      className={`fixed top-0 left-0 h-screen bg-sidebar z-40 transition-all duration-300 ease-in-out 
                 ${collapsed ? 'w-20' : 'w-64'}`}
    >
      {/* Logo */}
      <div className="flex items-center justify-center h-20 border-b border-sidebar-border">
        {collapsed ? (
          <span className="text-2xl font-bold text-amber-500">G</span>
        ) : (
          <h1 className="text-xl font-bold text-amber-500">LOULAN CUISINE</h1>
        )}
      </div>

      {/* Toggle button */}
      <button
        className="absolute -right-3 top-20 bg-sidebar text-amber-500 p-1 rounded-full border border-sidebar-border hover:text-amber-300 transition-colors z-50"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? (
          <ChevronRight size={16} />
        ) : (
          <ChevronLeft size={16} />
        )}
      </button>

      {/* Nav items */}
      <nav className="mt-6 px-2 overflow-y-auto h-[calc(100vh-8rem)]">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) => 
                  `sidebar-item ${isActive ? 'active' : ''} ${
                    collapsed ? 'justify-center p-3' : ''
                  }`
                }
              >
                <item.icon size={collapsed ? 22 : 18} className={collapsed ? '' : 'min-w-5'} />
                {!collapsed && <span>{item.name}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 w-full p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-black font-bold">
            A
          </div>
          {!collapsed && (
            <div>
              <p className="text-amber-500 font-medium text-sm">Admin User</p>
              <p className="text-amber-500/60 text-xs">Restaurant Manager</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
