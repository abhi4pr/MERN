const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
    if (!authHeader) {
      res.status(401).send({
         status: 0,
         message: "Not authorized"
      });
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_TOKEN, (err, payload) =>{
      if (err) {
        res.status(403).send({
           status: 0,
           message: "Token is invalid"
        });
      } else {
        req.payload = payload;
        next();
      }
    })
};

const verifyTokenAnduser = (req, res, next) => {
  const authHeader = req.headers['authorization'];
    if (!authHeader) {
      res.status(401).send({
         status: 0,
         message: "Not authorized"
      });
    }
    const token = authHeader.split(" ")[1];
    const verified = jwt.verify(token, process.env.JWT_TOKEN);
      if (verified.userId == req.params.id) {
        next();
      } else {
        res.status(403).send({
           status: 0,
           message: "You are not genuine user"
        });
      }
};

module.exports = {
  verifyToken,
  verifyTokenAnduser
};
