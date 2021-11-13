import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import * as ROUTES from '../constants/routes'
import Header from '../components/header'

export default function NotFound() {
    useEffect(() => {
        document.title = '404 - Not Found'
    }, [])

    return (
        <>
            <Header/>
            <div className="px-4">
                <div className="mx-auto max-w-screen-lg">
                    <p className="text-center text-2xl font-semibold mb-4">Sorry, this page isn't available.</p>
                    <p className="text-center text-md">The link you followed may be broken, or the page may have been removed.</p>  
                    <p className="text-center text-md pt-4"><Link to={ROUTES.DASHBOARD} className="text-blue-600"> Go back to Instagram</Link></p>
                </div>
            </div>
        </>
    )
}