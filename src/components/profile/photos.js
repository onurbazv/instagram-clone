import { useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import PostModal from '../post/post-modal'

export default function Photos({photos, username, avatar, dispatch}) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [content, setContent] = useState(null)

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