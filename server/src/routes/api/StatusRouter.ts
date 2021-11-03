import BaseRouter from './BaseRouter';

/**
 * Return API status
 */
export default class StatusRouter extends BaseRouter {
  public setController(): void {
    this.router.get('/status', (req, res) => {
      res.send('200 Response');
    });
  }
}
