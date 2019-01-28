const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HolidaySchema = new Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    date: { type: String, required: true, unique: true },
    name: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Holiday", HolidaySchema);
