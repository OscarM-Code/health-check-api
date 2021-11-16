const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {

    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if(!token) {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.decoded = decoded;
    } catch(err) {

        return res.status(401).send({
            success: false,
            message: 'Invalid token.'
        });

    }

    next();

}

exports.checkAdmin = (req, res, next) => {
    const token = req.decoded;
    console.log(token);
    if(token.role !== "ROLE_ADMIN"){
        return res.status(403).json({
            success: false,
            message: "You are not authorized to perform this action"
        });
    }

    next();
}