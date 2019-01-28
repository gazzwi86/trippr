const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ListSchema = new Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    destinations: [
      {
        type: Schema.Types.ObjectId,
        ref: "Destination"
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("List", ListSchema);
