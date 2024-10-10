import { redirect } from "react-router-dom";

export async function settingsAction({ request, params}) {
    const VITE_API_URL = import.meta.env.VITE_API_URL;
    const formData = await request.formData()
    const intent = formData.get("intent");
    const profileId = params.profileId
    console.log(intent)
    if (intent === "update") {
        console.log("updating");
        return await putProfile(formData, profileId, VITE_API_URL);
    } else {
        console.log("deleting");
        return await deleteProfile(profileId, VITE_API_URL)
    }
}

async function putProfile(formData, profileId, VITE_API_URL) {
    const name = `${formData.get("firstname")} ${formData.get("lastname")}`
    try {
        const updateResponse = await fetch(`${VITE_API_URL}/user/${params.profileId}`, {
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
        console.error('Failed to update profile:', error);
        return redirect(`/profile/${profileId}/setttings`)
    }
}

async function deleteProfile(profileId, VITE_API_URL) {
    console.log(profileId)
    try {
        const updateResponse = await fetch(`${VITE_API_URL}/user/${profileId}`, {
            mode: 'cors',
            method: 'DELETE',
        })

        if (!updateResponse.ok) {
            throw new Error('Network response was not ok');
        } else {
            return redirect(`/login`);
        }

    } catch (error) {
        console.error('Failed to delete profile:', error);
        return redirect(`/profile/${profileId}/setttings`)
    }
}
