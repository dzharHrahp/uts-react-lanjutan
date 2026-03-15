const { Pool } = require("pg")

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "uts_react",
  password: "260905",
  port: 5432
})

module.exports = pool