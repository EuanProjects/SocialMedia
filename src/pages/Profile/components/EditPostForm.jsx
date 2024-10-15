import { useState } from "react";
import { MessageSquare, X } from "react-feather";
import { Form } from "react-router-dom"

export default function EditPostForm({ post, handleDisplayEditPostFormModal, handleDisplayMenu }) {
    const grid = post?.public ? 'grid-cols-3' : 'grid-col-2';
    const [postCaption, setPostCaption] = useState(post?.caption)

    const handleCloseModal = () => {
        handleDisplayEditPostFormModal();
        handleDisplayMenu();
    };

    return (
        <>
            <div className="grid w-full h-full absolute place-items-center top-0 left-0">
                <div className="absolute inset-0 bg-deepSpaceBlack opacity-50"></div>
                <Form method="POST" onSubmit={handleCloseModal}
                    className="w-1/2 bg-metallicGray rounded-lg p-4 absolute grid grid-rows-[64px_auto_auto] z-50 gap-2">
                    <div className="relative flex justify-center items-center w-full border-b-2 pb-2 border-deepSpaceBlack">
                        <h2 className="text-center">Edit {post.author.username}'s Post</h2>
                        <button
                            className="absolute top-0 right-0 rounded-full bg-metallicGray"
                            onClick={handleDisplayEditPostFormModal}
                        >
                            <X />
                        </button>
                    </div>
                    <div className="overflow-auto py-4">
                        <input className="hidden" type="text" name="postId" value={post.id} readOnly/>
                        <textarea
                            className="w-full bg-metallicGray border-0 focus:outline-none focus:ring-0 text-astronautWhite"
                            name="caption"
                            id="caption"
                            rows={2}
                            value={postCaption}
                            onChange={(e) => setPostCaption(e.target.value)}
                        ></textarea>
                    </div>
                    <div>
                        <div className="h-8"></div>
                        <div><button className="w-full rounded-lg bg-rocketRed h-8" name="intent" value="editPost" type="submit">Post</button></div>
                    </div>
                </Form >
            </div>
        </>
    )
}