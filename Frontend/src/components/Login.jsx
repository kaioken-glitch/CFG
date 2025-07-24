
import React, { useState } from 'react';
import apiService from '../Services/api';

export default function Login({ setUser }) { 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [signupData, setSignupData] = useState({ name: '', email: '', password: '', confirm: '' });
  const [signupError, setSignupError] = useState('');
  const [loading, setLoading] = useState(false);

  // Login handler using apiService 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const user = await apiService.request('/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      localStorage.setItem('user', JSON.stringify(user));
      setError('');
      setUser(user);
    } catch (err) {
      setError(err.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  // Signup handler using apiService 
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (!signupData.name || !signupData.email || !signupData.password || !signupData.confirm) {
      setSignupError('Please fill in all fields.');
      return;
    }
    if (signupData.password !== signupData.confirm) {
      setSignupError('Passwords do not match.');
      return;
    }
    setSignupError('');
    setLoading(true);
    try {
      const user = await apiService.request('/signup', {
        method: 'POST',
        body: JSON.stringify({
          name: signupData.name,
          email: signupData.email,
          password: signupData.password
        })
      });
      localStorage.setItem('user', JSON.stringify(user));
      setSignupError('');
      setUser(user);
    } catch (err) {
      setSignupError(err.message || 'Signup failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-black via-neutral-900 to-neutral-800">
      <div className="w-full max-w-md bg-black/80 border border-neutral-700 rounded-2xl shadow-xl p-8 flex flex-col items-center">
        {!isSignup ? (
          <>
            <h2 className="text-3xl font-bold text-white mb-2">Sign In</h2>
            <p className="text-neutral-400 mb-6 text-center">Welcome back! Please log in to your account.</p>
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="bg-neutral-900 border border-neutral-700 rounded px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-neutral-500"
                autoComplete="email"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="bg-neutral-900 border border-neutral-700 rounded px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-neutral-500"
                autoComplete="current-password"
              />
              {error && <p className="text-red-400 text-sm text-center">{error}</p>}
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors mt-2 shadow"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Log In'}
              </button>
            </form>
            <div className="mt-6 w-full flex flex-col items-center">
              <button className="text-blue-400 hover:underline text-sm mb-2">Forgot password?</button>
              <span className="text-neutral-400 text-xs">Don't have an account?{' '}
                <button className="text-blue-400 hover:underline" onClick={() => setIsSignup(true)}>Register</button>
              </span>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-white mb-2">Sign Up</h2>
            <p className="text-neutral-400 mb-6 text-center">Create your account to get started.</p>
            <form onSubmit={handleSignupSubmit} className="w-full flex flex-col gap-4">
              <input
                type="text"
                placeholder="Name"
                value={signupData.name}
                onChange={e => setSignupData({ ...signupData, name: e.target.value })}
                className="bg-neutral-900 border border-neutral-700 rounded px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-neutral-500"
                autoComplete="name"
              />
              <input
                type="email"
                placeholder="Email"
                value={signupData.email}
                onChange={e => setSignupData({ ...signupData, email: e.target.value })}
                className="bg-neutral-900 border border-neutral-700 rounded px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-neutral-500"
                autoComplete="email"
              />
              <input
                type="password"
                placeholder="Password"
                value={signupData.password}
                onChange={e => setSignupData({ ...signupData, password: e.target.value })}
                className="bg-neutral-900 border border-neutral-700 rounded px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-neutral-500"
                autoComplete="new-password"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={signupData.confirm}
                onChange={e => setSignupData({ ...signupData, confirm: e.target.value })}
                className="bg-neutral-900 border border-neutral-700 rounded px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-neutral-500"
                autoComplete="new-password"
              />
              {signupError && <p className="text-red-400 text-sm text-center">{signupError}</p>}
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors mt-2 shadow"
                disabled={loading}
              >
                {loading ? 'Registering...' : 'Register'}
              </button>
            </form>
            <div className="mt-6 w-full flex flex-col items-center">
              <span className="text-neutral-400 text-xs">Already have an account?{' '}
                <button className="text-blue-400 hover:underline" onClick={() => setIsSignup(false)}>Sign In</button>
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
// ...existing code up to the end of the main return block...
 