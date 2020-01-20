const { User } = require("../models/User");

// user register
module.exports.register = (req, res) => {
  const body = req.body;
  const user = new User(body);
  user
    .save()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.send(err);
    });
};

// user login
module.exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findByCredentials(email, password)
    .then((user) => {
      user
        .generateToken()
        .then((token) => {
          res.json({ token });
        })
        .catch((err) => {
          res.send(err);
        });
    })
    .catch((err) => {
      res.send(err);
    });
};
// user account
module.exports.account = (req, res) => {
  const { user } = req;
  res.send(user);
};

// user logout
module.exports.logout = (req, res) => {
  const { user, token } = req;
  User.findByIdAndUpdate(user._id, { $pull: { tokens: { token: token } } })
    .then(() => {
      res.json({ notice: "Successfully logged out." });
    })
    .catch((err) => {
      res.json(err);
    });
};
