import firebaseConfig from '../constants/firebaseConfig'

const firebase = window.firebase.initializeApp(firebaseConfig)
const storageRef = firebase.storage().ref()
const { FieldValue } = window.firebase.firestore

export { firebase, FieldValue, storageRef }