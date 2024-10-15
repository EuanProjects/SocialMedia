import { CornerUpRight, MessageSquare, ThumbsUp } from "react-feather";
import { format, formatDistanceToNow } from 'date-fns';
import { useState } from "react";
import Post from "./Post";

function PostCard({ post }) {
    const [displayPostModal, setDisplayPostModal] = useState(false);
    const grid = post?.public ? 'grid-cols-3' : 'grid-col-2';

    const timeAgo = formatDistanceToNow(new Date(post?.date), { addSuffix: true });
    const datePosted = format(new Date(post?.date), 'MMM d, yyyy');


    function handleDisplayPostModal() {
        setDisplayPostModal(!displayPostModal)
    }

    return (
        <>
            <div className="bg-metallicGray rounded-md shadow-md p-4 gap-4 flex flex-col">
                <div className="flex gap-2">
                    <div className="h-8 w-8 rounded-full bg-rocketRed"></div>
                    <div className="relative group">
                        <div>{post?.author?.username}</div>
                        <div className="time-ago hover:cursor-pointer relative">
                            {timeAgo}
                        </div>
                        <div className="absolute left-0 bottom-[-20px] opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                            {datePosted}
                        </div>
                    </div>
                </div>
                <div>
                    <div>{post?.caption}</div>
                </div>
                <div>
                    <div>{post?.picture}</div>
                </div>
                <div className={`grid ${grid} text-center`}>
                    <div className="flex flex-grow items-center justify-center gap-2 invisible"><ThumbsUp size={16} /> Like</div>
                    <button
                        onClick={handleDisplayPostModal}
                        className="flex flex-grow items-center justify-center gap-2">
                        <MessageSquare size={16} /> Comment
                    </button>
                    {post?.public && (
                        <button className="flex flex-grow items-center justify-center gap-2 invisible"><CornerUpRight size={16} /> Share</button>
                    )}
                </div>
                {
                    displayPostModal &&
                    <Post post={post} handleDisplayPostModal={handleDisplayPostModal}/>
                }
            </div>
        </>
    )
}

export default PostCard