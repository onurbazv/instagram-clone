import React, { useContext } from "react"
import { Link } from "react-router-dom"

import * as ROUTES from '../constants/routes'
import FirebaseContext from '../context/firebase'
import UserContext from "../context/user"
import useUser from "../hooks/use-user"

export default function Header() {
    const { firebase } = useContext(FirebaseContext)
    const { user } = useContext(UserContext)
    const { user: profile } = useUser()


    return (
        <header className="bg-white h-16 shadow-sm mb-8 px-2">
            <div className="container mx-auto max-w-screen-lg h-full">
                <div className="flex justify-between h-full">
                    <div className="text-gray-700 text-center flex items-center align-items cursor-pointer">
                        <h1>
                            <Link to={ROUTES.DASHBOARD} aria-label="Dashboard">
                                <img src="/images/logo.png" alt="Instagram" className="mt-2 w-6/12" />
                            </Link>
                        </h1>
                    </div>
                    <div className="text-gray text-center flex items-center align-items gap-4">
                    
                        {user ? (
                            <>
                                <Link to={ROUTES.DASHBOARD} aria-label="Dashboard">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                    </svg>
                                </Link>
                                <button
                                    type="button"
                                    title="Sign Out"
                                    onClick={() => firebase.auth().signOut()}
                                    onKeyDown={(e) => {
                                        e.key === "Enter" && firebase.auth().signOut()
                                    }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                <div className="flex items-center cursor-pointer">
                                    <Link to={`/p/${user.displayName}`}>
                                        <img 
                                            className="rounded-full w-8 h-8 flex"
                                            src={profile.avatar}
                                            alt={`${user.displayName} avatar`}/>
                                    </Link>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link to={ROUTES.LOGIN} aria-label="Login">
                                    <button
                                        type="button"
                                        className="bg-blue-500 text-white text-sm font-bold w-20 h-8 rounded"
                                        >
                                        Login
                                    </button>
                                </Link>
                                <Link to={ROUTES.SIGN_UP} aria-label="Sign Up">
                                    <button
                                        type="button"
                                        className="bg-white text-sm font-bold w-20 h-8 rounded"
                                        >
                                        Sign Up
                                    </button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}