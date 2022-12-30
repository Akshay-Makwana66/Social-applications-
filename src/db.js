const { Client } = require('pg');

// Create a connection using postGreSql Configuration-- 
const client = new Client({
  user: 'postgres',
  password: 'akki66',
  host: 'localhost',
  port: 5432,
  database: 'social',
});

//creating connection with database--
 client.connect(()=>{
    console.log('db is connected');
 });

module.exports = client;