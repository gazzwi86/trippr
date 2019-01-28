const jwt = require("jsonwebtoken");
const helpers = require("../helpers");

module.exports = async (req, resp, next) => {
  try {
    const authHeader = req.get("Authorization");

    if (!authHeader) {
      req.isAuth = false;
    } else {
      const token = authHeader.split(" ")[1];

      if (!token || token === "") {
        req.isAuth = false;
      } else {
        const decoded = await jwt.verify(
          token,
          process.env.JWT_SECRET || "secret"
        );

        if (!decoded) {
          req.isAuth = false;
        } else {
          req.isAuth = true;
          req.userData = decoded;
        }
      }
    }

    return next();
  } catch (err) {
    req.isAuth = false;

    helpers.error(err);
    // return resp.status(401).json({ message: 'Not authorised' });
  }
};
