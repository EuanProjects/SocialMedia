function SignUp() {
    return (
        <>
        <div className="w-screen h-screen">
            <h1>Social Media</h1>
            <form action="">
                <div>
                    <label htmlFor="username">Username</label>
                    <input id="username" type="text" placeholder="enter your username"/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" placeholder="enter your password"/>
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input id="confirmPassword" type="password" placeholder="confirm your password"/>
                </div>
                <button>Submit</button>
            </form>
        </div>
        </>
    );
}

export default SignUp;
