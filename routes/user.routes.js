const {Router} = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const {UserModel} = require("../model/user.model")
const cors = require("cors")
const userController = Router();

userController.use(cors())
userController.post("/signup", (req, res) => {
    const {email, password} = req.body;
// console.log(email,password);
    bcrypt.hash(password, 5, async function(err, hash) {
        if(err){
            res.send("Something went wrong, plz try again later")
        }
        const user = new UserModel({
            email,
            password : hash,
        })

        try{
            await user.save()
            const token = jwt.sign({ userId : user._id }, "secret")
            req.headers.authorization = token
            res.header.authorization= token
            console.log(req.headers.authorization)
            console.log(res.header.authorization)
            res.json({msg : "Signup successfull"})
        }
        catch(err){
            console.log(err)
            res.send("Something went wrong, plz try again")
        }
       
    });
})

userController.post("/login", async (req, res) => {
    const {email, password} = req.body;
    const token  = req.headers.authorization
    if(token){
        res.redirect("/")
    }
    else{
   try {
    const user = await UserModel.findOne({email})
    const hash = user.password
    bcrypt.compare(password, hash, function(err, result) {
        if(err){
            res.send("Something went wrong, plz try again later")
        }
        if(result){
            const token = jwt.sign({ userId : user._id }, "secret")
            req.headers.authorization = token
            res.header.authorization= token
            console.log(req.headers.authorization)
            console.log(res.header.authorization)
            console.log(process.env)
            res.redirect("/")
        }
        else{
            res.send("Invalid credentials, plz signup if you haven't")
        }
    });
   } catch (e){
    res.send("Email or Password Incorrect")
   }
}
})


module.exports = {
    userController
}