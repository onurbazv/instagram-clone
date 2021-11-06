import React from "react"
import Skeleton from "react-loading-skeleton";
import useFollowedUsersPhotos from "../hooks/use-followed-users-photos";
import Post from "./post";

export default function Timeline() {
    const { photos } = useFollowedUsersPhotos()

    return (
        <div className="container col-span-2">
            {!photos ? (
                <>
                    {[...new Array(4)].map((_, index) => (
                        <Skeleton key={index} count={1} height={600}/>
                    ))}
                </>
            ) : (
                photos.map(content => (
                    <Post key={content.docId} content={content}/>
                ))
            )}
        </div>
    );
}