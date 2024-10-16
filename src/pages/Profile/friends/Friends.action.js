export async function friendsAction({ request, params }) {
    const formData = await request.formData(); 
    const intent = formData.get('intent'); 
    if (intent === 'friend') {
        const accepterId = formData.get('id');
        const requestorId = params.profileId
        return await postRequest(accepterId, requestorId)
    } else if (intent === 'cancel' || intent === 'reject') {
        const requestId = formData.get('requestId')
        return await deleteRequest(requestId)
    } else if (intent === 'accept') {
        const requestId = formData.get('requestId')
        return await postAcceptRequest(requestId)
    } else if (intent === 'removeFriend') {
        const friendId= formData.get('friendId')
        const profileId = params.profileId
        return await deleteUserFriend(profileId, friendId);
    }

    return {};
}

async function postAcceptRequest(requestId) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/request/accept`, {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: requestId
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        } else {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Failed to create friend request:', error);
        return null;
    }
}

async function postRequest(accepterId, requestorId) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/request`, {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                requestorId: requestorId,
                accepterId: accepterId
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        } else {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Failed to create friend request:', error);
        return null;
    }
}

async function deleteRequest(requestId) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/request/${requestId}`, {
            mode: 'cors',
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        } else {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Failed to cancel friend request:', error);
        return null;
    }
}

async function deleteUserFriend(profileId, friendId) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/user/${profileId}/friend`, {
            mode: 'cors',
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                friendId: friendId
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        } else {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Failed to remove friend:', error);
        return null;
    }
}