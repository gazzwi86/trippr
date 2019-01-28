const mongoose = require("mongoose");
const DestinationSchema = require("../../models/Destination");
const ListController = require("./List");
const helpers = require("../../helpers");

exports.create = async ({ destinationInput }, req) => {
  try {
    helpers.isAuth(req);

    let destination;

    if (!destinationInput._id) {
      destination = new DestinationSchema();
      destination["_id"] = new mongoose.Types.ObjectId();
    } else {
      destination = await DestinationSchema.findById(destinationInput._id);

      if (!destination) {
        throw new Error("Destination doesn't exists");
      }
    }

    destination.destination = destinationInput.destination;
    destination.duration = destinationInput.duration;
    destination.list = destinationInput.list;

    const result = await destination.save();

    return {
      ...result._doc,
      list: await ListController.getById(result._doc.list)
    };
  } catch (err) {
    return helpers.error(err);
  }
};

exports.get = async (args, req) => {
  try {
    helpers.isAuth(req);

    const destinations = await DestinationSchema.find();

    return destinations.map(async result => ({
      ...result._doc,
      list: await ListController.getById(result._doc.list)
    }));
  } catch (err) {
    return helpers.error(err);
  }
};

exports.getById = async destinationId => {
  try {
    const destination = await DestinationSchema.findById(destinationId);

    return {
      ...destination._doc,
      list: await ListController.getById(destination._doc.list)
    };
  } catch (err) {
    return helpers.error(err);
  }
};

exports.getByListId = async listId => {
  try {
    const results = await DestinationSchema.find({ list: { $in: listId } });

    return results.map(result => result._doc);
  } catch (err) {
    return helpers.error(err);
  }
};

exports.delete = async ({ destinationId }, req) => {
  try {
    helpers.isAuth(req);

    const destination = await this.getById(destinationId);

    if (destination) {
      await DestinationSchema.deleteOne({ _id: destinationId });

      return destinationId;
    } else {
      throw Error("Destination does'nt exist");
    }
  } catch (err) {
    return helpers.error(err);
  }
};

exports.deleteMany = async ids => {
  try {
    await DestinationSchema.deleteMany({ _id: { $in: ids } });

    return ids;
  } catch (err) {
    return helpers.error(err);
  }
};
