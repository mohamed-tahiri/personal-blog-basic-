import { Router, Request, Response } from 'express';
import usersRouter from './users.route.js';
import articlesRouter from './articles.route.js';

const router = Router();

// Root / home route
router.get('/', (req: Request, res: Response) => {
  res.render('index', { title: 'Personal Blog' });
});

// Mount sub-routers
router.use('/users', usersRouter);
router.use('/articles', articlesRouter);

export default router;
