const express = require("express");
const Router = express.Router();
const Event = require("../Models/Event");
const { isAuth } = require("../Middlewares/User");
const { isEvent, isMyEvent } = require("../Middlewares/Event");

Router.post("/", isAuth, async (req, res) => {
  try {
    const event = new Event({ ...req.body, user_id: req.user._id });
    if (!event) return res.send("Give a title");
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.send(error);
  }
});

Router.get("/myevents", isAuth, isEvent, isMyEvent, async (req, res) => {
  try {
    const events = await Event.find({ user_id: req.user._id });
    if (!events) return res.status(404).send("no events not found");
    res.status(200).json(events);
  } catch (error) {
    res.send(error);
  }
});

Router.get("/home", isAuth, isEvent, async (req, res) => {
  try {
    const events = await Event.find({ public: true });
    if (!events) return res.status(404).send("no events found");
    res.status(200).json(events);
  } catch (error) {
    res.send(error);
  }
});

Router.get("/:id", isAuth, isEvent, isMyEvent, async (req, res) => {
  try {
    const { id: userID } = req.params;
    const event = await Event.find({ _id: userID });
    if (!event) return res.status(404).send("event not found");
    res.status(200).json(event);
  } catch (error) {
    res.json(error);
  }
});

Router.patch("/:id", isAuth, isEvent, isMyEvent, async (req, res) => {
  try {
    const { id: eventID } = req.params;
    const event = await Event.findOneAndUpdate({ _id: eventID }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!event) return res.status(404).send("event not found");
    res.status(200).json({ event });
  } catch (error) {
    res.send(error);
  }
});

Router.delete("/:id", isAuth, isEvent, isMyEvent, async (req, res) => {
  try {
    const { id: eventID } = req.params;
    const event = await Event.findByIdAndDelete({ _id: eventID });
    if (!event) return res.status(404).send("event not found");
    res.status(200).send("deleted successfuly");
  } catch (error) {
    res.send(error);
  }
});

module.exports = Router;
