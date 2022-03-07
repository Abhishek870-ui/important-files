//import modules
const express = require('express')
let mongodb = require('mongodb')
//create mongoclient
let mcl = mongodb.MongoClient
//create router instance
let router = express.Router()
//import url
let url = require("../url")
//create rest api
router.post("/",(req,res)=>{
    var p_id = req.body.p_id
    var obj = {
        "p_id" : p_id
    }
    mcl.connect(url,(err,conn)=>{
        if(err)
        {
            console.log("Error in connection :- ",err)
        }
        else
        {
            let db = conn.db("nodedb")
            db.collection("products").deleteOne(obj,(err)=>{
                if(err)
                {
                    res.json({'delete':'failed'})
                }
                else
                {
                    console.log("Data deleted")
                    res.json({'delete':'success'})
                }
            })
        }
    })
})
//export router
module.exports = router