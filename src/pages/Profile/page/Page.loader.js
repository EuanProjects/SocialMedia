export async function pageLoader({ params }) {
    const profileId = params.profileId
    try {
        const [posts, profile] = await Promise.all([
            getPosts(profileId),
            getProfile(profileId)
        ]);

        return { posts, profile };
    } catch (error) {
        console.error('Failed to load posts:', error);
        return { users: null, getRequestsSent: null, error: error.message };
    }
}

async function getPosts(profileId) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/post/${profileId}/page`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const users = await response.json();
        return users;
    } catch (error) {
        console.error('Failed to load profile:', error);
        return null;
    }
}

async function getProfile(profileId) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/user/${profileId}`);
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