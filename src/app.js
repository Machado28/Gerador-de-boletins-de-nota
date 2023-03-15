/* eslint-disable import/order */
import cors from 'cors';
import express from 'express';
import path from 'path';
import routes from './routes';
import './database';

class App {
  constructor() {
    
    this.server = express();
    this.server.use(
      '/boletins',
      express.static(path.resolve(__dirname, '..', 'temp', 'upload')),
    );
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(
      '/boletins',
      express.static(path.resolve(__dirname, '..', 'temp', 'upload')),
    );
    this.server.use(express.urlencoded({ extended: true }));
    this.server.use(express.json());
    this.server.use(cors({
      origin: 'http://localhost:3000',
    }));
    this.server.use(
      '/avatar',
      express.static(path.resolve(__dirname, '..', 'temp', 'upload')),
    );
  }

  routes() {
    this.server.use(routes);
  }
}
export default new App().server;
