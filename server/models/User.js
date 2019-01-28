const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const helpers = require("../helpers");

const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 12;

const UserSchema = new Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    email: {
      type: String,
      required: true,
      unique: true,
      match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String, required: true },
    country: { type: String, required: true },
    lists: [
      {
        type: Schema.Types.ObjectId,
        ref: "List"
      }
    ]
  },
  { timestamps: true }
);

UserSchema.pre("save", function(next) {
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) {
    return next();
  }

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (err) {
    return helpers.error(err);
  }
};

module.exports = mongoose.model("User", UserSchema);
