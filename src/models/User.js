import ORM, { Types } from '../common/database';
import { filenameWithoutExt } from '../utils/path';

const { Schema, model } = ORM;

export const schema = {
  name: { type: Types.String, default: '' },
  email: { type: Types.String, default: '' },
  password: { type: Types.String, default: '' },
  avatar: { type: Types.String, default: '' },
  birthday: { type: Types.Date, default: '' },
};

// create schema
const _schema = new Schema(schema);

// add method prototype
_schema.method({});

// add method static
_schema.static({});

// model name
export const modelName = filenameWithoutExt(__filename);

// model
export default model(modelName, _schema);
