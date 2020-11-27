/* Express Configurations */
require('dotenv')
  .config();
const express = require('express');

const PORT = process.env.PORT || 3002; // set port, listen for requests
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public')); // For Getting Files,Images
app.set('view engine', 'html');
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const adminRoute = require('./routes/admin');

app.use('/admin-api', adminRoute);
