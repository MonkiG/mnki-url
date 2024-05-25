import pg from 'pg'
import Config from './../core/config'

const { Pool } = pg

export const pool = new Pool({
  user: Config.DB_USER,
  password: Config.DB_PASSWORD,
  host: Config.DB_HOST,
  port: Number(Config.DB_PORT),
  database: Config.DB_NAME
})
