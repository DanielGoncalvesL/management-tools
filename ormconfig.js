if (process.env.DATABASE_URL) {
    module.exports = {
        type: 'postgres',
        url: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        },
        entities: ["./dist/modules/**/infra/typeorm/entities/*.js"],
        migrations: ["./dist/shared/infra/typeorm/migrations/*.js"],
        cli: {
            migrationsDir: "./dist/shared/infra/typeorm/migrations"
        }
    }
} else {
    module.exports = {
        type: "postgres",
        host: "postgres",
        port: 5432,
        username: "postgres",
        password: "docker",
        database: "postgres",
        entities: [
            "./dist/modules/**/infra/typeorm/entities/*.js"
        ],
        migrations: [
            "./dist/shared/infra/typeorm/migrations/*.js"
        ],
        cli: {
            migrationsDir: "./dist/shared/infra/typeorm/migrations"
        }
    }
}