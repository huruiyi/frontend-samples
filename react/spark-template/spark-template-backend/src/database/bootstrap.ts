import mysql from "mysql2/promise"

import { config } from "../config.js"

const connection = await mysql.createConnection({
  host: config.database.host,
  port: config.database.port,
  user: config.database.username,
  password: config.database.password,
  database: config.database.database,
})

await connection.query("SELECT 1")
await connection.end()
console.log(`Database ${config.database.database} is reachable.`)
