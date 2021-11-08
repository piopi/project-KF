import { Sequelize } from 'sequelize';

let options: any = { logging: false };
if (process.env.TYPE_ENV !== 'Dev') {
  options = {
    ...options,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  };
}
const db: Sequelize = new Sequelize(
  process.env.DATABASE_URL || 'postgres://user:pass@postgres:5432/dashboard',
  options,
);

export default db;
