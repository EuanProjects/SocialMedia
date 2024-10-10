import { redirect } from "react-router-dom";
const VITE_API_URL = import.meta.env.VITE_API_URL;

export async function loginPost({ request }) {
    const formData = await request.formData();
    const username = formData.get("username");
    const password = formData.get("password");
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
            if (data.setup) {
                return redirect(`/profile/${data.id}/feed`);
            } else {
                return redirect(`/profile/${data.id}/setup`)

            }
        } else {
            return (await response.json())
        }
    } catch (error) {
        return {error: `error fetching ${error}`}
    }
}
