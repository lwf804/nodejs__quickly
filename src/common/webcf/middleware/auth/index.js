import passport from 'passport';
import { User } from '../../../../models';
import local from './local';

// serialize and deserialize sessions
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => User.findOne({ _id: id }, done));

// use these strategies
passport.use(local);

export default [passport.initialize(), passport.session()];
