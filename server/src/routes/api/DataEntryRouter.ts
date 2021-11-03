import BaseRouter from './BaseRouter';
import { retrieveAllDataEntries } from '../../../db/models';

/**
 * Return all Services
 */
export default class DataEntryRouter extends BaseRouter {
  public setController(): void {
    this.router.get('/dataentries', async (req, res, next) => {
      try {
        const dataId: number = parseInt(req.query.dataId as string, 10) || 0;
        const dataEntries = await retrieveAllDataEntries(dataId);
        if (dataEntries.length) {
          res.json(dataEntries);
        } else {
          res.status(404);
          res.json({ Message: 'DataEntry with inputed dataId not found' });
        }
      } catch (error) {
        next(error);
      }
    });
  }
}
