import React, { useContext, useState } from "react"
import { Link } from "react-router-dom"

import * as ROUTES from '../constants/routes'
import * as ICONS from '../constants/icons'
import FirebaseContext from '../context/firebase'
import UserContext from "../context/user"
import useUser from "../hooks/use-user"
import Modal from "./modal"
import NewPostForm from "./new-post-form"

export default function Header() {
    const { firebase } = useContext(FirebaseContext)
    const { user } = useContext(UserContext)
    const { user: profile } = useUser()
    const [isModalOpen, setIsModalOpen] = useState(false)


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
                                    {ICONS.DASHBOARD}
                                </Link>
                                <button 
                                    type="button"
                                    title="New post"
                                    onClick={() => {
                                        setIsModalOpen(true)
                                    }}
                                    onKeyDown={e => {
                                        e.key === "Enter" && console.log('create new post')
                                    }}>
                                    {ICONS.NEW_POST}
                                </button>
                                <button
                                    type="button"
                                    title="Sign Out"
                                    onClick={() => firebase.auth().signOut()}
                                    onKeyDown={(e) => {
                                        e.key === "Enter" && firebase.auth().signOut()
                                    }}>
                                    {ICONS.SIGN_OUT}
                                </button>
                                <div className="flex items-center cursor-pointer">
                                    <Link to={`/p/${user.displayName}`}>
                                        <img 
                                            className="rounded-full w-8 h-8 flex object-cover"
                                            src={profile.avatar}
                                            alt={`${user.displayName} avatar`}/>
                                    </Link>
                                </div>
                                <Modal
                                    open={isModalOpen}
                                    onClose={() => setIsModalOpen(false)}
                                    title="New Post">
                                        <NewPostForm userId={user.uid} username={profile.username}/>
                                </Modal>
                            </>
                        ) : (
                            <>
                                <Link to={ROUTES.LOGIN} aria-label="Login">
                                    <button
                                        type="button"
                                        className="bg-blue-500 text-white text-sm font-bold w-20 h-8 rounded">
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