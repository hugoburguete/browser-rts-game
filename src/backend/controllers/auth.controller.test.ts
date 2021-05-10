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
      .send({ email: 'test@mailbox.com', password: 'password' })
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          console.error(err, res.body)
          return done(err)
        }
        expect(res.body).toHaveProperty('accessToken');
        expect(res.body).toHaveProperty('refreshToken');
        expect(res.body).toHaveProperty('expiresIn');
        done()
      });
  });

  it('should error if no email is passed in.', async (done) => {
    request(server)
      .post(`/api/v1/register`)
      .send({ password: 'password' })
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) {
          console.error(err, res.body)
          return done(err)
        }
        expect(res.body).toHaveProperty('error');
        done();
      });
  });

  it('should error if no password is passed in.', async (done) => {
    request(server)
      .post(`/api/v1/register`)
      .send({ email: 'test2@mailbox.com' })
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) {
          console.error(err, res.body)
          return done(err)
        }
        expect(res.body).toHaveProperty('error');
        done();
      });
  });

  it('should allow users to login after registration.', async (done) => {
    request(server)
      .post(`/api/v1/register`)
      .send({ email: 'test3@mailbox.com', password: 'password' })
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          console.error(err, res.body)
          return done(err)
        }
        expect(res.body).toHaveProperty('accessToken');

        request(server)
          .post(`/api/v1/login`)
          .send({ email: 'test3@mailbox.com', password: 'password' })
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            if (err) {
              console.error(err, res.body)
              return done(err)
            }

            expect(res.body).toHaveProperty('accessToken');
            done()
          })
      });
  });

  it('should not allow unauthenticated users to make authenticated requests.', async (done) => {
    request(server)
      .get(`/api/v1/user`)
      .expect('Content-Type', /json/)
      .expect(401)
      .end((err, res) => {
        if (err) {
          console.error(err, res.body)
          return done(err)
        }

        expect(res.body).toHaveProperty('error');
        done()
      })
  });

  it('should allow authenticated users to make authenticated requests.', async (done) => {
    request(server)
      .post(`/api/v1/login`)
      .send({ email: 'test3@mailbox.com', password: 'password' })
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          console.error(err, res.body);
          return done(err)
        }

        request(server)
          .get(`/api/v1/user`)
          .set('Authorization', `Bearer ${res.body.accessToken}`)
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            if (err) {
              console.error(err, res.body)
              return done(err)
            }

            done()
          })
      });
  });
});
