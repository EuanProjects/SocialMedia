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

    function handleDisplayDeleteConfirmation() {
        setDisplayDeleteConfirmation(!displayDeleteConfirmation)
    }
    return (
        <>
            <div className="grid grid-cols-5">
                <div></div>
                <div className="col-span-3 grid justify-center gap-4">
                    <h2 className="font-bold text-4xl text-astronautWhite">Settings</h2>
                    <Form method="PUT">
                        {/* <div>
                            <input className="rounded-full border-2 border-black h-32 w-32" type="file" />
                        </div> */}
                        <div className="flex my-2 gap-2">
                            <label className="text-astronautWhite" htmlFor="firstname">First Name</label>
                            <input className="text-deepSpaceBlack px-2 rounded-md" name="firstname" id="firstname" value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" />
                        </div>
                        <div className="flex my-2 gap-2">
                            <label className="text-astronautWhite" htmlFor="lastname">Last Name</label>
                            <input className="text-deepSpaceBlack px-2 rounded-md" name="lastname" id="lastname" value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" />
                        </div>
                        {(names[0] !== firstName || names[1] !== lastName) &&
                            <button className="bg-galacticGold rounded-md p-2 w-full" name="intent" value="update">Confirm</button>
                        }
                    </Form>
                    <button
                        onClick={handleDisplayDeleteConfirmation}
                        className="bg-rocketRed rounded-md p-2"
                        type="button">Delete Profile</button>
                    {displayDeleteConfirmation &&
                        <Form className="grid gap-2" method="DELETE">
                            <div>Are you sure?</div>
                            <button className="bg-rocketRed rounded-md p-2 w-full " type="submit" name="intent" value="delete">Yes</button>
                            <button type="button" className="bg-galacticGold rounded-md p-2 w-full" onClick={handleDisplayDeleteConfirmation}>No</button>
                        </Form>
                    }
                </div>
                <div></div>
            </div>
        </>
    )
}