import { Form, Link, Outlet, useLoaderData, useParams } from "react-router-dom"
import Menu from "../components/Menu"
import UserCard from "./Suggested/usercard/UserCard";
import { formatDistanceToNow } from "date-fns";
export default function Friends() {
    const { profileId } = useParams();
    const data = useLoaderData();
    const requestsSent = data.requestsSent;
    const requestsRecieved = data.requestsRecieved;
    const friends = data.friends

    return (
        <>
            <div className="grid grid-cols-5 text-white">
                <div className="cols-span-1 text-astronautWhite flex flex-col gap-2">
                    <Link className="flex items-center gap-2" to={`/profile/${profileId}/page`}>
                        <div className="bg-rocketRed h-8 w-8 rounded-full"></div>
                        <span>{data.profile.name}</span>
                    </Link>
                    {/* <Link className="flex items-center gap-2" to={`/profile/${profileId}/friends`}>
                        <div className="bg-rocketRed h-8 w-8 rounded-full"></div>
                        <span>Home</span>
                    </Link> */}
                    {/* <Link className="flex items-center gap-2" to={`/profile/${profileId}/friends/friendrequests`}>
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
                    </Link> */}
                </div>
                <div className="col-span-3 flex flex-col gap-4">
                    <div className="w-full">
                        <span className="font-bold text-2xl">Friend Requests</span>
                        <div className="p-2">
                            <span className="font-bold text-xl">Recieved</span>
                            <div className="flex gap-2 h-42 mt-2">
                                {
                                    requestsRecieved && requestsRecieved
                                        .map(requestRecieved => {
                                            const formattedDate = formatDistanceToNow(new Date(requestRecieved.date))
                                            return (
                                                <>
                                                    <Form className="p-2 border-2 border-metallicGray rounded-md" method="POST">
                                                        <div><span>{requestRecieved.requestor.name}</span></div>
                                                        <div><span>{formattedDate}</span></div>
                                                        <input className="hidden" type="text" name="requestId" value={requestRecieved.id} readOnly />
                                                        <div className="grid">
                                                            <button className="mt-2 px-4 py-2 bg-astralBlue text-white rounded-md w-full" type="submit" name="intent" value="accept">Accept Request</button>
                                                            <button className="mt-2 px-4 py-2 bg-rocketRed text-white rounded-md w-full" type="submit" name="intent" value="reject">Reject Request</button>
                                                        </div>
                                                    </Form>
                                                </>
                                            )
                                        })
                                }
                            </div>
                        </div>
                        <div className="p-2">
                            <span className="font-bold text-xl">Sent</span>
                            <div className="flex gap-2 h-30 mt-2">
                                {
                                    requestsSent && requestsSent
                                        .map(requestSent => {
                                            const formattedDate = formatDistanceToNow(new Date(requestSent.date))
                                            return (
                                                <>
                                                    <Form className="p-2 border-2 border-metallicGray rounded-md" method="DELETE">
                                                        <div><span>{requestSent.accepter.name}</span></div>
                                                        <div><span>{formattedDate}</span></div>
                                                        <input className="hidden" type="text" name="requestId" value={requestSent.id} readOnly />
                                                        <button className="mt-2 px-4 py-2 bg-rocketRed text-white rounded-md w-full" type="submit" name="intent" value="cancel">Cancel Request</button>
                                                    </Form>
                                                </>
                                            )
                                        })
                                }
                            </div>
                        </div>
                        {/* all the people that have sent requests */}
                        {/* map out friend request card */}
                    </div>
                    <div><span className="font-bold text-2xl">Friends</span></div>
                    <div className="grid grid-cols-3 grid-flow-row">
                        {
                            friends && friends.userFriends[0].friends
                                .map(friend => {
                                    return (
                                        <>
                                            <Form className="p-2 border-2 border-metallicGray rounded-md h-28 flex flex-col justify-between" method="DELETE">
                                                <div><span>{friend.name}</span></div>
                                                <input className="hidden" type="text" name="friendId" value={friend.id} readOnly />
                                                <button className="mt-2 px-4 py-2 bg-rocketRed text-white rounded-md w-full" type="submit" name="intent" value="removeFriend">Remove Friend</button>
                                            </Form>
                                        </>
                                    )
                                })
                        }
                    </div>
                </div>
                <div className="flex flex-col gap-2">

                    <h2 className="font-bold text-2xl">Suggestions</h2>
                    {data && data.users.users
                        .filter(user => user.id !== profileId)
                        .map(user => (
                            <UserCard key={user.id} user={user} />
                        ))
                    }
                </div>
            </div>
        </>
    )
}