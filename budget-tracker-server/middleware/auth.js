const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET ; // Ensure the secret is pulled from the .env file

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from the 'Authorization' header
    // console.log("Token from header:", token);
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    try {
        // Verify and decode the token using the secret key
        const decoded = jwt.verify(token, JWT_SECRET);

        // Attach the userId to the request object
        req.user = { userId: decoded.userId }; 

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({
            message: 'Unauthorized',
            error: error.message, 
            code: error.name, 
        });
    }
};

module.exports = authMiddleware;
