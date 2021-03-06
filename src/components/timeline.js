import React from "react"
import Skeleton from "react-loading-skeleton";
import useFollowedUsersPhotos from "../hooks/use-followed-users-photos";
import Post from "./post";


export default function Timeline() {
    const { photos } = useFollowedUsersPhotos()

    return (
        <div className="container col-span-2 sm:max-w-lg mx-auto">
            {!photos ? (
                <>
                    {[...new Array(4)].map((_, index) => (
                        <Skeleton key={index} count={1} height={600}/>
                    ))}
                </>
            ) : photos.length > 0 ? (
                photos.map(content => (
                    <Post key={content.docId} content={content}/>
                ))
            ) : (
                <>
                    <p className="text-xl max-w-md mb-4">You don't follow anyone or the people you're following haven't posted anything yet.</p>
                    <p className="text-xl max-w-md">Follow raphael to see some posts since there is no other user posting.</p>
                </>
            )}
        </div>
    );
}