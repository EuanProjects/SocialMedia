// user.test.js
const request = require('supertest');
const express = require('express');
const router = require('../routes/user'); // assuming your router is in the 'routes' folder
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const app = express();
app.use(express.json()); // for parsing application/json
app.use('/users', router);

describe('POST /users', () => {

    beforeAll(async () => {
        // Connect to the test database
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

        // Check that the user was added to the database
        const createdUser = await prisma.user.findUnique({
            where: { username: 'testuser' }
        });

        expect(createdUser).not.toBeNull();
        expect(createdUser.username).toBe('testuser');
        userId = createdUser.id
    });

    it("should get user from the ID", async () => {
        const response = await request(app)
            .get(`/users/${userId}`)
            .expect(200)

        expect(response.body).toMatchObject({
            id: expect.any(String),
            username: 'testuser',
            picture: null
        });

    })
});
