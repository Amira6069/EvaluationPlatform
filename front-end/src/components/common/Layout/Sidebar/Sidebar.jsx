import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  ClipboardCheck, 
  TrendingUp, 
  Lightbulb,
  Users,
  Settings as SettingsIcon,
  Shield,
  BarChart3,
  Award,
  History,
  Inbox
} from 'lucide-react';
import clsx from 'clsx';
import { ROUTES, USER_ROLES } from '../../../utils/constants';

/**
 * Sidebar Component
 * 
 * Side navigation with role-based menu items
 */

const Sidebar = ({ isOpen, role = USER_ROLES.ORGANIZATION }) => {
  const location = useLocation();
  
  // Define menu items based on role
  const getMenuItems = () => {
    switch (role) {
      case USER_ROLES.ORGANIZATION:
        return [
          {
            label: 'Dashboard',
            icon: LayoutDashboard,
            path: ROUTES.ORG_DASHBOARD,
          },
          {
            label: 'My Evaluations',
            icon: FileText,
            path: ROUTES.ORG_EVALUATIONS,
          },
          {
            label: 'Start Evaluation',
            icon: ClipboardCheck,
            path: ROUTES.ORG_EVALUATION_NEW,
          },
          {
            label: 'Results',
            icon: TrendingUp,
            path: ROUTES.ORG_RESULTS,
          },
          {
            label: 'Recommendations',
            icon: Lightbulb,
            path: ROUTES.ORG_RECOMMENDATIONS,
          },
          {
            label: 'Profile',
            icon: Users,
            path: ROUTES.ORG_PROFILE,
          },
        ];
      
      case USER_ROLES.EVALUATOR:
        return [
          {
            label: 'Dashboard',
            icon: LayoutDashboard,
            path: ROUTES.EVAL_DASHBOARD,
          },
          {
            label: 'Evaluation Queue',
            icon: Inbox,
            path: ROUTES.EVAL_QUEUE,
          },
          {
            label: 'Review History',
            icon: History,
            path: ROUTES.EVAL_HISTORY,
          },
        ];
      
      case USER_ROLES.ADMINISTRATOR:
        return [
          {
            label: 'Dashboard',
            icon: LayoutDashboard,
            path: ROUTES.ADMIN_DASHBOARD,
          },
          {
            label: 'User Management',
            icon: Users,
            path: ROUTES.ADMIN_USERS,
          },
          {
            label: 'Governance Framework',
            icon: Shield,
            path: ROUTES.ADMIN_GOVERNANCE,
          },
          {
            label: 'Assignment',
            icon: ClipboardCheck,
            path: ROUTES.ADMIN_ASSIGNMENT,
          },
          {
            label: 'Reports & Analytics',
            icon: BarChart3,
            path: ROUTES.ADMIN_REPORTS,
          },
          {
            label: 'Label Publication',
            icon: Award,
            path: ROUTES.ADMIN_LABELS,
          },
          {
            label: 'Audit Log',
            icon: History,
            path: ROUTES.ADMIN_AUDIT,
          },
        ];
      
      default:
        return [];
    }
  };
  
  const menuItems = getMenuItems();
  
  // Check if path is active
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };
  
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => {}} // Handle close in parent
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={clsx(
          'fixed top-16 left-0 z-30 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out overflow-y-auto scrollbar-thin',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={clsx(
                  'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group',
                  active
                    ? 'bg-primary-50 text-primary-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                )}
              >
                <Icon 
                  size={20} 
                  className={clsx(
                    active ? 'text-primary-600' : 'text-gray-500 group-hover:text-gray-700'
                  )}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        
        {/* Help Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
          <div className="bg-primary-50 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-primary-900 mb-2">
              Need Help?
            </h4>
            <p className="text-xs text-primary-700 mb-3">
              Check our documentation for guides and tutorials
            </p>
            <button className="w-full px-3 py-2 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-700 transition-colors">
              View Documentation
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;