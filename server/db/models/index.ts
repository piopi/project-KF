import { Service, retrieveAllServices } from './Service';
import { DataSource, retrieveAllDataSources, retrieveADataSource } from './DataSource';
import { DataEntry, retrieveAllDataEntries } from './DataEntry';

// Define database relationships
DataSource.belongsTo(Service, {
  foreignKey: 'serviceId',
});
Service.hasMany(DataSource);
DataEntry.belongsTo(DataSource, {
  foreignKey: 'dataId',
});
DataSource.hasMany(DataEntry);

export {
  Service,
  DataSource,
  DataEntry,
  retrieveAllDataEntries,
  retrieveAllDataSources,
  retrieveAllServices,
  retrieveADataSource,
};
