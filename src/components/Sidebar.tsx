import React, { useEffect, useState } from 'react';
import { useSidebar } from '../contexts/SidebarContext';
import {
  Search,
  MessageCircle,
  Heart,
  BarChart3,
  Package,
  CalendarCheck,
  Star,
  Wallet,
  Users,
  PlusSquare,
  Building,
  LogOut
} from 'lucide-react';

import { useAuth } from '../contexts/AuthContext';

const Sidebar = () => {
  const { collapsed, setCollapsed } = useSidebar();
  const { logout } = useAuth();

  // Persistent role toggle
  const [isProvider, setIsProvider] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('userRole') === 'provider';
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem('userRole', isProvider ? 'provider' : 'seeker');
  }, [isProvider]);

  // Sample menu items per role (placeholders)
    const seekerMenu = [
    { icon: <Search size={16} />, label: 'Explore PGs' },           // Discover
    { icon: <MessageCircle size={16} />, label: 'Enquiries' },      // Contact or chat
    { icon: <Heart size={16} />, label: 'My Favorites' },           // Saved PGs
    { icon: <BarChart3 size={16} />, label: 'Insights' },           // Data insights
    { icon: <Package size={16} />, label: 'My Packages' },          // Subscription/packages
    { icon: <CalendarCheck size={16} />, label: 'My Bookings' },    // Booking history
    { icon: <Star size={16} />, label: 'My Reviews' },              // Ratings/reviews given
    { icon: <Wallet size={16} />, label: 'My Payments' },           // Transactions
    ];

    const providerMenu = [
    { icon: <PlusSquare size={16} />, label: 'New Listing - Free' }, // Add new PG
    { icon: <Building size={16} />, label: 'Manage Listings' },      // Existing listings
    { icon: <Users size={16} />, label: 'My Leads' },                // Tenant inquiries
    { icon: <BarChart3 size={16} />, label: 'Insights' },            // Analytics
    { icon: <Package size={16} />, label: 'My Packages' },           // Subscription plans
    { icon: <Star size={16} />, label: 'My Reviews' },               // Reviews by tenants
    { icon: <Wallet size={16} />, label: 'My Payments' },            // Earnings
    ];

  const menuItems = isProvider ? providerMenu : seekerMenu;

  return (
    <div
      className={` pt-14 bg-blue border-l transition-all duration-300 h-screen shadow-sm flex flex-col
        ${collapsed ? 'w-16' : 'w-36'}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-2 py-2 border-b">
        {!collapsed && <span className="font-semibold text-sm">StayNMeal</span>}
        <button onClick={() => setCollapsed(!collapsed)} className="text-gray-500 text-sm">
          ☰
        </button>
      </div>

      {/* Toggle */}
      <div className="px-2 py-2">
        <label className="relative inline-flex items-center cursor-pointer w-full">
          <input
            type="checkbox"
            className="sr-only"
            checked={isProvider}
            onChange={() => setIsProvider(!isProvider)}
          />
          <div className="w-16 h-8 bg-green-300 rounded-full relative transition">
            <div
              className={`absolute top-1 left-1 w-6 h-6 bg-green rounded-full shadow-md flex items-center justify-center text-xs transition-transform ${
                isProvider ? 'translate-x-8'  : ''
              }`}
            >
              {isProvider ? '🛠️' : '👤'}
            </div>
          </div>
          {!collapsed && (
            <span className="ml-2 text-xs font-medium text-gray-700">
              {isProvider ? 'Provider' : 'Seeker'}
            </span>
          )}
        </label>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 px-1 text-xs">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => console.log(`${item.label} clicked`)} // Replace with navigation handler
            className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-100 text-gray-700 w-full text-left"
          >
            {item.icon}
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}

        <button
          onClick={logout}
          className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-100 mt-auto w-full text-left text-gray-700 rounded"
        >
          <LogOut size={16} />
          {!collapsed && <span>Logout</span>}
        </button>
      </nav>

      {/* Collapse Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="text-gray-400 hover:text-gray-700 transition mt-auto p-2 text-xs"
      >
        {collapsed ? '«' : '»'}
      </button>
    </div>
  );
};

export default Sidebar;
