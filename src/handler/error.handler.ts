import { NextFunction, Request, Response } from 'express';

export const handleError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(500);
  res.render(err.message);
};

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(404);
  res.render('404', { title: 'Page Not Found' });
};
