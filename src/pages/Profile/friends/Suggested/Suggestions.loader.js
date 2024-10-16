export async function suggestionsLoader() {
    return await getUsers()
}

async function getUsers() {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/user`);
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

// see if you can just load user from params