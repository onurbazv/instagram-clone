import React, { memo, useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import SuggestedProfile from './suggested-profile';
import { getSuggestedProfiles } from '../../services/firebase';

const Suggestions = ({ userId, following }) => {
    const [profiles, setProfiles] = useState(null);
    
    
    useEffect(() => {
        async function suggestedProfiles() {
            const response = await getSuggestedProfiles(userId, following);
            setProfiles(response);
        }
        if (userId) {
            suggestedProfiles();
        }
    }, [userId, following]);
    
    return !profiles ? (
        <Skeleton count={1} height={150} className="mt-5" />
    ) : profiles.length > 0 ? (
        <div className="flex flex-col">
            <p className="font-bold text-gray-900 text-sm mb-6">Suggestions for you</p>
            <div className="grid gap-3">
                {profiles.map(profile => (
                    <SuggestedProfile 
                        key={profile.docId}
                        userDocId={profile.docId}
                        username={profile.username}
                        profileId={profile.userId}
                        userId={userId}
                        />
                ))}
            </div>
        </div>
    ) : null;
}

export default memo(Suggestions);