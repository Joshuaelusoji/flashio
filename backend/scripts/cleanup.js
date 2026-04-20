// ⚠️ Dev-only cleanup script. Do NOT run on production database!
import dotenv from 'dotenv';
dotenv.config();

if (process.env.NODE_ENV === 'production') {
  console.error("This script cannot run in production!");
  process.exit(1);
}

import sequelize from '../src/config/database.js';
import User from '../src/models/User.js';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Are you sure you want to delete all users? (yes/no) ", async (answer) => {
  if (answer.toLowerCase() !== "yes") {
    console.log("Aborted.");
    rl.close();
    process.exit(0);
  }

  try {
    await sequelize.authenticate();
    console.log("DB connected successfully!");

    // Deletes all users safely, including dependent records
    await User.destroy({ where: {}, truncate: true, cascade: true });
    console.log("All users cleared!");
  } catch (err) {
    console.error("Error clearing users:", err.message);
  } finally {
    await sequelize.close();
    rl.close();
    process.exit();
  }
});