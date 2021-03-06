import React, { memo } from "react";
import { Link } from "react-router-dom";
import Skeleton from 'react-loading-skeleton'



const User = ({ username, fullName, avatar }) => {

    return (
        <>
            {(!username || !fullName) ? (
                <Skeleton height={61}/>
            ) : (
                <Link to={`/p/${username}`} className="grid grid-cols-2 grid-cols-4 gap-4 mb-4 items-center">
                    <div className="flex items-center justify-between w-max">
                        <img 
                            className="rounded-full w-16 h-16 mr-3 object-cover"
                            src={avatar}
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