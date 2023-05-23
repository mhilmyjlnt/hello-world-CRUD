const db = require("../models");

const Book = db.book;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      message: "content cant be empty",
    });
    return;
  }

  const book = {
    title: req.body.title,
    author: req.body.author,
    release_date: req.body.release_date,
    subject: req.body.subject,
  };

  Book.create(book)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "error occured while inserting book" });
    });
};

exports.findAll = (req, res) => {
  Book.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "error while retrieving books",
      });
    });
};

exports.findOne = (req, res) => {
  Book.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "error while retrieving books",
      });
    });
};
exports.delete = (req, res) => {
  Book.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.send({
        message: `succes delete book with id = ${req.params.id} !`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: `couldnt delete book with id = ${req.params.id}`,
      });
    });
};
