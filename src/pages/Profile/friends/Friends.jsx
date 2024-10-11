import { Link, Outlet, useParams } from "react-router-dom"
import Menu from "../components/Menu"


export default function Friends() {
    const { profileId } = useParams();
    return (
        <>
            <div className="grid grid-cols-5">
                <div className="cols-span-1 text-astronautWhite flex flex-col gap-2">
                    <Link className="flex items-center gap-2" to={`/profile/${profileId}/page`}>
                        <div className="bg-rocketRed h-8 w-8 rounded-full"></div>
                        <span>First Last</span>
                    </Link>
                    <Link className="flex items-center gap-2" to={`/profile/${profileId}/friends`}>
                        <div className="bg-rocketRed h-8 w-8 rounded-full"></div>
                        <span>Home</span>
                    </Link>
                    <Link className="flex items-center gap-2" to={`/profile/${profileId}/friends/friendrequests`}>
                        <div className="bg-rocketRed h-8 w-8 rounded-full"></div>
                        <span>Friend Requests</span>
                    </Link>
                    <Link className="flex items-center gap-2" to={`/profile/${profileId}/friends/suggested`}>
                        <div className="bg-rocketRed h-8 w-8 rounded-full"></div>
                        <span>Suggestions</span>
                    </Link>
                    <Link className="flex items-center gap-2" to={`/profile/${profileId}/friends/allfriends`}>
                        <div className="bg-rocketRed h-8 w-8 rounded-full"></div>
                        <span>All Friends</span>
                    </Link>
                </div>
                <div className="col-span-3 flex flex-col gap-4">
                    <Outlet />
                </div>
            </div>
        </>
    )
}