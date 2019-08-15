import React from 'react'
import UseForm from './UseForm'
import axios from 'axios'

const ContactForm = () => {
  const sendData = () => {
    axios.post('/send', 
      {
        name: `${values.firstName} ${values.lastName}`,
        contactNumber: values.contactNumber,
        email: values.email,
        message: values.message
      }
    )
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    message: '',
  }

  const {values, handleChange, resetForm} = UseForm(initialValues)

  const handleSubmit = (event) => {
    event.preventDefault()
    sendData()
    resetForm()
  }

  return (
    <form 
      className = 'form-container'
      onSubmit = {handleSubmit}
    >
      <h2>Send us a message</h2>
      <label>First Name*</label>
      <input
        type = 'text'
        name = 'firstName'
        value = {values.firstName}
        onChange = {handleChange}
        required
      />
      <label>Last Name*</label>
      <input
        type = 'text'
        name = 'lastName'
        value = {values.lastName}
        onChange = {handleChange}
        required
      />
      <label>E-mail Address*</label>
      <input
        type = 'email'
        name = 'email'
        value = {values.email}
        onChange = {handleChange}
        required
      />
      <label>Contact Number</label>
      <input
        type = 'number'
        name = 'contactNumber'
        value = {values.contactNumber}
        onChange = {handleChange}
      />
      <label>Message/Inquiry*</label>
      <textarea
        type = 'text'
        name = 'message'
        value = {values.message}
        onChange = {handleChange}
        required
      />
      <h3>Fields marked with asterisks (*) are required.</h3>
      <input type = 'submit' />
    </form>
  )
}

export default ContactForm