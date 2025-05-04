import { SqliteConnectionOptions } from "typeorm/driver/sqlite/SqliteConnectionOptions";

const config: SqliteConnectionOptions = {
    type: "sqlite",
    database: "nest_e2",
    entities: ["dist/src/**/*.entity.js"],
    synchronize: true,                           // !PRODUCTION -> true
    migrations: [
        "dist/src/nest_e2/migrations/*.js"
    ],
    cli: {
        migrationsDir: "src/nest_e2/migrations"
    }
}

export default config;