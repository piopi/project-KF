import { Model, DataTypes } from 'sequelize';
import db from '../db';

class DataEntry extends Model {
  public dataEntryId!: number;

  public dataEntryName!: string;

  public dataValue!: number;

  public date!: Date;
}
DataEntry.init(
  {
    dataEntryId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    dataEntryName: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    dataValue: {
      type: new DataTypes.FLOAT(),
      allowNull: false,
    },
    date: {
      type: new DataTypes.DATE(),
      allowNull: false,
    },
  },
  {
    tableName: 'dataentries',
    sequelize: db,
  },
);

async function retrieveAllDataEntries(dataId: number) {
  const DataEntries = await DataEntry.findAll({
    where: {
      dataId,
    },
    order: [['date', 'ASC']],
  });
  return DataEntries;
}

export { DataEntry, retrieveAllDataEntries };
