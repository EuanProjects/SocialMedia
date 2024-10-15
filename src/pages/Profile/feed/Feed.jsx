import { useState } from "react";
import { Camera } from "react-feather";
import { useLoaderData, Link } from "react-router-dom"
import PostFormModal from "../components/PostFormModal";
import PostCard from "../components/PostCard";
import Navbar from "../../components/Navbar";
import Menu from "../components/Menu";
function Feed() {
    const data = useLoaderData();
    const [displayPostFormModal, setDisplayPostFormModal] = useState(false);
    console.log(data)

    function handleDisplayPostFormModal() {
        setDisplayPostFormModal(!displayPostFormModal)
    }
    return (
        <>
            {
                displayPostFormModal &&
                <PostFormModal handleDisplayPostFormModal={handleDisplayPostFormModal} />
            }

            <div className="grid grid-cols-5">
                <Menu user={data.user}/>

                <div className="col-span-3 flex flex-col gap-4">
                    {/* form for post */}
                    <div className="flex flex-col rounded-md border-metallicGray border-2 text-white p-4 gap-4">
                        <div className="flex gap-4">
                            <Link className="rounded-full h-8 w-8 bg-rocketRed">

                            </Link>
                            <button
                                onClick={() => handleDisplayPostFormModal()}
                                className="rounded-lg bg-astronautWhite w-full text-start px-4 text-deepSpaceBlack">What do you want to share?</button>
                        </div>
                        <div className="flex justify-center">
                            <button
                                onClick={() => handleDisplayPostFormModal()}
                                className="flex gap-4 text-astronautWhite" > <Camera className="stroke-astronautWhite" /> Start a post</button>
                        </div>
                    </div>
                    {data.posts.posts.map((post) => {
                        return <PostCard key={post.id} post={post} />
                    })}
                </div>
            </div>
        </>
    )
}

export default Feed