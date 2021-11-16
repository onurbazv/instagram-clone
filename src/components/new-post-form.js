import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Uploader from './uploader'
import { createNewPost } from '../services/firebase'

export default function NewPostForm({userId, username}) {
    const [postSrc, setPostSrc] = useState("")
    const [caption, setCaption] = useState("")
    const [postId, setPostId] = useState("")
    const history = useHistory()

    const handleSuccesfulUpload = async (url, id) => {
        setPostSrc(url)
        setPostId(id)
    }

    const handleSubmit = async () => {
        if (postId !== undefined && caption !== "" && postSrc !== undefined) {
            await createNewPost(caption, postId, userId, postSrc)
            const profilePath = `/p/${username}`
            profilePath === history.location.pathname ? window.location.reload() : history.push(profilePath)
        }
    }

    return (
        <div className="flex flex-col max-w-screen-md">
            {postSrc === "" ? (
                <Uploader basePath="posts/" onSuccess={handleSuccesfulUpload}/>
            ) : (
                <img src={postSrc} alt="uploaded file"/>
            )}
            <label className="mt-4 mb-2">Post Title:</label>
            <input
                className="px-2 py-2 placeholder-gray-400 text-gray-600 bg-white bg-white rounded~
                text-base border border-gray-400 outline-none focus:outline-none focus:ring w-full"
                name="title"
                type="text"
                value={caption}
                onChange={({target}) => setCaption(target.value)}/>
            <button
                onClick={handleSubmit}
                disabled={postSrc === "" || caption === ""}
                className="mt-2 bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg
                outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                    Submit
            </button>
        </div>
    )
}

