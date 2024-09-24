const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const asyncHandler = require("express-async-handler")

exports.postUser = asyncHandler(async (req, res) => {
    const newUser = await prisma.user.create({
        data: {
            username: req.body.username,
            password: req.body.password
        }
    });
    res.status(200).json({ id: newUser.id });
});

exports.getUser = asyncHandler(async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            id: req.params.userId
        }
    })

    res.status(200).json({
        id: user.id,
        username: user.username,
        picture: user.picture
    })
})

exports.putUser = asyncHandler(async (req, res) => {
    const updatedUser = await prisma.user.update({
        where: {
            id: req.params.userId
        },
        data: req.body
    })
    res.status(200).json({
        id: updatedUser.id,
        username: updatedUser.username,
        picture: updatedUser.picture
    })
})

exports.deleteUser = asyncHandler(async (req, res) => {
    const deletedUser = await prisma.user.delete({
        where: {
            id: req.params.userId
        }
    })

    res.status(200).json({})
})