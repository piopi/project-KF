import BaseRouter from './BaseRouter';
import { retrieveAllServices } from '../../../db/models';

/**
 * Return all Services
 */
export default class ServiceRouter extends BaseRouter {
  public setController(): void {
    this.router.get('/services', async (req, res, next) => {
      try {
        const services = await retrieveAllServices();
        if (services.length) {
          res.json(services);
        } else {
          res.status(404);
          res.json({ Message: 'No Services Available' });
        }
      } catch (error) {
        next(error);
      }
    });
  }
}
