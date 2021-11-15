import { useState, useEffect } from 'react'
import { getProfileList } from '../../services/firebase'
import FollowProfile from './follow-profile'

function FollowList({list, userId, followingList, closeModal}) {
    const [profiles, setProfiles] = useState(null)
    useEffect(() => {
        async function getProfiles() {
            const response = await getProfileList(list)
            setProfiles(response)
        }
        if (list && list.length > 0) { 
            getProfiles()
        }
    }, [list])


    return (
        <div className="grid gap-4">
            {profiles !== null && profiles.length > 0 && (
                profiles.map(profile => (
                    <FollowProfile 
                        key={profile.docId}
                        userDocId={profile.docId}
                        username={profile.username}
                        profileId={profile.userId}
                        avatar={profile.avatar}
                        userId={userId}
                        followedState={userId === profile.userId ? null : followingList.includes(profile.userId)}
                        closeModal={closeModal}/>
                ))
            )}
        </div>
    )
}

export default FollowList