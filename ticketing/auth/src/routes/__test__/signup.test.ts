import request from 'supertest';
import {app} from '../../app';

it('return 201 on successful signup', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: '1234'
        })
        .expect(201);
});

it('return 400 with invalid email', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test.com',
            password: '1234'
        })
        .expect(400);
});

it('return 400 in case duplicated email', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: '1234'
        })
        .expect(201);
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: '1234'
        })
        .expect(400);
});