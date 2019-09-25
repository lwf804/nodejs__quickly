export const appName = process.env.APP_NAME || 'Express';

export const isProd = process.env.NODE_ENV === 'production';

export const projectPath = `${__dirname}/../../`;

export const appPort = process.env.PORT || 3000;

export const requestLimit = process.env.REQUEST_LIMIT || '100kb';

export const secretKey = process.env.SECRET_KEY || 'key';

export const dbUrl = process.env.DB_URL;
