import { useState, useEffect, useContext } from 'react';
import { getUserByUserId, getUserFollowedPhotos } from '../services/firebase';
import UserContext from '../context/user';

export default function useFollowedUsersPhotos() {
    const [photos, setPhotos] = useState(null);
    const {
        user: { following, uid: userId = '' }
    } = useContext(UserContext);
    
    useEffect(() => {
        async function getTimelinePhotos() {
            const followingUserIds = await getUserByUserId(userId);

            if (followingUserIds) {
                if (followingUserIds[0].following.length > 0) {
                    const followedUserPhotos = await getUserFollowedPhotos(userId, followingUserIds[0].following);
                    followedUserPhotos && followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
                    setPhotos(followedUserPhotos);
                } else if (followingUserIds[0].following.length === 0) {
                    setPhotos([])
                }
            }
         }
        
        getTimelinePhotos();
    }, [userId, following]);
    
    return { photos };
}