import { Link, useParams } from "react-router-dom"
import { Users } from "react-feather";

export default function Menu({ user }) {
    const { profileId } = useParams();
    return (
        <>
            <div className="cols-span-1 text-astronautWhite flex flex-col gap-2">
                <Link className="flex items-center gap-2" to={`/profile/${profileId}/page`}>
                    <div className="bg-rocketRed h-8 w-8 rounded-full"></div>
                    <span>{ user.name }</span>
                </Link>
                <Link className="flex items-center gap-2" to={`/profile/${profileId}/friends`}>
                    <Users size={32} />
                    <span>Friends</span>
                </Link>
            </div>
        </>
    )
}