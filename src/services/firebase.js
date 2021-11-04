import { firebase } from '../lib/firebase'

export const doesUsernameExist = async (username) => {
    const result = await firebase
                            .firestore()
                            .collection('users')
                            .where('username', '==', username)
                            .get()

    return result.docs.length > 0
}

export const getUserByUserID = async (id) => {
    const result = await firebase
                            .firestore()
                            .collection('users')
                            .where('userId', '==', id)
                            .get()

    const user = result.docs.map(item => ({
        ...item.data(),
        docId: item.id
    }))

    return user
}