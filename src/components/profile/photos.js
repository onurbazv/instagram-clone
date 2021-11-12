import Skeleton from 'react-loading-skeleton'

export default function Photos({photos}) {
    return ( 
        <div className="h-16 border-t border-gray-500 mt-12">
            <div className="grid grid-cols-3 gap-8 mb-12 py-8 bg-gray-100">
            {!photos ? (
                <>
                    {[...new Array(9)].map((_, index) => (
                        <Skeleton key={index} count={1} width={320} height={400}/>
                    ))}
                </>
            ) : photos.length > 0 ? (
                photos.map(photo => (
                    <div key={photo.docId} className="relative group">
                        <img src={photo.imageSrc} alt={photo.caption} />
                        <div className="absolute bottom-0 bg-white w-full h-10 flex items-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="mr-10">{photo.comments.length} comments</div>
                            <div>{photo.likes.length} {photo.likes.length === 1 ? "like" : "likes"}</div>
                        </div>
                    </div>
                ))
            ) : (photos.length === 0 && <p className="text-center text-2xl col-span-3">No Photos Yet</p>)}
            </div>
        </div>
    )
}