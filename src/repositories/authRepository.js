const pool = require('../database');

class AuthRepository {
  static async findByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ? LIMIT 1',[email] );
    return rows[0];
  };

  static async createUser({ name, email, password, role }) {
    const [result] = await pool.query(`INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`,
      [name, email, password, role]
    );

    const [created] = await pool.query(
      'SELECT id, name, email, role, created_at FROM users WHERE id = ?',[result.insertId]
    );
    return created[0];
  };
};

module.exports = AuthRepository;
