const mysql = require('mysql2/promise');
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'db_design',
});

const getConnection = async () => {
    return await pool.getConnection();
}

export default getConnection;