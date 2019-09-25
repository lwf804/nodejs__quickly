import express from 'express';
import { appName } from '../../config/app';
import * as login from './controllers/auth/login.controller';

const router = express.Router();
export default router;

router.get('/', (req, res) => {
  res.send(`<span>${res.__('well_come_to_')}<strong>${appName}<strong>!</span>`);
});

router.get('/login', login.show);
