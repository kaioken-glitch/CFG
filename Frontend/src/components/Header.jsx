import React, { useState } from 'react'
import logo from '../assets/logo.svg'
import { FaTasks, FaBell, FaComment, FaMicroscope } from 'react-icons/fa'

export default function Header({ setCurrentPage }) {
    // Ref for search input
    const searchInputRef = React.useRef(null);

    // Function to focus search input
    const handleCommandKeyClick = () => {
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }

    const [searchQuery, setSearchQuery] = useState('')
    const [showResults, setShowResults] = useState(false)
    const [results, setResults] = useState([])

    const handleSearch = (query) => {
        setSearchQuery(query)

        if (query.length > 0){
            //the following is mock data to test for search results
            const mockResults = [
                {
                    id: "1",
                    title: "Task Management",
                    description: "Manage your daily tasks efficiently.",
                    type: "Feature",
                    status: "Active"
                },
                {
                    id: "2",
                    title: "Notifications",
                    description: "Stay updated with real-time alerts.",
                    type: "Feature",
                    status: "Active"
                },
                {
                    id: "3",
                    title: "Comments",
                    description: "Collaborate with your team using comments.",
                    type: "Feature",
                    status: "Inactive"
                },
                {
                    id: "4",
                    title: "Analytics",
                    description: "View detailed analytics and reports.",
                    type: "Dashboard",
                    status: "Active"
                },
                {
                    id: "5",
                    title: "Completed Tasks",
                    description: "Review your achievements and completed tasks.",
                    type: "View",
                    status: "Active"
                }
            ].filter(item =>
                item.title.toLowerCase().includes(query.toLowerCase()) ||
                item.description.toLowerCase().includes(query.toLowerCase())    
            )

            setResults(mockResults)
            setShowResults(true)
        }else{
            setShowResults(false)
            setResults([])
        }
    }

    const handleInputFocus = () => {
        if (searchQuery.length > 0){
            setShowResults
        }
    }

    const handleInputBlur = () => {
        setTimeout(() => setShowResults(false), 200) // Delay to allow click on results
    }
    
    return (
        <header className='border-b border-neutral-700 text-white p-4
        w-[100%] h-[60px] flex flex-row items-center justify-center mx-auto
        select-none relative'>

            <button onClick={() => setCurrentPage('dashboard')} className='
            flex items-center ml-[20px] cursor-pointer'>
                <img src={logo} alt="flogo" className='w-[110px] h-[40px]' />
            </button>

            <div className="searchContainer border border-neutral-700 rounded-[6px]
            flex fle-row items-center justify-between ml-[20px] w-[300px] h-[35px]
            mr-auto relative">

                <input 
                    type="text" 
                    name="search" 
                    id="searchInput"
                    ref={searchInputRef}
                    placeholder='Search...'
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    className='indent-2 bg-transparent text-white w-[240px]
                    h-full outline-none placeholder:text-neutral-500 text-[14px]
                    caret-blue-400'
                    autoComplete='off'
                    autoCorrect='off'
                    spellCheck='false'
                    autoCapitalize='off'
                    pattern='[A-Za-z0-9]*'
                />

                <button className="commandKey border border-neutral-700
                rounded-[4px] flex items-center justify-center w-[60px]
                h-[25px] hover:bg-neutral-700/40 mr-1 cursor-pointer"
                type="button"
                onClick={handleCommandKeyClick}
                tabIndex={0}
                aria-label="Focus search input">
                    <span className="text-[14px]">⌘</span>
                    <span className='text-[14px]'>+</span>
                    <span className='text-[14px]'>K</span>
                </button>

                {showResults && (
                    <div className="resultsDiv pt-[5px] pb-2 flex flex-col absolute top-[40px] left-0 w-[400px] 
                    bg-black rounded-[12px] border border-gray-800 z-50">

                        {results.length > 0 ? (
                            <>
                            
                                <div className="px-3 py-2
                                border-b border-gray-700">

                                    <p className="text-[12px] text-gray-500
                                    font-medium">

                                        {results.length} results{results.length !== 1 ? 's' : ''} found       

                                    </p>

                                </div>

                                {results.map(item => {
                                    const getItemIcon = (type) => {
                                        switch(type){
                                            case 'task' :
                                                return <FaTasks className='text-white w-[14px] h-[14px]' />
                                            case 'notification' :
                                                return <FaBell className='text-white w-[14px] h-[14px]' />
                                            case 'message' :
                                                return <FaComment className='text-white w-[14px] h-[14px]' />
                                            default :
                                                return <FaMicroscope className='text-white w-[14px] h-[14px]' />
                                        }
                                    };

                                    const getItemColor = (typr, status) => {
                                        switch(type){
                                            case 'task':
                                                return  status === 'completed' ? 'bg-green-500 group:hover:bg-green-600' :
                                                        status === 'in-progress' ? 'bg-bluer-500 group:hover:bg-blue-600' :
                                                        'bg-gray-500 group:hover:bg-gray-600';
                                            case 'notification':
                                                return 'bg-orange-500 group:hover:bg-orange-600';
                                            case 'message':
                                                return 'bg-purple-500 group:hover:bg-purple-600';
                                            default:
                                                return 'bg-blue-500 group:hover:bg-blue-600';
                                        }
                                    };

                                    return(
                                        <div key={item.id} className="resultItem flex flex-col gap-2 mx-2 my-2 p-4 rounded-lg 
                                        bg-gray-900/80 cursor-pointer border border-gray-800 hover:border-blue-500
                                        transition-all duration-200 ease-in-out group shadow-sm" 
                                        onClick={() =>{
                                            console.log('Clicked item:', item)
                                            setShowResults(false)
                                        }}>
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-3">
                                                    {/* Icon based on type */}
                                                    {getItemIcon(item.type)}
                                                    <h4 className="text-[15px] font-semibold text-gray-100 group-hover:text-blue-500 transition-colors duration-200">
                                                        {item.title}
                                                    </h4>
                                                    <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium
                                                        ${
                                                            item.type === 'task' ? 'bg-blue-100/10 text-blue-600':
                                                            item.type === 'notification' ? 'bg-orange-100/10 text-orange-600' :
                                                            item.type === 'message' ? 'bg-purple-100/10 text-purple-600' :
                                                            'bg-gray-100/10 text-gray-600'
                                                        }`}>
                                                        {item.type}
                                                    </span>
                                                </div>
                                                {item.status && (
                                                    <span className="text-[11px] px-2 py-0.5 rounded-full font-medium bg-gray-800 text-gray-300">
                                                        {item.status}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-[13px] text-gray-300 mb-1 line-clamp-2">
                                                {item.description || 'Click to view details'}
                                            </p>
                                        </div>
                                    );
                                })}

                            </>
                        ): (
                            <div className="resultItem p-4 text-center">

                                <div className="flex flex-col items-center justify-center py-4">
                                    
                                    <div className="iconContainer w-[48px] h-[48px] bg-gray-100/10
                                    rounded-full flex items-center justify-center mb-3">
                                        <FaMicroscope className='text-gray-500 w-[20px] h-[20px]' />
                                    </div>

                                    <p className="text-[14px] text-gray-600 font font-medium">
                                        No results found for "<span className="text-blue-500">{searchQuery}</span>"
                                    </p>

                                    <p className="text-[12px] text-gray-400 mt-1">
                                        Try searching for Tasks , Notifications, or Messages
                                    </p>

                                </div>

                            </div>
                        )}

                    </div>
                )}
                    
            </div>

            <nav className="hidden md:flex items-center space-x-6">

                <button onClick={() => setCurrentPage('dashboard')}
                    className='hover:text-blue-400 transition-colors flex
                    flex-row items-center gap-2 text-[14px] cursor-pointer'>
                        Dashboard
                </button>

                <button onClick={() => setCurrentPage('Tasks')}
                    className='hover:text-blue-400 transition-colors flex
                    flex-row items-center gap-2 text-[14px] cursor-pointer'>
                        All Tasks
                </button>

                <button onClick={() => setCurrentPage('CompletedTasks')}
                    className='hover:text-blue-400 transition-colors flex
                    flex-row items-center gap-2 text-[14px] cursor-pointer'>
                        Completed Tasks
                </button>

                <button onClick={() => setCurrentPage('CompletedTasks')}
                    className='hover:text-blue-400 transition-colors flex
                    flex-row items-center gap-2 text-[14px] cursor-pointer'>
                        Analytics
                </button>

            </nav>

        </header>
    )
}
