
export async function profileLoader({ params }) {
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