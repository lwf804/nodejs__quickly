import mongoose from 'mongoose';
import connectMongo from 'connect-mongo';
import { dbUrl } from '@config/app';
import logger from '../logger';

export const connect = () => {
  const options = {
    keepAlive: 1,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  };
  mongoose
    .connect(dbUrl, options)
    .then(() => logger.info('DB connected'))
    .catch(err => logger.error(err));
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
