const express = require("express")
const router = express.Router()
const validateObjectId = require("./middleware/validateObjectId");

const  { Product, validate }  = require("../models/product")

router.get("/", async (req, res) => {
    const products = await Product.find()
    res.send(products)
    try {
    const products = await Product.find();
    res.json(products);
} catch (err) {
    res.status(500).json({ message: err.message });
}
    
})

router.get("/:id", validateObjectId, async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product)
        return res.status(404).send("The product with the given ID was not found.");

    res.send(product);
});

router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

const product = new Product({
    title: req.body.title,
    description: req.body.description,
    storeID: req.body.storeID,
    categoryID: req.body.categoryID,
    stockQuantity: req.body.stockQuantity,
    
});
await product.save((err) => {
        if (err) {
            return res.status(500).send(err)
        }
        res.status(200).json({ message: 'Product created successfully' })
});
});

router.put("/:id",async (req, res) => { // isSelf
    const id = req.params.id
    const updates = req.body

    Product.findByID(id, (err, product) => {
        if (err) {
            return res.status(500).send(err)
        }

        product.findByIdAndUpdate(updates, (err) => {
            if (err) {
                return res.status(500).send(err)
            }
            res.json({ message: 'Product updated successfully' })
            })
        
    })
})

router.delete("/:id", async (req, res) => { // isSelf
    const id = req.params.id

    Product.findByID(id, (err, product) => {
        if (err) {
            return res.status(500).send(err)
        }
        //permission to be added
        product.remove((err) => {
            if (err) {
                return res.status(500).send(err)
            }
            res.json({ message: 'Product deleted successfully' })
            })
    
    })
})
module.exports = router