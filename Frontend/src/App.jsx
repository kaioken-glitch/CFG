import React, { use, useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import Main from './components/Main'
import Dashboard from './components/Dashboard'
import Tasks from './components/Tasks'
import CompletedTasks from './components/CompletedTasks'
import Analytics from './components/Analytics'
import User from './components/User'
import Login from './components/Login'
import HeaderMobile from './components/HeaderMobile'
import { useViewport } from './components/useViewport'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const { isMobile } = useViewport()
  // Add user state here. Set to null if not logged in, or an object if logged in.
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  // Keep user logged in on reload
  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored && !user) setUser(JSON.parse(stored));
  }, []);

  // Logout handler
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setCurrentPage('login');
  };

  const renderPage = () => {
    switch (currentPage){
      case 'dashboard': return <Dashboard user={user} />
      case 'tasks': return <Tasks/>
      case 'completed': return <CompletedTasks/>
      case 'analytics': return <Analytics/>
      case 'user': return <User user={user} onLogout={handleLogout} />
      case 'login': return <Login setUser={setUser} />
      default: return <Dashboard user={user} />
    }
  }

  const renderHeader = () => {
    return isMobile ? 
      <HeaderMobile setCurrentPage={setCurrentPage} user={user} onLogout={handleLogout} /> :
      <Header setCurrentPage={setCurrentPage} user={user} onLogout={handleLogout} />
  }

  return (
    <div className="app">
      {renderHeader()}
      <Main>
        {renderPage()}
      </Main>
    </div>
  )
}

export default App
