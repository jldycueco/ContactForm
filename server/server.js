const express = require('express')
const port = 5000
const app = express()

const nodemailer = require('./routes/nodemailer')

//Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Nodemailer Route
app.use('/', nodemailer);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))