const express = require('express');
const cors = require('cors');
const path = require('path');
const sequelize = require('./app/config/dbConnection.js');
const chirpRoutes = require('./app/routes/chirpRoutes.js');
const postRoutes = require('./app/routes/chirpPostRoutes.js')

require('dotenv').config();
const app = express();

var corsOptions = {
  origin: 'http://localhost:8080',
};

app.use(cors(corsOptions));

// Parse requests of content-type - application/json
app.use(express.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Serve login.html when visiting the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'html', 'login.html'));
});

// Serve static files from the "static" directory
app.use(express.static(path.join(__dirname, 'static')));

//
// Use routes
app.use('/api', chirpRoutes, postRoutes);
// Sync the database
sequelize
  .sync({ alter: false })
  .then(() => {
    console.log('Database synced successfully.');
  })
  .catch((err) => {
    console.error('Unable to sync the database:', err);
  });

// Set port and start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
