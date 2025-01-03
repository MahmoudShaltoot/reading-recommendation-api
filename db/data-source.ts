require('dotenv').config()

import { DataSource, DataSourceOptions } from "typeorm"

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    port: +process.env.DATABASE_PORT || 5432,
    database: process.env.DATABASE,
    synchronize: false,
    entities: ['dist/**/*/*.entity.js'],
    migrations: ['dist/db/migrations/*.js']
}

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
