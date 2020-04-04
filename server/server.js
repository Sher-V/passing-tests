const express = require("express");
const bodyParser = require("body-parser");
const next = require("next");

// Database
const db = require("../server/config/database");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// tests db
db.authenticate()
  .then(() => console.log("DB connected"))
  .catch(err => console.log("Error " + err));

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(bodyParser.json());

    //handle tests route
    server.use("/tests", require("./routes/tests"));

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, err => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3000");
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
