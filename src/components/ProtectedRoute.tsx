import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  role?: 'customer' | 'technician' | 'admin';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    // Show loading spinner or skeleton
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If role is specified and user doesn't have that role, redirect to appropriate dashboard
  if (role && user.role !== role) {
    // Redirect to the appropriate dashboard based on user role
    switch (user.role) {
      case 'admin':
        return <Navigate to="/dashboard/admin" replace />;
      case 'technician':
        return <Navigate to="/dashboard/technician" replace />;
      default:
        return <Navigate to="/dashboard/customer" replace />;
    }
  }

  // If everything is fine, render the children
  return <>{children}</>;
};

export default ProtectedRoute;