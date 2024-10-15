const request = require('supertest');
const express = require('express');
const router = require('../routes/login');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs')

const app = express();
app.use(express.json())
app.use('/login', router)

describe('/post', () => {
    let user1Id;
    beforeAll(async () => {
        await prisma.$connect();

        bcrypt.hash( "password123", 10, async (err, hashedPassword) => {
            const user1 = await prisma.user.create({
                data: {
                    username: "testuserlogin123",
                    password: hashedPassword
                }
            })
            user1Id = user1.id;
        })
    });

    afterAll(async () => {
        await prisma.user.delete({
            where: {
                id: user1Id
            }
        })
        await prisma.$disconnect();
    });

    it('post login', async () => {
        const response = await request(app)
            .post('/login')
            .send({
                username: "testuserlogin123",
                password: "password123"
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    })

    it('post login wrong username', async () => {
        const response = await request(app)
            .post('/login')
            .send({
                username: "wrongusername",
                password: "password123"
            })
        expect(response.status).toBe(401)
        console.log(response.body.message)
        expect(response.body).toHaveProperty('message')
    })
});