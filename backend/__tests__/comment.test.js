const request = require('supertest')
const express = require('express');
const router = require('../routes/comment');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use('/comment', router);

describe('/comment', () => {
    let user1Id;
    let user2Id;
    let user3Id;
    let requestId1;
    let requestId2;
    let postId;

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
    
        const post = await prisma.post.create({
            data: {
                caption: 'This is the content of the first post',
                authorId: user1Id,
            },
        });

        postId = post.id;
        
    })


    afterAll(async () => {
        await prisma.post.delete({
            where: { id: postId },
        });
        await prisma.user.delete({
            where: { id: user1Id },
        });
        await prisma.user.delete({
            where: { id: user2Id },
        });
        await prisma.user.delete({
            where: { id: user3Id },
        });
        await prisma.$disconnect()
    })

    it('true', () => {
        expect(true).toBe(true)
    })


    // create basic comment on post
    it('should create comment and return ID', async () => {
        const response = request(app)
            .post('/comment')
            .send({
                commenterId: user2Id,
                content: "test commment",
                postId: postId,
            })
            .expect(200)
    })
    // create comment on comment

    // get comment

    // update comment

    // delete comment
});