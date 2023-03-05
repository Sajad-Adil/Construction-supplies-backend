const Order = require('../models/order');
const { validateOrder} = require('../models/validation/validateOrder')

const getOrdersByStore = async (req, res) => {
    const orders = await Order.find({storeId})
    if (!orders) return res.status(204).json({ 'message': 'There is no Orders' });
    res.json(orders);
}

const getOrder = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": 'Order ID required' });
    const order = await Order.findOne({ _id: req.params.id }).exec();
    if (!order) {
        return res.status(204).json({ 'message': `Order ID ${req.params.id} not found` });
    }
    res.json(order);
}

const createOrder = async (req, res) => {
    const { error } = validateOrder(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const userId = req.userId;
        const {
        storeId,
        items,
        totalPrice,
        status
    } = req.body
    if (!storeId ) return res.status(400).json({ 'message': 'storeID is required' });

    try {
        const result = await Order.create({
            "userId" : userId,
            "storeId": storeId,
            "items": items,
            "totalPrice": totalPrice,
            "status": status,
        });

        console.log(result);
        res.status(201).json({ 'success': `New order created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

const updateOrder = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }

    const order = await Order.findOne({ _id: req.body.id }).exec();
    if (!order) {
        return res.status(204).json({ "message": `No order matches ID ${req.body.id}.` });
    }

    if (req.body?.items) order.items= req.body.items;
    if (req.body?.totalPrice) order.totalPrice = req.body.totalPrice;
    if (req.body?.status) order.status= req.body.status;

    const result = await order.save();
    res.json(result);
}
const deleteOrder = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ "message": 'Order ID required' });
    const order = await Order.findOne({ _id: req.body.id }).exec();
    if (!order) {
        return res.status(204).json({ 'message': `Order ID ${req.body.id} not found` });
    }
    const result = await order.deleteOne({ _id: req.body.id });
    res.json(result);
}

module.exports = {
    getOrdersByStore,
    getOrder,
    createOrder,
    updateOrder,
    deleteOrder
}
