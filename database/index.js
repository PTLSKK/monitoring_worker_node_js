const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'misaganiawsdb.chywzylq6qnb.ap-southeast-1.rds.amazonaws.com',
    user: 'misagani',
    password: 'QBurn8aws',
    database: 'monitoring_db'
  },
  debug: true
});

module.exports = knex;
