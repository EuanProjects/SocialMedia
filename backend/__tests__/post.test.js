const request = require('supertest');
const express = require('express');
const router = require('../routes/post');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const app = express();
app.use(express.json())
app.use('/post', router)


describe('/post', () => {
    let user1Id;
    beforeAll(async () => {
        await prisma.$connect();

        const user1 = await prisma.user.create({
            data: {
                username: "testuserpost123",
                password: "password123"
            }
        })
        user1Id = user1.id;
    });

    afterAll(async () => {
        await prisma.user.delete({
            where: {
                id: user1Id
            }
        })
        await prisma.$disconnect();
    });


    // // tests
    let postId;
    const testCaption = "testing the caption";
    const testUrl = "http://randomurl.com"
    const curDate = new Date();

    it('true', () => {
        expect(true).toBe(true);
    })


    it('should create post and return ID', async () => {
        const response = await request(app)
            .post('/post')
            .send({
                caption: testCaption,
                authorId: user1Id,
                picture: testUrl,
                date: curDate
            })
            .expect(200)

        expect(response.body).toHaveProperty('id')

        postId = response.body.id;

        
        const createdPost = await prisma.post.findUnique({
            where: { id: postId }
        })
        expect(createdPost).not.toBeNull();
        expect(createdPost).toMatchObject({
            id: postId,
        })
    })

    it('should return all the posts', async () => {
        const response = await request(app)
            .get('/post')
            // .expect(200)

        console.log(response.body)
        expect(response.body).toHaveProperty('posts')
    })

    it('should get post from ID', async () => {
        const response = await request(app)
            .get(`/post/${postId}`)

        expect(response.body).toMatchObject({
            id: postId,
            picture: testUrl,
            caption: testCaption,
            public: true,
            date: new Date(curDate).toISOString()
        })
    })

    it('should update post from ID', async () => {
        const response = await request(app)
            .put(`/post/${postId}`)
            .send({
                picture: "http://randomurl2.com",
                caption: "cool caption"
            })

        expect(response.body).toMatchObject({
            id: postId,
            picture: "http://randomurl2.com",
            caption: "cool caption",
            public: true,
            date: new Date(curDate).toISOString()
        })

        const updatedPost = await prisma.post.findUnique({
            where: {
                id: postId
            }
        })

        expect(updatedPost).toMatchObject({
            id: postId,
            picture: "http://randomurl2.com",
            caption: "cool caption",
            public: true,
            date: curDate
        })
    })

    it('should delete post from ID', async () => {
        const response = await request(app)
            .delete(`/post/${postId}`)

        expect(response.body).toMatchObject({})

        const deletedPost = await prisma.post.findUnique({
            where: {
                id: postId
            }
        })

        expect(deletedPost).toBeNull()
    })

    it('should return 404 if post doesn\'t exist', async () => {
        const response = await request(app)
            .get('/post/nonexistentid')
            .expect(404);

        expect(response.body).toMatchObject({
            error: 'Post not found'
        });
    });
})