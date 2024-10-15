import { Form } from "react-router-dom"

function Setup() {
    return (
        <>
            <div className="grid w-full place-items-center">
                <h2 className="text-astronautWhite font-extrabold text-4xl text-center">Setup</h2>
                <Form className="text-astronautWhite flex flex-col gap-2" method="PUT">
                    {/* <div>
                        <input className="rounded-full border-2 border-black h-32 w-32" type="file" />
                    </div> */}
                    <div className="grid gap-2">
                        <label htmlFor="firstname">First Name</label>
                        <input className="col-span-2 rounded-md px-2 text-deepSpaceBlack" name="firstname" id="firstname" type="text" />
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="lastname">Last Name</label>
                        <input className="col-span-2 rounded-md px-2 text-deepSpaceBlack" name="lastname" id="lastname" type="text" />
                    </div>
                    <button className="mt-2 px-4 py-2 bg-astralBlue text-white rounded-md w-full">Confirm</button>
                </Form>
            </div>
        </>
    )
}

export default Setup