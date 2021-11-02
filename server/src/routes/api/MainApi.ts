import { Application } from 'express';
import BaseApi from './BaseApi';

/**
 * Handle the api status and handle Http errors.
 */
export default class MainApi extends BaseApi {
  constructor(express: Application) {
    super();
    this.register(express);
  }

  /*
   * Register the endPoints
   */
  public register(express: Application): void {
    express.use('/api', this.router);
    this.router.get('/status', (req, res) => {
      res.send('200 Response');
    });
    express.use((req, res, next) => {
      next(res.status(404).send('404 Page not found'));
    });
  }
}
