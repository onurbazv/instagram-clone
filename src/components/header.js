import React, { useContext } from "react"
import { Link } from "react-router-dom"
import * as ROUTES from '../constants/routes'
import FirebaseContext from '../context/firebase'

// react-router-dom because you'll need a Link
// routes
// FirebaseContext

// hint: you need something from React

export default function Header() {
    const { firebase } = useContext(FirebaseContext)

    return (
        <header className="bg-white h-16 shadow-sm mb-8">
            <div className="container mx-auto max-width-lg h-full">
                <div className="flex justify-between h-full">
                    <div className="text-gray-700 text-center flex items-center align-items cursor-pointer">
                        <h1>
                            <Link to={ROUTES.DASHBOARD} aria-label="Dashboard">
                                <img src="/images/logo.png" alt="Instagram" className="mt-2 w-6/12" />
                            </Link>
                        </h1>
                    </div>
                </div>
            </div>
        </header>
    )
}