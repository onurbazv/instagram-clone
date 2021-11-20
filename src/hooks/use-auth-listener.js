import { useState, useEffect, useContext } from 'react';
import FirebaseContext from '../context/firebase';
import { getUserByUserId } from '../services/firebase';

export default function useAuthListener() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')));
    const { firebase } = useContext(FirebaseContext);



    useEffect(() => {
        const listener = firebase.auth().onAuthStateChanged(async (authUser) => {
            if (authUser) {
                localStorage.setItem('authUser', JSON.stringify(authUser));
                const profile = await getUserByUserId(authUser.uid)
                setUser({
                    uid: authUser.uid, 
                    email: authUser.email, 
                    displayName: authUser.displayName,
                    ...profile[0]
                });
            } else {
                localStorage.removeItem('authUser');
                setUser(null);
            }
        });
        
        return () => listener();
    }, [firebase]);
    
    return user;
}