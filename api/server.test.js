const server = require('./server')
const supertest = require('supertest')
const db = require('../database/dbConfig')

describe('manage resources from the USERS table', () => {
    describe('POST /register', () => {

        beforeAll(async () => {
            await db("users").truncate();
        })

        it('should return status code 201 upon successful registration', async () => {
            const res = await supertest(server)
                .post('/api/auth/register')
                .send({ username: 'user383838', password: 'pass1' })

            expect(res.status).toBe(201)
        })

        it('should return a JSON object', async () => {
            const res = await supertest(server)
                .post('/api/auth/register')
                .send({ username: 'user101010', password: 'pass2' })

            expect(res.type).toMatch(/json/i)
        })


    })

    describe('POST /login', () => {

        it('should return status code 201 upon successful login', async () => {
            const res = await supertest(server).post('/api/auth/login').send({ username: 'user383838', password: 'pass1' })

            expect(res.status).toBe(201)
        })

        it('should return a message prop with value stating success', async () => {
            const res = await supertest(server)
                .post('/api/auth/login')
                .send({ username: 'user101010', password: 'pass2' })

            expect(res.body.message).toMatch(/you are now logged in/i)
        })
    })

    describe('GET /logout', () => {
        it('should return message stating successful logout', async () => {
            const res = await supertest(server).get('/api/auth/logout')

            expect(res.status).toBe(201)
            expect(res.body.message).toMatch(/you have been logged out/i)
        })
    })
})

"hello"