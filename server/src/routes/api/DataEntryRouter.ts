import BaseRouter from './BaseRouter';
import { retrieveAllDataEntries, retrieveADataSource } from '../../../db/models';

/**
 * Return all Services
 */
export default class DataEntryRouter extends BaseRouter {
  public setController(): void {
    this.router.get('/dataentries', async (req, res, next) => {
      try {
        const dataId: number = parseInt(req.query.dataId as string, 10) || 0;
        const limit: number = parseInt(req.query.limit as string, 10) || 5;
        const dataEntries = await retrieveAllDataEntries(dataId, limit);
        const dataSource = await retrieveADataSource(dataId);
        if (dataEntries.length && dataSource) {
          let data = [] as number[];
          dataEntries.forEach((entry) => {
            data = [...data, entry.dataValue];
          });
          res.json({ data, dataEntryName: dataEntries[0].dataEntryName, dataCurrency: dataSource.dataCurrency });
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
