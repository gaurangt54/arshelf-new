const Approval = require("../Models/approval");
const Category = require("../Models/category");
const Order = require("../Models/order");
const Product = require("../Models/product");
const User = require("../Models/user");
require("dotenv").config();

const nodemailer = require("nodemailer");
const {google} = require("googleapis")

const regex = (value) => {
    const p = {
        $regex: value,
        $options: "i",
    }
    return p;
}

const setDate = (date1) => {
    var date;
    date1? date = new Date(date1) : date = new Date()
    let fullMonth = date.getMonth()+1;

    let fullDate = [
        `${digit(date.getDate())}-${digit(fullMonth)}-${date.getFullYear()}`,
        `${digit(date.getHours())}:${digit(date.getMinutes())}:${digit(date.getSeconds())}`
    ];
    return fullDate
}

const digit = (time) => {
    if(time<10) 
        return( `0${time}`);  
    return (`${time}`);
}

const CLIENT_ID = '1001604932441-k6oitb20jeivhk22sma5ehhntgc41jvf.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04eKRpOUU7V7dCgYIARAAGAQSNwF-L9Ir_MBqlXCGrWbGT8JNpI-bmmnezjX4yjWknYxm827fytw52e7XfH2cz4k4bwEh4Fa45HE'

const EMAIL = 'arshelf4@gmail.com'

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI)
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})

/* Function - To send mail to the heads */
const mail = async (to, subject, text, html, attachments)  => {
    
    const accessToken = await oAuth2Client.getAccessToken()
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            type:'OAuth2',
            user: EMAIL,
            accessToken: accessToken,
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN,
            
        }
    })

    const mailOptions = {
        from: `ARShelf <${EMAIL}>`,
        to: to,
        subject: subject,
        text: text,
        html: html,
        attachments: attachments ? attachments : null
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = {Approval, Category, Order, Product, User, regex, setDate, mail}