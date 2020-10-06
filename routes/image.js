const express = require('express')
const db = require("../models")
const router = express.Router()
const cloudinary = require("cloudinary");
const Profile = db.profiles

cloudinary.config({
    cloud_name: 'dv1oijudu',
    api_key: '426137622485249',
    api_secret: 'CZYs5IBDATR_wNM2OgjcU87bS9U'
    });
   

router.post('/images', (req, res, next) => {
    const file = req.files.image
    const userId = req.session.passport.user

    cloudinary.uploader.upload(file.tempFilePath)
    .then(result => {
        console.log(result.url)
        Profile.update({ image: result.url},{ where: {userId} })
        .then(user => {
            console.log('image updated...')
            res.redirect('../dashboard')
        })
        .catch(err => console.log(err))

        })
    .catch(err => console.log(err))

})
    



module.exports = router