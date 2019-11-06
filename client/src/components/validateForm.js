export default function validateForm(values) {
  let errors = {};

  const defaultMsg = 'This field is required';

  if (!values.firstName) {
    errors.firstName = defaultMsg;
  }

  if (!values.lastName) {
    errors.lastName = defaultMsg;
  }

  if (!values.email) {
    errors.email = defaultMsg;
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
  ) {
    errors.email = 'Email address is invalid';
  }

  if (values.contactNumber && values.contactNumber.length < 6) {
    errors.contactNumber =
      'Contact Number needs to be more than 6 characters';
  }

  if (!values.message) {
    errors.message = defaultMsg;
  } else if (values.message.length < 10) {
    errors.message = 'Message needs to be more than 10 characters';
  }
  return errors;
}
