// const {getAllProducts} = require('./models/product');

// getAllProducts((Products) => {
//     console.log('Products: ', Products)
// })

const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve('E:/LinkedIn/Project/qa-site/database/ecommerce-database.db'); // Adjust this path

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
        return;
    }
    console.log('Connected to the database.');
    
    // Test query to list tables
    db.all("SELECT name FROM sqlite_master WHERE type='table'", [], (err, rows) => {
        if (err) {
            console.error('Error querying database:', err.message);
            return;
        }
        console.log('Tables in the database:', rows);
        
        // Test query to get products
        db.all("SELECT * FROM Products", [], (err, rows) => {
            if (err) {
                console.error('Error querying Products table:', err.message);
                return;
            }
            console.log('Products:', rows);
        });
    });
});