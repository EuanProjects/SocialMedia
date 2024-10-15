import { CornerUpRight, MessageSquare, MoreHorizontal, ThumbsUp, X } from "react-feather";
import { format, formatDistanceToNow } from 'date-fns';
import { useState } from "react";
import Post from "./Post";
import EditPostForm from "./EditPostForm";
import DeletePostModal from "./DeletePostModal";
import { useParams } from "react-router-dom";

function PostCard({ post }) {
    const [displayPostModal, setDisplayPostModal] = useState(false);
    const [displayEditPostModal, setDisplayEditPostModal] = useState(false);
    const [displayMenu, setDisplayMenu] = useState(false);
    const [displayDeleteModal, setDisplayDeleteModal] = useState(false)
    const grid = post?.public ? 'grid-cols-3' : 'grid-col-2';

    const params = useParams();
    const profileId = params.profileId;

    const timeAgo = formatDistanceToNow(new Date(post?.date), { addSuffix: true });
    const datePosted = format(new Date(post?.date), 'MMM d, yyyy');


    function handleDisplayPostModal() {
        setDisplayPostModal(!displayPostModal)
    }

    function handleDisplayEditPostModal() {
        setDisplayEditPostModal(!displayEditPostModal)
    }

    function handleDisplayMenu() {
        setDisplayMenu(!displayMenu)
    }

    function handleDisplayDeleteModal() {
        setDisplayDeleteModal(!displayDeleteModal)
    }

    return (
        <>
            <div className="border-metallicGray border-2 text-astronautWhite rounded-md shadow-md p-4 gap-4 flex flex-col">
                <div className="flex gap-2 justify-between">
                    <div className="flex gap-2">
                        <div className="h-8 w-8 rounded-full bg-rocketRed"></div>
                        <div className="group">
                            <div>{post?.author?.username}</div>
                            <div className="time-ago hover:cursor-pointer relative">
                                {timeAgo}
                            </div>
                            {/* <div className="absolute left-0 bottom-[-20px] opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                                {datePosted}
                            </div> */}
                        </div>
                    </div>
                    {
                        post.author.id === profileId &&
                        <div className="relative">
                            <button className=""
                                onClick={handleDisplayMenu}>
                                <MoreHorizontal className="stroke-astronautWhite fill-astronautWhite"/>
                            </button>
                            {
                                displayMenu &&
                                <>
                                    <div className="absolute bg-metallicGray border-metallicGray rounded-md p-4">
                                        <button onClick={handleDisplayEditPostModal}>Edit</button>
                                        <button onClick={handleDisplayDeleteModal}>Delete</button>
                                    </div>
                                </>
                            }
                        </div>
                    }
                </div>
                <div>
                    <div>{post?.caption}</div>
                </div>
                <div>
                    <div>{post?.picture}</div>
                </div>
                <div className={`grid ${grid} text-center`}>
                    <div className="flex flex-grow items-center justify-center gap-2 invisible"><ThumbsUp size={16} /> Like</div>
                    {/* <button
                        onClick={handleDisplayPostModal}
                        className="flex flex-grow items-center justify-center gap-2">
                        <MessageSquare size={16} /> Comment
                    </button> */}
                    {post?.public && (
                        <button className="flex flex-grow items-center justify-center gap-2 invisible"><CornerUpRight size={16} /> Share</button>
                    )}
                </div>
                {
                    displayPostModal &&
                    <Post post={post} handleDisplayPostModal={handleDisplayPostModal} />
                }
                {
                    displayEditPostModal &&
                    <EditPostForm post={post} handleDisplayEditPostFormModal={handleDisplayEditPostModal} handleDisplayMenu={handleDisplayMenu}/>
                }
                {
                    displayDeleteModal &&
                    <DeletePostModal handleDisplayDeleteModal={handleDisplayDeleteModal} postId={post.id} />
                }
            </div>
        </>
    )
}

export default PostCard