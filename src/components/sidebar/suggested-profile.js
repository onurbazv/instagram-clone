import { useState } from "react";
import { Link } from "react-router-dom";
import {
    getUserByUserId,
    updateUserFollowing,
    updateFollowedUserFollowers
} from '../../services/firebase';

export default function SuggestedProfile({ userDocId, username, profileId, userId, avatar }) {
    const [followed, setFollowed] = useState(false)

    async function handleFollowUser() {
        setFollowed(true);
        const [{ docId }] = await getUserByUserId(userId);
        console.log(`updateUserFollowing(${docId}, ${profileId}, false)`)
        await updateUserFollowing(docId, profileId, false);
        console.log(`updateFollowedUserFollowers(${userDocId}, ${userId}, false)`)
        await updateFollowedUserFollowers(userDocId, userId, false);
    }

    return !followed ? (
        <div className="flex flex-row items-center align-items justify-between">
            <div className="flex items-center justify-between">
                <img 
                    className="rounded-full w-8 mr-3"
                    src={`/images/avatars/${avatar}`}
                    alt={`Follow ${username}`} />
                <Link to={`/p/${username}`}>
                    <p className="font-bold text-sm">{username}</p>
                </Link>
            </div>
            <div>
                <button
                    className="text-sm font-bold text-blue-800 hover:text-blue-500"
                    type="button"
                    onClick={handleFollowUser}>
                    Follow
                </button>
            </div>
        </div>
        ) : null
}