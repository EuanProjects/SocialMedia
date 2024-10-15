import { X } from "react-feather"
import { Form } from "react-router-dom"


export default function DeletePostModal({ handleDisplayDeleteModal, postId }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black bg-opacity-75" />
            <div className="bg-metallicGray p-6 rounded-md z-10">
                <h2 className="text-lg font-bold">Confirm Deletion</h2>
                <p>Are you sure you want to delete this post?</p>
                <Form method="DELETE" className="flex justify-end" onSubmit={handleDisplayDeleteModal}>
                    <input className="hidden" type="text" name="postId" value={postId}readOnly/>
                    <button 
                        onClick={handleDisplayDeleteModal}
                        className="mr-2 border border-gray-500 rounded-md p-2 hover:bg-gray-200"
                    >
                        Cancel
                    </button>
                    <button className="ml-2 bg-red-500 text-white rounded-md p-2 hover:bg-red-600"
                        name="intent" value="deletePost">
                        Delete
                    </button>
                </Form>
            </div>
        </div>
    );

}