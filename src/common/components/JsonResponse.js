export default class JsonResponse {
  constructor() {
    this.errorValue = null;
    this.dataValue = null;
    this.metaData = {};
    this.statusCode = 204;
  }

  /**
   * Set error
   *
   * @param error
   */
  setError(error) {
    this.errorValue = error;
  }

  /**
   * Set data
   *
   * @param data
   */
  setData(data) {
    this.dataValue = data;
  }

  /**
   * Init instance with error
   *
   * @param error
   * @returns {JsonResponse}
   */
  static error(error) {
    const instance = new JsonResponse();
    instance.setError(error);
    instance.statusCode = error.status || 500;
    return instance;
  }

  /**
   * Init instance with success
   *
   * @param data
   * @returns {JsonResponse}
   */
  static success(data) {
    const instance = new JsonResponse();
    instance.statusCode = 200;
    instance.setData(data);
    return instance;
  }

  /**
   * Add meta data when success response
   *
   * @param data
   */
  addMeta(data) {
    this.metaData = {
      ...this.metaData,
      ...data,
    };
  }

  /**
   * Get error response object
   *
   * @param isProd
   * @returns {{errorCode: number, message: *, errors: *, status: boolean}}
   */
  resError(isProd = true) {
    return {
      status: false,
      errorCode: this.errorValue.errorCode || 500,
      message: this.errorValue.message,
      errors: (typeof this.errorValue.getErrors === 'function') ? this.errorValue.getErrors() : null,
      ...(isProd ? {} : { stack: this.errorValue.stack }),
    };
  }

  /**
   * Get success response object
   *
   * @returns {{metaData: ({}|*), data: null, status: boolean}}
   */
  resSuccess() {
    return {
      status: true,
      data: this.dataValue,
      metaData: this.metaData,
    };
  }

  /**
   * Get response object
   *
   * @param isProd
   * @returns {{metaData: ({}|*), data: null, status: boolean}|{errorCode: number, message: *, errors: *, status: boolean}|{}}
   */
  get(isProd = true) {
    if (this.errorValue !== null) {
      return this.resError(isProd);
    }

    if (this.dataValue !== null) {
      return this.resSuccess();
    }

    return {};
  }
}
