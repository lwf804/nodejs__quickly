import '@common/dotenv';
import server from '@common/server';
import { appPort } from '@config/app';
import webcf from '@common/webcf';

server.config(webcf).start(appPort);
