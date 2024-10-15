import { Form } from "react-router-dom"
export default function UserCard({ user }) {
    return (
        <>
            <div className="p-2 border-2 border-metallicGray rounded-md">
                <div className="mb-2">
                    <div>{user.name}</div>
                    <div>{user.picture}</div>
                </div>
                <Form method="POST">
                    <input className="hidden" name="id" value={user.id} readOnly />
                    <button className="mt-2 px-4 py-2 bg-astralBlue text-white rounded-md w-full" type="submit" name="intent" value="friend">Friend</button>
                </Form>
                {/* <Form method="DELETE">
                    <input className="hidden" name="id" value={user.id} />
                    <button>Friend</button>
                </Form> */}
            </div>
        </>
    )
}