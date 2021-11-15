import React, {useRef} from 'react'

import Modal from '../modal'
import Header from './header'
import Footer from './footer'
import Comments from './comments'
import Actions from './actions'

export default function PostModal({isModalOpen, closeModal, content}) {
    const commentInput = useRef(null)

    const handleFocus = () => {
        commentInput.current.focus();
    }


    return (
        content !== null && <Modal
            open={isModalOpen}
            onClose={closeModal}
            title="">
                <div className="sm:grid sm:grid-cols-7 sm:max-w-screen-lg">
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
    )
}


