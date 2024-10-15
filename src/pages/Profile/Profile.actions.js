
export async function profileAction({ request, params }) {
    const formData = await request.formData();
    const intent = formData.get("intent");
    if (intent === "post") {
        return await postPost(formData, params.profileId)
    } else if (intent === "comment") {
        return await postComment(formData, params.profileId)
    } else if (intent === "deletePost") {
        return await deletePost(formData)
    } else if (intent === "editPost") {
        const postId = formData.get('postId')
        const caption = formData.get('caption')
        return await editPost(postId, caption)
    }
} 

async function postComment(formData, profileId) {
    const content = formData.get("content");
    const parentCommentId = formData.get("parentComment") ? formData.get("parentComment") : null;

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/comment`, {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: content,
                commenterId: profileId,
                postId: formData.get("postId"),
                parentCommentId: parentCommentId
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        } else {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Failed to create comment:', error);
        return null;
    }
}

async function postPost(formData, profileId) {
    const caption = formData.get("caption");
    const intent = formData.get("intent");

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
        console.error('Failed to create post:', error);
        return null;
    }
}

async function deletePost(formData) {
    const postId = formData.get('postId')
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