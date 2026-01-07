const pool = require('../database');

class FineRepository {
  static async create({ loan_id, amount, days_late }) {
    const [result] = await pool.query( `INSERT INTO fines (loan_id, amount, days_late) VALUES (?, ?, ?)`,
      [loan_id, amount, days_late]
    );

    const [rows] = await pool.query(`SELECT * FROM fines WHERE id = ?`, [result.insertId] );
    return rows[0];
  };
};

module.exports = FineRepository;