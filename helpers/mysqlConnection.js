// var passFormySql = require('../passmySql');
var mysql = require('mysql');
var config;

config = {
    mysql_pool : mysql.createPool({
      connectionLimit : 15,
      host     : 'localhost',  //THIS IS THE SAME FOR YOUR
      user     : 'root',      //THIS IS THE SAME FOR YOUR
      password : '6197',        //HERE GO YOUR PASSWORD TO ENTER IN YOUR DB
      database : 'InterReservations'   //HERE GO THE DATABASE THAT WE ARE GONNA USED
    })
};

module.exports = config;;
