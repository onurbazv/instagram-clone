import React from "react"
import useUser from "../../hooks/use-user"

export default function Sidebar() {
    const { user: { userId, username, fullName } = {} } = useUser();
    console.log(fullName)
    return (
        <div className="p-4">
            <p>I'm a Sidebar</p>
        </div>
    )
}