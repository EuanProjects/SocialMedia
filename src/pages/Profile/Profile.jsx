import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"


function Profile() {
    return (
        <>
            <div className="flex flex-col w-full min-h-screen absolute top-0 p-4 bg-deepSpaceBlack gap-4">
                <Navbar />
                <Outlet />
            </div >

        </>
    )
}

export default Profile