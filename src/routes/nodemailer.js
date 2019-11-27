import express from 'express';
import { google } from 'googleapis';
import nodemailer from 'nodemailer';
import { stringify } from 'querystring';
import fetch from 'node-fetch';
import { validateForm } from './validate';

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

router.post('/', async (req, res) => {
  const { error } = validateForm(req.body);

  if (error) {
    return res.json({
      success: false,
      msg: error.details[0].message,
    });
  }

  const name = `${req.body.firstName} ${req.body.lastName}`;
  const contactNumber = req.body.contactNumber;
  const email = req.body.email;
  const message = req.body.message;
  const captcha = req.body.captcha;

  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  // Verify URL
  const query = stringify({
    secret: secretKey,
    response: captcha,
    remoteip: req.connection.remoteAddress,
  });

  const verifyUrl = `https://google.com/recaptcha/api/siteverify?${query}`;
  const body = await fetch(verifyUrl).then(res => res.json());

  if (body.success !== undefined && !body.success) {
    return res.json({
      success: false,
      msg: 'Failed captcha verification',
    });
  }

  let mailOptions = {
    from: 'gmail.com',
    to: email,
    subject: `Message from ${name}`,
    html: `<p>Hello, my name is <strong>${name}</strong></p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Contact Number:</strong> ${contactNumber}</p>
           <p><strong>Message:</strong> ${message}</p>
          `,
  };

  transporter
    .sendMail(mailOptions)
    .then(res => {
      console.log(`Email sent!:`, res);
    })
    .catch(err => {
      console.log(`Error Occurs:`, err);
    });

  return res.json({ success: true, msg: 'Captcha passed' });
});

export default router;
