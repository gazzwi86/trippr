const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DestinationSchema = new Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    destination: { type: String, required: true },
    duration: { type: Number, required: true },
    list: {
      type: Schema.Types.ObjectId,
      ref: "List"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Destination", DestinationSchema);
