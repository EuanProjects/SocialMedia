import { Form, useLoaderData } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState } from "react";

export default function Settings() {
    const [displayDeleteConfirmation, setDisplayDeleteConfirmation] = useState(false);
    const data = useLoaderData();
    const names = data.user.name.split(" ");
    // Fix this later this does not do the right thing
    const [firstName, setFirstName] = useState(names[0])
    const [lastName, setLastName] = useState(names[1])
    console.log(names[0] !== firstName || names[1] !== lastName)

    function handleDisplayDeleteConfirmation() {
        setDisplayDeleteConfirmation(!displayDeleteConfirmation)
    }
    return (
        <>
            <Navbar />
            <h2>Settings</h2>
            <Form method="PUT">
                <div>
                    <input className="rounded-full border-2 border-black h-32 w-32" type="file" />
                </div>
                <div>
                    <label htmlFor="firstname">First Name</label>
                    <input name="firstname" id="firstname" value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" />
                </div>
                <div>
                    <label htmlFor="lastname">LastName</label>
                    <input name="lastname" id="lastname" value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" />
                </div>
                {(names[0] !== firstName || names[1] !== lastName) &&
                    <button name="intent" value="update">Confirm</button>
                }
            </Form>
            <button
                onClick={handleDisplayDeleteConfirmation}
                className="bg-rocketRed"
                type="button">Delete Profile</button>
            {displayDeleteConfirmation &&
                <Form method="DELETE">
                    <div>Are you sure?</div>
                    <button type="submit" name="intent" value="delete">Yes</button>
                </Form>
            }
        </>
    )
}