const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user-model");
// Password -> Hashing & Salt -> Hashed (save)

const register = async (req, res) => {
  // read -> client
  const { username, password } = req.body;
  // validate | check
  // create
  // save

  // search by username
  const currentUser = await User.findOne(
    {
      username,
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
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({ username, password: hashedPassword });

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

const login = async (request, response) => {
  try {
    // read <_ client side
    const { username, password } = request.body;
    // validate

    const currentUser = await User.findOne({ username }).exec(); // user | null
    // null ?
    if (!currentUser)
      response.status(400).json({ message: "Invalid credentials!" });

    const isMatched = await bcrypt.compare(password, currentUser.password);
    // user
    if (!isMatched)
      response.status(400).json({ message: "Invalid credentials!" });

    // OK
    // generate token and send to user to save

    const token = jwt.sign({ userId: currentUser._id }, process.env.JWT_KEY, {
      expiresIn: "1h",
    });

    response.status(200).json({
      message: "Logged in!",
      user: { username: currentUser.username, _id: currentUser._id },
      token,
    });
  } catch (e) {
    response.status(500);
  }
};

module.exports = {
  register,
  login,
};
