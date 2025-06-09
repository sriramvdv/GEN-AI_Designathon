import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Shield, 
  Users, 
  BookOpen, 
  LogOut,
  User,
  Hexagon
} from 'lucide-react';

interface NavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export function Navigation({ currentView, onViewChange }: NavigationProps) {
  const { user, logout } = useAuth();

  const getNavigationItems = () => {
    const items = [];
    
    if (user?.role === 'admin') {
      items.push(
        { id: 'admin', label: 'Admin Portal', icon: Shield },
        { id: 'learner', label: 'Learner Portal', icon: BookOpen }
      );
    } else if (user?.role === 'manager') {
      items.push(
        { id: 'manager', label: 'Manager Portal', icon: Users },
        { id: 'learner', label: 'Learner Portal', icon: BookOpen }
      );
    } else {
      items.push(
        { id: 'learner', label: 'Learner Portal', icon: BookOpen }
      );
    }
    
    return items;
  };

  const navigationItems = getNavigationItems();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <Hexagon className="h-8 w-8 text-blue-600" />
              <span className="font-bold text-xl text-gray-900">Hexaware Learning</span>
            </div>
            
            <nav className="flex space-x-4">
              {navigationItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => onViewChange(item.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      currentView === item.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{user?.fullName}</p>
              <p className="text-xs text-gray-600 capitalize">{user?.role}</p>
            </div>
            <button
              onClick={logout}
              className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}