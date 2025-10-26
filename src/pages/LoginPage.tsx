import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import type { LoginUser } from '../interfaces/auth.interface';
import { Heart } from 'lucide-react';

const LoginPage = () => {
  const [formData, setFormData] = useState<LoginUser>({
    email: '',
    password: '',
  });
  const [formError, setFormError] = useState('');

  const { login, isLoading, error: authError, clearError } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous errors
    setFormError('');
    if (authError) {
      clearError();
    }

    // Basic validation
    if (!formData.email.trim() || !formData.password) {
      setFormError('Please fill in all fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormError('Please enter a valid email address');
      return;
    }

    try {
      await login(formData);
      // The useAuth hook handles navigation, but we could override it here if needed
      // navigate(from, { replace: true });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const displayError = formError || authError;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="rounded-lg w-[95%] md:max-w-[30%] bg-white shadow-md  m-auto  p-4 text-card-foreground flex flex-col gap-4">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Heart className="h-8 w-8 text-primary" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Welcome back to Calma
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to continue your mental health journey
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Enter your password"
              />
            </div>
          </div>

          {displayError && (
            <div className="text-red-500 text-sm p-3 bg-red-50 border border-red-200 rounded-md">
              {displayError}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link 
                to="/onboarding" 
                className="font-medium text-primary hover:text-primary/90"
              >
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;