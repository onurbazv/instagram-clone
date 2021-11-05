import { Link } from "react-router-dom"

export default function Header({ username }) {
    return (
        <div className="flex border-b p-4 py-8 h-4">
            <div className="flex items-center">
                <Link to={`/p/${username}`} className="flex items-center">
                    <img 
                        className="rounded-full h-8 w-8 flex mr-3"
                        src={`images/avatars/${username}.jpg`}
                        alt={`${username} avatar`}
                    />
                    <p className="font-bold">{username}</p>
                </Link>
            </div>
        </div>
    )
}