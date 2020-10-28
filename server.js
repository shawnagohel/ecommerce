const express = require('express');
const routes = require('./routes');
const sequelize = require('sequelize')

// import sequelize connection
const sq_connection = require('./config/connection')
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
sq_connection.sync()

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
