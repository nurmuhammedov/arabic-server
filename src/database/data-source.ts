import { config as loadEnv } from 'dotenv'
import { join } from 'path'
import { DataSource } from 'typeorm'

loadEnv({ path: `.env.${process.env.NODE_ENV || 'development'}` })

/** Standalone connection for CLI tooling (seeding, migrations) outside the Nest container. */
export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST?.trim(),
  port: Number(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USERNAME?.trim(),
  password: process.env.DB_PASSWORD?.trim(),
  database: process.env.DB_NAME?.trim(),
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
  synchronize: false,
  logging: ['error']
})
