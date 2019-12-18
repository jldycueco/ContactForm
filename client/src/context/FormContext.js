import React, { createContext, useState, createRef } from 'react';
import axios from 'axios';
import useForm from '../customhooks/useForm';

export const FormContext = createContext();

const FormContextProvider = ({ children }) => {
  const [captcha, setCaptcha] = useState('');
  const key = process.env.REACT_APP_RECAPTCHA_KEY;

  const recaptchaRef = createRef();

  const changeReCaptcha = () => {
    setCaptcha(recaptchaRef.current.getValue());
  };

  const resetReCaptcha = () => {
    setCaptcha('');
    recaptchaRef.current.reset();
  };

  const sendData = () => {
    axios
      .post('/send', {
        firstName: values.firstName,
        lastName: values.lastName,
        contactNumber: values.contactNumber,
        email: values.email,
        message: values.message,
        captcha: captcha,
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));

    resetBlur();
    resetReCaptcha();
  };

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    message: '',
  };

  const initialTouch = {
    firstName: false,
    lastName: false,
    email: false,
    contactNumber: false,
    message: false,
  };

  const {
    isDisabled,
    errors,
    values,
    handleChange,
    handleSubmit,
    isTouched,
    handleBlur,
    resetBlur,
  } = useForm(initialValues, initialTouch, sendData, captcha);

  return (
    <FormContext.Provider
      value={{
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
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormContextProvider;
