const {Pool} = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ecommerce-db',
    password: 'WtrAttila12!23',
    port: 5432
})

const query = (text, params) => {
    return pool.query.apply(text, params)
}

module.exports = {
    query: (text, params) => pool.query(text, params),
};

/* Code from connecting DB Browser. Will delete later. */
// const sqlite3 = require('sqlite3').verbose();
// const path = require('path');
// const dbPath = path.resolve('E:/LinkedIn/Project/qa-site/database/ecommerce-database.db');

// // create a new database connection
// const db = new sqlite3.Database(dbPath, (err) => {
//     if (err) {
//         console.error('Error opening database:', err.message);
//         return;
//     }
//     // console.log('Connected to the database.');
    
//     // Test query to list tables
//     db.all("SELECT name FROM sqlite_master WHERE type='table'", [], (err, rows) => {
//         if (err) {
//             console.error('Error querying database:', err.message);
//             return;
//         }
//         // console.log('Tables in the database:', rows);
        
//         // Test query to get products
//         db.all("SELECT * FROM Products", [], (err, rows) => {
//             if (err) {
//                 console.error('Error querying Products table:', err.message);
//                 return;
//             }
//             // console.log('Products:', rows);
//         });
//     });
// });

// module.exports = db