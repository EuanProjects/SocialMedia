import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const navigate = useNavigate();

    const location = useLocation();
    const { signUpSuccessful } = location.state || {};

    async function handleSubmit(e) {
        e.preventDefault();

        // Clear previous errors
        setUsernameError("");
        setPasswordError("");

        let hasError = false;

        if (username === "") {
            setUsernameError("Please enter username");
            hasError = true;
        }

        if (password === "") {
            setPasswordError("Please enter password");
            hasError = true;
        }

        if (hasError) {
            return;
        }

        try {
            const response = await fetch(`/api/login`, {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                navigate("/profile");
            } else {
                setUsernameError("User does not exist");
            }
        } catch (error) {
            // Handle network or other errors
            console.error("Error during fetch:", error);
            setUsernameError("An unexpected error occurred. Please try again.");
        }
    }

    return (
        <div className="w-screen h-screen">
            <h1>Social Media</h1>
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                {
                    signUpSuccessful &&
                    <span className="text-green-500">Profile created!</span>
                }
                <div>
                    <label htmlFor="username">Username</label>
                    {usernameError && <p className="text-red-500" data-testid="username-error">{usernameError}</p>}
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
                    {passwordError && <p className="text-red-500" data-testid="password-error">{passwordError}</p>}
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
                    {/* Handle the Demo User button separately if needed */}
                    {/* <button type="button" onClick={handleDemoUser}>Demo User</button> */}
                </div>
            </form>
        </div>
    );
}

export default Login;
