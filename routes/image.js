const express = require('express')
const db = require("../models")
const router = express.Router()
const cloudinary = require("cloudinary");

cloudinary.config({
    cloud_name: 'dv1oijudu',
    api_key: '426137622485249',
    api_secret: 'CZYs5IBDATR_wNM2OgjcU87bS9U'
    });
   

router.post('/images', (req, res, next) => {
    const file = req.files.image
    const userId = req.session.passport.user

    // console.log(file)
    // cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
    //     if (err) throw err;
    //     console.log(result)
    //     res.status(200)
    // })

    console.log('done')
})


module.exports = router