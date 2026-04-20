import dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from 'sequelize';


const isProduction = process.env.NODE_ENV === 'production';

if (isProduction && !process.env.DATABASE_URL) {
  throw new Error('Missing DATABASE_URL environment variable');
}

const sequelize = isProduction
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      protocol: 'postgres',
      logging: false, // turn off logs in production
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false, // Render requires this
        },
      },
      pool: {
        max: 10,
        min: 2,
        acquire: 30000,
        idle: 10000,
      },
    })
  : new Sequelize(
      process.env.DB_NAME || 'flashio_new',
      process.env.DB_USER || 'postgres',
      process.env.DB_PASSWORD || '7105',
      {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'postgres',
        logging: console.log, // verbose logging in dev
        pool: {
          max: 10,
          min: 2,
          acquire: 30000,
          idle: 10000,
        },
      }
    );

export default sequelize;