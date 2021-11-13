import { useState, useEffect, useContext } from 'react'
import useUser from "../../hooks/use-user"
import UserContext from '../../context/user';
import { updateFollowedUserFollowers, updateUserFollowing, updateUserAvatar } from '../../services/firebase';
import Skeleton from "react-loading-skeleton"
import Modal from '../modal';
import Uploader from '../uploader'
import FollowList from './follow-list'

export default function Header({
    totalPhotos,
    followerCount,
    profile  : { docId, userId, username, fullName, following, avatar, followers, emailAddress, dateCreated },
    dispatch
}) {
    const { user } = useUser();
    const { user: loggedInUser } = useContext(UserContext)
    const [isFollowingProfile, setIsFollowingProfile] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modal, setModal] = useState({title: "", intent: ""})
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

    const handleUploadAvatar = async (url) => {
        updateUserAvatar(user.docId, url)
        dispatch({profile: {
            docId,
            userId,
            username,
            fullName,
            following,
            followers,
            emailAddress,
            dateCreated,
            avatar: url,
        }})
        setIsModalOpen(false)
    }

    return (
        <div className="flex sm:grid sm:grid-cols-3 gap-4 sm:justify-between mx-auto sm:max-w-screen-lg items-center">
            <div className="container flex justify-center w-max sm:justify-self-end sm:mr-10">
                <img 
                    className={`rounded-full h-28 w-28 sm:h-40 sm:w-40 flex ${isUserProfile && "cursor-pointer"} object-cover`}
                    src={avatar}
                    alt={`${username} avatar`}
                    onClick={isUserProfile ?  () => {
                        setIsModalOpen(true)
                        setModal({title: "Change Avatar", intent: "change_avatar"})
                    } : null}/>
            </div>
            <div className="flex items-center justify-center flex-col sm:col-span-2">
                <div className="container flex items-center order-0">
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
                <div className="container flex flex-col sm:flex-row mt-2 sm:mt-4 order-2 sm:order-none">
                    {followerCount === undefined || following === undefined ? (
                        <Skeleton width={256} height={24}/>
                    ) : (
                        <>
                            <p className="sm:mr-10">
                                <span className="font-bold">{totalPhotos}</span> photos
                            </p>
                            <p className="sm:mr-10" onClick={followers.length > 0 ? () => {
                                setIsModalOpen(true)
                                setModal({title: `Users following ${username}`, intent: "follower_list"})
                            } : null}>
                                <span className="font-bold">{followerCount}</span> {followerCount === 1 ? "follower" : "followers"}
                            </p>
                            <p className="sm:mr-10" onClick={following.length > 0 ? () => {
                                setIsModalOpen(true)
                                setModal({title: `Users ${username} follows`, intent: "following_list"})
                            }: null}>
                                <span className="font-bold">{following.length}</span> following
                            </p>
                        </>
                    )}
                </div>
                <div className="container flex mt-4 order-1 sm:order-none">
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
                title={modal.title}>
                
                    {modal.intent === "change_avatar" && <Uploader basePath="images/avatars/" onSuccess={handleUploadAvatar}/>}
                    {modal.intent === "following_list" && <FollowList list={following} userId={user.userId} followingList={user.following} closeModal={() => setIsModalOpen(false)}/>}
                    {modal.intent === "follower_list" && <FollowList list={followers} userId={user.userId} followingList={user.following} closeModal={() => setIsModalOpen(false)}/>}

            </Modal>
        </div>
    )
}