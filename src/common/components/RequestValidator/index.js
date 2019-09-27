import { Validator, validate } from '@common/components/Validator';
import ValidateError from '@common/exceptions/ValidateError';

class BaseRequestValidator {
  constructor(req, res, next) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.errors = res.locals.errors;
  }

  /**
   * Middleware handle
   */
  handle() {
    this.validate()
      .then(() => this.passed())
      .catch(e => this.fail(e));
  }

  /**
   * get rules validate
   *
   * @param {Validator} Validator
   * @returns {{}}
   */
  rules(Validator) {
    return {};
  }

  /**
   * Get values for validate
   *
   * @returns {object}
   */
  getValidateValues() {
    return this.req.body;
  }

  /**
   * Do validate as async
   *
   * @returns {Promise<*|*|undefined>}
   */
  async validate() {
    const rules = this.rules(Validator);
    return validate(rules, this.getValidateValues());
  }

  /**
   * Handle if pass validate
   */
  passed() {
    this.next();
  }

  /**
   * handle if fail validate
   *
   * @param e
   */
  fail(e) {
    if (e instanceof ValidateError) {
      this.errors.addError(e.getErrors());
    }
    this.next();
  }

  /**
   * Message translation
   *
   * @returns {(function(*): *)|*}
   */
  getTranslator() {
    return '__' in this.req ? this.req.__ : msg => msg;
  }
}

export default BaseRequestValidator;

export const middleware = className => (...args) => new className(...args).handle();
