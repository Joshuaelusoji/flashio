import dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from 'sequelize';

const Production = process.env.NODE_ENV === 'production';
const DatabaseURL = process.env.DATABASE_URL;
const DB_NAME = process.env.DB_NAME || 'flashio_new';
const DB_USER = process.env.DB_USER || 'postgres';
const DB_PASSWORD = process.env.DB_PASSWORD || '7105';
const DB_HOST = process.env.DB_HOST || 'localhost';

if (Production && !DatabaseURL) {
  throw new Error('Missing DATABASE_URL 🫙 environment variable');
}

const sequelize = Production
  ? new Sequelize(DatabaseURL, {
      dialect: 'postgres',
      protocol: 'postgres',
      logging: false,
      dialectOptions: {
        connectTimeout: 10000,
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      pool: {
        max: 20,
        min: 3,
        acquire: 15000,
        idle: 30000,
      },
    })
  : new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
      host: DB_HOST,
      dialect: 'postgres',
      logging: console.log,
      pool: {
        max: 20,
        min: 3,
        acquire: 15000,
        idle: 30000,
      },
    });

export default sequelize;