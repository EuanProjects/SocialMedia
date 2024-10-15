import { X } from "react-feather"
import { Form } from "react-router-dom"

function PostFormModal({ handleDisplayPostFormModal }) {
    const handleCloseModal = () => {
        handleDisplayPostFormModal();
    };

    return (
        <div className="grid w-full h-full absolute place-items-center top-0 left-0">
                <div className="absolute inset-0 bg-deepSpaceBlack opacity-50 z-20"></div>
            <Form
                onSubmit={handleCloseModal}
                method="POST" 
                className="w-1/2 bg-deepSpaceBlack border-2 border-metallicGray rounded-lg p-4 absolute grid grid-rows-[64px_auto_auto] z-50 gap-2">
                <div className="relative flex justify-center items-center w-full border-b-2 pb-2 border-deepSpaceBlack">
                    <h2 className="text-center text-astronautWhite">Create Post</h2>
                    <button
                        className="absolute top-0 right-0 rounded-full"
                        onClick={handleDisplayPostFormModal}
                        type="button"
                    >
                        <X className="stroke-astronautWhite"/>
                    </button>
                </div>
                <div className="overflow-auto py-4">
                    <textarea
                        className="w-full border-0 focus:outline-none focus:ring-0  bg-astronautWhite text-deepSpaceBlack p-2 rounded-sm"
                        name="caption"
                        id="caption"
                        placeholder="What do you want to share?"
                        rows={2}
                    ></textarea>
                </div>
                <div>
                    <div className="h-8"></div>
                    <div><button className="w-full rounded-lg bg-astralBlue p-2" name="intent" value="post" type="submit">Post</button></div>
                </div>
            </Form>
        </div>
    )
}

export default PostFormModal