export default class ValidateError extends Error {
  constructor() {
    super();
    this.errors = {};
    this.message = 'Value input invalid.';
    this.errorCode = 422;
  }

  /**
   * Check is empty errors
   *
   * @returns {boolean}
   */
  isEmpty() {
    return Object.keys(this.errors).length === 0;
  }

  /**
   * Add error to errors
   *
   * @param error
   */
  addError(error) {
    this.errors = {
      ...this.errors,
      ...error,
    };
  }

  /**
   * Set errors
   *
   * @param errors
   */
  setErrors(errors) {
    this.errors = errors;
  }

  /**
   * Check has error
   *
   * @param field
   * @returns {boolean}
   */
  has(field) {
    return typeof this.errors[field] !== 'undefined';
  }

  /**
   * Get error
   *
   * @param field
   * @returns {string}
   */
  get(field) {
    return this.has(field) ? this.errors[field] : '';
  }

  /**
   * Get errors
   *
   * @returns {{}|*}
   */
  getErrors() {
    return this.errors;
  }
}
