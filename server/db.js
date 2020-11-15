const Pool = require("pg").Pool;

const pool = new Pool({
  host: "localhost",
  user: "ora",
  password: "123456",
  port: 5432,
  database: "dashboard_tip"
});

module.exports = pool;
