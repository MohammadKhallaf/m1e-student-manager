const authMiddleware = (req, res, next) => {
  // check req.body.key --> X
  // check header

  const apiKey = req.headers["x-api-key"];
  console.log(apiKey, "In the auth MIDDLEWARE");
  if (apiKey && apiKey === "m1e") next();
  else res.status(401).send("Unauthorized");
};

module.exports = authMiddleware;
