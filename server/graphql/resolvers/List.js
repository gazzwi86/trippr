const mongoose = require("mongoose");
const ListSchema = require("../../models/List");
const UserController = require("./User");
const DestinationController = require("./Destination");
const helpers = require("../../helpers");

exports.create = async ({ listInput }, req) => {
  try {
    helpers.isAuth(req);

    let list;

    if (!listInput._id) {
      list = new ListSchema();
      list["_id"] = new mongoose.Types.ObjectId();
    } else {
      list = await ListSchema.findById(listInput._id);

      if (!list) {
        throw new Error("List doesn't exists");
      }
    }

    list.name = listInput.name;
    list.destinations = listInput.destinations;
    list.creator = listInput.creator;

    const result = await list.save();

    return {
      ...result._doc,
      creator: await UserController.getById(result._doc.creator)
    };
  } catch (err) {
    return helpers.error(err);
  }
};

exports.get = async (args, req) => {
  try {
    helpers.isAuth(req);

    const lists = await ListSchema.find();

    return lists.map(async result => ({
      ...result._doc,
      creator: await UserController.getById(result.creator),
      destinations: await DestinationController.getByListId(result._doc._id)
    }));
  } catch (err) {
    return helpers.error(err);
  }
};

exports.getById = async listId => {
  try {
    const result = await ListSchema.findById(listId);

    return {
      ...result._doc,
      creator: await UserController.getById(result._doc.creator),
      destinations: await DestinationController.getByListId(listId)
    };
  } catch (err) {
    return helpers.error(err);
  }
};

exports.getByUserId = async userId => {
  try {
    const lists = await ListSchema.find({ creator: { $in: userId } });

    return lists.map(result => ({
      ...result._doc,
      destinations: result._doc.destinations.map(
        async ({ _id }) => await DestinationController.getById(_id)
      )
    }));
  } catch (err) {
    return helpers.error(err);
  }
};

exports.delete = async ({ listId }, req) => {
  try {
    helpers.isAuth(req);

    const list = await this.getById(listId);

    if (list) {
      await ListSchema.deleteOne({ _id: listId });
      await DestinationController.deleteMany(
        list.destinations.map(({ _id }) => _id)
      );

      return listId;
    } else {
      throw Error("List does'nt exist");
    }
  } catch (err) {
    return helpers.error(err);
  }
};

exports.deleteMany = async ids => {
  try {
    const lists = await ListSchema.find({ _id: { $in: ids } });

    await ListSchema.deleteMany({ _id: { $in: ids } });
    await DestinationController.deleteMany(
      lists.reduce((arr, list) => arr.concat(list.destinations), [])
    );

    return ids;
  } catch (err) {
    return helpers.error(err);
  }
};
