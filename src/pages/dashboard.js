import React, { useEffect } from 'react'
import Timeline from '../components/timeline'
import Sidebar from '../components/sidebar'
import Header from '../components/header'

export default function Dashboard() {

    useEffect(() => {
        document.title = "Instagram"
    }, [])

    return (
        <div className="min-h-screen">
            <Header/>
            <div className="grid grid-cols-3 gap-4 max-w-screen-lg mx-auto justify-between px-2">
                <Timeline />
                <Sidebar />
            </div>
        </div>
    )
}