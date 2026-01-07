const mysql = require('mysql2/promise');

const pool = mysql.createPool( { host:'Localhost', user:'root', password:'', database:'bibliumdatabase' });

module.exports = pool;