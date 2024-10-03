import { useState } from "react";
import { Link, redirect } from "react-router-dom";

function SignUp() {
    const VITE_API_URL = import.meta.env.VITE_API_URL;
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        if (username === "") {
            setUsernameError("Please enter a username");
        } 

        if (password === "") {
            setPasswordError("Please enter a password");
        }

        if (confirmPassword === "") {
            setConfirmPasswordError("Please confirm your password");
        }

        if (confirmPassword !== "" && password !== "" && password !== confirmPassword) {
            setConfirmPasswordError("Passwords do not match");
        }

        if (username !== "" && password !== "" && confirmPassword !== "" && confirmPassword === password) {
            console.log("here");
            setUsername("");
            setPassword("");
            setConfirmPassword("");

            // api call
            try {
                const response = await fetch(`${VITE_API_URL}/user`, {
                    method: 'POST',
                    body: JSON.stringify({ username, password }),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                console.log(response)
    
                if (response.ok) {
                    redirect("/login", { state: { signUpSuccessful: true }})
                } else {
                    setUsernameError("User does not exist");
                }
            } catch (error) {
                console.error("Error during fetch:", error);
                setUsernameError("An unexpected error occurred. Please try again.");
            }  

        }

        
    }

    return (
        <div className="w-screen h-screen">
            <h1>Social Media</h1>
            <form onSubmit={(e) => {handleSubmit(e)}}>
                <h2>Sign Up</h2>
                <div>
                    <label htmlFor="username">Username</label>
                    {
                        usernameError !== "" &&
                        <p className="text-red-500" data-testid="username-error">{usernameError}</p>
                    }
                    <input id="username" name="username" type="text" placeholder="enter your username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    {
                        passwordError !== "" &&
                        <p className="text-red-500" data-testid="password-error">{passwordError}</p>
                    }
                    <input id="password" name="password" type="password" placeholder="enter your password" data-testid="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    {
                        confirmPasswordError !== "" &&
                        <p className="text-red-500" data-testid="confirm-password-error">{confirmPasswordError}</p>
                    }
                    <input id="confirmPassword" name="confirmPassword" type="password" placeholder="confirm your password" data-testid="confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                </div>
                <button type="submit">Submit</button>
            </form>
            <Link to="/login">Log in</Link>
        </div>
    );
}

export default SignUp;
