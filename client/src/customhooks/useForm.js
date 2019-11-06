import { useState, useEffect } from 'react';
import validateForm from '../components/validateForm';

const useForm = (initialValues, initialTouch, callback) => {
  const [values, setValues] = useState(initialValues || {});
  const [isTouched, setisTouched] = useState(initialTouch);
  const [isDisabled, setIsDisabled] = useState(true);

  const handleBlur = field => event => {
    setisTouched({ ...isTouched, [field]: true });
  };

  const resetBlur = event => {
    setisTouched(initialTouch);
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const resetForm = () => {
    setValues(initialValues);
  };

  const handleSubmit = event => {
    event.preventDefault();
    callback();
    resetForm();
  };

  const errors = validateForm(values);

  useEffect(() => {
    if (Object.keys(errors).length === 0) {
      setIsDisabled(false);
    } else if (Object.keys(errors).length > 0) {
      setIsDisabled(true);
    }
  }, [errors]);

  return {
    isDisabled,
    errors,
    values,
    handleChange,
    resetForm,
    handleSubmit,
    isTouched,
    handleBlur,
    resetBlur,
  };
};

export default useForm;
