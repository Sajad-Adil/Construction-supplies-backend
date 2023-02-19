const express = require("express")
const router = express.Router()
const validateObjectId = require("./middleware/validateObjectId");

const  { Store, validate }  = require("../models/store")

router.get("/", async (req, res) => {
    const stores = await Store.find()
    res.send(stores)
    try {
    const stores = await Store.find();
    res.json(stores);
} catch (err) {
    res.status(500).json({ message: err.message });
}
    
})

router.get("/:id", validateObjectId, async (req, res) => {
    const store = await Store.findById(req.params.id);
    if (!store)
        return res.status(404).send("The store with the given ID was not found.");

    res.send(store);
});

router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

const store = new Store({
    ownerID: req.body.ownerID,
    name: req.body.name,
});
await store.save((err) => {
        if (err) {
            return res.status(500).send(err)
        }
        res.status(200).json({ message: 'Store created successfully' })
});
});

router.put("/:id",async (req, res) => { // isSelf
    const id = req.params.id
    const updates = req.body

    Store.findByID(id, (err, store) => {
        if (err) {
            return res.status(500).send(err)
        }

        store.findByIdAndUpdate(updates, (err) => {
            if (err) {
                return res.status(500).send(err)
            }
            res.json({ message: 'Store updated successfully' })
            })
        
    })
})

router.delete("/:id", async (req, res) => { // isSelf
    const id = req.params.id

    Store.findByID(id, (err, store) => {
        if (err) {
            return res.status(500).send(err)
        }
        //permission to be added
        store.remove((err) => {
            if (err) {
                return res.status(500).send(err)
            }
            res.json({ message: 'Store deleted successfully' })
            })
    
    })
})

module.exports = router