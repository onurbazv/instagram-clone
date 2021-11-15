import { useRef, useState } from 'react'

import Modal from '../modal'
import Image from './image'
import Header from './header'
import Footer from './footer'
import Comments from './comments'
import Actions from './actions'


export default function Post({ content }) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const commentInput = useRef(null)


    const handleFocus = () => {
        commentInput.current.focus();
    }

    return (
        <div className="mb-8 p-4 rounded col-span-4 border bg-white">
            <Header username={content.username} avatar={content.avatar} />
            <Image src={content.imageSrc} caption={content.caption} openModal={() => setIsModalOpen(true)}/>
            <Actions 
                docId={content.docId}
                totalLikes={content.likes.length}
                likedPhoto={content.userLikedPhoto}
                handleFocus={handleFocus} />
            <Footer username={content.username} caption={content.caption} posted={content.dateCreated}/>
            <Comments
                docId={content.docId}
                comments={content.comments}
                posted={content.dateCreated}
                commentInput={commentInput}
                openModal={() => setIsModalOpen(true)}
             />
             <Modal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="">
                    <div className="grid grid-cols-7 max-w-screen-lg">
                        <div className="col-span-4">
                            <img className="w-full" src={content.imageSrc} alt={content.caption}/>
                        </div>
                        <div className="col-span-3 p-4">
                            <Header username={content.username} avatar={content.avatar}/>
                            <Actions 
                                    docId={content.docId}
                                    totalLikes={content.likes.length}
                                    likedPhoto={content.userLikedPhoto}
                                    handleFocus={handleFocus} />
                            <Footer username={content.username} caption={content.caption} posted={content.dateCreated}/>
                            <Comments
                                docId={content.docId}
                                comments={content.comments}
                                commentInput={commentInput}
                                openModal={null} />
                        </div>
                    </div>
             </Modal>
        </div>
    )
}