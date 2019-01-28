const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const https = require("https");
const express = require("express");
const cors = require("cors");
const expressGraphQl = require("express-graphql");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const compression = require("compression");
const rfs = require("rotating-file-stream");

const auth = require("./middleware/auth");
const headers = require("./middleware/headers");
const helpers = require("./helpers");
const graphQlSchema = require("./graphql/schemas");
const graphQlResolvers = require("./graphql/resolvers");

const port = process.env.PORT || 8443;
const serverOptions = {
  key: fs.readFileSync(path.join(__dirname, "cert", "server.key"), "utf8"),
  cert: fs.readFileSync(path.join(__dirname, "cert", "server.cert"), "utf8")
};

// set the env
dotenv.config({
  path: path.resolve(__dirname, "../", `.env.${process.env.ENV}`)
});

module.exports = () => {
  const app = express();

  // let us get the data from a POST
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // redirect to https
  app.use((req, res, next) => {
    if (req.secure) {
      next();
    } else {
      res.redirect("https://" + req.headers.host + req.url);
    }
  });

  // serve static files
  app.use(express.static(__dirname.replace("server", "")));

  // middleware
  app.use(compression()); // gzip compression
  app.use(
    morgan("combined", {
      stream: rfs("access.log", {
        interval: "1d", // rotate daily
        path: path.join(__dirname, "log")
      })
    })
  );
  app.use(headers);
  app.use(auth);

  if (process.env.NODE_ENV === "development") {
    app.use(cors());
  }

  // setup graphql
  app.use(
    "/api/v1",
    expressGraphQl({
      schema: graphQlSchema,
      rootValue: graphQlResolvers,
      graphiql: process.env.NODE_ENV === "development" // available @ /api/v1/graphiql
    })
  );

  // setup mongo creds
  let mongoCreds = "";
  if (process.env.DB_USER && process.env.DB_PASS) {
    mongoCreds = `${process.env.DB_USER}:${process.env.DB_PASS}@`;
  }

  // connect to the db
  mongoose
    .connect(
      `mongodb://${mongoCreds}${process.env.HOST}:${process.env.DB_PORT}/${
        process.env.DB_NAME
      }`,
      {
        useNewUrlParser: true,
        useCreateIndex: true
      }
    )
    .then(() => {
      // create http server
      if (process.env.NODE_ENV !== "development") {
        https
          .createServer(app)
          .listen(80, console.log("Server is ready on port 80"));
      }

      // create https server
      https
        .createServer(serverOptions, app)
        .listen(port, console.log(`Server is ready on port ${port}`));
    })
    .catch(helpers.error);
};
