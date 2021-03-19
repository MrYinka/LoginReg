const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.authorize = (req, res, next) => {
    const jwtToken = req.header("token");
    if(!jwtToken){
        return res.status(403).json({ Message: "Privileged Resource: Unauthorized!" });
    }
    try{

        const authorizedUser = jwt.verify(jwtToken, process.env.JWT_SECRET);
        req.user = authorizedUser.user;
        next();

    }catch(e) {
        console.log(e.message);
        return res.status(403).json({ Message: "Unauthorized" });
    }
};

