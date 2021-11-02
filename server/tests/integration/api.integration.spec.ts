/* eslint-disable import/no-extraneous-dependencies */
import 'jest';
import * as express from 'express';
import * as request from 'supertest';
import SetUpHelpers from '../helper/setUphelpers';

describe('status integration tests', () => {
  let app: express.Application;
  beforeAll(async () => {
    app = await SetUpHelpers.getApp();
  });

  it('can get server time', async () => {
    await request(app)
      .get('/api/status')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect((res: request.Response) => {
        // eslint-disable-next-line no-console
        console.log(res.text);
      })
      .expect(200);
  });

  it('page not Found', async () => {
    await request(app)
      .get('/api')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(404);
  });
});
