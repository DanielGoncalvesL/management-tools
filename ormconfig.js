const root = process.env.TS_NODE_DEV === undefined ? 'dist' : 'src';
const postgresHost = process.env.RUN_DOCKER ? 'postgres' : 'localhost';

module.exports = {
  type: 'postgres',
  host: postgresHost,
  username: process.env.POSTGRESQL_USERNAME,
  password: process.env.POSTGRESQL_PASSWORD,
  database: process.env.POSTGRESQL_DATABASE,
  entities: [`./${root}/infra/db/postgres/entities/index.{js,ts}`],
  // migrations: [`./${root}/infra/db/typeorm/migrations/*.{js,ts}`],
  // cli: {
  //     "migrationsDir": `./${root}/infra/db/typeorm/migrations/`
  // },
};
