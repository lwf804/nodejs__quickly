import express from 'express';
import { appName } from '@config/app';
import * as login from './controllers/auth/login.controller';
import * as register from './controllers/auth/register.controller';
import registerRequest from '@http/web/requests/auth/register.request';

const router = express.Router();
export default router;

router.get('/', (req, res) => {
  res.send(`<span>${res.__('well_come_to_')}<strong>${appName}<strong>!</span>`);
});

router.get('/login', login.show);
router.get('/register', register.show);
router.post('/register', registerRequest, register.register);
