const mongoose = require("mongoose");

const event = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "What are we calling the event"],
      trim: true,
    },
    user_id: { type: mongoose.Types.ObjectId },
    description: {
      type: String,
      required: [true, "A description is important"],
      unique: true,
    },
    date: { type: Date, required: [true, "Please provide a date"] },
    // image: {type: String}
    time: { type: String },
    address: { type: String, required: [true, "The adress is important"] },
    city: { type: String, required: [true, "The adress is important"] },
    public: { type: Boolean, required: [true, "Event privacy is missing"] },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Event", event);
