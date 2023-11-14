const { error } = require("console");
const db = require("../models");
const Child = db.child;
const Op = db.Sequelize.Op;

// Create and save new tutorial
exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const child = {
    name: req.body.name,
  };

  Child.create(child).then((data) => {
    res.send(data);
  });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Child.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err + "Error couldn't retrieve child with id=" + id,
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Child.update(req.body, {
    where: { child_id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Child was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update child with id=${id}. Maybe child was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating child with id=" + id,
      });
    });
};
// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Child.destroy({
    where: { child_id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Child was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete child with id=${id}. Maybe child was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete child with id=" + id,
      });
    });
};
