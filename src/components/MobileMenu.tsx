import React, { useState, useEffect } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

interface MobileMenuProps {
  items: Array<{ label: string; href: string }>;
}

export default function MobileMenu({ items }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    // Only show the menu button on docs pages
    setShowMenu(window.location.pathname.startsWith('/docs'));

    // Add event listener for sidebar closed event
    const handleSidebarClosed = () => {
      setIsOpen(false);
    };

    window.addEventListener('sidebarClosed', handleSidebarClosed);

    // Cleanup
    return () => {
      window.removeEventListener('sidebarClosed', handleSidebarClosed);
    };
  }, []);

  const toggleMenu = () => {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    
    if (isOpen) {
      sidebar?.classList.remove('translate-x-0');
      sidebar?.classList.add('-translate-x-full');
      overlay!.style.display = 'none';
    } else {
      sidebar?.classList.remove('-translate-x-full');
      sidebar?.classList.add('translate-x-0');
      overlay!.style.display = 'block';
    }
    
    setIsOpen(!isOpen);
  };

  if (!showMenu) return null;

  return (
    <button
      type="button"
      className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
      onClick={toggleMenu}
    >
      <span className="sr-only">Open menu</span>
      {isOpen ? (
        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
      ) : (
        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
      )}
    </button>
  );
}