const pool = require('../database');

class NotificationRepository {
  static async create(data) {
    const { user_id, message } = data;
    const [result] = await pool.query( `INSERT INTO notifications (user_id, message) VALUES (?, ?)`,
      [user_id, message]
    );

    const [rows] = await pool.query('SELECT * FROM notifications WHERE id = ?', [result.insertId]);
    return rows[0];
  };

  static async findByUser(userId) {
    const [rows] = await pool.query( `SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC`,
      [userId]
    );
    return rows;
  };
};

module.exports = NotificationRepository;
