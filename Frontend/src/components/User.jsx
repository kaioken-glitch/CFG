import React, { useState } from 'react'
import logo from '../assets/logo.svg'

export default function User() {
  // Example user data (replace with real data as needed)
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@email.com',
    avatar: '',
    phone: '+1 555-123-4567',
    joined: '2024-01-15',
    bio: 'Productivity enthusiast. Loves React and dark mode.',
    theme: 'dark',
    alerts: {
      email: true,
      push: false,
      sms: false
    }
  });
  const [theme, setTheme] = useState('dark');
  const [alertPrefs, setAlertPrefs] = useState(user.alerts);
  const [editMode, setEditMode] = useState(false);
  const [editProfile, setEditProfile] = useState({ name: user.name, email: user.email, phone: user.phone, bio: user.bio });
  const [showPassword, setShowPassword] = useState(false);
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const [passwordMsg, setPasswordMsg] = useState('');


  const handleThemeToggle = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
    // Here you would also update the app theme context or global state
  };

  const handleAlertChange = (type) => {
    setAlertPrefs(prev => ({ ...prev, [type]: !prev[type] }));
  };

  const handleLogout = () => {
    // Add logout logic here
    alert('Logged out!');
  };

  const handleEditProfileChange = (e) => {
    const { name, value } = e.target;
    setEditProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileSave = () => {
    setUser(prev => ({ ...prev, ...editProfile }));
    setEditMode(false);
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      setPasswordMsg('New passwords do not match.');
      return;
    }
    // Add real password change logic here
    setPasswordMsg('Password changed successfully!');
    setPasswords({ current: '', new: '', confirm: '' });
  };

  return (
    <div className="w-full min-h-screen bg-black text-white p-6 flex flex-col items-center">
      <div className="w-full max-w-[100dvw] bg-black border border-neutral-700 rounded-xl p-8 shadow-lg">
        {/* User Info */}
        <div className="flex items-center gap-6 mb-8">
          <div className="w-24 h-24 rounded-full bg-neutral-800 flex items-center justify-center text-4xl font-bold text-neutral-400">
            {user.avatar ? <img src={user.avatar} alt="avatar" className="w-full h-full rounded-full" /> : user.name[0]}
          </div>
          <div className="flex-1">
            {editMode ? (
              <>
                <input type="text" name="name" value={editProfile.name} onChange={handleEditProfileChange} className="bg-neutral-900 border border-neutral-700 rounded px-3 py-2 text-white mb-2 w-full" />
                <input type="email" name="email" value={editProfile.email} onChange={handleEditProfileChange} className="bg-neutral-900 border border-neutral-700 rounded px-3 py-2 text-white mb-2 w-full" />
                <input type="text" name="phone" value={editProfile.phone} onChange={handleEditProfileChange} className="bg-neutral-900 border border-neutral-700 rounded px-3 py-2 text-white mb-2 w-full" />
                <textarea name="bio" value={editProfile.bio} onChange={handleEditProfileChange} className="bg-neutral-900 border border-neutral-700 rounded px-3 py-2 text-white mb-2 w-full" rows={2} />
                <div className="flex gap-2 mt-2">
                  <button onClick={handleProfileSave} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white font-medium">Save</button>
                  <button onClick={() => setEditMode(false)} className="bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded text-white font-medium">Cancel</button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-semibold text-white mb-1">{user.name}</h2>
                <p className="text-neutral-400 mb-1">{user.email}</p>
                <p className="text-neutral-500 mb-1">{user.phone}</p>
                <p className="text-neutral-400 text-sm mb-1">{user.bio}</p>
                <p className="text-neutral-600 text-xs">Joined: {user.joined}</p>
                <button onClick={() => setEditMode(true)} className="mt-2 text-blue-400 hover:underline text-sm">Edit Profile</button>
              </>
            )}
          </div>
        </div>

        {/* Theme Toggle */}
        <div className="mb-8 flex flex-col">
          <h3 className="text-lg font-medium text-neutral-200 mb-2">Theme</h3>
          <div className="flex w-full items-left justify-start  gap-4 flex-col">
            <span className="text-neutral-400">{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
            {/* Modern theme switch */}
            <div className="flex items-center gap-3">
              <span className="text-neutral-400 text-sm">Light</span>
              <button
                onClick={handleThemeToggle}
                className={`relative w-15 h-8 rounded-full transition-colors duration-300 focus:outline-none border-2 
                  ${theme === 'dark' ? 'bg-neutral-800 border-neutral-700' : 'bg-neutral-200 border-neutral-400'} justify-center`}
                aria-label="Toggle dark/light mode"
              >
                <span
                  className={`absolute top-1 left-1 w-6 h-6 rounded-full shadow-md transition-transform duration-300 
                    ${theme === 'dark' ? 'bg-neutral-600 translate-x-6' : 'bg-yellow-400 translate-x-0'}`}
                  style={{ boxShadow: theme === 'dark' ? '0 0 8px #222' : '0 0 8px #facc15' }}
                />
                {/* Sun/Moon icons for visual cue */}
                <span className="absolute left-2 top-2 text-xs select-none" style={{ color: theme === 'dark' ? '#888' : '#facc15' }}>☀️</span>
                <span className="absolute right-2 top-2 text-xs select-none" style={{ color: theme === 'dark' ? '#60a5fa' : '#bbb' }}>🌙</span>
              </button>
              <span className="text-neutral-400 text-sm">Dark</span>
            </div>
            <div className="flex flex-col items-center ml-6">
              <span className="text-xs text-neutral-400 mb-1 mr-auto ml-[10px]">Logo Preview</span>
              <div className={`w-full h-[90px] flex items-center justify-center rounded-lg border ${theme === 'dark' ? 
                'bg-black border-neutral-700/10' : 'bg-white border-neutral-300'}`}>
                <img src={logo} alt="logo" className="h-8" style={{ filter: theme === 'dark' ? 'none' : 'invert(0.8)' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Alert Preferences */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-neutral-200 mb-2">Alert Preferences</h3>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={alertPrefs.email} onChange={() => handleAlertChange('email')} className="accent-blue-500" />
              <span className="text-neutral-300">Email Alerts</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={alertPrefs.push} onChange={() => handleAlertChange('push')} className="accent-blue-500" />
              <span className="text-neutral-300">Push Notifications</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={alertPrefs.sms} onChange={() => handleAlertChange('sms')} className="accent-blue-500" />
              <span className="text-neutral-300">SMS Alerts</span>
            </label>
          </div>
        </div>

        {/* Password Change */}
        <div className="mb-8 w-[300px]">
          <h3 className="text-lg font-medium text-neutral-200 mb-2">Change Password</h3>
          <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-3">
            <input type={showPassword ? 'text' : 'password'} name="current" value={passwords.current} onChange={handlePasswordChange} placeholder="Current Password" className="bg-neutral-900 border border-neutral-700 rounded px-3 py-2 text-white" />
            <input type={showPassword ? 'text' : 'password'} name="new" value={passwords.new} onChange={handlePasswordChange} placeholder="New Password" className="bg-neutral-900 border border-neutral-700 rounded px-3 py-2 text-white" />
            <input type={showPassword ? 'text' : 'password'} name="confirm" value={passwords.confirm} onChange={handlePasswordChange} placeholder="Confirm New Password" className="bg-neutral-900 border border-neutral-700 rounded px-3 py-2 text-white" />
            <label className="flex items-center gap-2 text-neutral-400 text-xs">
              <input type="checkbox" checked={showPassword} onChange={() => setShowPassword(v => !v)} /> Show Passwords
            </label>
            {passwordMsg && <p className="text-xs text-blue-400">{passwordMsg}</p>}
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white font-medium mt-2">Change Password</button>
          </form>
        </div>

        {/* Account Actions */}
        <div className="mb-2 w-[300px]">
          <h3 className="text-lg font-medium text-neutral-200 mb-2">Account</h3>
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 mb-2"
          >
            Log Out
          </button>
          <button
            className="w-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 py-3 px-4 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-600"
            onClick={() => alert('Account deletion not implemented.')}
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  )
}
