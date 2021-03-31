const testConfig = {
  type: 'postgres',
  host: 'postgres',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'postgres',
  entities: [
    './src/modules/**/infra/typeorm/entities/*.ts',
  ],
  migrations: [
    './src/shared/infra/typeorm/migrations/*.ts',
  ],
  cli: {
    migrationsDir: './src/shared/infra/typeorm/migrations',
  },
}

const devConfig = {
  type: 'postgres',
  host: 'postgres',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'postgres',
  entities: [
    './dist/modules/**/infra/typeorm/entities/*.js',
  ],
  migrations: [
    './dist/shared/infra/typeorm/migrations/*.js',
  ],
  cli: {
    migrationsDir: './dist/shared/infra/typeorm/migrations',
  },
}

const deploy = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  entities: [
    './dist/modules/**/infra/typeorm/entities/*.js',
  ],
  migrations: [
    './dist/shared/infra/typeorm/migrations/*.js',
  ],
  cli: {
    migrationsDir: './dist/shared/infra/typeorm/migrations',
  },
}

if (process.env.NODE_ENV === 'test') {
  module.exports = testConfig;
} else if (process.env.NODE_ENV === 'dev') {
  module.exports = devConfig;
} else {
  module.exports = deploy;
}
