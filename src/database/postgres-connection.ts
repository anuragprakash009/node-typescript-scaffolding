import { DataBase } from './db-interface';

import { Sequelize } from 'sequelize';

class PostgresDataBase implements DataBase {
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
  connect(): void {
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
      },
    );
  }

  async authenticate(): Promise<void> {
    await PostgresDataBase.conn.authenticate();
    await this.sync();
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
