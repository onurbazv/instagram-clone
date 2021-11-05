import Image from './image'
import Header from './header'
import Footer from './footer'
import Comment from './comment'
import Actions from './actions'

export default function Post({ content }) {
    return (
        <div className="mb-8 p-2 rounded col-span-4 border bg-white">
            <Image src={content.imageSrc} caption={content.caption}/>
            <Footer username={content.username} caption={content.caption} />
        </div>
    )
}