import { FieldValue, firebase, storageRef } from '../lib/firebase'

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

    return result.docs
        .map((user) => ({ ...user.data(), docId: user.id }))
        .filter((profile) => profile.userId !== userId && !following.includes(profile.userId));
}


export const getProfileList = async (list) => {
    const result = await firebase.firestore().collection('users').limit(10).get()

    return result.docs.map(user => ({
        ...user.data(),
        docId: user.id
    })).filter(profile => list.includes(profile.userId))
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

export const uploadFile = async (file, path, recalculateProgress, onSuccess, id) => {

    
    const uploadTask = storageRef.child(path).put(file)
    uploadTask.on('state_changed', (snapshot) => {
        recalculateProgress(snapshot.bytesTransferred, snapshot.totalBytes)
    }, (error) => {
        console.log(error)
    }, async () => {
        const url = await getFileUrl(path)
        if (path !== undefined && path !== null) {
            onSuccess(url, id)
        }
    })
}

export const getFileUrl = async (path) => {
    let result;
    await storageRef.child(path).getDownloadURL().then(url => {
        result = url;
    })
    return result;
}

export const updateUserAvatar = async (docId, url) => {
    return await firebase
        .firestore()
        .collection("users")
        .doc(docId)
        .update({
            avatar: url
        })
}

export const createNewPost = async (caption, postId, userId, imageSrc) => {
    return await firebase.firestore().collection("photos").add({
        dateCreated: Date.now(),
        comments: [],
        likes: [],
        imageSrc: imageSrc,
        photoId: postId,
        userId: userId,
        caption: caption
    })
}