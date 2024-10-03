import { redirect } from "react-router-dom";

const VITE_API_URL = import.meta.env.VITE_API_URL

export const signupPost = async ({ request }) => {
    const formData = await request.formData();
    const username = formData.get("username");
    const password = formData.get("password");

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
            return redirect("/login", { state: { signUpSuccessful: true } })
        } else {
            return (await response.json())
        }
    } catch (error) {
        return {error: `error fetching ${error}`}
    }
}
