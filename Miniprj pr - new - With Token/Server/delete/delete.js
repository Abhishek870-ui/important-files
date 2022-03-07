//import express module
let express = require('express')
//import database connection
let conn = require("../config/db_connection")
//get connection object
let connection = conn.getConnection()
//connect to database
connection.connect()
//create router instance
let router = express.Router()
//create rest api
router.post("/",(req,res)=>{
    let p_id = req.body.p_id
    connection.query("delete from products where p_id = "+p_id,(err)=>{
        if(err)
            res.json({'delete':'error'})
        else
            res.json({'delete':'success'})
    })
})
router.post("/deleteUser",(req,res)=>{
    let uname = req.body.uname    
    connection.query(`delete from users where uname = '${uname}'`,(err)=>{
        if(err)
            res.json({'delete':'error'})
        else
            res.json({'delete':'success'})
    })
})
router.post("/deletefromCart",(req,res)=>{
    let obj = req.body
    let uname = obj.uname
    let p_id = obj.p_id
    let qty = obj.qty
    let byed = obj.byed
    connection.query(`delete from cart where uname = '${uname}' and p_id = ${p_id} and byed = 0`,(err,result)=>{
        console.log(result.affectedRows)
        if(err)
        {
            console.log(err)
            res.json({'product delete from cart':'error'})
        }
        else
            res.json({'product delete from cart':'success'})
    })
})

router.post("/logout",(req,res)=>{
    let token = req.body.token
    connection.query(`delete from tokens where token = '${token}'`,(err)=>{
        if(err)
        {
            console.log("Wrong in logout")
            res.json('Something wrong')
        }
        else
        {
            console.log("Logout success token deleted")
            res.json({'logout':'Success'})
        }
    })
})
//export router
module.exports = router