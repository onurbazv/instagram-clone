import { firebase } from '../lib/firebase'

export const doesUsernameExist = async (username) => {
    const result = await firebase
                            .firestore()
                            .collection('users')
                            .where('username', '==', username)
                            .get()

    return result.docs.length > 0
}

export const getUserByUserId = async (userId) => {
    const result = await firebase
        .firestore()
        .collection('users')
        .where('userId', '==', userId)
        .get();
        
    const user = result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }));
    
    return user;
}




export const getUserFollowedPhotos = async (userId, followingUserIds) => {
    const result = await firebase
        .firestore()
        .collection('photos')
        .where('userId', 'in', followingUserIds)
        .get();
        
    const userFollowedPhotos = result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }));

    const photosWithUserDetails = await Promise.all(
        userFollowedPhotos.map(async (photo) => {
            const userLikedPhoto = photo.likes.includes(userId)

            const user = await getUserByUserId(photo.userId)
            const username = user[0].username
            return { username, ...photo, userLikedPhoto }
        })
    )
    

    return photosWithUserDetails
}

export const getSuggestedProfiles = () => {
    return null
}