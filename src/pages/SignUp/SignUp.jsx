import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const navigate = useNavigate();

    function handleSubmit(e) {
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
            navigate("/login", { state: { signUpSuccessful: true }})
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
        </div>
    );
}

export default SignUp;
