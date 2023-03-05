const Cart = require('../models/cart');
//const { validateCart } = require('../models/validation/validateCart')

// Master Only
const getAllCarts = async (req, res) => {
    const carts = await Cart.find()
    if (!carts) return res.status(204).json({ 'message': 'No carts found' });
    res.json(carts);
}


const getCart = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": 'Cart ID required' });
    const cart = await Cart.findOne({ _id: req.params.id }).exec();
    if (!cart) {
        return res.status(204).json({ 'message': `Cart ID ${req.params.id} not found` });
    }
    res.json(cart);
}

const createCart = async (req, res) => {
    // const { error } = validateCart(req.body);
    // if (error) return res.status(400).send(error.details[0].message);
    const { productId, quantity } = req.body;

    const userId = "63ff0742045724b61f79afba"; // the logged in user id

    try {
    let cart = await Cart.findOne({ userId });

    if (cart) {
      //cart exists for user
        let itemIndex = cart.items.findIndex(p => p.productId == productId);

        if (itemIndex > -1) {
            let productItem = cart.items[itemIndex];
            productItem.quantity = quantity;
            cart.items[itemIndex] = productItem;
        } else {
            cart.items.push({ productId, quantity });
        }
    cart = await cart.save();
    return res.status(201).send(cart);
    } else {
      //no cart for user, create new cart
        const newCart = await Cart.create({
        userId,
        items: [{ productId, quantity }]
    });

    return res.status(201).send(newCart);
    }
    } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
}
}

const removeItem = async (req, res) => {
    const userId = "63ff0742045724b61f79afba"; 
    let productId = req.body.productId;

    let cart = await Cart.findOne({ userId: userId });
    if (!cart)
        return res
        .status(404)
        .send({ status: false, message: "Cart not found for this user" });

    let itemIndex = cart.items.findIndex((p) => p.productId == productId);
    if (itemIndex > -1) {
    cart.items.splice(itemIndex, 1);
    cart = await cart.save();
    return res.status(200).send({ status: true, updatedCart: cart });
    }
    res.status(400)
    .send({ status: false, message: "Item does not exist in cart" });
};

module.exports = {
    getAllCarts,
    getCart,
    createCart,
    removeItem
}
