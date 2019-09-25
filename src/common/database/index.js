import mongoose from 'mongoose';
import connectMongo from 'connect-mongo';
import { dbUrl } from '../../config/app';

export const connect = () => {
  const options = { keepAlive: 1, useNewUrlParser: true };
  mongoose.connect(dbUrl, options);
  return mongoose.connection;
};

export const sessionStore = session => {
  const MongoStore = connectMongo(session);
  return new MongoStore({
    url: dbUrl,
    collection: 'sessions',
  });
};

export const Types = mongoose.SchemaTypes;

export default mongoose;
