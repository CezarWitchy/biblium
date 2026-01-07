const pool = require('../database');

class ReservationRepository {
  static async create({ user_id, document_id }) {
    const [result] = await pool.query( `INSERT INTO reservations (user_id, document_id)  VALUES (?, ?)`,
      [user_id, document_id]
    );

    const [rows] = await pool.query(`SELECT id, user_id, document_id, status, created_at FROM reservations
      WHERE id = ? `, [result.insertId]
    );
    return rows[0];
  };

  static async findActive(user_id, document_id) {
    const [rows] = await pool.query(` SELECT id FROM reservations WHERE user_id = ? AND document_id = ?
      AND status = 'ACTIVE' LIMIT 1`, [user_id, document_id]
    );
    return rows[0];
  };

  static async findAll() {
    const [rows] = await pool.query(`SELECT r.id, u.name AS user, d.title AS document, r.status, r.created_at
      FROM reservations r JOIN users u ON u.id = r.user_id JOIN documents d ON d.id = r.document_id
      ORDER BY r.id DESC`
    );
    return rows;
  };

  static async fulfill(id) {
    await pool.query(`UPDATE reservations SET status = 'FULFILLED' WHERE id = ?`,[id] );
  };

  // attention a ce méthode. danger...a verifier !
  static async findOldestActiveByDocument(documentId) {
    const [rows] = await pool.query(`SELECT * FROM reservations WHERE document_id = ? AND status = 'ACTIVE'
      ORDER BY created_at ASC LIMIT 1`, [documentId]
    );
    return rows[0];
  };

  static async updateStatus(id, status) {
    await pool.query( `UPDATE reservations SET status = ? WHERE id = ?`, [status, id]);
    const [rows] = await pool.query('SELECT * FROM reservations WHERE id = ?', [id]);
    return rows[0];
  };
  
};

module.exports = ReservationRepository;
