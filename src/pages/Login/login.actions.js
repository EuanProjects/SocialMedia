import { redirect } from "react-router-dom";
const VITE_API_URL = import.meta.env.VITE_API_URL;

export async function loginPost({ request }) {
    const formData = await request.formData();
    const username = formData.get("username");
    const password = formData.get("password");
    console.log("here");
    try {
        const response = await fetch(`${VITE_API_URL}/login`, {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('socmedtoken', data.token);
            return redirect(`/profile/${data.id}`);
        } else {
            return (await response.json())
        }
    } catch (error) {
        return {error: `error fetching ${error}`}
    }
}
