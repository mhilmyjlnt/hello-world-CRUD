const express = require("express");
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

const db = require("./app/models");
db.sequelizeConnection
  .sync()
  .then(() => {
    console.log("synced db");
  })
  .catch((err) => {
    console.log(`failed to sync ${err.message}`);
  });

const bookController = require("./app/controllers/book.controller.js");
app.post("/", (req, res) => {
  bookController.create(req, res);
});

app.get("/", (req, res) => {
  bookController.findAll(req, res);
});

app.get("/:id", (req, res) => {
  bookController.findOne(req, res);
});

app.post("/:id", (req, res) => {
  bookController.delete(req, res);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
