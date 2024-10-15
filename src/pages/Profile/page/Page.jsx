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
                <div className="col-span-3 bg-white w-full h-screen grid grid-cols-3 p-2">
                    <div className="p-2">
                        <div className="grid">
                            <span className="font-bold">Username</span>
                            <span>{profile.username}</span>
                        </div>
                        <div className="grid">
                            <span className="font-bold">Name</span>
                            <span>{profile.name}</span>
                        </div>

                    </div>
                    <div className="col-span-2 p-2">
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