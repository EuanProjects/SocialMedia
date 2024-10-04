import { useState } from "react";
import { Camera } from "react-feather";
import { useLoaderData, Link, useNavigate } from "react-router-dom"
import PostModal from "./components/PostModal";
import PostCard from "./components/PostCard";

function Profile() {
    const data = useLoaderData();
    const [displayPostModal, setDisplayPostModal] = useState(false);
    const navigate = useNavigate()

    function handleLogout() {
        localStorage.removeItem('socmedtoken')
        navigate('/login')
    }

    function handleDisplayPostModal() {
        setDisplayPostModal(!displayPostModal)
    }


    return (
        <>
            <div className="flex flex-col h-screen w-screen p-4 bg-deepSpaceBlack gap-4">
                {/* the post modal? */}
                {
                    displayPostModal &&
                    <PostModal handleDisplayPostModal={handleDisplayPostModal} />
                }
                <div className="grid grid-cols-5">
                    <div className="col-span-1">
                        <h1 className="text-4xl font-bold text-astronautWhite">Social Media</h1>
                    </div>
                    <div className="grid col-span-4">
                        <button className="justify-self-end text-astronautWhite" onClick={handleLogout}>logout</button>
                    </div>
                </div>


                <div className="grid grid-cols-5">
                    <div className="cols-span-1">
                        {/* navigation */}
                    </div>
                    <div className="col-span-3 flex flex-col gap-4">
                        {/* form for post */}
                        <div className="flex flex-col rounded-md bg-metallicGray p-4 gap-4">
                            <div className="flex gap-4">
                                <Link className="rounded-full h-8 w-8 bg-rocketRed">

                                </Link>
                                <button
                                    onClick={() => handleDisplayPostModal()}
                                    className="rounded-lg bg-astronautWhite w-full text-start px-4 text-deepSpaceBlack">What do you want to share?</button>
                            </div>
                            <div className="flex justify-center">
                                <button
                                    onClick={() => handleDisplayPostModal()}
                                    className="flex gap-4 text-astronautWhite" > <Camera className="stroke-astronautWhite" /> Start a post</button>
                            </div>
                        </div>
                        {data.posts.posts.map((post) => {
                            return <PostCard key={post.id} post={post} />
                        })}
                    </div>
                </div>
            </div >
        </>
    )
}

export default Profile