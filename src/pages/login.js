import React, { useState, useEffect, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import * as ROUTES from '../constants/routes'
import FirebaseContext from '../context/firebase'


export default function Login() {
    const { firebase } = useContext(FirebaseContext)
    const history = useHistory()

    const [ emailAddress, setEmailAddress ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ error, setError ] = useState("")

    const isValidInput = (password.length > 5 && emailAddress.includes('@') && emailAddress.length > 5)

    useEffect(() => {
        document.title = "Login - Instagram"
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            await firebase.auth().signInWithEmailAndPassword(emailAddress, password)
            const timeout = setTimeout(() => {
                history.push(ROUTES.DASHBOARD)
                clearTimeout(timeout)
            }, 500)
        } catch (error) {
            setEmailAddress("")
            setPassword("")
            setError(error.message)
        }
    }


    return (
        <div className="container mx-auto flex max-w-screen-md items-center h-screen">

            <div className="hidden sm:block flex w-3/5">
                <img src="images/iphone-with-profile.jpg" alt="iPhone with Instagram app"/>
            </div>

            <div className="flex flex-col mx-auto w-4/5 sm:w-2/5">
                <div className="flex flex-col items-center bg-white p-4 border mb-4">
                    <h1 className="flex justify-center w-full">
                        <img src="/images/logo.png" alt="Instagram" className="mt-2 w-6/12 mb-4 max-h-full"/>
                    </h1>

                    <form onSubmit={handleLogin} method="POST">
                        <input
                            aria-label="Enter your email address"
                            className="text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2"
                            type="text"
                            placeholder="Email address" 
                            value={emailAddress}
                            onChange={(e) => setEmailAddress(e.target.value)}/>
                        <input
                            aria-label="Enter your password"
                            className="text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}/>
                        {error && <p className="mb-4 text-xs text-red-500">{error}</p>}
                        <button
                            disabled={!isValidInput}
                            type="submit"
                            className={`bg-blue-500 text-white w-full rounded h-8 font-bold ${!isValidInput && "cursor-not-allowed opacity-50"}`}>
                            Log In
                        </button>
                    </form>
                </div>
                <div className="flex justify-center items-center flex-col w-full bg-white p-4 border">
                    <p className="text-sm">
                        Dont have an account? 
                        <Link to={ROUTES.SIGN_UP} className="font-bold text-blue-800"> Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}