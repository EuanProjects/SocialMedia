const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const asyncHandler = require('express-async-handler');

exports.postPost = asyncHandler(async (req, res) => {
    const newPost = await prisma.post.create({
        data: req.body
    })

    if (!newPost) {
        res.status(404).json({
            error: "Post not created"
        })
    } else {
        res.status(200).json({
            id: newPost.id
        })
    }
})

exports.getAllPost = asyncHandler(async (req, res) => {
    const getPosts = await prisma.post.findMany({
        orderBy: {
            date: 'desc',
        },
        select: {
            id: true,
            picture: true,
            public: true,
            date: true,
            caption: true,
            author: {
                select: {
                    username: true,
                },
            },
        },
    })

    res.status(200).json({ posts: getPosts })
})

exports.getPost = asyncHandler(async (req, res) => {
    const getPost = await prisma.post.findUnique({
        where: {
            id: req.params.postId
        }
    })

    if (!getPost) {
        res.status(404).json({
            error: "Post not found"
        })
    } else {
        res.status(200).json({
            id: getPost.id,
            picture: getPost.picture,
            caption: getPost.caption,
            public: getPost.public,
            date: getPost.date
        })
    }
})

exports.putPost = asyncHandler(async (req, res) => {
    const putPost = await prisma.post.update({
        where: {
            id: req.params.postId
        },
        data: req.body
    })

    if (!putPost) {
        res.status(404).json({
            error: "Post not updated"
        })
    } else {
        res.status(200).json({
            id: putPost.id,
            picture: putPost.picture,
            caption: putPost.caption,
            public: putPost.public,
            date: putPost.date
        })
    }
})

exports.deletePost = asyncHandler(async (req, res) => {
    const deletedPost = await prisma.post.delete({
        where: {
            id: req.params.postId
        }
    })

    res.status(200).json({})
})