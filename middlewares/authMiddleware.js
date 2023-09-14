const jwt = require("jsonwebtoken");

//login verification middleware
module.exports = (req, res, next) => {
  try {
    //getting tokens from requests
    const token = req.headers.authorization.split(" ")[1];

    //verifying & decoding the token using json web tokens
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.body.userId = decoded.userId;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message, success: false });
  }
};
