const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(value) {
        return validator.isEmail(value);
      },
      message: function() {
        return "invalid email format";
      }
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 128
  },
  tokens: [
    {
      token: {
        type: String
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

userSchema.pre("save", function(next) {
  const user = this;
  if (user.isNew) {
    bcryptjs.genSalt(10).then(function(salt) {
      bcryptjs.hash(user.password, salt).then(function(enpass) {
        user.password = enpass;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.statics.findByCredentials = function(email, password) {
  const User = this;

  return User.findOne({ email })
    .then(function(user) {
      if (!user) {
        return Promise.reject({ error: "Invalid Email/Password" });
      }

      if (password) {
        return bcryptjs.compare(password, user.password).then((result) => {
          if (result) {
            return Promise.resolve(user);
          } else {
            return Promise.reject("Invalid email/password");
          }
        });
      } else {
        return Promise.reject("Please provide a password");
      }
    })
    .catch(function(err) {
      return Promise.reject(err);
    });
};

userSchema.methods.generateToken = function() {
  const user = this;
  const tokenData = {
    _id: user._id,
    name: user.name,
    createdAt: Number(new Date())
  };

  const token = jwt.sign(tokenData, "shera786");
  user.tokens.push({ token });
  return user
    .save()
    .then(function(user) {
      return Promise.resolve(token);
    })
    .catch(function(err) {
      return Promise.reject(err);
    });
};

userSchema.statics.findByToken = function(token) {
  const User = this;

  let tokenData;
  try {
    tokenData = jwt.verify(token, "jwt@123");
  } catch (err) {
    return Promise.reject(err);
  }

  return User.findOne({
    _id: tokenData._id,
    "tokens.token": token
  });
};

const User = mongoose.model("User", userSchema);

module.exports = {
  User
};
