const pool = require('../database');

class ExemplaireRepository {
  static async create({ document_id, code_barre }) {
    const [result] = await pool.query(
      `INSERT INTO exemplaires (document_id, code_barre) VALUES (?, ?)`, [document_id, code_barre]
    );

    const [rows] = await pool.query(
      `SELECT id, document_id, code_barre, status, created_at FROM exemplaires WHERE id = ?`,[result.insertId]
    );
    return rows[0];
  };

  static async findAll() {
    const [rows] = await pool.query(`
      SELECT e.id, e.code_barre, e.status, e.created_at, d.title AS document_title FROM exemplaires e
      JOIN documents d ON d.id = e.document_id ORDER BY e.id DESC`
    );
    return rows;
  };

  static async findById(id) {
    const [rows] = await pool.query(`SELECT id, document_id, code_barre, status, created_at 
      FROM exemplaires WHERE id = ?`, [id]
    );
    return rows[0];
  };

  static async updateStatus(id, status) {
    await pool.query( `UPDATE exemplaires SET status = ? WHERE id = ?`, [status, id] );
    return this.findById(id);
  };

  // attention a ce methode.
  static async findOldestActiveByDocument(documentId) {
    const [rows] = await pool.query(`SELECT * FROM reservations WHERE document_id = ? AND status = 'ACTIVE'
      ORDER BY created_at ASC LIMIT 1`, [documentId]
    );
    return rows[0];
  };

};




module.exports = ExemplaireRepository;
