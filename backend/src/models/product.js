const db = require('../config/db');

// Function to get all products
const getAllProducts = (callback) => {
    const query = 'SELECT * FROM Products';
    db.all(query, [], (err, rows) => {
        if(err) {
            console.err('Error executing query: ', err.message)
            return;
        }
        console.log('Query results: ', rows)
        callback(rows)
    });
}

// Export the function to use in other parts of the application
module.exports = {
    getAllProducts
}