const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
const asyncHandler = require('express-async-handler')

exports.postComment = asyncHandler(async (req, res) => {
    const newComment = await prisma.comment.create({
        data: {
            commenterId: req.body.commenterId,
            content: req.body.content,
            postId: req.body.postId,
            parentCommentId: req.body.parentCommentId
        }
    })

    if (!newComment) {
        res.send(404).json({
            error: "Comment not created"
        })
    } else {
        res.send(200).json({
            id: newComment.id
        })
    }
})