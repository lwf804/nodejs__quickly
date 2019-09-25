import PassportLocal from 'passport-local';
import { User } from '../../../../models';

export default new PassportLocal.Strategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email, password, done) => {
    const options = {
      criteria: { email: email },
    };

    try {
      const user = await User.load(options);
      if (!user) {
        return done(null, false, { message: 'Unknown user' });
      }
      if (!user.authenticate(password)) {
        return done(null, false, { message: 'Invalid password' });
      }
      return done(null, user);
    } catch (e) {
      return done(e);
    }
  }
);
