const express = require('express')
const db = require("../models");
const router = express.Router()
const cloudinary = require("cloudinary").v2;
const Profile = db.profiles
const dotenv = require('dotenv')
dotenv.config()


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
    });
   

router.post('/images', (req, res, next) => {
    
    if (req.files == null) {
        req.flash('error_msg', 'Please upload an image.')
        res.redirect('../registration')
    } else {

    const file = req.files.image
    const userId = req.session.passport.user
    const eager_options = { width: 150, height: 150, crop: 'scale'};

    cloudinary.uploader.upload(file.tempFilePath, eager_options)
    .then(result => {
        
        Profile.update({ image: result.url },{ where: {userId} })

        .then(user => {
            console.log('image updated...')
            res.redirect('../registration')
        })
        .catch(err => console.log(err))

        })
    .catch(err => console.log(err))
    }
})
    



module.exports = router