import { DataBase } from './db-interface';
import { connect } from 'mongoose';

class Mongoose implements DataBase {
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  connect(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      connect(this.url, {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 30000,
        socketTimeoutMS: 45000,
      })
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }
}

export { Mongoose };
