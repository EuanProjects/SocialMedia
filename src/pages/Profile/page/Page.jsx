import { useLoaderData } from "react-router-dom"
import PostCard from "../components/PostCard";

export default function Page() {
    const data = useLoaderData();
    const posts = data.posts;
    const profile = data.profile;
    return (
        <>
            <div className="grid grid-cols-5">
                <div></div>
                <div className="col-span-3 w-full h-screen grid grid-cols-3 p-2">
                    <div className="col-span-1 p-2 flex flex-col gap-2">
                        <div className="">
                            <span className="font-extrabold text-2xl text-astronautWhite">Profile Details</span>
                        </div>
                        <div className="p-2 border-2 border-metallicGray rounded-md">
                            <div className="grid">
                                <span className="font-bold text-astronautWhite">Username</span>
                                <span className=" text-astronautWhite">{profile.username}</span>
                            </div>
                            <div className="grid">
                                <span className="font-bold text-astronautWhite">Name</span>
                                <span className=" text-astronautWhite">{profile.name}</span>
                            </div>
                        </div>

                    </div>
                    <div className="col-span-2 p-2 flex flex-col gap-2">
                        <div className="">
                            <span className="font-extrabold text-2xl text-astronautWhite">Posts</span>
                        </div>
                        {

                            posts && posts.posts
                                .map(post => {
                                    return (
                                        <>
                                            <PostCard key={post.id} post={post} />
                                        </>
                                    )
                                })
                        }
                    </div>
                </div>
                <div></div>
            </div>
        </>
    )
}