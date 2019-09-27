import Joi from '@hapi/joi';
import ValidateError from '@common/exceptions/ValidateError';

const parseError = (rules, errors) => {
  const fields = Object.keys(rules);
  const errorDetails = errors.details;
  const errorsResult = {};
  errorDetails.forEach(e => {
    if (fields.includes(e.context.key)) {
      if (!(e.context.key in errorsResult)) {
        errorsResult[e.context.key] = [];
      }
      errorsResult[e.context.key].push(e.message);
    }
  });
  return new ValidateError(errorsResult);
};

export const Validator = Joi;

export const validate = async (rules, values) => {
  const schema = Validator.object(rules);
  try {
    return await schema.validateAsync(values, { abortEarly: false });
  } catch (e) {
    return Promise.reject(parseError(rules, e));
  }
};
