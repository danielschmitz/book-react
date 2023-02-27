import knexfile from '../knexfile'

const db = require('knex')(knexfile.development);

export default db;