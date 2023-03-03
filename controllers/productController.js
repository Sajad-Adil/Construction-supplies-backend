const Product = require('../models/product');
const  { validateProduct } = require('../models/validation/validateProduct')

const getAllProducts = async (req, res) => {
    const products = await Product.find();
    if (!products) return res.status(204).json({ 'message': 'No products found' });
    res.json(products);
}

const getSingleProduct = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": 'Product ID required' });
    const product = await Product.findOne({ _id: req.params.id }).exec();
    if (!product) {
        return res.status(204).json({ 'message': `Product ID ${req.params.id} not found` });
    }
    res.json(product);
}

const getProductsByCategory = async (req, res) => {
    const products = await Product.find({ categoryID });
    if (!products) return res.status(204).json({ 'message': 'No products found' });
    res.json(products);
    
}

const getProductsByStore = async (req, res) => {
    const products = await Product.find({ storeID });
    if (!products) return res.status(204).json({ 'message': 'No products found' });
    res.json(products);
    
}

const createProduct = async (req, res) => {
    
    const { error } = validateProduct(req.body);
    if (error) return res.status(400).send(error.details[0].message);


    const { storeID, title , description, price, stockQuantity, categoryID} = req.body;
    if (!storeID || !title ) return res.status(400).json({ 'message': 'StoreID and Product name are required.' });
    let image

    if (req.files && req.files.length) {
        image = `uploads/${req.files[0].filename}`
    } else {
        image = ''
    }
    try {
        const result = await Product.create({
            "storeID" : storeID,
            "categoryID": categoryID,
            "title": title,
            "description": description,
            "price":price,
            "stockQuantity": stockQuantity,
            "image": image
        });

        console.log(result);
        res.status(201).json({ 'success': `New product created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

const updateProduct = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }

    const product = await Product.findOne({ _id: req.body.id }).exec();
    if (!product) {
        return res.status(204).json({ "message": `No product matches ID ${req.body.id}.` });
    }
    if (req.body?.categoryID) product.categoryID= req.body.categoryID;
    if (req.body?.title) product.title = req.body.title;
    if (req.body?.description) product.description= req.body.description;
    if (req.body?.price) product.price= req.body.price;
    if (req.body?.stockQuantity) product.stockQuantity= req.body.stockQuantity;


    const result = await product.save();
    res.json(result);
}
const deleteProduct = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ "message": 'Product ID required' });
    const product = await Product.findOne({ _id: req.body.id }).exec();
    if (!product) {
        return res.status(204).json({ 'message': `Product ID ${req.body.id} not found` });
    }
    const result = await product.deleteOne({ _id: req.body.id });
    res.json(result);
}

module.exports = {
    getAllProducts,
    getSingleProduct,
    getProductsByStore,
    getProductsByCategory,
    createProduct,
    updateProduct,
    deleteProduct
}
