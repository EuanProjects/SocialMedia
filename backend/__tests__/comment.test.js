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
    let postId;

    beforeAll(async () => {
        await prisma.$connect();

        const user1 = await prisma.user.create({
            data: { username: 'testusercomment1', password: 'password123' },
        });

        const user2 = await prisma.user.create({
            data: { username: 'testusercomment2', password: 'password123' },
        });

        const user3 = await prisma.user.create({
            data: { username: 'testusercomment3', password: 'password123' },
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

    let commentId;
    let subcommentId;

    afterAll(async () => {
        await prisma.comment.delete({
            where: {id : subcommentId }
        })
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
        const response = await request(app)
            .post('/comment')
            .send({
                commenterId: user2Id,
                content: "test comment",
                postId: postId,
            })
            .expect(200)

        commentId = response.body.id

        const comment = await prisma.comment.findUnique({
            where: { id: commentId }
        })

        expect(comment).not.toBeNull();
        expect(comment).toMatchObject({
            id: commentId,
            commenterId: user2Id,
            content: "test comment",
            postId: postId,
        })
    })

    // create subcomment 
    it('should create sub comment and return ID', async () => {
        const response = await request(app)
            .post('/comment')
            .send({
                commenterId: user2Id,
                content: "test sub comment",
                postId: postId,
                parentCommentId: commentId
            })

        subcommentId = response.body.id
        const comment = await prisma.comment.findUnique({
            where: { id: subcommentId}
        })

        expect(comment).not.toBeNull();
        expect(comment).toMatchObject({
            id: subcommentId,
            commenterId: user2Id,
            content: "test sub comment",
            postId: postId,
            parentCommentId: commentId
        })
    })

    // get comment
    it('should get comment with ID', async () => {
        const response = await request(app)
            .get(`/comment/${commentId}`)
            .expect(200)

        expect(response.body).toMatchObject({
            id: commentId,
            commenterId: user2Id,
            content: "test comment",
            postId: postId,
        })
    })
    // update comment
    it('should update comment with ID', async () => {
        const response = await request(app)
            .put(`/comment/${commentId}`)
            .send({ content: "updated comment" })
            .expect(200)

        expect(response.body).toMatchObject({
            id: commentId,
            commenterId: user2Id,
            content: "updated comment",
            postId: postId,
        })
    })

    // delete comment
    it('should delete the comment', async () => {
        const response = await request(app)
            .delete(`/comment/${commentId}`)


        expect(response.body).toMatchObject({ message: 'Comment deleted successfully' })
    })
});