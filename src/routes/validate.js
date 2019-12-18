import Joi from '@hapi/joi';

const validateForm = data => {
  const schema = Joi.object({
    firstName: Joi.string()
      .regex(/^([a-zA-Z]+\s)*[a-zA-Z]+$/)
      .required(),
    lastName: Joi.string()
      .regex(/^([a-zA-Z]+\s)*[a-zA-Z]+$/)
      .required(),
    email: Joi.string().email({ minDomainSegments: 2 }),
    contactNumber: Joi.number()
      .empty('')
      .default(1)
      .min(7),
    message: Joi.string()
      .min(10)
      .required(),
    captcha: Joi.string().required(),
  });

  return schema.validate(data);
};

export { validateForm };
