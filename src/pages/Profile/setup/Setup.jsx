import { Form } from "react-router-dom"

function Setup() {
    return (
        <>
            <h2>setup</h2>
            <Form method="PUT">
                <div>
                    <input className="rounded-full border-2 border-black h-32 w-32" type="file" />
                </div>
                <div>
                    <label htmlFor="firstname">First Name</label>
                    <input name="firstname" id="firstname" type="text" />
                </div>
                <div>
                    <label htmlFor="lastname">LastName</label>
                    <input name="lastname" id="lastname" type="text" />
                </div>
                <button>Confirm</button>
            </Form>
        </>
    )
}

export default Setup