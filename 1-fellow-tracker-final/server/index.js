const express = require('express');
const path = require('path');
const getId = require('./utils/getId');

const app = express();
const pathToFrontendDist = path.join(__dirname, '../frontend/dist');

////////////////////////
// Middleware
////////////////////////

const logRoutes = (req, res, next) => {
  const time = (new Date()).toLocaleString();
  req.time = time;
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next();
};

const serveStatic = express.static(pathToFrontendDist);

// A new middleware has appeared! 
// This parses incoming requests with JSON data in the body
// Access the data using `req.body`
const parseJSON = express.json();

app.use(logRoutes);   // Print out every incoming request
app.use(serveStatic); // Serve static public/ content
app.use(parseJSON);   // Parses request body JSON

////////////////////////
// Endpoints
////////////////////////

const fellows = [
  { name: 'Carmen', id: getId() },
  { name: 'Reuben', id: getId() },
  { name: 'Maya', id: getId() },
];

// Get All (Read)
const serveFellows = (req, res) => {
  res.send(fellows);
}

// Get One (Read)
const serveFellow = (req, res) => {
  const { id } = req.params;
  const fellow = fellows.find((fellow) => fellow.id === Number(id));

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

  const newFellow = {
    name: fellowName,
    id: getId()
  }
  fellows.push(newFellow);

  res.send(newFellow);
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

app.get('/api/fellows', serveFellows);
app.get('/api/fellows/:id', serveFellow);
app.post('/api/fellows', createFellow);
app.patch('/api/fellows/:id', updateFellow);
app.delete('/api/fellows/:id', deleteFellow);

app.get('*', (req, res, next) => {
  if (req.originalUrl.startsWith('/api')) return next();
  res.sendFile(pathToFrontendDist);
});

const port = 8080;
app.listen(port, () => console.log(`listening at http://localhost:${port}`));