const express = require('express');
const app = express();
const cors = require('cors');

const nodemailer = require('./routes/nodemailer');

app.use(cors());

//Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Nodemailer Route
app.use('/send', nodemailer);

const port = 5000;
app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`),
);
