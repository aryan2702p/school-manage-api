const { pool } = require('../config/database');

class School {
  static async create(name, address, latitude, longitude) {
    const [result] = await pool.execute(
      'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
      [name, address, latitude, longitude]
    );
    return result.insertId;
  }

  static async findAll() {
    const [schools] = await pool.execute('SELECT * FROM schools');
    return schools;
  }
}

module.exports = School;