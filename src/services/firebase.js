import { FieldValue, firebase, storage } from '../lib/firebase'

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

export const getUserByUsername = async (username) => {
    const result = await firebase
        .firestore()
        .collection('users')
        .where('username', '==', username)
        .get();
        
    const user = result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }));
    
    return user.length > 0 ? user : false;
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
            const avatar = user[0].avatar
            return { username, ...photo, userLikedPhoto, avatar }
        })
    )
    
    return photosWithUserDetails
}

export const getUserPhotosByUserId = async (userId) => {
    const result = await firebase
        .firestore()
        .collection('photos')
        .where('userId', '==', userId)
        .get()

    const userPhotos = result.docs.map(item => ({
        ...item.data(),
        docId: item.id
    }))

    return userPhotos
}


export const getSuggestedProfiles = async (userId, following) => {
    const result = await firebase.firestore().collection('users').limit(10).get()

    // Karl used this code on his project, I've decided to pass userFollowing as a prop from sidebar (useUser) to avoid this
    // const [{ following = [] }] = result.docs
    //     .map((user) => user.data())
    //     .filter((profile) => profile.userId === userId);

    // He then introduced this  `optimized` solution in the next screencast
    // const [{ following }] = await getUserByUserId(userId);

    // I question the optimization because it makes more calls to the backend where we can just use data we already have somewhere else in the app
    // This is why i chose to continue drilling props

    return result.docs
        .map((user) => ({ ...user.data(), docId: user.id }))
        .filter((profile) => profile.userId !== userId && !following.includes(profile.userId));
}

export const updateUserFollowing = async (docId, profileId, isFollowingProfile)  => {
    return firebase
        .firestore()
        .collection("users")
        .doc(docId)
        .update({
            following: isFollowingProfile ? FieldValue.arrayRemove(profileId) : FieldValue.arrayUnion(profileId)
        })
}

export const updateFollowedUserFollowers = async (docId, followingUserId, isFollowingProfile) => {
    return await firebase
        .firestore()
        .collection("users")
        .doc(docId)
        .update({
            followers: isFollowingProfile ? FieldValue.arrayRemove(followingUserId) : FieldValue.arrayUnion(followingUserId)
        })
}

export const isUserFollowingProfile = async (activeUsername, profileUserId) => {
    const result = await firebase
        .firestore()
        .collection("users")
        .where("username", "==", activeUsername)
        .where("following", "array-contains", profileUserId)
        .get()

    const [response = {}] = result.docs.map(item => ({
        ...item.data(),
        docId: item.id
    }))

    return !!response.fullName
}