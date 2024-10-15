import { useState } from "react";
import { useLocation, Link, useActionData, Form } from "react-router-dom";

function Login() {
    const VITE_API_URL = import.meta.env.VITE_API_URL;
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const signUpSuccessful = queryParams.get("signUpSuccessful");

    const actionData = useActionData();

    return (
        <div className="w-screen h-screen bg-deepSpaceBlack grid place-items-center">
            <div className="text-white">
                <h1 className="text-astronautWhite font-extrabold text-4xl text-center">Social Media</h1>
                <Form method="POST" className="text-astronautWhite flex flex-col gap-2">
                    <h2 className="text-center text-2xl font-bold">Login</h2>
                    {actionData?.error &&
                        <div>
                            <span className="text-red-500">{actionData.error}</span>
                        </div>
                    }
                    {
                        signUpSuccessful &&
                        <span className="text-green-500">Profile created!</span>
                    }
                    <div className="grid gap-2">
                        <div className="grid gap-2">
                            <label htmlFor="username" className="text-left font-bold pr-4">Username</label>
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
                            <label htmlFor="password" className="text-left font-bold pr-4">Password</label>
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
                    </div>
                    <button className="mt-2 px-4 py-2 bg-astralBlue text-white rounded-md w-full" type="submit">
                        Submit
                    </button>
                </Form>
                <div className="mt-2 text-center">
                    <Link to="/sign-up" className="text-astralBlue">Sign up</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
