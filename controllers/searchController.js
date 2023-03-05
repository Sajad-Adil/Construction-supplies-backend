const Product = require('../models/product');

const findProduct = async (req, res) => {
const { query } = req.query;

    try {
        const products = await Product.find({
        title: {
        $regex: query,
        $options: 'i',
        },
    })
        res.json(products);
    } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
}};

module.exports = {
    findProduct
}
