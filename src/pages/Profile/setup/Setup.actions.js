import { redirect } from "react-router-dom";

export async function setupAction({ params, request }) {
    const VITE_API_URL = import.meta.env.VITE_API_URL;
    const profileId = params.profileId;
    const formData = await request.formData()
    const name = `${formData.get("firstname")} ${formData.get("lastname")}`
    try {
        const updateResponse = await fetch(`${VITE_API_URL}/user/${profileId}`, {
            mode: 'cors',
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                setup: true
            })
        })

        if (!updateResponse.ok) {
            throw new Error('Network response was not ok');
        } else {
            return redirect(`/profile/${profileId}/feed`);
        }

    } catch (error) {
        console.error('Failed to setup profile:', error);
        return redirect(`/profile/${profileId}/setup`)
    }

}