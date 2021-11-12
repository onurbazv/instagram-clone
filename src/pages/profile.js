import { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import Header from '../components/header'
import UserProfile from '../components/profile'
import { getUserByUsername } from '../services/firebase'
import * as ROUTES from '../constants/routes'

export default function Profile() {
    const { username } = useParams()
    const history = useHistory()

    const [ user, setUser ] = useState(null)
    const [ userExists, setUserExists ] = useState(undefined)
    
    useEffect(() => {
        async function checkUserExistsToLoadProfile() {
            const currentUser = await getUserByUsername(username)
            if (!currentUser) {
                history.push(ROUTES.NOT_FOUND)
            } else {
                setUser(currentUser[0])
                setUserExists(true)
            }
        }

        checkUserExistsToLoadProfile()
        
    }, [username, history])
    
    return (
        userExists ? (
            <div>
                <Header />
                <div className="mx-auto max-w-screen-lg">
                    <UserProfile user={user} />
                </div>
            </div>
        ) : (
            null
        )
    )
}