import { Pool, QueryResult } from 'pg';

class Database {
  private static instance: Database;
  private readonly client: Pool;

  private constructor() {
    this.client = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DATABASE,
      password: process.env.DB_PASS,
      port: Number(process.env.DB_PORT)
    });
  }

  public static getInstance(): Database {
    if (!this.instance) {
      this.instance = new Database();
    }
    return this.instance;
  }

  async query(sql: string, params?: any[]): Promise<QueryResult> {
    const client = await this.client.connect();
    try {
      const result = await client.query(sql, params);
      return result;
    } finally {
      client.release();
    }
  }  
}

export default Database;