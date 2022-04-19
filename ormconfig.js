const root = process.env.TS_NODE_DEV === undefined ? 'dist' : 'src'

const { env } = require(`./${root}/main/config/env`)

module.exports = {
    type: 'postgres',
    host: env.postgres.host,
    username: env.postgres.user,
    password: env.postgres.password,
    database: env.postgres.database,
    entities: [`./${root}/infra/db/typeorm/entities/**/*.{js,ts}`],
    migrations: [`./${root}/infra/db/typeorm/migrations/*.{js,ts}`],
    cli: {
        "migrationsDir": `./${root}/infra/db/typeorm/migrations/`
    },
    cache: {
        duration: 5000,
        type: "ioredis",
        options: {
            host: env.redis.host,
            port: env.redis.port,
            password: env.redis.password
        }
    }
}
