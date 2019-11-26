import React, { useContext } from 'react';
import './Contact.css';
import ReCAPTCHA from 'react-google-recaptcha';
import { FormContext } from '../context/FormContext';

const ContactForm = () => {
  const {
    isDisabled,
    errors,
    values,
    handleChange,
    handleSubmit,
    isTouched,
    handleBlur,
    key,
    recaptchaRef,
    changeReCaptcha,
  } = useContext(FormContext);

  return (
    <form
      className="form-container"
      onSubmit={handleSubmit}
      noValidate
    >
      <h2>Send us a message</h2>
      <label>First Name*</label>
      <input
        type="text"
        name="firstName"
        value={values.firstName}
        onChange={handleChange}
        onBlur={handleBlur('firstName')}
        className={
          isTouched.firstName && errors.firstName
            ? 'errorInput'
            : 'defaultInput'
        }
      />
      {isTouched.firstName && (
        <div className="errorMsg">{errors.firstName}</div>
      )}
      <label>Last Name*</label>
      <input
        type="text"
        name="lastName"
        value={values.lastName}
        onChange={handleChange}
        onBlur={handleBlur('lastName')}
        className={
          isTouched.lastName && errors.lastName
            ? 'errorInput'
            : 'defaultInput'
        }
      />
      {isTouched.lastName && (
        <div className="errorMsg">{errors.lastName}</div>
      )}
      <label>E-mail Address*</label>
      <input
        type="email"
        name="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur('email')}
        className={
          isTouched.email && errors.email
            ? 'errorInput'
            : 'defaultInput'
        }
      />
      {isTouched.email && (
        <div className="errorMsg">{errors.email}</div>
      )}
      <label>Contact Number</label>
      <input
        type="number"
        name="contactNumber"
        value={values.contactNumber}
        onChange={handleChange}
        onBlur={handleBlur('contactNumber')}
        className={
          isTouched.contactNumber && errors.contactNumber
            ? 'errorInput'
            : 'defaultInput'
        }
      />
      {isTouched.contactNumber && (
        <div className="errorMsg">{errors.contactNumber}</div>
      )}
      <label>Message/Inquiry*</label>
      <textarea
        type="text"
        name="message"
        value={values.message}
        onChange={handleChange}
        onBlur={handleBlur('message')}
        className={
          isTouched.message && errors.message
            ? 'errorTextArea'
            : 'defaultTextArea'
        }
      />
      {isTouched.message && (
        <div className="errorMsg">{errors.message}</div>
      )}
      <h3>Fields marked with asterisks (*) are required.</h3>

      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={key}
        onChange={changeReCaptcha}
      />

      <button type="submit" disabled={isDisabled}>
        Submit
      </button>
    </form>
  );
};

export default ContactForm;
