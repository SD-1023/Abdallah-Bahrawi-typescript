import express, { Request, Response } from 'express';

const router = express.Router();

router.use((req: Request, res: Response) => {
  res.status(404).render('404', { title: '404' });
});

export default router;
