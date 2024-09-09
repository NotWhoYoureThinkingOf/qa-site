const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

const db = require('./config/db')

app.use(cors());
app.use(express.json())

// Route to get all products
app.get('/api/products', async (req, res) => {
    try {
        const result = await db.query ('SELECT id, name, CAST(price AS DECIMAL), quantity, image_url FROM Products');
        res.json(result.rows); // send the products as json
    } catch (error) {
        console.error('Error getting products: ', error)
        res.status(500).json({error: "Internal server error"})
    }    
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})