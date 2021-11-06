import { Model, DataTypes } from 'sequelize';
import db from '../db';

class DataSource extends Model {
  public dataId!: number;

  public dataName!: string;

  public dataCurrency!: string;
}
DataSource.init(
  {
    dataId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    dataName: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    dataCurrency: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    tableName: 'datasources',
    sequelize: db,
  },
);

async function retrieveAllDataSources(serviceId: number) {
  const dataSources = await DataSource.findAll({
    where: {
      serviceId,
    },
  });
  return dataSources;
}
async function retrieveADataSource(dataId: number) {
  const dataSources = await DataSource.findOne({
    where: {
      dataId,
    },
  });
  return dataSources;
}
export { DataSource, retrieveAllDataSources, retrieveADataSource };
