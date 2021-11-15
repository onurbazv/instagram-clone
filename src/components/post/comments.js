import { useState } from "react"
import { Link } from "react-router-dom"
import AddComment from "./add-comment"

export default function Comments({docId, comments: allComments, commentInput, openModal}) {
    const [comments, setComments] = useState(allComments)
    return (
        <>
            <div className={`${openModal !== null && "mb-2"}`}>
                {openModal !== null ? comments.slice(0, 3).map(item => (
                    <p key={`${Math.floor(Math.random() * 1024) + 1}-${item.displayName}`} className="mb-1">
                        <Link to={`/p/${item.displayName}`}>
                            <span className="font-bold mr-1">{item.displayName}</span>
                        </Link>
                        <span>{item.comment}</span>
                    </p>
                )) : comments.map(item => (
                    <p key={`${Math.floor(Math.random() * 1024) + 1}-${item.displayName}`} className="mb-1">
                        <Link to={`/p/${item.displayName}`}>
                            <span className="font-bold mr-1">{item.displayName}</span>
                        </Link>
                        <span>{item.comment}</span>
                    </p>
                ))}
                {openModal !== null && comments.length >= 3 && (
                    <p className="text-sm text-gray-500 cursor-pointer mt-2" onClick={openModal}>
                        View all {comments.length} comments
                    </p>
                )}
            </div>
            <AddComment
                docId={docId}
                comments={comments}
                setComments={setComments}
                commentInput={commentInput}
            />
        </>
    )
}