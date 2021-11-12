import {useState} from 'react'
import { Link } from 'react-router-dom';
import {
    getUserByUserId,
    updateUserFollowing,
    updateFollowedUserFollowers
} from '../../services/firebase';

export default function FollowProfile({userDocId, username, profileId, userId, avatar, followedState }) {
    const [followed, setFollowed] = useState(followedState)

    async function handleFollowUser() {
        setFollowed(true);
        const [{ docId }] = await getUserByUserId(userId);
        await updateUserFollowing(docId, profileId, false);
        await updateFollowedUserFollowers(userDocId, userId, false);
    }

    async function handleUnfollowUser() {
        setFollowed(false)
        const [{ docId }] = await getUserByUserId(userId);
        await updateUserFollowing(docId, profileId, true);
        await updateFollowedUserFollowers(userDocId, userId, true);
    }

    return (
        <div className="flex flex-row items-center align-items justify-between">
            <div className="flex items-center justify-between">
                <img 
                    className="rounded-full w-8 h-8 mr-3 object-cover"
                    src={avatar}
                    alt={`Follow ${username}`} />
                <Link to={`/p/${username}`}>
                    <p className="font-bold text-sm">{username}</p>
                </Link>
            </div>
            {followed === null ? null : (
                followed ? (
                    <div>
                        <button
                            className="text-sm font-bold text-blue-800 hover:text-blue-500"
                            type="button"
                            onClick={handleUnfollowUser}>
                            Unfollow
                        </button>
                    </div>
                ) : (
                    <div>
                        <button
                            className="text-sm font-bold text-blue-800 hover:text-blue-500"
                            type="button"
                            onClick={handleFollowUser}>
                            Follow
                        </button>
                    </div>  
                )
            )}            
        </div>
    )
}
