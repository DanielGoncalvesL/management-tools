const root = process.env.TS_NODE_DEV === undefined ? 'dist' : 'src';

module.exports = {
  type: 'postgres',
  host: process.env.POSTGRESQL_HOST,
  username: process.env.POSTGRESQL_USERNAME,
  password: process.env.POSTGRESQL_PASSWORD,
  database: process.env.POSTGRESQL_DATABASE,
  entities: [`./${root}/infra/repositories/postgres/entities/*.{js,ts}`],
  // migrations: [`./${root}/infra/db/typeorm/migrations/*.{js,ts}`],
  // cli: {
  //     "migrationsDir": `./${root}/infra/db/typeorm/migrations/`
  // },
};
