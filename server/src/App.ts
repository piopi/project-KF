import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';
import * as path from 'path';
import StatusRouter from './routes/api/StatusRouter';
import ServiceRouter from './routes/api/ServiceRouter';
import DataSource from './routes/api/DataSourceRouter';
import DataEntryRouter from './routes/api/DataEntryRouter';

export default class App {
  /*
   * Express App
   */
  private app: express.Application;

  constructor() {
    this.app = express();
    this.middleware();
    this.routerConfig();
  }

  private routerConfig() {
    this.app.use('/api', new StatusRouter().getRouter());
    this.app.use('/api', new ServiceRouter().getRouter());
    this.app.use('/api', new DataSource().getRouter());
    this.app.use('/api', new DataEntryRouter().getRouter());
    const buildPath = path.join(__dirname, '..', 'build');
    this.app.use(express.static(buildPath));
    this.app.use((req, res, next) => {
      next(res.status(404).send('404 Page not found'));
    });
  }

  public start = (port: number) =>
    new Promise((resolve, reject) => {
      this.app
        .listen(port, () => {
          resolve(port);
        })
        .on('error', (err: unknown) => reject(err));
    });

  /**
   * Connect different middlewares.
   */
  private middleware(): void {
    this.app.use(helmet({ contentSecurityPolicy: false }));
    this.app.use(express.json({ limit: '100mb' }));
    this.app.use(express.urlencoded({ limit: '100mb', extended: true }));
    this.app.use(cors());
  }

  public getApp() {
    return this.app;
  }
}
