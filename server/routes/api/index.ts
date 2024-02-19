import { Router } from 'express';
import routes from './apiRoutes';

const router = Router();

router.use(routes);

export default router;