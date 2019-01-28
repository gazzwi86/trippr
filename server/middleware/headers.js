module.exports = (req, resp, next) => {
  resp.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTION");
  resp.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTION") {
    return resp.sendStatus(200);
  }

  next();
};
