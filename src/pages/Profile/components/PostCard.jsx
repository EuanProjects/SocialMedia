function PostCard({ post }) {
    return (
        <>
        <div className="bg-metallicGray rounded-md shadow-md p-4">
            <div>
                <div>{post?.author?.username}</div>
            </div>
            <div>
                <div>{post?.caption}</div>
            </div>
            <div>
                <div>{post?.date}</div>
            </div>
            <div>
                <div>{post?.picture}</div>
            </div>
            <div>
                <div>{post?.public}</div>
            </div>
        </div>
        </>
    )
}

export default PostCard