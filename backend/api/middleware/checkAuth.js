const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1]; // wyciaga z stringa tylko token 
        var decoded = jwt.verify(token, process.env.JWT_KEY);
    }
    catch(err){
        return res.status(401).json({message: "authorization error" });
    }
    next();
};