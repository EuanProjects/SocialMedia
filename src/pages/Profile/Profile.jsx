import { useLoaderData } from "react-router-dom"

function Profile() {
    const data = useLoaderData()
    console.log(data)
    return (
        <h1>Profile</h1>
    )
}

export default Profile