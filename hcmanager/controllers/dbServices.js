const mysql = require("mysql");
require('dotenv').config();

//create connection
const db=mysql.createConnection({
    host : process.env.HOST,
    user : process.env.USER,
    password : process.env.PASSWORD,
    database : process.env.DATABASE
  });
  // connect
  db.connect((err)=>{
    if(err){
      console.log("there is an error when connecting to data base");
    }else{
      console.log(`database connected : ${process.env.DATABASE}`);
    }
  });
  module.exports = {db};