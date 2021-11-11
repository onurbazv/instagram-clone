import { useState, useEffect, useContext } from 'react'
import useUser from "../../hooks/use-user"
import Skeleton from "react-loading-skeleton"
import { updateFollowedUserFollowers, updateUserFollowing } from '../../services/firebase';
import UserContext from '../../context/user';
import Modal from '../modal';

export default function Header({
    totalPhotos,
    followerCount,
    profile  : { docId, userId, username, fullName, following, avatar },
    dispatch
}) {
    const { user } = useUser();
    const { user: loggedInUser } = useContext(UserContext)
    const [isFollowingProfile, setIsFollowingProfile] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const isUserProfile = user.username === username
    const activeBtnFollowState = user && user.username && !isUserProfile && loggedInUser !== null;

    useEffect(() => {
        if (user.following !== undefined) {
            setIsFollowingProfile(user.following.includes(userId))
        }
    }, [user.following, userId])


    const handleToggleFollow = async () => {
        setIsFollowingProfile(isFollowingProfile => !isFollowingProfile)
        dispatch({followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1})
        updateUserFollowing(user.docId, userId, isFollowingProfile)
        updateFollowedUserFollowers(docId, user.userId, isFollowingProfile)
    }

    return (
        <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
            <div className="container flex justify-center">
                <img 
                    className={`rounded-full h-40 w-40 flex ${isUserProfile && "cursor-pointer"}`}
                    src={`/images/avatars/${avatar}`}
                    alt={`${username} avatar`}
                    onClick={isUserProfile ?  () => setIsModalOpen(true) : null}/>
            </div>
            <div className="flex items-center justify-center flex-col col-span-2">
                <div className="container flex items-center">
                    <p className="text-2xl mr-4">{username}</p>
                    {activeBtnFollowState && (
                        <button
                            className="bg-blue-500 font-bold text-sm rounded text-white w-20 h-8"
                            type="button"
                            onClick={handleToggleFollow}
                        >
                            {isFollowingProfile ? "Unfollow" : "Follow"}
                        </button>
                    )}

                </div>
                <div className="container flex mt-4">
                    {followerCount === undefined || following === undefined ? (
                        <Skeleton width={256} height={24}/>
                    ) : (
                        <>
                            <p className="mr-10">
                                <span className="font-bold">{totalPhotos}</span> photos
                            </p>
                            <p className="mr-10">
                                <span className="font-bold">{followerCount}</span> {followerCount === 1 ? "follower" : "followers"}
                            </p>
                            <p className="mr-10">
                                <span className="font-bold">{following.length}</span> following
                            </p>
                        </>
                    )}
                </div>
                <div className="container flex mt-4">
                    {!fullName || fullName === undefined ? (
                        <Skeleton width={256} height={24} />
                    ) : (
                        <p className="font-medium">{fullName}</p>
                    )}
                </div>
            </div>
            <Modal 
                open={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                title="Upload Avatar">
                    <p>Tailwind CSS is the only framework that I've seen scale on large teams. It’s easy to customize, adapts to any design, and the build size is tiny.</p>
            </Modal>
        </div>
    )
}