
import helmet from 'helmet';
import compression from 'compression';
import express from 'express';


export default app => {
  app.use(compression());
  app.use(express.json());
  app.use(helmet());
}