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
        res.status(404).json({
            error: "Comment not created"
        })
    } else {
        res.status(200).json({
            id: newComment.id
        })
    }
})

exports.getComment = asyncHandler(async (req, res) => {
    const getComment = await prisma.comment.findUnique({
        where: {
            id: req.params.commentId
        }
    })
    if (!getComment) {
        res.send(404).json({
            error: "Could not find comment"
        })
    } else {
        res.status(200).json(getComment)
    }
})

exports.putComment = asyncHandler(async (req, res) => {
    const updatedComment = await prisma.comment.update({
        where: {
            id: req.params.commentId
        },
        data: req.body
    })


    if (!updatedComment) {
        res.status(404).json({
            error: "Comment not created"
        })
    } else {
        res.status(200).json(updatedComment)
    }
})

exports.deleteComment = asyncHandler(async (req, res) => {
    const findComment = await prisma.comment.findUnique({
        where: {
            id: req.params.commentId
        }
    })

    if (findComment) {
        const deletedComment = await prisma.comment.delete({
            where: {
                id: req.params.commentId
            }
        });

        res.status(200).json({
            message: "Comment deleted successfully"
        });

    } else {
        res.status(404).json({
            error: "Comment not found"
        })
    }


})
