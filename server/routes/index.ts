import { Router } from 'express';
import routes from './api/index.js';

const router = Router();

router.use('/api', routes);

export default router;