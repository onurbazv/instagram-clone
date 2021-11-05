import React from "react"
import  Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import useFollowedUsersPhotos from "../hooks/use-followed-users-photos";

export default function Timeline() {
    const { photos } = useFollowedUsersPhotos()
    console.log(photos)

    return (
        <div className="container col-span-2">
            {!photos ? (
                <>
                    {[...new Array(4)].map((_, index) => (
                        <Skeleton key={index} count={1} width={320} height={400} />
                    ))}
                </>
            ) : (
                photos.map(photo => <p key={photo.docId}>{photo.username}</p>)
            )}
        </div>
    );
}