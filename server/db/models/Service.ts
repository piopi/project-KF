import { Model, DataTypes } from 'sequelize';
import db from '../db';

class Service extends Model {
  public serviceId!: number;

  public name!: string;

  public serviceIconUrl!: string;
}
Service.init(
  {
    serviceId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    serviceIconUrl: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    tableName: 'services',
    sequelize: db,
  },
);

async function retrieveAllServices() {
  const services = await Service.findAll();
  return services;
}

export { Service, retrieveAllServices };
