import { useRef } from 'react'

import Image from './image'
import Header from './header'
import Footer from './footer'
import Comments from './comments'
import Actions from './actions'

export default function Post({ content }) {
    const commentInput = useRef(null)

    const handleFocus = () => {
        commentInput.current.focus();
    }
    return (
        <div className="mb-8 p-2 rounded col-span-4 border bg-white">
            <Header username={content.username} avatar={content.avatar} />
            <Image src={content.imageSrc} caption={content.caption}/>
            <Actions 
                docId={content.docId}
                totalLikes={content.likes.length}
                likedPhoto={content.userLikedPhoto}
                handleFocus={handleFocus} />
            <Footer username={content.username} caption={content.caption} />
            <Comments
                docId={content.docId}
                comments={content.comments}
                posted={content.dateCreated}
                commentInput={commentInput}
             />
        </div>
    )
}