import { validate } from 'class-validator';

const humanize = (message: string) => {
  message = message.replace(/_/g, ' ');
  return message.charAt(0).toUpperCase() + message.slice(1);
};
const formatError = (error: any) => {
  const { property, constraints } = error;
  const messages: string[] = Object.values(constraints);

  return {
    [property]: messages.map(message => humanize(message)),
  };
};
/**
 * Validates a request using a validator class defined with decorators
 * @param {class} Validator the validator to use
 * @param {object} payload The request payload to be validated
 * @param {object} action should be `create` or `update`. `<It defaults to create>`.
 * This makes it possible to validate only the fields present in the request when updating
 * @returns {object|boolean} the validation errors or false if none.
 */
const validateRequest = async (
  Validator: any,
  payload: any,
  action?: string,
) => {
  let resource = new Validator();
  let validationErrors = {};

  Object.entries(payload).forEach(([key, value]) => {
    resource[key] = typeof value === 'string' ? value.trim() : value;
  });
  const errors = await validate(resource, {
    validationError: { target: false },
    skipMissingProperties: action === 'update' ? true : false,
  });

  if (errors.length === 0) {
    return false;
  }

  /**
   * The errors object contains too many properties that are required
   * We are only interested in the field and the error messages
   */
  for (let error of errors) {
    validationErrors = {
      ...validationErrors,
      ...formatError(error),
    };
  }

  return {
    friendlyErrorMessage:
      'There seem to be errors in some of your inputs. See details below',
    errors: validationErrors,
  };
};

export default validateRequest;
