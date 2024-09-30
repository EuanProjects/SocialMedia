const requestApp = require('supertest');
const express = require('express');
const router = require('../routes/request');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use('/request', router);


describe('/request', () => {
    it("true", () => {
        expect(true).toBe(true)
    })
    let user1Id;
    let user2Id;
    let user3Id;
    let requestId1;
    let requestId2;

    beforeAll(async () => {
        await prisma.$connect();

        const user1 = await prisma.user.create({
            data: { username: 'testuser1', password: 'password123' },
        });

        const user2 = await prisma.user.create({
            data: { username: 'testuser2', password: 'password123' },
        });

        const user3 = await prisma.user.create({
            data: { username: 'testuser3', password: 'password123' },
        });

        user1Id = user1.id;
        user2Id = user2.id;
        user3Id = user3.id;

        const response = await requestApp(app)
            .post('/request')
            .send({
                requestorId: user1Id,
                accepterId: user3Id
            });
        requestId1 = response.body.id;
    })

    afterAll(async () => {
        await prisma.user.deleteMany({
            where: {
                id: {
                    in: [user1Id, user2Id, user3Id]
                }
            }
        });
        await prisma.$disconnect()
    })
    it('true', () => {
        expect(true).toBe(true)
    })

    // it('should create request and return ID', async () => {
    //     const response = await requestApp(app)
    //         .post('/request')
    //         .send({
    //             requestorId: user1Id,
    //             accepterId: user2Id
    //         })

    //     expect(response.body).toHaveProperty('id')

    //     requestId2 = response.body.id
    //     const request = await prisma.request.findUnique({
    //         where: { id: requestId2 }
    //     })

    //     expect(request).not.toBeNull();
    //     expect(request).toMatchObject({
    //         id: requestId2,
    //         requestorId: user1Id,
    //         accepterId: user2Id
    //     })
    // })

    // it(`should accept request`, async () => {
    //     const requests = await prisma.request.findMany({})
    //     const response = await requestApp(app)
    //         .post('/request/accept')
    //         .send({
    //             id: requestId2
    //         })
    //         .expect(200)
    //     expect(response.body).toMatchObject({
    //         message: "Friend request accepted"
    //     })
    //     const user1 = await prisma.user.findUnique({
    //         where: { id: user1Id },
    //         include: { friends: true }
    //     });

    //     const user2 = await prisma.user.findUnique({
    //         where: { id: user2Id },
    //         include: { friends: true }
    //     });

    //     const areFriends = user1.friends.some(friend => friend.id === user2Id) &&
    //         user2.friends.some(friend => friend.id === user1Id);

    //     expect(areFriends).toBe(true)
    // })

    // it('should delete request', async () => {
    //     const requests = await prisma.request.findMany({})
    //     const deleteResponse = await requestApp(app)
    //         .delete(`/request/${requestId1}`)
    //         .expect(200);

    //     expect(deleteResponse.body).toMatchObject({});
    // });
})