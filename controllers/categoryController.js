const Category = require('../models/category');

const getAllCategories = async (req, res) => {
    const categories = await Category.find();
    if (!categories) return res.status(204).json({ 'message': 'No categories found' });
    res.json(categories);
}
const getCategory = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": 'Category ID required' });
    const category = await Category.findOne({ _id: req.params.id }).exec();
    if (!category) {
        return res.status(204).json({ 'message': `Category ID ${req.params.id} not found` });
    }
    res.json(category);
}

const createCategory = async (req, res) => {
    
    const { categoryName} = req.body;
    if (!categoryName) return res.status(400).json({ 'message': 'Cagegory Name is required.' });

    try {
        const result = await Category.create({
            "categoryName" : categoryName,
        
        });

        console.log(result);
        res.status(201).json({ 'success': `New category created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

const updateCategory = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }

    const category = await Category.findOne({ _id: req.body.id }).exec();
    if (!category) {
        return res.status(204).json({ "message": `No category matches ID ${req.body.id}.` });
    }
    if (req.body?.categoryName) category.categoryName= req.body.categoryName;

    const result = await category.save();
    res.json(result);
}
const deleteCategory = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ "message": 'Category ID required' });
    const category = await Category.findOne({ _id: req.body.id }).exec();
    if (!category) {
        return res.status(204).json({ 'message': `Category ID ${req.body.id} not found` });
    }
    const result = await category.deleteOne({ _id: req.body.id });
    res.json(result);
}

module.exports = {
    getAllCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
}
