import { useEffect, useReducer } from "react";
import { getUserPhotosByUserId } from "../../services/firebase";
import Header from './header'
import Photos from './photos';

const reducer = (state, newState) => ({...state, ...newState})
const initialState = {
    profile: {},
    photosCollection: [],
    followerCount: 0
}

export default function UserProfile({user}) {

    const [{profile, photosCollection, followerCount}, dispatch] = useReducer(
        reducer,
        initialState
    )

    useEffect(() => {
        async function getProfilePhotos () {
            const photos = await getUserPhotosByUserId(user.userId)
            dispatch({
                profile: user,
                photosCollection: photos,
                followerCount: user.followers.length
            })
        }
        getProfilePhotos()
    }, [user])

    return (
        <>
            <Header
                totalPhotos={photosCollection.length}
                followerCount={followerCount}
                profile={profile}
                dispatch={dispatch}/>
            <Photos 
                photos={photosCollection}
                username={profile.username}
                avatar={profile.avatar}
                dispatch={dispatch}/>
        </>
    )
}