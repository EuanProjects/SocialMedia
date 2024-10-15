import { Form } from "react-router-dom"
export default function UserCard({ user }) {
    return (
        <>
            <h2>UserCard</h2>
            <div>{user.name}</div>
            <div>{user.picture}</div>
            <Form method="POST">
                <input className="hidden" name="id" value={user.id} readOnly />
                <button className=" border-2 border-metallicGray rounded-sm" type="submit" name="intent" value="friend">Friend</button>
            </Form>
            {/* <Form method="DELETE">
                <input className="hidden" name="id" value={user.id} />
                <button>Friend</button>
            </Form> */}
        </>
    )
}