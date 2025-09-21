import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../entities/user';
import { Event } from '../entities/event';
import { Booking } from '../entities/booking';

export class Database {
  private static instance: Database;
  private dataSource: DataSource;

  private constructor() {
    this.dataSource = new DataSource({
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: +(process.env.DB_PORT ?? 5432),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Event, Booking],
      synchronize: true,
    });
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async init(): Promise<void> {
    if (!this.dataSource.isInitialized) {
      await this.dataSource.initialize();
      console.log('Database initialized');
    }
  }

  public getDataSource(): DataSource {
    return this.dataSource;
  }
}
