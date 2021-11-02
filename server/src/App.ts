import * as cors from 'cors';
import * as express from 'express';
import * as http from 'http';
import * as helmet from 'helmet';
import BaseApi from './routes/api/BaseApi';
import MainApi from './routes/api/MainApi';

export default class App {
  public express!: express.Application;

  private apiRoutes!: BaseApi[];

  public httpServer!: http.Server;

  public async init(): Promise<void> {
    this.express = express();
    this.httpServer = http.createServer(this.express);
    this.middleware();
    this.apiRoutes = [];
    this.apiRoutes.push(new MainApi(this.express));
  }

  /**
   * here you can apply your middlewares
   */
  private middleware(): void {
    this.express.use(helmet());
    this.express.use(express.json({ limit: '100mb' }));
    this.express.use(express.urlencoded({ limit: '100mb', extended: true }));
    this.express.use(cors());
  }
}
