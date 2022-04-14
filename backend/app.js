const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 2000;
const routes = require('./Routes/index');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const cloudinary = require("cloudinary");

require('dotenv').config();

app.use(cors());
app.options('*',cors());
app.use(function(req, res, next) {
    const allowedOrigins = [ 'http://localhost:3000', 'https://arshelf-trials.web.app'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    } // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routes);



/* Connect MongoDB Atlas for Database */
mongoose.connect(process.env.uri,
    { useNewUrlParser: true, useUnifiedTopology: true ,useFindAndModify:false}
).then(res => {
    /* Start Server */
    app.listen(port, () => {
        console.log(`Server Running on Port:${port}`)
    });
    
    /*Cloudinary Config */
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });

}).catch(err => { console.log(err) })
