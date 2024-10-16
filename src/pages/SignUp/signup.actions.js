import { redirect } from "react-router-dom";

const VITE_API_URL = import.meta.env.VITE_API_URL

export async function signupPost ({ request }) {
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

        if (response.ok) {
            return redirect("/login?signUpSuccessful=true")
        } else {
            return (await response.json())
        }
    } catch (error) {
        return {error: `error fetching ${error}`}
    }
}
