//download following modules
//>yarn add express multer --save
//import modules
let express = require('express')
let multer = require('multer')
//create rest object
let app = express()
//create a storage
let storage = multer.diskStorage({
    destination : (req,file,cb) =>{
        cb(null,'uploads/')
    },
    filename : (req,file,cb) =>{
        cb(null,file.fieldname+'-'+Date.now()+'.jpg')
    }
})
//let upload = multer({storage : storage}).single('profileImage')
let upload = multer({storage : storage}).array('profileImage',2)
//create rest api
app.post('/profile',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            res.json({'upload':'Failed'})
        }
        else
        {
            res.json({'upload':'Success'})
        }
    })
})
//assign port no
app.listen(8080)
console.log("Server listening port no 8080")
/*
Create folder namely uploads in current path 
test url http://localhost:8080/profile 
    post request 
    form data -> key file

*/