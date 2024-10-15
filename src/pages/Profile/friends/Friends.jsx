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
            <div className="grid grid-cols-5">
                <div className="cols-span-1 text-astronautWhite flex flex-col gap-2">
                    <Link className="flex items-center gap-2" to={`/profile/${profileId}/page`}>
                        <div className="bg-rocketRed h-8 w-8 rounded-full"></div>
                        <span>First Last</span>
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
                        <span>Friend Requests</span>
                        <div>
                            <span>Recieved</span>
                            <div className="flex gap-2 h-24">
                                {
                                        requestsRecieved && requestsRecieved
                                            .map(requestRecieved => {
                                                const formattedDate = formatDistanceToNow(new Date(requestRecieved.date))
                                                return (
                                                    <>
                                                        <Form method="POST">
                                                            <div><span>{requestRecieved.requestor.name}</span></div>
                                                            <div><span>{formattedDate}</span></div>
                                                            <input className="hidden" type="text" name="requestId" value={requestRecieved.id} readOnly/>
                                                            <div className="grid">
                                                                <button type="submit" name="intent" value="accept">Accept Request</button>
                                                                <button type="submit" name="intent" value="reject">Reject Request</button>
                                                            </div>
                                                        </Form>
                                                    </>
                                                )
                                            })
                                    }
                            </div>
                        </div>
                        <div>
                            <span>Sent</span>
                            <div className="flex gap-2 h-24">
                                {
                                    requestsSent && requestsSent
                                        .map(requestSent => {
                                            const formattedDate = formatDistanceToNow(new Date(requestSent.date))
                                            return (
                                                <>
                                                    <Form method="DELETE">
                                                        <div><span>{requestSent.accepter.name}</span></div>
                                                        <div><span>{formattedDate}</span></div>
                                                        <input className="hidden" type="text" name="requestId" value={requestSent.id} readOnly/>
                                                        <button type="submit" name="intent" value="cancel">Cancel Request</button>
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
                    <div><span>friends</span></div>
                    <div className="grid grid-cols-4 grid-flow-row">
                            {
                                friends && friends.userFriends[0].friends
                                    .map(friend => {
                                        return (
                                            <>
                                            <Form method="DELETE">
                                                    <div><span>{friend.name}</span></div>
                                                    <input className="hidden" type="text" name="friendId" value={friend.id} readOnly/>
                                                <button type="submit" name="intent" value="removeFriend">Remove Friend</button>
                                            </Form>
                                            </>
                                        )
                                    })
                            }
                    </div>
                </div>
                <div>

                    <h2>Suggestions</h2>
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