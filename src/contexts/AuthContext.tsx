import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  username: string;
  role: 'admin' | 'manager' | 'employee';
  employees?: string[];
  fullName: string;
  department: string;
  email: string;
  manager?: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const users: (User & { password: string })[] = [
  {
    username: "admin1",
    password: "admin123",
    role: "admin",
    fullName: "Sarah Johnson",
    department: "IT Operations",
    email: "sarah.johnson@hexaware.com"
  },
  {
    username: "manager1",
    password: "manager123",
    role: "manager",
    employees: ["emp1", "emp2", "emp3"],
    fullName: "Michael Chen",
    department: "Software Development",
    email: "michael.chen@hexaware.com"
  },
  {
    username: "manager2",
    password: "manager123",
    role: "manager",
    employees: ["emp4", "emp5"],
    fullName: "Priya Sharma", 
    department: "Data Analytics",
    email: "priya.sharma@hexaware.com"
  },
  {
    username: "emp1",
    password: "emp123",
    role: "employee",
    fullName: "Alex Rodriguez",
    department: "Software Development",
    email: "alex.rodriguez@hexaware.com",
    manager: "manager1"
  },
  {
    username: "emp2",
    password: "emp123",
    role: "employee",
    fullName: "Emily Davis",
    department: "Software Development", 
    email: "emily.davis@hexaware.com",
    manager: "manager1"
  },
  {
    username: "emp3",
    password: "emp123",
    role: "employee",
    fullName: "James Wilson",
    department: "Software Development",
    email: "james.wilson@hexaware.com",
    manager: "manager1"
  },
  {
    username: "emp4",
    password: "emp123",
    role: "employee",
    fullName: "Lisa Wang",
    department: "Data Analytics",
    email: "lisa.wang@hexaware.com",
    manager: "manager2"
  },
  {
    username: "emp5",
    password: "emp123",
    role: "employee",
    fullName: "David Kumar",
    department: "Data Analytics",
    email: "david.kumar@hexaware.com",
    manager: "manager2"
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user on app load
    const storedUser = localStorage.getItem('hexaware_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (username: string, password: string): boolean => {
    const foundUser = users.find(u => u.username === username && u.password === password);
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('hexaware_user', JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hexaware_user');
  };

  const value = {
    user,
    login,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { users };