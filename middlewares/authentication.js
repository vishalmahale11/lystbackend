const jwt = require("jsonwebtoken")
require("dotenv").config()

const authentication = (req, res, next) => {
    console.log(req.headers.authorization)
    if(req.headers.authorization==undefined || req.headers.authorization==null){
       console.log(".........................")
    //    next()
        res.redirect("/user/login")
        // next()
    }
    // if(!req.headers.authorization){
    //     res.send("Please login again")
    //     // next()
    // }
    else{

    
    const token = req.headers.authorization
    console.log(token)
    jwt.verify(token, "secret", function(err, decoded) {
        console.log(req.headers.authorization)
            if(err){

                res.redirect("/user/login")
            }
            else{
                req.body.userId = decoded.userId
                // res.send("login successfull")
                // console.log("login successfull")
                // res.redirect("/")
                next()
            }
        })
    };
}

module.exports = {authentication}