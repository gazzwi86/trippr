const CountrySchema = require("../../models/Country");
const helpers = require("../../helpers");

exports.get = (req, resp) => {
  CountrySchema.find((err, result) => {
    if (err) return resp.send(err);

    return resp.json(result);
  });
};

exports.create = (req, resp) => {
  CountrySchema.create((err, result) => {
    if (err) return resp.send(err);

    return resp.json(result);
  });
};

exports.delete = id =>
  CountrySchema.deleteOne({ _id: id })
    .then(result => result)
    .catch(helpers.error);
