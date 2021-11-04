import { useState, useEffect, useContext } from 'react'
import UserContext from '../context/user'
import { getUserByUserID } from '../services/firebase'

export default function useUser() {
    const [activeUser, setActiveUser] = useState({})
    const { user } = useContext(UserContext)

    useEffect(() => {
        async function getUserByUID(uid) {
            // query for data on firestore
            const [response] = getUserByUserID(user.id)
            setActiveUser({...response})
        }
        if (user && user.id) {
            getUserByUID(user.id)
        }
    }, [user])

    console.log(activeUser)

    return { user: activeUser }
}