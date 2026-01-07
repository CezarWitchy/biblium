// // const pool = require('../database');

// /**
//  * @class UeserRepository ==> authService
// */

// class UserRepository {
//   static async findAll() {
//     const [rows] = await pool.query( `SELECT id, name, email, role, created_at FROM users` );
//     return rows;
//   };

//   static async create({ name, email, role }) {
//     const [result] = await pool.query(`INSERT INTO users (name, email, role) VALUES (?, ?, ?)`,
//       [name, email, role]
//     );

//     const [user] = await pool.query(`SELECT id, name, email, role, created_at FROM users WHERE id = ?`,
//       [result.insertId]
//     );
//     return user[0];
//   };
// }; 

// module.exports = UserRepository;


// // il ne faut pas stocker le mot de passe en clair dans la base de donnees 
// // et il ne faut pas le retourner non plus.


// // const pool = require('../database');

// // class UserRepository {
// //   static async findAll(){
// //     const [rows] = await pool.query('SELECT * FROM users');
// //     return rows;
// //   };

// //   static async create({ name, email, password ,role }) {
// //     const [result] = await pool.query(`INSERT INTO users (name, email, password ,role) VALUES (?, ?, ?,?)`,
// //     [name, email, password ,role]);
// //     // recupere l'utilisateur cree 
// //     const [user] = await pool.query('SELECT * FROM users WHERE id = ?',[result.insertId] );
// //     return user[0];
// //   };

// //   // verification indentifiant  users.
// //   static async ifExist(userEmail,UserName){
// //     if(userEmail){
// //       const [rows] = await pool.query('SELECT * FROM users WHERE email = ?',[userEmail]);
// //      return rows.length > 0;
// //     }else if(UserName){
// //       const [rows] = await pool.query('SELECT * FROM users WHERE name = ?',[UserName]);
// //       return rows.length > 0;
// //     };
// //   };
// // };

// // module.exports = UserRepository; 