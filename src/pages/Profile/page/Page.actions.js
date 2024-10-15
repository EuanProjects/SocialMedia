export async function pageAction({ request, params }) {
    const formData = await request.formData();
    const intent = formData.get("intent");
    if (intent === "deletePost") {
        const postId = formData.get('postId')
        return await deletePost(postId)
    } else if (intent === "editPost") {
        const postId = formData.get('postId')
        const caption = formData.get('caption')
        return await editPost(postId, caption)
    }

    return {}
}

async function editPost(postId, caption) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/post/${postId}`, {
            mode: 'cors',
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                caption: caption
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        } else {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Failed to edit post:', error);
        return null;
    }
}

async function deletePost(postId) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/post/${postId}`, {
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
        console.error('Failed to delete post:', error);
        return null;
    }
}