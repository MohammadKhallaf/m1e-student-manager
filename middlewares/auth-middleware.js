const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // check req.body.key --> X
  // check header

  const apiKey = req.headers["x-api-key"];
  const bearerToken =
    req.headers["authorization"] || req.headers["Authorization"];

  console.log(apiKey, "In the auth MIDDLEWARE");
  if (apiKey && bearerToken && apiKey === "m1e") {
    const token = bearerToken.split("Bearer ")[1];
    console.log(token);
    const decoded = jwt.verify(token, process.env.JWT_KEY); // {userId}
    req.user = decoded;
    next();
  } else res.status(401).send("Unauthorized");
};

module.exports = authMiddleware;
