import { useState, useContext } from 'react'
import FirebaseContext from '../../context/firebase'
import UserContext from '../../context/user'

export default function AddComment( { docId, comments, setComments, commentInput } ) {
    const [comment, setComment] = useState('')
    const { firebase } = useContext(FirebaseContext)
    const { user : { displayName } } = useContext(UserContext)


    const handleSubmitComment = (event) => {
        event.preventDefault()
        const newComments = [{displayName, comment}, ...comments]
        setComments(newComments)
        setComment('')

        return firebase
                .firestore()
                .collection('photos')
                .doc(docId)
                .update(
                    {
                        comments: newComments
                    }
                )
    }

    return (
        <div className="border-t border-gray-200 pt-2">
            <form 
                className="flex w-full justify-between border-gray pr-4"
                onSubmit={(event) => {
                    event.preventDefault()
                    comment.length >= 3 && handleSubmitComment(event)
                }}
                method="POST"
                >
                <input 
                    aria-label="Add a comment"
                    autoComplete="off"
                    className="text-sm text-gray w-full mr-3 py-5 px-4"
                    type="text"
                    name="add-comment"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={({target}) => setComment(target.value)}
                    ref={commentInput}
                    />
                <button 
                    className={`text-sm font-bold text-blue-500 ${!comment && 'opacity-25'}`}
                    type="button"
                    disabled={comment.length < 3}
                    onClick={handleSubmitComment}
                >
                    Post
                </button>
            </form>
        </div>
    )
}