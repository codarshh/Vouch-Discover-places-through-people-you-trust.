import { Router } from 'express';
import healthRouter from './health.route.js';

const apiRouter = Router();

// Mount Health endpoint
apiRouter.use('/health', healthRouter);

// Future API routes will be mounted here in subsequent phases:
// apiRouter.use('/auth', authRouter);
// apiRouter.use('/users', usersRouter);
// apiRouter.use('/friends', friendsRouter);
// apiRouter.use('/places', placesRouter);
// apiRouter.use('/reviews', reviewsRouter);
// apiRouter.use('/visits', visitsRouter);

export default apiRouter;
