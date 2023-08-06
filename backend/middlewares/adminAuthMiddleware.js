const jwt = require('jsonwebtoken');

const adminKeyAuthenticator = (req, res, next) => {
    const secretKey = req.headers.secretKey || "";
  
    if (secretKey === process.env.ADMIN_SECRET_KEY) {
      next(); // Proceed to the next middleware or route
    } else {
      res.status(401).json({ error: 'Unauthorized access: Invalid secret key' });
    }
};

const adminAuthentication = async (req, res, next) => {
    try {
      const authorizationHeader = req.headers.authorization;
      if (!authorizationHeader) {
        return res.status(401).json({ error: 'Authorization token missing' });
      }
  
      const token = authorizationHeader.split(' ')[1]; // Extract the token part
      const isBearer = authorizationHeader.split(' ')[0]; // Extract the token part

      if(!isBearer) {
        return res.status(401).json({ error: 'Authorization Bearer missing' });
      }

      if (!token) {
        return res.status(401).json({ error: 'Authorization token missing' });
      }
  
      const decoded = jwt.verify(token, ADMIN_JWT_KEY);

      if(decoded) {
          next(); // Proceed to the next middleware or route
      }
    } catch (error) {
      res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = {
    adminAuthentication,
    adminKeyAuthenticator
}