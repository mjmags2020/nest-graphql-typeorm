import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { query } from 'express';
import exp from 'constants';
import { DataSource } from 'typeorm';
import gql from 'graphql-tag';
import { print } from 'graphql';

export const createUserMutation = gql`
  mutation {
    createUser(createUserData: { username: "Mj", displayName: "MjM" }) {
      id
      username
      displayName
    }
  }
`;

export const showUsers = gql`
  {
    getUsers {
      id
      username
      displayName
    }
  }
`;

describe('GraphQL (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    const dataSource = app.get(DataSource);
    await dataSource.synchronize(true);
    await app.init();
  });

  afterAll(async () => {
    const dataSource = app.get(DataSource);
    if (dataSource) {
      await dataSource.dropDatabase();
      await dataSource.destroy();
    }
    await app.close();
  });

  describe('getUsers', () => {
    it('should query getUsers and return 0 users', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: print(showUsers),
        })
        .expect((res) => {
          expect(res.body.data.getUsers).toHaveLength(0);
        });
    });

    it('should create a user using createUser mutation', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: print(createUserMutation),
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.createUser).toEqual({
            id: 1,
            username: 'Mj',
            displayName: 'MjM',
          });
        });
    });

    it('should query getUsers and return 1 users', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: print(showUsers),
        })
        .expect((res) => {
          expect(res.body.data.getUsers).toHaveLength(1);
        });
    });
  });
});
