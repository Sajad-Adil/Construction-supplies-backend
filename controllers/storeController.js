const Store = require('../models/store');
const { validateStore } = require('../models/validation/validateStore')

const getAllStores = async (req, res) => {
    const stores = await Store.find()
    if (!stores) return res.status(204).json({ 'message': 'No stores found' });
    res.json(stores);
}

const getStore = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": 'Store ID required' });
    const store = await Store.findOne({ _id: req.params.id }).exec();
    if (!store) {
        return res.status(204).json({ 'message': `Store ID ${req.params.id} not found` });
    }
    res.json(store);
}


const createStore = async (req, res) => {
    const { error } = validateStore(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { ownerID, name , latitude, longitude, city, district } = req.body;
    if (!ownerID || !name || !latitude || !longitude ) return res.status(400).json({ 'message': 'OwnerID ,Store name  and location param are required.' });

    try {
        const result = await Store.create({
            "ownerID" : ownerID,
            "name": name,
            "latitude": latitude,
            "longitude": longitude,
            "city": city,
            "district": district
        });

        console.log(result);
        res.status(201).json({ 'success': `New store created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

const updateStore = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }

    const store = await Store.findOne({ _id: req.body.id }).exec();
    if (!store) {
        return res.status(204).json({ "message": `No store matches ID ${req.body.id}.` });
    }
    if (req.body?.ownerID) store.ownerID= req.body.ownerID;
    if (req.body?.name) store.name = req.body.name;
    if (req.body?.latitude) store.latitude= req.body.latitude;
    if (req.body?.longitude) store.longitude= req.body.longitude;
    if (req.body?.city) store.city= req.body.city;
    if (req.body?.district) store.district= req.body.district;

    const result = await store.save();
    res.json(result);
}
const deleteStore = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ "message": 'Store ID required' });
    const store = await Store.findOne({ _id: req.body.id }).exec();
    if (!store) {
        return res.status(204).json({ 'message': `Store ID ${req.body.id} not found` });
    }
    const result = await store.deleteOne({ _id: req.body.id });
    res.json(result);
}

module.exports = {
    getAllStores,
    getStore,
    createStore,
    updateStore,
    deleteStore
}
