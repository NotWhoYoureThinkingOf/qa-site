const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const productModel = require('./models/product')

const {getAllProducts} = require('./models/product');

app.use(cors());
app.use(express.json())

// Route to get all products
app.get('/api/products', (req, res) => {
    getAllProducts((products) => {
        res.json(products); // Send products as JSON response
    });
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})