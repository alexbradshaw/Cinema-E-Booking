import { Router } from 'express';
import routes from './apiRoutes.js';

const router = Router();

router.use(routes);

export default router;