import React, { memo } from "react";
import { Link } from "react-router-dom";
import Skeleton from 'react-loading-skeleton'



const User = ({ username, fullName }) => {

    return (
        <>
            {(!username || !fullName) ? (
                <Skeleton height={61}/>
            ) : (
                <Link to={`/p/${username}`} className="grid grid-cols-4 gap-4 mb-4 items-center">
                    <div className="col-span-1 flex items-center justify-between">
                        <img 
                            className="rounded-full w-16 mr-3"
                            src={`images/avatars/${username}.jpg`}
                            alt="My Profile"/>
                    </div>
                    <div className="col-span-3">
                        <p className="text-sm font-bold">{username}</p>
                        <p className="text-sm">{fullName}</p>
                    </div>
                </Link>
            )}
        </>
    )
}

export default memo(User);