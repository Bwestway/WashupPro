import React, { createContext, useContext, useState, useEffect } from 'react';

type UserRole = 'customer' | 'technician' | 'admin';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// This is a mock implementation for demo purposes
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('splashwash_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, you would make an API call here
      // This is a mock implementation for demo purposes
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo, we'll create a mock user based on email
      let role: UserRole = 'customer';
      if (email.includes('admin')) {
        role = 'admin';
      } else if (email.includes('tech')) {
        role = 'technician';
      }
      
      const mockUser: User = {
        id: '123456',
        name: email.split('@')[0],
        email,
        role
      };
      
      setUser(mockUser);
      localStorage.setItem('splashwash_user', JSON.stringify(mockUser));
    } catch (err) {
      setError('Invalid email or password');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, you would make an API call here
      // This is a mock implementation for demo purposes
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: Math.random().toString(36).substring(2, 11),
        name,
        email,
        role
      };
      
      setUser(mockUser);
      localStorage.setItem('splashwash_user', JSON.stringify(mockUser));
    } catch (err) {
      setError('Registration failed');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('splashwash_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};