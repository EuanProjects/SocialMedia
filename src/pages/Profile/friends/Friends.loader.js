export async function friendsLoader({ params }) {
    const profileId = params.profileId
    try {
        const [users, requestsSent, requestsRecieved, friends, profile] = await Promise.all([
            getUsers(profileId),
            getRequestsSent(profileId),
            getRequestsRecieved(profileId),
            getFriends(profileId),
            getProfile(profileId)
        ]);

        return { users: users, requestsSent: requestsSent, requestsRecieved: requestsRecieved, friends: friends, profile: profile};
    } catch (error) {
        console.error('Failed to load profile and posts:', error);
        return { users: null, getRequestsSent: null, error: error.message };
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

async function getUsers(profileId) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/user/${profileId}/suggested`);
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

async function getRequestsSent(profileId) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/request/${profileId}/sent`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const requestsSent = await response.json();
        return requestsSent;
    } catch (error) {
        console.error('Failed to get requests sent:', error);
        return null;
    }
}

async function getRequestsRecieved(profileId) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/request/${profileId}/recieved`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const requestsSent = await response.json();
        return requestsSent;
    } catch (error) {
        console.error('Failed to get requests recieved:', error);
        return null;
    }
}

async function getFriends(profileId) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/user/${profileId}/friends`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const requestsSent = await response.json();
        return requestsSent;
    } catch (error) {
        console.error('Failed to get friends:', error);
        return null;
    }
}