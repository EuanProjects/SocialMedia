export async function settingsLoader({ params }) {
    try {
        const user = await getProfile(params);
        return { user };
    } catch (error) {
        console.error('Failed to load profile:', error);
        return { user: null, error: error.message };
    }
}


async function getProfile(params) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/user/${params.profileId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const user = await response.json();
        return user;
    } catch (error) {
        console.error('Failed to load profile:', error);
        return null;
    }
}