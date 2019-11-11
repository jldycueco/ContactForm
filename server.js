import express from 'express';

import cors from 'cors';

import nodemailer from './routes/nodemailer';

const app = express();
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
