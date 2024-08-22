const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool(process.env.DATABASE_URL);

async function initializeDatabase() {
  try {
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS schools (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        latitude FLOAT NOT NULL,
        longitude FLOAT NOT NULL
      )
    `);
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

module.exports = { pool, initializeDatabase };