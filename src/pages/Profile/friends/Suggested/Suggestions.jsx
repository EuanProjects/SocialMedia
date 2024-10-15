import { useLoaderData } from "react-router-dom"
import UserCard from "./usercard/UserCard"

export default function Suggestions() {
    const users = useLoaderData()
    console.log(users)
    return (
        <>
            <h2>Suggestions</h2>
            {users && users.users.map((user) => (
                <UserCard key={user.id} user={user}/>
            ))}
        </>
    )
}