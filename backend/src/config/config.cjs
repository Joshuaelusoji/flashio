// config/config.cjs
'use strict';
require('dotenv').config();

const Production = process.env.NODE_ENV === 'production';
const DatabaseURL = process.env.DATABASE_URL;

if (Production && !DatabaseURL) {
  throw new Error('Missing DATABASE_URL 🫙 environment variable');
}

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: console.log,
    pool: { max: 20, min: 3, acquire: 15000, idle: 30000 }
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_TEST,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,
    pool: { max: 5, min: 1, acquire: 15000, idle: 30000 }
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      connectTimeout: 10000,
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    pool: { max: 20, min: 3, acquire: 15000, idle: 30000 }
  }
};