const Event = require("../Models/Event");

const isEvent = (req, res, next) => {
  Event.findOne({ id: req.params.id })
    .then((data) => {
      if (!data) return res.status(404).send();
      req.event = data;

      next();
    })
    .catch((err) => res.status(500).send(err));
};

const isMyEvent = (req, res, next) => {
  if (!req.user) return res.status(401).send("1");
  if (!req.event) return res.status(401).send("2");
  if (req.user.id.toString() !== req.event.user_id.toString())
    return res.status(401).send("3");
  next();
};

module.exports = { isEvent, isMyEvent };
