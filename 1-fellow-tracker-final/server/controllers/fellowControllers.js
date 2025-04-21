const Fellow = require('../model/Fellow');

const serveFellows = (req, res) => {
  res.send(Fellow.all());
}

// Get One (Read)
const serveFellow = (req, res) => {
  const { id } = req.params;
  const fellow = Fellow.find(id);
  if (!fellow) {
    return res.status(404).send({
      message: `No fellow with the id ${id}`
    });
  }
  res.send(fellow);
};

// Create
const createFellow = (req, res) => {
  const { fellowName } = req.body;
  if (!fellowName) {
    return res.status(400).send({ message: "Invalid Name" });
  }

  res.send(Fellow.create(fellowName));
};

// Update
const updateFellow = (req, res) => {
  const { fellowName } = req.body;

  if (!fellowName) {
    return res.status(400).send({ message: "Invalid Name" });
  }

  const { id } = req.params;
  const updatedFellow = fellows.find((fellow) => fellow.id === Number(id));

  if (!updatedFellow) {
    return res.status(404).send({
      message: `No fellow with the id ${id}`
    });
  }

  updatedFellow.name = fellowName;
  res.send(updatedFellow);
}

// Delete
const deleteFellow = (req, res) => {
  const { id } = req.params;

  const fellowIndex = fellows.findIndex((fellow) => fellow.id === Number(id));
  if (fellowIndex < 0) {
    return res.status(404).send({
      message: `No fellow with the id ${id}`
    });
  }

  fellows.splice(fellowIndex, 1);
  res.sendStatus(204);
}

module.exports = {
  serveFellows,
  serveFellow,
  createFellow,
  updateFellow,
  deleteFellow
}