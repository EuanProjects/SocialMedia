export async function profileLoader({ request, params }) {
    try {
        const [user, posts] = await Promise.all([
            getProfile(params),
            getPosts()
        ]);
        return { user, posts };
    } catch (error) {
        console.error('Failed to load profile and posts:', error);
        return { user: null, posts: null, error: error.message };
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

async function getPosts() {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/post`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const posts = await response.json();
        return posts;
    } catch (error) {
        console.error('Failed to load posts:', error);
        return null;
    }
}