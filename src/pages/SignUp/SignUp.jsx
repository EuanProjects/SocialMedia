import { useState } from "react";
import { Link, Form, useActionData } from "react-router-dom";

function SignUp() {
    const VITE_API_URL = import.meta.env.VITE_API_URL;
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const actionData = useActionData();

    return (
        <div className="w-screen h-screen bg-deepSpaceBlack grid place-items-center">
            <div className="text-white">
                <h1 className="text-astronautWhite font-extrabold text-4xl text-center">Social Media</h1>
                <Form className="text-astronautWhite flex flex-col gap-4" method="POST">
                    <h2 className="text-center text-2xl font-bold">Sign Up</h2>
                    {actionData?.error &&
                        <div>
                            <span className="text-red-500">{actionData.error}</span>
                        </div>
                    }
                    <div className="grid gap-2">
                        <div className="grid items-center">
                            <label htmlFor="username" className="text-left font-bold">Username</label>
                            <input
                                className="col-span-2 rounded-md px-2 text-deepSpaceBlack"
                                id="username"
                                name="username"
                                type="text"
                                placeholder="enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid">
                            <label htmlFor="password" className="text-left font-bold">Password</label>
                            <input
                                className="col-span-2 rounded-md px-2 text-deepSpaceBlack"
                                id="password"
                                name="password"
                                type="password"
                                placeholder="enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid">
                            <label htmlFor="confirmPassword" className="text-left font-bold">Confirm Password</label>
                            <input
                                className="col-span-2 rounded-md px-2 text-deepSpaceBlack"
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                placeholder="confirm your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <button
                        className="mt-4 px-4 py-2 bg-astralBlue text-white rounded-md w-full"
                        type="submit"
                    >
                        Submit
                    </button>
                </Form>
                <div className="mt-2 text-center">
                    <Link to="/login" className="text-astralBlue">Log in</Link>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
