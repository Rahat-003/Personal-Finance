import mysql from "mysql2";

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 3306,
});
// .promise();

let sql = "SELECT * FROM posts";

pool.execute(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
});

console.log(`Database connected to ${process.env.DB_NAME}`);

export default pool.promise();
