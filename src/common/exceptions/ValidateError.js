export default class ValidateError extends Error {
  constructor(errors, message, errorCode) {
    super();
    this.errors = errors || {};
    this.message = message || 'Value input invalid.';
    this.errorCode = errorCode || 422;
  }

  /**
   * Check is empty errors
   *
   * @returns {boolean}
   */
  isEmpty() {
    return (
      Object.keys(this.errors).length === 0 ||
      !Object.keys(this.errors).some(f => this.has(f))
    );
  }

  /**
   * Add error to errors
   *
   * @param {object} error
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
    return (
      typeof this.errors[field] !== 'undefined' ||
      (Array.isArray(this.errors[field]) && this.errors[field].length > 0)
    );
  }

  /**
   * Get error
   *
   * @param field
   * @returns {string}
   */
  get(field) {
    return this.has(field) ? this.errors[field] : [];
  }

  /**
   * Get first message for error
   *
   * @param field
   * @returns {string}
   */
  first(field) {
    return this.has(field) ? this.errors[field][0] : '';
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
