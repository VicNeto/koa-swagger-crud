const path = require('path');
require('dotenv').config({ path: path.resolve(process.cwd(), '.test.env') });

import * as supertest from 'supertest';
import * as faker from 'faker';
import app, { db } from '../src/app';

const prefix = '/api/v1'
const request = supertest(app.callback());
const testUser = {
    email: process.env['TEST_USER'],
    password: process.env['TEST_PASS'],
}
let testId;

describe('Users CRUD tests', () => {
    let token;
    let user, pass;

    beforeAll(async () => {
        await db.connect();
        await request
            .post(`${prefix}/login`)
            .set('Accept', 'application/json')
            .send(testUser)
            .then((res) => (token = res.body?.token))
            .catch((err) => {});
        token = `Bearer ${token}`;
    });

    afterAll(async () => {
        await db.close();
    });

    describe('GET /users', () => {
        test('Success response', (done) => {
            request
                .get(`${prefix}/users`)
                .set('Accept', 'application/json')
                .set('authorization', token)
                .expect('Content-Type', /json/)
                .expect(200, done);
        });

        test('Unauthorized response', (done) => {
            request
                .get(`${prefix}/users`)
                .set('Accept', 'application/json')
                .set('authorization', 'badtoken')
                .expect('Content-Type', /json/)
                .expect(401, done);
        });
    });

    describe('POST /users', () => {
        let name = faker.name.firstName();
        user = faker.internet.email();
        pass = name.toLowerCase() + '@123';
        const payload = {
            firstName: name,
            lastName: faker.name.lastName(),
            nickName: faker.internet.userName(),
            password: pass,
            email: user,
        }
        
        test('Success response', (done) => {
            request
                .post(`${prefix}/users`)
                .set('Accept', 'application/json')
                .set('authorization', token)
                .send(payload)
                .expect('Content-Type', /json/)
                .expect(201)
                .then(res => {
                    testId = res.body?.data?._id;
                    done();
                });
        });

        test('Bad request', (done) => {
            const badPayload = {
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                password: faker.random.alphaNumeric(12),
            };

            request
                .post(`${prefix}/users`)
                .set('Accept', 'application/json')
                .set('authorization', token)
                .send(badPayload)
                .expect('Content-Type', /json/)
                .expect(400, done);
        });
    });

    describe('GET /users/:id', () => {
        test('Success response', (done) => {
            request
                .get(`${prefix}/users/${testId}`)
                .set('Accept', 'application/json')
                .set('authorization', token)
                .expect('Content-Type', /json/)
                .expect(200, done);
        });

        test('Not found', (done) => {
            const badId = faker.random.alphaNumeric(24);
            request
                .get(`${prefix}/users/${badId}`)
                .set('Accept', 'application/json')
                .set('authorization', token)
                .expect('Content-Type', /json/)
                .expect(404, done);
        });
    });

    describe('PUT /users/:id', () => {
        const payload = {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            nickName: faker.internet.userName(),
        }

        test('Success response', (done) => {
            request
                .put(`${prefix}/users/${testId}`)
                .set('Accept', 'application/json')
                .set('authorization', token)
                .send(payload)
                .expect('Content-Type', /json/)
                .expect(200, done)
        });
    });

    describe('DELETE /users/:id', () => {

        test('Success response', (done) => {
            request
                .delete(`${prefix}/users/${testId}`)
                .set('Accept', 'application/json')
                .set('authorization', token)
                .expect('Content-Type', /json/)
                .expect(200, done)
        });
    });
});