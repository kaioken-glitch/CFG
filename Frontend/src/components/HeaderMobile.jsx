import React, { useState } from 'react'
import logo from '../assets/logo.svg'
import { FaComment, FaMicroscope, FaTimes, FaBars } from 'react-icons/fa';

export default function HeaderMobile() {
    const [searchQuery, setSearchQuery] = useState('');
    const [showResults, setShowResults] = useState(false);
    const [results, setResults] = useState([]);
    const [isNavOpen, setIsNavOpen] = useState(false);

    const handleSearch = (query) => {
        setSearchQuery(query)

        if (query.length > 0) {
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
            );
            setResults(mockResults)
            setShowResults(true)
        }else{
            setShowResults(false)
            setResults([])
        }
    }

    const handleInputFocus = () =>{
        if(searchQuery.length > 0){
            setShowResults(true)
        }
    }

    const handleInputBlur = () => {
        setTimeout(() => {
            setShowResults(false)
        }, 200); // Delay to allow click on results
    }

    const handleNavItemClick = () => {
        setCurrentPage(page)
        setIsNavOpen(false)
    }

    return (
        <>
            <header className='border-b border-neutral-700 text-white p-4
            w-[100%] h-[60px] flex flex-row items-center justify-around select-none 
            relative'>

                {/*logo as  a button */}
                <button onClick={() => setCurrentPage('dashboard')} className='
                flex items-center cursor-pointer justify-center'
                >

                    <img src={logo} alt="flogo" className='w-[90px] h-[30px]'/>

                </button>

                {/* Search bar */}
                <div className="searchContainer border border-neutral-700 rounded-[6px]
                flex flex-row items-center justify-between flex-1 mx-4 max-w-[200px]
                relative">

                    <input 
                    type="text" 
                    name="search" 
                    id="search"
                    placeholder='Search...'
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    className='indent-2 bg-transparent text-white w-full h-full outline-none
                    placeholder:text-neutral-500 font-poppins text-[14px] caret-blue-400'
                    autoComplete='off'
                    autoCapitalize='off'
                    autoCorrect='off'
                    spellCheck='false'
                    />

                    {/*serch Results Dropdown */}
                    {showResults && (
                        <div className="resultsDiv pt-2 pb-2 flex flex-col absolute top-[45px] left-0 w-[300px] 
                        bg-black rounded-[12px]  border border-gray-800 z-50">
                            {results.length > 0 ? (
                                <>
                                    <div className="px-3 py-2 border-b border-gray-800">
                                        <p className="text-[12px] text-gray-500 font-medium">
                                            {results.length} result{results.length !== 1 ? 's' : ''} found
                                        </p>
                                    </div>
                                    {results.map(item => {
                                        const getItemIcon = (type) => {
                                            switch (type) {
                                                case 'task':
                                                    return <FaTasks className="text-white w-[24px] h-[12px]" />;
                                                case 'notification':
                                                    return <FaBell className="text-white w-[12px] h-[12px]" />;
                                                case 'message':
                                                    return <FaComment className="text-white w-[12px] h-[12px]" />;
                                                default:
                                                    return <FaMicroscope className="text-white w-[12px] h-[12px]" />;
                                            }
                                        };

                                        const getItemColor = (type, status) => {
                                            switch (type) {
                                                case 'task':
                                                    return status === 'completed' ? 'bg-green-500' : 
                                                           status === 'in-progress' ? 'bg-blue-500' : 
                                                           'bg-gray-500';
                                                case 'notification':
                                                    return 'bg-orange-500';
                                                case 'message':
                                                    return 'bg-purple-500';
                                                default:
                                                    return 'bg-blue-500';
                                            }
                                        };

                                        return (
                                            <div key={item.id} className="resultItem mx-2 my-1 p-2 rounded-[8px] 
                                            text-gray-950/10 cursor-pointer border border-transparent
                                            hover:bg-gray-700/30 hover:border-gray-950/50 transition-all duration-200 ease-in-out"
                                            onClick={() => {
                                                console.log('Clicked item:', item)
                                                setShowResults(false)
                                            }}>
                                                <div className="flex items-center gap-2">
                                                    <div className={`iconContainer w-[24px] h-[24px] rounded-[4px] 
                                                    flex items-center justify-center ${getItemColor(item.type, item.status)}`}>
                                                        {getItemIcon(item.type)}
                                                    </div>
                                                    <div className="textContent flex-1">
                                                        <h4 className="text-[12px] font-semibold text-gray-800">{item.title}</h4>
                                                        <p className="max-w-[90%] text-[10px] text-overflow-ellipsis text-gray-500 truncate">
                                                            {item.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </>
                            ) : (
                                <div className="resultItem p-4 text-center ">
                                    <div className="flex flex-col items-center justify-center py-2">
                                        <div className="iconContainer w-[32px] h-[32px] bg-black rounded-full 
                                        flex items-center justify-center mb-2">
                                            <FaMicroscope className="text-gray-400 w-[14px] h-[14px]" />
                                        </div>
                                        <p className="text-[12px] text-gray-600 font-medium">No results found</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <button onClick={() => setIsNavOpen(!isNavOpen)} className='p-2 hover:bg-neutral-700/30 rounded-lg 
                transition-colors'>

                    {isNavOpen ? <FaTimes className='w-5 h-5' /> : <FaBars className='w-5 h-5' />}

                </button>

            </header>

            {/*Mobile nav Overlay displayed on toggle dropdown by button */}
            {isNavOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40"
                onClick={() => setIsNavOpen(false)}>

                    <div className="fixed top-0 right-0 h-full w-64 bg-black
                    shadow-lg z-50 transform transition-transform duration-300 ease-in-out
                    border-l border-neutral-700 " onClick={(e) => e.stopPropagation}>

                        {/*the nav header */}
                        <div className="flex items-center justify-between p-4 border-b
                        border-neutral-700">

                            <h3 className="text-white font-semibold">Navigation</h3>

                            <button onClick={() => setIsNavOpen(false)}>
                                <FaTimes className='w-5 h-5 text-white' />
                            </button>

                        </div>

                        {/*nav items */}
                        <nav className="flex flex-col items-center justify-start p-4 space-y-2">

                            <button className="flex items-center gap-3 p-3 text-white
                            hover-bg-gray900/70 rounded-lg transition-colors text-left">
                                Dashboard
                            </button>
                            
                            <button className="flex items-center gap-3 p-3 text-white
                            hover-bg-gray900/70 rounded-lg transition-colors text-left">
                                All Tasks
                            </button>

                            <button className="flex items-center gap-3 p-3 text-white
                            hover-bg-gray900/70 rounded-lg transition-colors text-left">
                                Completed
                            </button>

                            <button className="flex items-center gap-3 p-3 text-white
                            hover-bg-gray900/70 rounded-lg transition-colors text-left">
                                Analytics
                            </button>


                        </nav>

                        <div className="absolute bottom-4 left-4 right-4">

                            <div className="border-t border-neutral-700 pt-4">

                                <button className="flex items-center gap-3 p-3 text-white
                                hover:bg-gray900/70 rounded-lg transition-colors text-left
                                w-full">
                                    
                                    <div className="w-8 h-8 bg-blue-600 rounded-full
                                    flex items-center justify-center">

                                        <span className="text-sm font-medium">U</span>

                                    </div>

                                    <div>

                                        <p className="text-sm font-medium">
                                            User Profile
                                        </p>

                                        <p className="text-xs text-neutral-400">
                                            Settings
                                        </p>

                                    </div>

                                </button>

                            </div>

                        </div>

                    </div>

                </div>
            )}
        </>
    )
}
