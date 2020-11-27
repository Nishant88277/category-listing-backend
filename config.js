// module.exports = {
//     HOST: "il01-cyberprotectcloud-mysqldbserver.mysql.database.azure.com",
//     USER: "intelluserspra@il01-cyberprotectcloud-mysqldbserver",
//     PASSWORD: "mind",
//     DB: "ERP_Inventory",
//     dialect: "mysql",
//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//     }
// };


module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "mind",
  DB: "ERP_Inventory",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
