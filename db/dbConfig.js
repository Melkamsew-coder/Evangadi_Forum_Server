// // const mysql2 = require("mysql2");

// // const dbConnection = mysql2.createPool({
// //   user: process.env.USER,
// //   database: process.env.DATABASE,
// //   host: "localhost",
// //   password: process.env.PASSWORD,
// //   connectionLimit: 10,
// // });
// // // console.log(process.env.JWT_SECRET);
// // // Use promise() to enable async/await
// // module.exports = dbConnection.promise();
// const mysql2 = require("mysql2");

// const dbConnection = mysql2.createPool({
//   user: process.env.USER,
//   database: process.env.DATABASE,
//   host: process.env.HOST,
//   password: process.env.PASSWORD,
//   port: process.env.PORT, // Add this line
//   connectionLimit: 10,
// });

// module.exports = dbConnection.promise();
const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for connecting to cloud databases
  },
});

module.exports = pool;
