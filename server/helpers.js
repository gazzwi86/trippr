exports.error = err => {
  process.env.NODE_ENV === "development" && console.log(err);

  throw new Error(err);
};

exports.isAuth = req => {
  if (!req.isAuth) {
    throw new Error("Not authorised");
  }
};
