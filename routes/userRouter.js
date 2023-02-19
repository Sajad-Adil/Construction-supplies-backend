const express = require("express")
const router = express.Router()
const validateObjectId = require("../middlewares/validateObjectid");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate } = require("../models/user");


router.get("/", async (req, res) => {
    const users = await User.find()
    res.send(users)
    try {
    const users = await User.find();
    res.json(users);
} catch (err) {
    res.status(500).json({ message: err.message });
}
    
})

router.get("/:id", validateObjectId, async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user)
        return res.status(404).send("The user with the given ID was not found.");

    res.send(user);
});

router.post("/", async (req, res) => {

});

router.put("/:id",async (req, res) => { 

});

router.delete("/:id", async (req, res) => { 

});


module.exports = router;