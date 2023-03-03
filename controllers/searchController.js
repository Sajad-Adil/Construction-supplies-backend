const Product = require('../models/product');

const findProduct = async (req, res) => {
const { query } = req.query;
    try {
        const products = await Product
        .find({ $text: { $search: query }})
        .sort({ score: { $meta: "textScore" } })
        .exec();

    res.json(products);
    } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
}};

module.exports = {

    findProduct

}


