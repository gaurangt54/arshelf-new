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
                bcrypt.compare(password, response[0].password).then(rest=>{
                    if(rest)
                        {
                            console.log(rest)
                            var token = jwt.sign({ id: response[0].id }, config.secret, {
                                expiresIn: 86400 // 24 hours
                            });
                            res.status(202).json({ message: "User Logged In Successfully", user:response[0], success: true, accessToken: token, role: response[0].role })
                        }
                    else{
                        res.status(401).json({ message: "Incorrect Password", success: false })
                    }
                })
                
            } else {
                res.status(404).json({ message: "User not found", success: false })
            }
        })
        .catch(err => { res.status(500).json({ error: err, success: false }) })
}

exports.changePassword = async (req,res) => {
    const {email, oldPassword, newPassword} = req.body; 
    const password = await bcrypt.hash(newPassword, 12);
    await User.find({ email:email })
    .then(response=>{
        bcrypt.compare(oldPassword, response[0].password).then(rest=>{
        console.log(oldPassword)
        console.log(response[0].password)
        if(rest)
            {
                User.findOneAndUpdate({email:email},{password:password})
                .then(r=>{
                    res.status(202).json({ message: "Password Changed Successfully", user:response[0], success: true })
                })
                .catch(err=>{
                    console.log(err)
                })
            }
        else{
                res.status(202).json({ message: "Incorrect Password", success: false })
            }
        })
    })

}

exports.updateUser = (req, res) => {
    const {email, cart, wishlist, name, phoneNumber} = req.body;

    console.log(req.body);
    let payload = {}
    cart ? payload['cart'] = cart : null;
    wishlist ? payload['wishlist'] = wishlist : null;

    User.findOneAndUpdate({email:email}, payload)
    .then(response=>{
        console.log(response)
        res.status(200).json({message:"User Updated Successfully", data:response, success:true})
    })
    .catch(error=>{
        res.status(500).json({message:"User Data Not Updated", error:error, success:false})
    })
}

exports.getUsers = (req, res) => {
    User.find()
    .then(response=>{
        res.status(200).json({message:"Users Fetched Successfully", users:response, success:true})
    })
    .catch(error=>{
        res.status(500).json({message:"Users Not Fetched", error:error, success:false})
    })
}