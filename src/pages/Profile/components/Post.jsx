import { X, ThumbsUp, CornerUpRight, MessageSquare } from "react-feather"
import { Form } from "react-router-dom";

function Post({ post, handleDisplayPostModal }) {
    const grid = post?.public ? 'grid-cols-3' : 'grid-col-2';

    const handleCloseModal = () => {
        handleDisplayPostModal();
    };

    return (

        <div className="grid w-screen h-screen absolute place-items-center top-0 left-0">
            <div className="absolute inset-0 bg-deepSpaceBlack opacity-50"></div>
            <div onSubmit={handleCloseModal}

                className="w-1/2 bg-metallicGray rounded-lg p-4 absolute grid grid-rows-[64px_auto_auto] z-50 gap-2">
                <div className="relative flex justify-center items-center w-full border-b-2 pb-2 border-deepSpaceBlack">
                    <h2 className="text-center">{post.author.username}'s Post</h2>
                    <button
                        className="absolute top-0 right-0 rounded-full bg-metallicGray"
                        onClick={handleDisplayPostModal}
                    >
                        <X />
                    </button>
                </div>
                <div>
                    <div className="min-h-16 py-4">
                        {post.caption}
                    </div>
                    <div>
                        {
                            post.comments?.map((comment) => {
                                return (<>
                                    {/* replace with the comment card */}
                                    <div className="bg-lightGray rounded-md">
                                        {comment.content}
                                    </div>
                                </>)
                            })
                        }
                    </div>
                    <div className={`grid ${grid} text-center`}>
                        <div className="flex flex-grow items-center justify-center gap-2"><ThumbsUp size={16} /> Like</div>
                        {/* focus on the comment field */}
                        <button
                            onClick={handleDisplayPostModal}
                            className="flex flex-grow items-center justify-center gap-2">
                            <MessageSquare size={16} /> Comment
                        </button>
                        {post?.public && (
                            <button className="flex flex-grow items-center justify-center gap-2"><CornerUpRight size={16} /> Share</button>
                        )}
                    </div>
                </div>

                <Form className="" method="POST">
                    <textarea
                        className="w-full px-2 bg-astronautWhite rounded-md"
                        name="content" id=""
                        placeholder="Write a comment..."></textarea>
                        <input type="hidden" name="postId" value={post.id} />
                    <div><button className="w-full rounded-lg bg-rocketRed h-8" name="intent" value="comment" type="submit">Comment</button></div>
                </Form>
            </div >
        </div>
    )
}

export default Post