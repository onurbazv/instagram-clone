import React, { useEffect } from 'react'
import Timeline from '../components/timeline'
import Sidebar from '../components/sidebar'
import Header from '../components/header'

export default function Dashboard() {

    useEffect(() => {
        document.title = "Instagram"
    }, [])

    return (
        <div className="bg-gray-100 h-screen">
            <Header/>
            <div className="grid grid-cols-3 gap-4 max-w-screen-lg mx-auto justify-between">
                <Timeline />
                <Sidebar />
            </div>
        </div>
    )
}