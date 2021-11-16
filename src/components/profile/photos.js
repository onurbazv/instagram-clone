import { useState, useContext } from 'react'
import Skeleton from 'react-loading-skeleton'
import PostModal from '../post/post-modal'
import * as ICONS from '../../constants/icons'
import UserContext from '../../context/user'
import { deletePost } from '../../services/firebase'

export default function Photos({photos, username, avatar, dispatch}) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [content, setContent] = useState(null)
    const { user } = useContext(UserContext)

    const isUserProfile = user.displayName === username

    return ( 
        <div className="h-16 border-t border-gray-500 mt-8">
            <div className="grid sm:grid-cols-3 gap-8 mb-12 py-8 bg-gray-100">
            {!photos ? (
                <>
                    {[...new Array(9)].map((_, index) => (
                        <Skeleton key={index} count={1} width={320} height={400}/>
                    ))}
                </>
            ) : photos.length > 0 ? (
                <>
                {photos.map(photo => ({username, avatar, ...photo})).map(photo => (
                        <div key={photo.docId} className="relative group">
                            <img src={photo.imageSrc} alt={photo.caption} onClick={() => {
                                setContent(photo)
                                setIsModalOpen(true)
                            }}/>
                            <div className="absolute bottom-0 bg-white w-full h-10 flex items-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="mr-10">{photo.comments.length} comments</div>
                                <div>{photo.likes.length} {photo.likes.length === 1 ? "like" : "likes"}</div>
                            </div>
                            {isUserProfile && (
                                <button
                                    onClick={() => {
                                        const hasConfirmed = window.confirm("Are you sure you want to delete this post?")
                                        if (hasConfirmed) {
                                            deletePost(photo.docId, photo.photoId)
                                        }
                                    }}
                                    className="absolute top-2 right-2 bg-transparent text-white mix-blend-exclusion opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    {ICONS.DELETE_POST}
                                </button>
                            )}
                        </div>
                ))}
                <PostModal
                    content={content}
                    isModalOpen={isModalOpen}
                    closeModal={() => setIsModalOpen(false)}/>
                </>
            ) : (photos.length === 0 && <p className="text-center text-2xl col-span-3">No Photos Yet</p>)}
            </div>
        </div>
    )
}