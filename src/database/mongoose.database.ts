import { ServerError } from '../errors';
import { IDataBase } from './database.interface';
import { connect, Mongoose } from 'mongoose';

class MongoDbConnection implements IDataBase {
  private url: string;
  private static conn: Mongoose | null;
  constructor(url: string) {
    this.url = url;
    MongoDbConnection.conn = null;
  }

  connect(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      connect(this.url, {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 30000,
        socketTimeoutMS: 45000,
      })
        .then((res) => {
          MongoDbConnection.conn = res;
          resolve();
        })
        .catch((err) => reject(err));
    });
  }
  static getConnection(): Mongoose {
    if (!MongoDbConnection.conn) {
      throw new ServerError(`Mongoose connection not found`);
    }
    return MongoDbConnection.conn;
  }
}

export { MongoDbConnection };
