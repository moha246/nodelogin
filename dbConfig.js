const Pool = require("pg").Pool;

const pool = new Pool({
    user: 'comballey',
    host: 'localhost',
    database: 'nodelogin',
    password: 'password',
    port: 5432
});

module.exports = pool;