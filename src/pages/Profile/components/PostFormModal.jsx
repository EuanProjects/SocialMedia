import { X } from "react-feather"
import { Form } from "react-router-dom"

function PostFormModal({ handleDisplayPostFormModal }) {
    const handleCloseModal = () => {
        handleDisplayPostFormModal();
    };

    return (
        <div className="grid w-screen h-screen absolute place-items-center">
            <div className="absolute inset-0 bg-deepSpaceBlack opacity-50"></div>
            <Form
                onSubmit={handleCloseModal}
                method="POST" 
                className="w-1/2 bg-metallicGray rounded-lg p-4 absolute grid grid-rows-[64px_min(124px)_64px] z-50">
                <div className="relative flex justify-center items-center w-full border-b-2 pb-2 border-deepSpaceBlack">
                    <h2 className="text-center">Create Post</h2>
                    <button
                        className="absolute top-0 right-0 rounded-full bg-metallicGray"
                        onClick={handleDisplayPostFormModal}
                        type="button"
                    >
                        <X />
                    </button>
                </div>
                <div className="overflow-auto py-4">
                    <textarea
                        className="w-full bg-metallicGray border-0 focus:outline-none focus:ring-0 text-astronautWhite"
                        name="caption"
                        id="caption"
                        placeholder="What do you want to share?"
                        rows={2}
                    ></textarea>
                </div>
                <div>
                    <div className="h-8"></div>
                    <div><button className="w-full rounded-lg bg-rocketRed h-8" name="intent" value="post" type="submit">Post</button></div>
                </div>
            </Form>
        </div>
    )
}

export default PostFormModal