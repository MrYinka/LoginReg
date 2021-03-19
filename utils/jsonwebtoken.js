const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtGen = (user_id) => {

    const payload = {
        user : { id: user_id }
    }

    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1h"});
};


module.exports = jwtGen;