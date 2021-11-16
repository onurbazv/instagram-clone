import React, { memo, useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import SuggestedProfile from './suggested-profile';
import { getSuggestedProfiles } from '../../services/firebase';

const Suggestions = ({ userId, following }) => {
    const [profiles, setProfiles] = useState(null);
    const [isHidden, setIsHidden] = useState(false) 
    
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
            <div className="flex justify-between">
                <p className="font-bold text-gray-900 text-sm mb-4">Suggestions for you</p>
                <div className="sm:hidden" onClick={() => setIsHidden(prev => !prev)}>
                    <i className={`far ${isHidden ? "fa-eye" : "fa-eye-slash"}`}></i>
                </div>
            </div>
            {!isHidden && (
                <div className="grid gap-3">
                    {profiles.map(profile => (
                        <SuggestedProfile 
                            key={profile.docId}
                            userDocId={profile.docId}
                            username={profile.username}
                            profileId={profile.userId}
                            avatar={profile.avatar}
                            userId={userId}
                            />
                    ))}
                </div>)}
        </div>
    ) : null;
}

export default memo(Suggestions);