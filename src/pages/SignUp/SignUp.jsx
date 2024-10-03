import { useState } from "react";
import { Link, redirect, Form, useActionData } from "react-router-dom";

function SignUp() {
    const VITE_API_URL = import.meta.env.VITE_API_URL;
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const actionData = useActionData()

    return (
        <div className="w-screen h-screen">
            <h1>Social Media</h1>
            <Form method="POST">
                <h2>Sign Up</h2>
                {actionData?.error &&
                    <div>
                        <span className="text-red-500">{actionData.error}</span>
                    </div>
                }
                <div>
                    <label htmlFor="password">Username</label>
                    <input
                        className="border-2 border-black"
                        id="username" name="username" type="text" placeholder="enter your username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        className="border-2 border-black"
                        id="password" name="password" type="password" placeholder="enter your password" data-testid="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        className="border-2 border-black"
                        id="confirmPassword" name="confirmPassword" type="password" placeholder="confirm your password" data-testid="confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </div>
                <button type="submit">Submit</button>
            </Form>
            <Link to="/login">Log in</Link>
        </div>
    )
}

export default SignUp;
