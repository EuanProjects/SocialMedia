const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs");


exports.postUser = asyncHandler(async (req, res) => {
    // see if the user exists first
    const userExists = await prisma.user.findFirst({
        where: {
            username: req.body.username
        }
    })

    if (userExists) {
        return res.status(409).json({
            error: "User already exists"
        })
    }

    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        const newUser = await prisma.user.create({
            data: {
                username: req.body.username,
                password: hashedPassword,
            }
        });
        return res.status(200).json({ id: newUser.id });
    })
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
        picture: user.picture,
        name: user.name
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
    const userId = req.params.userId;
  
    await prisma.$transaction(async (prisma) => {
      const likedPosts = await prisma.post.findMany({
        where: {
          likes: {
            some: {
              id: userId,
            },
          },
        },
      });
  
      for (const post of likedPosts) {
        await prisma.post.update({
          where: { id: post.id },
          data: {
            likes: {
              disconnect: { id: userId },
            },
          },
        });
      }
  
      await prisma.comment.deleteMany({
        where: {
          commenterId: userId,
        },
      });
  
      const userPosts = await prisma.post.findMany({
        where: {
          authorId: userId,
        },
      });
  
      for (const post of userPosts) {
        await prisma.comment.deleteMany({
          where: {
            postId: post.id,
          },
        });
      }
  
      await prisma.post.deleteMany({
        where: {
          authorId: userId,
        },
      });
  
      await prisma.request.deleteMany({
        where: {
          OR: [
            { requestorId: userId },
            { accepterId: userId },
          ],
        },
      });
  
      const friends = await prisma.user.findMany({
        where: {
          friends: {
            some: { id: userId },
          },
        },
      });
  
      for (const friend of friends) {
        await prisma.user.update({
          where: { id: friend.id },
          data: {
            friends: {
              disconnect: { id: userId },
            },
          },
        });
      }
  
      await prisma.user.delete({
        where: { id: userId },
      });
    });
  
    res.status(200).json({});
  });