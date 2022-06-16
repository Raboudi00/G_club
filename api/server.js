const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRouter = require("./Router/authRouter");
const eventRouter = require("./Router/eventRouter");

dotenv.config();
const port = process.env.PORT;
const mongoUrl = process.env.MONGO_URL;

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/user", authRouter);
app.use("/api/event", eventRouter);

app.get("/", (req, res) => {
  res.status(200).json(users);
});

app.post("/user", (req, res) => {
  const { email, password } = req.body;
  if (email === users.email && password === users.password) {
    res.status(200).send(true);
  } else {
    res.send(false);
  }
});

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection to database established successfully");
    app.listen(port, console.log(`connected on port ${port}`));
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
