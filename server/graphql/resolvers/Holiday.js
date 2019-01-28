const HolidaySchema = require("../../models/Holiday");

exports.get = (req, resp) => {
  HolidaySchema.find((err, result) => {
    if (err) return resp.send(err);

    return resp.json(result);
  });
};
