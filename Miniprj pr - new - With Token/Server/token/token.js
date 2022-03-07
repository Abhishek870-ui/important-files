//import jwt-simple module
var jwt = require("jwt-simple")
module.exports = function(obj,password)
{
    return jwt.encode(obj,password)
}