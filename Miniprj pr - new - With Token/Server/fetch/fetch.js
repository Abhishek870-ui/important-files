//import express module
let express = require('express')
//import token      ===========

//import database connection
let conn = require("../config/db_connection")
//get connection object
let connection = conn.getConnection()
//connect to database
connection.connect()
//create router instance
let router = express.Router()
//create rest api
router.get("/",(req,res)=>{
    connection.query("select * from products",(err,recordsArray,fields)=>{
        if(err)
            res.json({'message':'error'})
        else
            res.json(recordsArray)
    })
})
router.post("/fetchRow",(req,res)=>{
    let p_id = req.body.p_id
    connection.query(`select * from products where p_id = ${p_id}`,(err,recordsArray,fields)=>{
        if(err)
            res.json({'fetch row message':'error'})
        else
            res.json(recordsArray)
    })
})

router.post("/authUser",(req,res)=>{
    let uname = req.body.uname
    let upwd = req.body.upwd
    connection.query(`select * from users where uname = '${uname}' and upwd = '${upwd}'`,(err,recordsArray,fields)=>{
        if(recordsArray.length==0)
        {
            res.json({'auth':'failed'})
        }
        else
        {
            token = require("../token/token")({'uname':uname,'upwd':upwd},JSON.stringify(Date.now()))
            connection.query(`insert into tokens values ('${token}')`)
            res.json({'auth':'success','token':token,'user':uname})
        }
    })
})
router.post("/fetchCart",(req,res)=>{
    let uname = req.body.uname   
    let token = req.body.token 
    connection.query(`select * from cart where uname = '${uname}' and byed = 0`,(err,recordsArray,fields)=>{
        if(err)
        {
            console.log(err)
            res.json({'records':'failed'})
        }
        else
        {
            connection.query(`select * from tokens where token = '${token}'`,(err,recordsArray,fields)=>{
                if(recordsArray.length == 0)
                    res.json({'auth':'Failed'})
            })
            res.json(recordsArray)
        }
    })
})
//export router
module.exports = router