const pool = require('../database');

class LoanRepository {
  static async create({ user_id, exemplaire_id, date_retour_prevue }) {
  
    const [result] = await pool.query(
      `INSERT INTO loans (user_id, exemplaire_id, date_emprunt, date_retour_prevue)
      VALUES (?, ?, CURDATE(), ?)`, [user_id, exemplaire_id, date_retour_prevue]
    );

    const [rows] = await pool.query(
      `SELECT id, user_id, exemplaire_id, date_emprunt, date_retour_prevue, date_retour_effective
      FROM loans WHERE id = ?`, [result.insertId]
    );
    return rows[0];
  };

  static async findActiveByExemplaire(exemplaire_id) {
    const [rows] = await pool.query(
     `SELECT id FROM loans WHERE exemplaire_id = ? AND date_retour_effective IS NULL LIMIT 1`,[exemplaire_id]
    );
    return rows[0];
  };

  static async closeLoan(id) {
    await pool.query(`UPDATE loans SET date_retour_effective = CURDATE() WHERE id = ?`, [id] );
    const [rows] = await pool.query( `SELECT * FROM loans WHERE id = ?`, [id] );
    return rows[0];
  };

  static async findAll() {
    const [rows] = await pool.query(
      `SELECT l.id, u.name AS user, e.code_barre, l.date_emprunt, l.date_retour_prevue,
      l.date_retour_effective FROM loans l JOIN users u ON u.id = l.user_id
      JOIN exemplaires e ON e.id = l.exemplaire_id ORDER BY l.id DESC`
    );
    return rows;
  };
};

module.exports = LoanRepository;