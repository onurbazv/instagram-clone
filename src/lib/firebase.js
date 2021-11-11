const config = {
    apiKey: "AIzaSyC3kiZ04bfJsZKmu0BETSseZwnuRrowYls",
    authDomain: "instagram-clone-c0b0b.firebaseapp.com",
    projectId: "instagram-clone-c0b0b",
    storageBucket: "instagram-clone-c0b0b.appspot.com",
    messagingSenderId: "736943222937",
    appId: "1:736943222937:web:324739fb684c59dfc74808"
  };

const firebase = window.firebase.initializeApp(config)
const storage = firebase.storage()
const { FieldValue } = window.firebase.firestore


export { firebase, FieldValue, storage }