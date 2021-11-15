import { formatDistance } from 'date-fns'

export default function Footer({ caption, username, posted }) {
    return (
        <>
            <div className="py-2">
                <span className="mr-2 font-bold">{username}</span>
                <span>{caption}</span>
            </div>
            <p className="text-gray-500 uppercase text-xs mb-2">
            {formatDistance(posted, new Date())} ago
            </p>    
        </>
    )
}