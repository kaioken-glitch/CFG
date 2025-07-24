import React from 'react'

export default function Main({ children }) {
    return (
        <div className="main w-full min-h-screen overflow-y-auto">
            {children}
        </div>
    )
}
