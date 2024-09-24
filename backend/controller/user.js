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
    console.log(newUser);
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