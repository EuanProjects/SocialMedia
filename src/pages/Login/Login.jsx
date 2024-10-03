import { useState } from "react";
import { useLocation, Link, redirect, useActionData, Form } from "react-router-dom";

function Login() {
    const VITE_API_URL = import.meta.env.VITE_API_URL;

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const signUpSuccessful = queryParams.get("signUpSuccessful");

    const actionData = useActionData()
    return (
        <div className="w-screen h-screen">
            <h1>Social Media</h1>
            <Form method="POST">
                <h2>Login</h2>
                {actionData?.error &&
                    <div>
                        <span className="text-red-500">{actionData.error}</span>
                    </div>
                }
                {
                    signUpSuccessful &&
                    <span className="text-green-500">Profile created!</span>
                }
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        placeholder="enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="enter your password"
                        data-testid="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <button type="submit">Submit</button>
                    <button type="submit">Demo User</button>
                </div>
            </Form>
            <Link to="/sign-up">Sign up</Link>
        </div>
    );
}

export default Login;
