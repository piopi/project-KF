import { Sequelize } from 'sequelize';

const db: Sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://user:pass@postgres:5432/dashboard', {
  logging: false,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // <<<<<<< YOU NEED THIS
    }
  },
});

export default db;
