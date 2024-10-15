import { X } from "react-feather"
import { Form } from "react-router-dom"


export default function DeletePostModal({ handleDisplayDeleteModal, postId, handleDisplayMenu }) {

    const handleCloseModal = () => {
        handleDisplayDeleteModal();
        handleDisplayMenu();
    };


    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black bg-opacity-75" />
            <div className="bg-deepSpaceBlack border-2 border-metallicGray p-6 rounded-md z-10">
                <h2 className="text-lg font-bold">Confirm Deletion</h2>
                <p>Are you sure you want to delete this post?</p>
                <Form method="DELETE" className="flex justify-end" onSubmit={handleCloseModal}>
                    <input className="hidden" type="text" name="postId" value={postId}readOnly/>
                    <div className="grid grid-cols-2 w-full gap-2 pt-2">
                        <button
                            onClick={handleDisplayDeleteModal}
                            className="bg-astralBlue text-white rounded-md p-2 w-full"
                        >
                            Cancel
                        </button>
                        <button className="bg-rocketRed text-white rounded-md p-2 hover:bg-rocketRed w-full"
                            name="intent" value="deletePost">
                            Delete
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    );

}