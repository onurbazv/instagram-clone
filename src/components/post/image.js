export default function Image({src, caption, openModal}) {
    return (
        <div className="post__img mt-2" onClick={openModal}>
            <img className="w-full" src={src} alt={caption}/> 
        </div>
    )
}