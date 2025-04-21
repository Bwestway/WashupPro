import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import Card, { CardContent, CardFooter } from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading, error } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: ''
  });

  // Get the redirect path from location state, or default to dashboard
  const from = (location.state as any)?.from?.pathname || '/dashboard/customer';

  const validateForm = () => {
    let valid = true;
    const errors = {
      email: '',
      password: ''
    };

    if (!email) {
      errors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
      valid = false;
    }

    if (!password) {
      errors.password = 'Password is required';
      valid = false;
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12 flex flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to access your account</p>
        </div>
        
        <Card>
          <CardContent>
            {error && (
              <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <Input
                  label="Email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={formErrors.email}
                  leftIcon={<Mail size={18} />}
                  required
                />
                
                <Input
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={formErrors.password}
                  leftIcon={<Lock size={18} />}
                  required
                />
                
                <div className="flex justify-end">
                  <Link to="#" className="text-sm text-blue-700 hover:underline">
                    Forgot password?
                  </Link>
                </div>
              </div>
              
              <Button
                type="submit"
                variant="primary"
                fullWidth
                className="mt-6"
                isLoading={isLoading}
              >
                Sign in
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </form>
          </CardContent>
          
          <CardFooter className="text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-700 hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
        
        {/* Demo user information */}
        <div className="mt-8 bg-blue-50 p-4 rounded-lg border border-blue-100">
          <h3 className="font-medium text-blue-800 mb-2">Demo Accounts</h3>
          <p className="text-sm text-gray-700 mb-2">Use these email formats with any password to access different role dashboards:</p>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>Customer: <code className="bg-blue-100 px-1 py-0.5 rounded">user@example.com</code></li>
            <li>Technician: <code className="bg-blue-100 px-1 py-0.5 rounded">tech@example.com</code></li>
            <li>Admin: <code className="bg-blue-100 px-1 py-0.5 rounded">admin@example.com</code></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;