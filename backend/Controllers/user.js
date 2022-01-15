const User = require("../Models/user");
const bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");  
const config = require("../Config/auth.config");

exports.signup = (req,res) => {
    const {name, email, phoneNumber, password} = req.body;
    let payload = {
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        password: password
    } 

    const user = new User(payload);
    user.save()
    .then(response=>{
        console.log(response)
        res.status(201).json({message:"User Created Successfully", data:response, success:true})
    })
    .catch(error=>{
        res.status(500).json({message:"User Not Created", error:error, success:false})
    })
}

exports.login = (req,res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.find({ email:email })
        .then(response => {
            if (response.length != 0) {
                
                if(bcrypt.compare(password, response[0].password))
                    {
                        var token = jwt.sign({ id: response[0].id }, config.secret, {
                            expiresIn: 86400 // 24 hours
                          });
                        console.log(response[0])
                        res.status(202).json({ message: "User Logged In Successfully", success: true, accessToken: token, role: response[0].role })
                    }
                else{
                    res.status(401).json({ message: "Incorrect Password", success: false })
                }
            } else {
                res.status(404).json({ message: "User not found", success: false })
            }
        })
        .catch(err => { res.status(500).json({ error: err, success: false }) })
}

exports.changePassword = (req,res) => {
    
}