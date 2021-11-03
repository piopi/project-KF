/* eslint-disable import/no-extraneous-dependencies */
import 'jest';
import * as express from 'express';
import * as request from 'supertest';
import SetUpHelpers from '../helper/setUphelpers';
import db from '../../db/db';

describe('Api integration tests', () => {
  let app: express.Application;
  beforeAll(async () => {
    app = await SetUpHelpers.getApp();
  });
  afterAll((done) => {
    db.close();
    done();
  });
  it('can get api status', async () => {
    await request(app)
      .get('/api/status')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect((res: request.Response) => {
        console.log(res.text);
      })
      .expect(200);
  });
  it('can get all services', async () => {
    await request(app)
      .get('/api/services')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect((res: request.Response) => {
        expect(res.body[0]).toEqual(
          expect.objectContaining({
            serviceId: expect.any(Number),
            name: expect.any(String),
            serviceIconUrl: expect.any(String),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
          }),
        );
      })
      .expect(200);
  });
  it('can get a data Source', async () => {
    await request(app)
      .get('/api/datasources?serviceId=1')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect((res: request.Response) => {
        expect(res.body[0]).toEqual(
          expect.objectContaining({
            dataId: expect.any(Number),
            dataName: expect.any(String),
            dataCurrency: expect.any(String),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            serviceId: expect.any(Number),
            ServiceServiceId: null,
          }),
        );
      })
      .expect(200);
  });
  it('can get data Entries', async () => {
    await request(app)
      .get('/api/dataentries?dataId=1')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect((res: request.Response) => {
        expect(res.body[0]).toEqual(
          expect.objectContaining({
            dataEntryId: expect.any(Number),
            dataEntryName: expect.any(String),
            dataValue: expect.any(Number),
            date: expect.any(String),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            dataId: expect.any(Number),
            DataSourceDataId: null,
          }),
        );
      })
      .expect(200);
  });
  it('when the dataId query is missing or dataId is invalid', async () => {
    await request(app)
      .get('/api/dataentries')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(404);
  });
  it('when the serviceId query is missing or serviceId invalid', async () => {
    await request(app)
      .get('/api/datasources')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(404);
  });
  it('page not Found', async () => {
    await request(app)
      .get('/api')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(404);
  });
});
