//import mysql module
var mysql = require("mysql")
//import database properties
var prop = require("./db_properties")
//export connection
module.exports = {
    getConnection : function(){
        return mysql.createConnection(prop)
    }
}