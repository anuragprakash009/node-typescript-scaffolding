import { IDataBase } from './database.interface';

import { Sequelize } from 'sequelize';

class PostgresDataBase implements IDataBase {
  private static conn: any;
  private username: string;
  private database: string;
  private host: string;
  private password: string;
  private port: number;
  constructor(
    username: string,
    database: string,
    password: string,
    host: string,
    port: number,
  ) {
    PostgresDataBase.conn = null;
    this.username = username;
    this.database = database;
    this.host = host;
    this.password = password;
    this.port = port;
  }
  connect(): Promise<void> {
    return new Promise<void>(async (resolve) => {
      PostgresDataBase.conn = new Sequelize(
        this.database,
        this.username,
        this.password,
        {
          host: this.host,
          dialect: 'postgres',
          username: this.username,
          password: this.password,
          port: Number(this.port),
          database: this.database,
          pool: {
            max: 20, // Maximum number of connections in the pool
            min: 5, // Minimum number of connections in the pool
            acquire: 30000, // Maximum time (in milliseconds) to try to get a connection before throwing an error
            idle: 10000, // Maximum time (in milliseconds) that a connection can be idle before being released
            evict: 10000, // Time interval (in milliseconds) after which idle connections are removed
          },
        },
      );
      await this.authenticate();
      resolve();
    });
  }

  async authenticate(): Promise<void> {
    await PostgresDataBase.conn.authenticate();
  }

  async sync(): Promise<void> {
    await PostgresDataBase.conn.sync({
      alter: true,
    });
    console.log('All models were synchronized successfully.');
  }

  static getConnection(): Sequelize {
    if (!PostgresDataBase.conn) {
      throw new Error('No Database connection available');
    }
    return PostgresDataBase.conn;
  }
}

export { PostgresDataBase };
