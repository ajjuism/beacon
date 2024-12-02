import { useEffect } from 'react';

export default function SidebarOverlay() {
  useEffect(() => {
    const overlay = document.getElementById('sidebar-overlay');
    
    const handleOverlayClick = () => {
      const sidebar = document.getElementById('sidebar');
      
      // Dispatch event before DOM changes
      window.dispatchEvent(new Event('sidebarClosed'));
      
      // Update DOM
      sidebar?.classList.remove('translate-x-0');
      sidebar?.classList.add('-translate-x-full');
      overlay!.style.display = 'none';
    };

    overlay?.addEventListener('click', handleOverlayClick);
    
    return () => {
      overlay?.removeEventListener('click', handleOverlayClick);
    };
  }, []);

  return null;
}