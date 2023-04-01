import { Pool, QueryResult } from 'pg';
import Database from '../../../src/server/services/db';

describe('Database', () => {
  let mockPool: Pool;
  // let db: Database;
  beforeAll(() => {
    jest.clearAllMocks();
    mockPool = jest.fn(() => ({
      connect: jest.fn(),
      query: jest.fn(),
      release: jest.fn(),
    })) as any;
  });
  test('getInstance should return the same instance every time', () => {

    const instance1 =  Database.getInstance();
    const instance2 = Database.getInstance();
    expect(instance1).toBe(instance2);
  });

  // test('query should return results from the database', async () => {
  //   const db = Database.getInstance();
  //   // await db.query('SELECT * FROM users');
  //   const result = await db.query('SELECT * FROM users');
  //   expect(result.rows).toBeDefined();
  //   expect(result.rows.length).toBeGreaterThan(0);
  // });

  test('query should throw an error if the SQL query is invalid', async () => {
    const db = Database.getInstance();
    expect.assertions(1);
    try {
      await db.query('SELECT * FROM non_existing_table');
    } catch (err) {
      expect(err).toBeDefined();
    }
  });
});