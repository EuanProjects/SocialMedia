import { CornerUpRight, MessageSquare, ThumbsUp } from "react-feather";
import { formatDistanceToNow } from 'date-fns';

function PostCard({ post }) {
    const grid = post?.public ? 'grid-cols-3' : 'grid-col-2';

    const timeAgo = formatDistanceToNow(new Date(post?.date), { addSuffix: true });
    console.log(timeAgo)

    return (
        <>
            <div className="bg-metallicGray rounded-md shadow-md p-4 gap-4 flex flex-col">
                <div className="flex gap-2">
                    <div className="h-8 w-8 rounded-full bg-rocketRed"></div>
                    <div className="text-sm">
                        <div>{post?.author?.username}</div>
                        <div>{timeAgo}</div>
                    </div>
                </div>
                <div>
                    <div>{post?.caption}</div>
                </div>
                <div>
                    <div>{post?.picture}</div>
                </div>
                <div className={`grid ${grid} text-center`}>
                    <div className="flex flex-grow items-center justify-center gap-2"><ThumbsUp size={16} /> Like</div>
                    <div className="flex flex-grow items-center justify-center gap-2"><MessageSquare size={16} /> Comment</div>
                    {post?.public && (
                        <button className="flex flex-grow items-center justify-center gap-2"><CornerUpRight size={16} /> Share</button>
                    )}
                </div>
            </div>
        </>
    )
}

export default PostCard