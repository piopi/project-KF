import BaseRouter from './BaseRouter';
import { retrieveAllDataSources } from '../../../db/models';

/**
 * Return all Services
 */
export default class DataSourceRouter extends BaseRouter {
  public setController(): void {
    this.router.get('/datasources', async (req, res, next) => {
      try {
        const serviceId: number = parseInt(req.query.serviceId as string, 10) || 0;
        const dataSources = await retrieveAllDataSources(serviceId);
        if (dataSources.length) {
          res.json(dataSources);
        } else {
          res.status(404);
          res.json({ Message: 'DataSource with inputed serviceId not found' });
        }
      } catch (error) {
        next(error);
      }
    });
  }
}
