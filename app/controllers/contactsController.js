const { Contact } = require("../models/contacts");

module.exports.create = function(req, res) {
  res.send("success", req.body);
};

module.exports.create = (req, res) => {
  const { user, body } = req;
  body.user = user._id;
  const concact = new Contact(body);
  concact
    .save()
    .then((concact) => {
      res.send(concact);
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports.show = (req, res) => {
  const id = req.params.id;
  const { user } = req;
  Contact.findOne({
    _id: id,
    user: user._id
  })
    .then((contact) => {
      if (contact) {
        res.json(contact);
      } else {
        res.json({});
      }
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.update = (req, res) => {
  const _id = req.params.id;
  const { user, body } = req;
  Contact.findOneAndUpdate({ _id, user: user._id }, body, {
    new: true,
    runValidators: true
  })
    .then((contact) => {
      if (contact) {
        res.send(contact);
      } else {
        res.json({});
      }
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports.list = (req, res) => {
  const { user, query } = req;
  Contact.find({ user: user._id })
    .skip(5 * (query.pageNumber - 1))
    .limit(5)
    .then((contacts) => {
      res.send(contacts);
    })
    .catch((err) => {
      res.send(err);
    });
};
