import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, LogIn, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../src/store/AuthStore';

const AgentLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { login } = useAuthStore();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email || !password) {
      setError('Please enter both email and password');
      setIsLoading(false);
      return;
    }

    try {
      // Assume login function in useAuthStore handles the API call with credentials
      await login(email, password);
    } catch (err) {
      setError(err.message || 'An error occurred during login');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const googleLogin = () => {
    window.location.href = `${import.meta.env.VITE_URL}/api/auth/google`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-orange-950 to-black text-white">
      <div className="w-full max-w-md p-8 mx-4 bg-black/90 backdrop-blur-lg rounded-lg shadow-2xl border border-orange-900/30 transition-all duration-300 group">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent">RyneX Login</h1>
          <p className="mt-3 text-orange-200/80">
            Welcome to RyneX AI Agent. Enter your credentials to continue
          </p>
        </div>

        {/* Error display */}
        {error && (
          <div className="mb-6 p-3 bg-orange-900/20 border border-orange-800 rounded-lg text-orange-200 flex items-center gap-2 animate-fade-in">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Email Input Field */}
          <div className="relative group/input">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-orange-700 group-focus-within/input:text-orange-500" />
            </div>
            <input
              type="email"
              className="w-full pl-12 pr-4 py-3 bg-[#1a1a1a] border border-orange-900/40 rounded-lg focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 outline-none text-white placeholder-orange-200/50 transition-colors"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          {/* Password Input Field */}
          <div className="relative group/input">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-orange-700 group-focus-within/input:text-orange-500" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full pl-12 pr-12 py-3 bg-[#1a1a1a] border border-orange-900/40 rounded-lg focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 outline-none text-white placeholder-orange-200/50 transition-colors"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-orange-700 hover:text-orange-500 transition-colors"
              onClick={togglePasswordVisibility}
              disabled={isLoading}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Remember me and Forgot Password */}
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember-me"
                className="w-4 h-4 rounded border-orange-900 bg-[#1a1a1a] text-orange-500 focus:ring-orange-500/50"
                name="remember"
                disabled={isLoading}
              />
              <label htmlFor="remember-me" className="ml-2 text-orange-200/80 text-sm">
                Remember me
              </label>
            </div>
            <Link
              to="/forgot-password"
              className="text-orange-400 text-sm font-medium cursor-pointer hover:text-orange-300 transition-colors"
              aria-disabled={isLoading}
            >
              Forgot password?
            </Link>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-gradient-to-r from-orange-800 to-orange-600 text-white font-medium rounded-lg shadow-lg hover:from-orange-700 hover:to-orange-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-center justify-center space-x-2">
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <LogIn size={20} />
              )}
              <span>{isLoading ? 'Signing in...' : 'Sign in'}</span>
            </div>
          </button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gradient-to-r from-transparent via-orange-900/30 to-transparent"></div>
            <span className="px-4 text-orange-200/50 text-sm font-medium">Or continue with</span>
            <div className="flex-grow h-px bg-gradient-to-r from-transparent via-orange-900/30 to-transparent"></div>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-3 gap-4">
            {/* Google */}
            <button
              onClick={googleLogin}
              className="flex items-center justify-center p-3 bg-[#1a1a1a] border border-orange-900/40 rounded-lg hover:border-orange-600 hover:bg-black transition-all duration-300"
              disabled={isLoading}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" className="text-orange-500">
                <path
                  fill="currentColor"
                  d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27c3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10c5.35 0 9.25-3.67 9.25-9.09c0-1.15-.15-1.81-.15-1.81Z"
                />
              </svg>
            </button>

            {/* Apple */}
            <button
              className="flex items-center justify-center p-3 bg-[#1a1a1a] border border-orange-900/40 rounded-lg hover:border-orange-600 hover:bg-black transition-all duration-300"
              disabled={isLoading}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" className="text-orange-500">
                <path
                  fill="currentColor"
                  d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.8 15.16 3.8 7.75 9.45 7.53c1.7.06 2.45.95 3.62.95 1.17 0 1.88-.95 3.55-.95 1.84.04 3.22.92 4.05 2.3-3.61 2.23-3.1 7.27.38 8.55-.4 1.13-.96 2.3-1.95 3.27M13 3.5c.73-.83 2.06-1.45 3.12-1.5.27 2.34-1.83 4.45-3.98 4.2-.28-1.96.5-3.1.86-2.7Z"
                />
              </svg>
            </button>

            {/* GitHub */}
            <button
              className="flex items-center justify-center p-3 bg-[#1a1a1a] border border-orange-900/40 rounded-lg hover:border-orange-600 hover:bg-black transition-all duration-300"
              disabled={isLoading}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" className="text-orange-500">
                <path
                  fill="currentColor"
                  d="M12 2C6.477 2 2 6.477 2 12c0 4.419 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.602-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.268.098-2.64 0 0 .84-.268 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.338 1.909-1.294 2.747-1.026 2.747-1.026.546 1.372.203 2.387.1 2.64.641.7 1.029 1.595 1.029 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.574.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z"
                />
              </svg>
            </button>
          </div>

          {/* Register CTA */}
          <div className="text-center mt-6">
            <p className="text-orange-200/70">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-orange-500 cursor-pointer font-semibold hover:text-orange-400 transition-colors"
                aria-disabled={isLoading}
              >
                Create Account
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgentLogin;