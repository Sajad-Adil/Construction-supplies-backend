const bcrypt = require('bcrypt');
const User = require('../models/user')
const { validateUser } = require('../models/validation/validateUser')
const handleNewUser = async (req, res) => {

    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const { phoneNumber, password ,email, name, latitude, longitude, city, district, role } = req.body;
    if (!phoneNumber || !password) return res.status(400).json({ 'message': 'Phone number and password are required.' });


    const duplicate = await User.findOne({ phoneNumber: phoneNumber }).exec();
    if (duplicate) return res.sendStatus(409); //conflict 

        try {
        //encryption
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await User.create({
            "phoneNumber": phoneNumber,
            "password": hashedPassword,
            "email": email,
            "name": name,
            "latitude": latitude,
            "longitude": longitude,
            "city": city,
            "district": district,
            "roles": {}
        });

        console.log(result);
        res.status(201).json({ 'success': `New user created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };
