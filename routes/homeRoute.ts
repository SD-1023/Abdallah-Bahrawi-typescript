import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.render('homePage', { title: 'Home Page', message: 'Welcome to our website!' });
});

export default router;
