import express from 'express';
import path from 'path';
import cors from 'cors';

import nodemailer from './routes/nodemailer';

const app = express();
app.use(cors());

//Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Nodemailer Route
app.use('/send', nodemailer);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

/* The "catchall" handler: for any request that doesn't
match one above, send back React's index.html file. */
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '../client/build/index.html'));
});

const port = 5000;
app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`),
);
