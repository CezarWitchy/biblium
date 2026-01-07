const pool = require('../database');

class DocumentRepository {
  static async create(data) {
    const { title, description, author, isbn, category } = data;
    const [result] = await pool.query(
      `INSERT INTO documents (title, description, author, isbn, category) VALUES (?, ?, ?, ?, ?)`,
      [title, description, author, isbn, category]
    );
    const [rows] = await pool.query('SELECT * FROM documents WHERE id = ?', [ result.insertId ]);
    return rows[0];
  };

  static async findAll() {
    const [rows] = await pool.query(
      `SELECT id, title, description, author, isbn, category, created_at FROM documents ORDER BY id DESC`
   );
    return rows;
  };

  static async findById(id) {
    const [rows] = await pool.query(
      `SELECT id, title, description, author, isbn, category, created_at FROM documents WHERE id = ? LIMIT 1`,
      [id]
    );
    return rows[0];
  };

  static async update(id, data) {
    const { title, description, author, isbn, category } = data;
    await pool.query(`UPDATE documents SET title = ?, description = ?, author = ?, isbn = ?, category = ?
      WHERE id = ?`, [title, description, author, isbn, category, id]
    );
    return this.findById(id);
  };

  static async delete(id) { 
    await pool.query('DELETE FROM documents WHERE id = ?', [id]);
    return { message: 'Document supprimé !' };
  };
};

module.exports = DocumentRepository;
