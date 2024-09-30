const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
const asyncHandler = require('express-async-handler')

exports.postRequest = asyncHandler(async (req, res) => {
    const newRequest = await prisma.request.create({
        data: {
            requestorId: req.body.requestorId,
            accepterId: req.body.accepterId
        }
    })

    if (!newRequest) {
        res.status(404).json({
            error: "Request not created"
        })
    } else {
        res.status(200).json({
            id: newRequest.id
        })
    }
})

exports.deleteRequest = asyncHandler(async (req, res) => {
    const deletedRequest = await prisma.request.delete({
        where: {
            id: req.params.requestId
        }
    })

    res.status(200).json({})
})

exports.postRequestAccept = asyncHandler(async (req, res) => {
    const requestId = req.body.id;
    const result = await prisma.$transaction(async (prisma) => {
      const request = await prisma.request.findUnique({
        where: { id: requestId },
        include: { requestor: true, accepter: true },
      });
  
      if (!request) {
        res.status(404).json({ message: "Friend request not found" });
        return;
      }
  
      await prisma.user.update({
        where: { id: request.requestorId },
        data: {
          friends: {
            connect: { id: request.accepterId },
          },
        },
      });
  
      await prisma.user.update({
        where: { id: request.accepterId },
        data: {
          friends: {
            connect: { id: request.requestorId },
          },
        },
      });
  
      await prisma.request.delete({
        where: { id: requestId },
      });
  
      return "Friend request accepted";
    });
  
    res.status(200).json({ message: result });
})
