import React, { useState, useEffect, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import FirebaseContext from '../context/firebase'
import * as ROUTES from '../constants/routes'
import { doesUsernameExist } from '../services/firebase'


const validUsernameCharacters = 'abcdefghijklmnopqrstuvwxyz_0123456789.'
const validPasswordCharacters = 'abcdefghijklmnopqrstuvwxyz_0123456789.@^!#$%&*-ABCDEFGHIJKLMNOPQRSTUVWXYZ'


export default function SignUp() {
    const { firebase } = useContext(FirebaseContext)
    const history = useHistory()

    const [error, setError] = useState("")
    const [username, setUsername] = useState("")
    const [fullname, setFullname] = useState("")
    const [emailAddress, setEmailAddress] = useState("")
    const [password, setPassword] = useState("")
    
    const isValidInput = (username.length > 1 && fullname.length > 2 && emailAddress.includes("@") && emailAddress.length > 5 && password.length > 5)

    const sanitizeFullname = string => {
        const split = string.split(" ")
        if (split.length > 1) {
            return split.map(sub => sub.charAt(0).toUpperCase() + sub.slice(1)).join(" ").trimStart()
        } else {
            return string.charAt(0).toUpperCase() + string.slice(1).trimStart()
        }
    }

    const sanitizeUsername = string => {
        if (string.length > 0) {
            return string.toLowerCase().split("").filter(ch => validUsernameCharacters.includes(ch)).join("")
        } else {
            return string
        }
    }

    const sanitizePassword = string => {
        if (string.length > 0) {
            return string.split("").filter(ch => validPasswordCharacters.includes(ch)).join("")
        } else {
            return string
        }
    }

    const handleSubmit = async event => {
        event.preventDefault()

        const usernameExists = await doesUsernameExist(username)
        if (!usernameExists) {
            try {
                const createdUserResult = await firebase.auth().createUserWithEmailAndPassword(emailAddress, password)
    
                await createdUserResult.user.updateProfile({
                    displayName: username
                })
               
                await firebase.firestore().collection('users').add({
                    userId: createdUserResult.user.uid,
                    username: username.toLowerCase(),
                    fullName: fullname,
                    emailAddress: emailAddress.toLowerCase(),
                    following: [],
                    followers: [],
                    dateCreated: Date.now()
                    })
                history.push(ROUTES.DASHBOARD)
    
            } catch (error) {
                setError(error.message)
                setUsername('')
                setPassword('')
                setEmailAddress('')
            }
        } else {
            setError('That username is already taken')
            setUsername('')
        }
        
    }

    useEffect(() => {
        document.title = "Sign Up - Instagram"
    }, [])

    return (
        <div className="container flex mx-auto max-w-xs items-center h-screen">
            <div className="flex flex-col">
                <div className="flex flex-col items-center bg-white p-4 border mb-4">
                        <h1 className="flex justify-center w-full">
                            <img src="/images/logo.png" alt="Instagram" className="mt-2 w-6/12 mb-4"/>
                        </h1>

                        <form onSubmit={handleSubmit} method="POST">
                            <input
                                aria-label="Enter your username"
                                className="text-sm text-gray w-full mr-3 py-5 px-4 h-2 border bg-gray-background rounded mb-2"
                                type="text"
                                placeholder="Username"
                                value={sanitizeUsername(username)}
                                onChange={({target}) => setUsername(target.value.toLowerCase())} />

                            <input
                                aria-label="Enter your full name"
                                className="text-sm text-gray w-full mr-3 py-5 px-4 h-2 border bg-gray-background rounded mb-2"
                                type="text"
                                placeholder="Full name"
                                value={sanitizeFullname(fullname)}
                                onChange={({target}) => setFullname(target.value)} />

                            <input
                                aria-label="Enter your email address"
                                className="text-sm text-gray w-full mr-3 py-5 px-4 h-2 border bg-gray-background rounded mb-2"
                                type="text"
                                placeholder="Email address"
                                value={emailAddress}
                                onChange={({target}) => setEmailAddress(target.value.toLowerCase())} />

                            <input
                                aria-label="Enter your password"
                                className="text-sm text-gray w-full mr-3 py-5 px-4 h-2 border bg-gray-background rounded mb-2"
                                type="password"
                                placeholder="Password"
                                value={sanitizePassword(password)}
                                onChange={({target}) => setPassword(target.value)} />

                            {error && <p className="mb-4 text-xs text-red-500">{error}</p>}
                            <button
                                disabled={!isValidInput}
                                type="submit"
                                className={`bg-blue-500 text-white w-full rounded h-8 font-bold ${!isValidInput && "cursor-not-allowed opacity-50"}`}>
                                Sign Up
                            </button>
                        </form>
                    </div>
                    <div className="flex justify-center items-center flex-col w-full bg-white p-4 border">
                        <p className="text-sm">
                            Have an account? 
                            <Link to={ROUTES.LOGIN} className="font-bold text-blue-800"> Log in</Link>
                        </p>
                    </div>
            </div>
        </div>
    )
}