import { useContext } from "react"

import User from "./user"
import Suggestions from './suggestions';
import UserContext from "../../context/user";


export default function Sidebar() {
    const { user: { userId, username, fullName, following, avatar } = {} } = useContext(UserContext);

    return (
        <div className="container p-4 order-first sm:order-last">
            <User fullName={fullName} username={username} avatar={avatar}/>
            <Suggestions userId={userId} following={following}/>
        </div>
    )
}