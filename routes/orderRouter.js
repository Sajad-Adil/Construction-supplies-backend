const express = require("express")
const router = express.Router()
const validateObjectId = require("./middleware/validateObjectId");

const  { Order, validate }  = require("../models/order")

router.get("/", async (req, res) => {
    const orders = await Order.find()
    res.send(orders)
    try {
    const orders = await Order.find();
    res.json(orders);
} catch (err) {
    res.status(500).json({ message: err.message });
}
    
})

router.get("/:id", validateObjectId, async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (!order)
        return res.status(404).send("The order with the given ID was not found.");

    res.send(order);
});

router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

const order = new Order({
        userID: req.body.userID,
        storeID: req.body.storeID,
        totalPrice: req.body.totalPrice,
        quantity: req.body.quantity
});
await order.save((err) => {
        if (err) {
            return res.status(500).send(err)
        }
        res.status(200).json({ message: 'Order created successfully' })
});
});

router.put("/:id",async (req, res) => { 
    const id = req.params.id
    const updates = req.body

    Order.findByID(id, (err, order) => {
        if (err) {
            return res.status(500).send(err)
        }

        order.findByIdAndUpdate(updates, (err) => {
            if (err) {
                return res.status(500).send(err)
            }
            res.json({ message: 'Order updated successfully' })
            })
        
    })
})

router.delete("/:id", async (req, res) => { 
    const id = req.params.id

    Order.findByID(id, (err, order) => {
        if (err) {
            return res.status(500).send(err)
        }
        
        order.remove((err) => {
            if (err) {
                return res.status(500).send(err)
            }
            res.json({ message: 'Order deleted successfully' })
            })
    
    })
})

module.exports = router