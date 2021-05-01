import request from 'supertest'
import { createServer } from "../server";
import { Express } from "express";
import fs from 'fs';

// Setup
let server: Express;

beforeAll(async () => {
  server = await createServer();
});

describe('auth', () => {
  it('should generate tokens', async (done) => {
    request(server)
      .post(`/api/v1/register`)
      .send({ username: 'test', email: 'test@mailbox.com', password: 'password' })
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).toHaveProperty('accessToken');
        expect(res.body).toHaveProperty('refreshToken');
        expect(res.body).toHaveProperty('expiresIn');
        done()
      });
  });

  it('should error if no email is passed in.', async (done) => {
    request(server)
      .post(`/api/v1/register`)
      .send({ username: 'test2', password: 'password' })
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).toHaveProperty('error');
        done();
      });
  });

  it('should error if no username is passed in.', async (done) => {
    request(server)
      .post(`/api/v1/register`)
      .send({ email: 'test2@mailbox.com', password: 'password' })
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).toHaveProperty('error');
        done();
      });
  });

  it('should error if no password is passed in.', async (done) => {
    request(server)
      .post(`/api/v1/register`)
      .send({ email: 'test2@mailbox.com', username: 'test2' })
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).toHaveProperty('error');
        done();
      });
  });
});

afterAll(() => {
  const dir = 'testing-dbs';
  fs.rmdirSync(dir, { recursive: true });
})