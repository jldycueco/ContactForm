import express from 'express';
import { google } from 'googleapis';
import nodemailer from 'nodemailer';

import 'dotenv/config';

const router = express.Router();
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  process.env.CLIENT_ID, // ClientID
  process.env.CLIENT_SECRET, // Client Secret
  'https://developers.google.com/oauthplayground', // Redirect URL
);

oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});
const accessToken = oauth2Client.getAccessToken();

let transporter = nodemailer.createTransport({
  service: 'gmail',
  // auth: {
  //   user: process.env.USER,
  //   pass: process.env.PASSWORD,
  // },
  auth: {
    type: 'OAuth2',
    user: process.env.USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
    accessToken: accessToken,
  },
});

transporter
  .verify()
  .then(success => console.log('Server is ready to take messages'))
  .catch(err => console.log(err));

router.post('/', (req, res) => {
  const name = req.body.name;
  const contactNumber = req.body.contactNumber;
  const email = req.body.email;
  const message = req.body.message;

  let mailOptions = {
    from: 'gmail.com',
    to: email,
    subject: `Message from ${name}`,
    text: `Name: ${name} \n Email: ${email} \n Contact Number: ${contactNumber} \n Message: ${message}`,
  };

  transporter
    .sendMail(mailOptions)
    .then(res => {
      console.log(`Email sent!:`, res);
    })
    .catch(err => {
      console.log(`Error Occurs:`, err);
    });

  return res.json({ success: true, msg: 'Mesage sent' });
});

export default router;
