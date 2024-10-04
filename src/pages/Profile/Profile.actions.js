
export async function profileAction({ request, params }) {
    const formData = await request.formData();
    const caption = formData.get("caption");
    const profileId = params.profileId;

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/post`, {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                caption: caption,
                authorId: profileId
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        } else {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Failed to load profile:', error);
        return null;
    }
} 