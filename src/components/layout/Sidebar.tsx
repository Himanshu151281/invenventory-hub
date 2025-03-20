
import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, Package, ShoppingCart, LayoutDashboard, LogOut, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SidebarItemProps {
  to: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  end?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ to, icon, children, end }) => {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) => cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200",
        "text-muted-foreground hover:text-foreground hover:bg-muted",
        isActive && "text-primary font-medium bg-primary/10"
      )}
    >
      {icon}
      <span>{children}</span>
    </NavLink>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const sidebarVariants = {
    open: { x: 0, opacity: 1 },
    closed: { x: '-100%', opacity: 0 }
  };

  const overlayVariants = {
    open: { opacity: 1 },
    closed: { opacity: 0 }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <motion.aside
        className="fixed top-0 left-0 z-50 h-full w-72 border-r border-border/40 bg-background md:static md:z-0"
        variants={sidebarVariants}
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        transition={{ type: 'spring', stiffness: 500, damping: 40 }}
        style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)' }}
      >
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center h-16 mb-6">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="font-bold text-white text-lg">I</span>
              </div>
              <span className="font-semibold text-xl text-foreground">InvenHub</span>
            </div>
          </div>
          
          <nav className="space-y-1 flex-1">
            <SidebarItem to="/" icon={<LayoutDashboard className="h-5 w-5" />} end>
              Dashboard
            </SidebarItem>
            <SidebarItem to="/inventory" icon={<Package className="h-5 w-5" />}>
              Inventory
            </SidebarItem>
            <SidebarItem to="/billing" icon={<ShoppingCart className="h-5 w-5" />}>
              Billing
            </SidebarItem>
            <SidebarItem to="/analytics" icon={<BarChart3 className="h-5 w-5" />}>
              Analytics
            </SidebarItem>
          </nav>
          
          <div className="pt-4 border-t border-border/60 space-y-1">
            <SidebarItem to="/settings" icon={<Settings className="h-5 w-5" />}>
              Settings
            </SidebarItem>
            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
