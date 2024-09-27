const User = require("../models/user-model");

const register = async (req, res) => {
  // read -> client
  // validate | check
  // create
  // save

  // search by username
  const currentUser = await User.findOne(
    {
      username: req.body.username,
    },
    "username"
  ).exec(); // user | null

  if (currentUser) {
    res.status(400).json({
      message: "This username is already exists",
      // user: currentUser, //! DON'T DO THIS IN REAL WORLD
    });
  }

  try {
    const newUser = await User.create(req.body);

    res.status(201).json({
      message: "User created!",
      user: {
        username: newUser.username,
      },
    });
  } catch (error) {
    res.status(500);
  }
};

module.exports = {
  register,
};
