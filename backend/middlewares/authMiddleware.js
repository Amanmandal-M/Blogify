const jwt = require('jsonwebtoken');
const { UserModel } = require('../models/allModels');

const SECRET_KEY = process.env.SECRET_KEY;

const authenticateUser = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return res.status(401).json({ error: 'Authorization token missing' });
    }

    const token = authorizationHeader.split(' ')[1]; // Extract the token part
    if (!token) {
      return res.status(401).json({ error: 'Authorization token missing' });
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.userId;

    const user = await UserModel.findByPk(userId);
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    
    req.user = user; // Attach the user object to the request
    next(); // Proceed to the next middleware or route
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};


module.exports = {
  authenticateUser
};
