import BaseRequestValidator, {
  middleware,
} from '@common/components/RequestValidator';

class RegisterRequest extends BaseRequestValidator {
  rules(Validator) {
    const __ = this.getTranslator();
    return {
      email: Validator.string()
        .required()
        .email()
        .message(__('email_invalid'))
        .max(255)
        .message(__('Email must less than 255 characters')),

      password: Validator.string()
        .required()
        .min(8)
        .message(__('Password must at least 8 characters'))
        .max(255)
        .message(__('Password must less than 255 characters')),
    };
  }
}

export default middleware(RegisterRequest);
