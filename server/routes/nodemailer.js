const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')
require('dotenv').config()

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
  }
})

transporter.verify()
  .then(success => console.log('Server is ready to take messages'))
  .catch(err => console.log(err))

router.post('/send', (req, res) => {
  const name = req.body.name
  const contactNumber = req.body.contactNumber
  const email = req.body.email
  const message = req.body.message

  let mailOptions = {
    from: process.env.EMAIL,
    to: 'Your email address',
    subject: `Message from ${name}`,
    text: `Name: ${name} \n Email: ${email} \n Contact Number: ${contactNumber} \n Message: ${message}`
  }

  transporter.sendMail(mailOptions)
  .then(res => {
    console.log(`Email sent!:`, res)
  })
  .catch(err => {
    console.log(`Error Occurs:`, err)
  })

})

module.exports = router