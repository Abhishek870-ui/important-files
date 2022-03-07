//import express body-parser and cors modules
var express = require('express')
var bodyparser = require('body-parser')
var cors = require('cors')
//create rest object
var app = express()
//set JSON as MIME type
app.use(bodyparser.json())
//client not sending form data -> encoding to JSON
app.use(bodyparser.urlencoded({extended:false}))
//enable CORS -> Cross Origine Resource Sharing
app.use(cors())
let port = process.env.PORT || 8080
//import fetch insert update delete modules
var fetch = require("./fetch/fetch")
var insert = require("./insert/insert")
var update = require("./update/update")
var remov = require("./delete/delete")
//use above modules
app.use("/fetch",fetch)
app.use("/insert",insert)
app.use("/update",update)
app.use("/delete",remov)
//assign port no
app.listen(port,()=>{
    console.log("Server listening port no "+port)
})


/*
    >node server
    Test following URLs with postman
    http://localhost:8080/fetch     (get)
    http://localhost:8080/insert    |
    http://localhost:8080/update    |(post)
    http://localhost:8080/delete    |

    body -> raw -> json

*/
