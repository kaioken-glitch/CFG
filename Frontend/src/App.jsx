import React, { use, useState } from 'react'
import './App.css'
import Header from './components/Header'
import Main from './components/Main'
import Dashboard from './components/Dashboard'
import HeaderMobile from './components/HeaderMobile'
import { useViewport } from './components/useViewport'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const { isMobile } = useViewport()

  const renderPage = () => {
    switch (currentPage){
      case 'dashboard': return <Dashboard />
      case 'tasks': return <Tasks/>
      case 'completed': return <CompletedTasks/>
      case 'analytics': return <Analytics/>
      default: return <Dashboard />
    }
  }

  const renderHeader = () => {
    return isMobile ? 
    <HeaderMobile setCurrentPage={setCurrentPage} /> :
    <Header setCurrentPage={setCurrentPage} />
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
