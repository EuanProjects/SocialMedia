// user.test.js
const request = require('supertest');
const express = require('express');
const router = require('../routes/user');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use('/users', router);

describe('POST /users', () => {

    beforeAll(async () => {
        await prisma.$connect();
    });

    afterAll(async () => {
        await prisma.user.deleteMany();
        await prisma.$disconnect();
    });

    let userId;

    it("should create a new user and return the user ID", async () => {
        const response = await request(app)
            .post('/users')
            .send({ username: 'testuser', password: 'password123' });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id');

        const createdUser = await prisma.user.findUnique({
            where: { username: 'testuser' }
        });
        expect(createdUser).not.toBeNull();
        expect(createdUser.username).toBe('testuser');

        userId = response.body.id;
    });

    it("should get user from the ID", async () => {
        const response = await request(app)
            .get(`/users/${userId}`)
            .expect(200)

        expect(response.body).toMatchObject({
            id: userId,
            username: 'testuser',
            picture: null
        });
    })

    it("should update user from the user ID", async () => {
        const response = await request(app)
            .put(`/users/${userId}`)
            .send({ username: 'testuserupdated', picture: 'https://randomurl.com' })
            .expect(200)

        expect(response.body).toMatchObject({
            id: userId,
            username: 'testuserupdated',
            picture: 'https://randomurl.com'
        });

        const updatedUser = await prisma.user.findUnique({
            where: { id: userId }
        });
        expect(updatedUser).not.toBeNull();
        expect(updatedUser.username).toBe('testuserupdated');
        expect(updatedUser.picture).toBe('https://randomurl.com');
    })

    it("should delete user from the user ID", async () => {
        const response = await request(app)
            .delete(`/users/${userId}`)
            .expect(200)

        expect(response.body).toMatchObject({})
        const updatedUser = await prisma.user.findUnique({
            where: { id: userId }
        });
        expect(updatedUser).toBeNull();
    })
});
